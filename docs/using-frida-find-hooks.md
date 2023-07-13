---
title: Using Frida to Find Hooks
description: Frida is a dynamic code instrumentation toolkit for developing, researching, and reversing applications.
tags:
  - Guides
  - Frida
  - Hooks
---

One technique that Android applications sometimes use to obfuscate how they work is self-hooking. This, specifically, is utilized by Android packers as a way to protect the contents of the underlying application. Other examples can be seen in the wild in security products, malware, or even games deploying anti-cheat software. As a simplistic example, we will walk through how a security product can provide an "encryption" layer at rest for Android applications, without needing to be invoked directly by the application it's protecting.

## Wait so, what is Frida?

Frida is a [dynamic code instrumentation toolkit](https://frida.re/) for developing, researching, and reversing applications. For ease of use, we’ve included a Frida daemon in all iOS and Android VMs. To activate the included `frida-server`, simply navigate to the Frida tab, as shown below, and select a process to get started.

You can either use the Corellium user interface, or you can connect directly to the `frida-server`. In the Corellium user interface, you can upload, edit, download, and execute scripts, as well as attach to processes and receive a Frida
console.

To interact directly with the `frida-server` from your local machine, you must first connect to the VPN provided on the Connect tab (for cloud users). Check out the Connecting to the [Corellium VPN article](/features/connect/vpn) for instructions on how to connect to the VPN. Then, you must connect to the device.

For example, on Android, you must connect to adb. Once the device is connected and the local machine can see it, Frida will forward the necessary ports and connect using adb, which you can test using the `frida-ps -U` command:

```bash
$ frida-ps -U PID Name ---- ------------------------------------------------------------- 396 adbd 1433 android.ext.services 240 android.hardware.atrace@1.0-service 315 android.hardware.audio.service 316 android.hardware.authsecret@1.0-service 419 android.hardware.biometrics.face@1.0-service.example 420 android.hardware.biometrics.fingerprint@2.1-service 317 android.hardware.bluetooth@1.1-service.sim ...
```

For iOS, to use the `-U` argument, make sure you have USBFlux running. If you want to connect without USBFlux using `-H` or `--host`, you should add a new entry 27042->27042 to the PORT FORWARDING tab of your device and then use:

```bash
frida-ps -H [VM IP ADDRESS]:27042
```

To use the Frida tab in the Corellium user interface, you must first select a process. When you click Select a Process, you will be provided with all valid attachable processes on the device that are currently running. The list is explicitly filtered to exclude any processes that would render an error, such as processes that are statically linked or do not include `libc`. Below is an example of what you will see on the Select a Process prompt. You can quickly filter the list by searching in the magnifying glass field in the top-right-hand corner.

One command which is explicitly different from the stock Frida cli is the %load command. If you push a file to the device, such as `/data/local/tmp`, and want to load it into the console, you should use this command.

```text
____ / _ | Frida 12.11.17 - A world-class dynamic instrumentation toolkit | (_| | > _ | Commands: /_/ |_| help -> Displays the help system . . . . object? -> Display information about 'object' . . . . exit/quit -> Exit . . . . . . . . More info at https://www.frida.re/docs/home/ [Remote::PID::320]-> %load /data/local/tmp/hook_java.js [+] Hook android.webkit.WebView.loadUrl()... [Remote::PID::320]->
```

## Finding Hooks in Android Applications

The general idea is that, before an application makes any system calls to `bionic-libc`, the security instrumentation will place a hook on the functions it wishes to intercept. So for this example, we will study a write-to-disk-encryptor. The general flow of any Linux-based application from the system level would be as follows when writing to the disk:

1. Open a file descriptor
2. Write a buffer to that file descriptor
3. Close that file descriptor

Easy, right? Now at a very high level, when an Android application calls a higher-level system API for writing a file to disk, this is still what happens below the hood. The developer doesn't need to know this, it just happens. So when writing security tooling around this, we can approach it at a very low level and let the system perform all our work for us.

In order to do this, we would want to utilize the following steps:

1. The application attempts to open a file descriptor.

2. Is this file descriptor inside the directory we want to encrypt, for example, `/data/data/com.our.package.name/`? If not, don't bother doing anything. Otherwise, continue.

3. Mark this file descriptor as something we want to intercept on write()

4. Wait for a write() to occur which contains the above file descriptor as an argument, when this occurs, "encrypt"/xor/scramble the text as needed, before passing it to the real write() function.

So how would this be accomplished? While there are a few different ways, one common one is to patch the function you want to intercept, in memory, to point to your own function. You would then remember the original address for the
function, and call this at the end. At a high level, this would be replicated in Frida like the following:

```cpp
var open = new NativeFunction(Module.findExportByName(null, 'open'), 'int', ['pointer', 'int', 'int']);
Interceptor.replace(open, new NativeCallback(function(path, flags, mode) {
    console.log('open( path="' + Memory.readUtf8String(path) + '", flags=', flags,' mode=', mode, ')');

    // Check if this is a fd to encrypt contents of, save for later

    return open(path, flags, mode);
}, 'int', ['pointer', 'int', 'int']));
```

Note: To do this inline with an Android Application, you would need to write some native code to perform the actual hooking, though hopefully this is illustrative enough for the example. More information on this can be found in a few different places, like the [Android GOT Hook](https://shunix.com/android-got-hook/) article.

## Reverse Engineering

This can be pretty useful for folks who want to obscure how things are being done to both the system and the application developer. Though as a reverse engineer, we want to be able to find these things quickly. This is often the case when working on a bug bounty or pentest of an application which has used some type of protection like this. If the protection is bought and not developed in-house, it is merely a hindrance to get past and not often part of the assigned scope of the test. This is when looking for these hooked functions can be a nice way to speed up analysis and avoid spending time unwinding obfuscation or reversing a protector.

Utilizing a Corellium Android Device for this has become my go to for speeding up analysis of such applications. After we had added the Frida tab, it sped up my process even more. Previously, when writing unpackers for certain Android targets, I had modified some scripts I found online which did patch checking. After extending this to fit my needs and keeping it up to date with different Frida and Android releases, I'll be utilizing it as an example to show how to use the embedded Frida on Corellium devices. The basic idea for this script is to read the contents of loaded shared libraries from the disk and compare them to those that are loaded in memory. If we find differences in the code segments, we likely know something has been changed, and it would be good to investigate them.

## Instructions

For this tutorial, we will be installing the Signal application on Android 11 as I know that the DJI Fly app uses the SecNeo unpacker which uses this method under the hood

1. Download the Signal app from [https://signal.org/android/apk/](https://signal.org/android/apk/)

2. Open the Device page of an Android device.

3. Click on the **Apps** Tab, then click **Install**. Select the Signal application, then click **Open**.

4. Wait for the application to install, then click **Launch**.

5. Click the Frida tab, then click the **+ Select a Process** button to view a list of running processes.

6. Select the Signal process, then click **Attach**.

7. We now have a Frida REPL console which is attached to the process in the device. Here we can copy and paste small scripts or test out functionality.

8. Now, click the **SCRIPTS** tab, then the **UPLOAD** button and select the provided _hook_finder.js_ script. (See references section below.)

9. After uploading the _hook_finder.js_ script, you should see a screen like this:

10. At this point, we can do two different actions to execute the script.

a. We can now go back to the REPL console and manually enter it as `%load /data/corellium/frida/scripts/hook_finder.js`,

b. or simply click the execute button, which will do this automatically for us.

c. This is a custom command that is not normally found in the Frida REPL environment, so just keep this in mind if you're attempting this elsewhere.

11. Once we navigate back to the console tab we should see the output of the script as it works. Notably, we see hooks being identified in `/apex/com.android.runtime/lib64/bionic/libc.so` which are similar to the example given at the beginning of this blog. The output when I've run it on the Signal target is shown below:

## Summary

So what exactly are we seeing here? Essentially, if we dive into the `hook_finder.js` code, we have automated the process of reading a subsection of the modules loaded by the application from disk, parsing their headers to identify specific segments of the ELF file, and then comparing the contents of the `.text` and `.rodata` sections to those that are found in memory. While this won't detect all forms of hooking, it does detect a fair amount of those used by Android packers.

At this point, one should be able to take the code as it currently is, extend it to analyze what has changed, and try to understand why. Many of the things hooked relate to the above example used in this blog, while others are likely used for other packer features. We could expect to find that the code injected, causes the caller to jump to a memory location within the packers library. What this library might do with each function call from there is an exercise left to the reader.

Feel free to [join our Slack](https://corelliumsupport.slack.com/ssb/redirect) to discuss this post or ask any questions you may have about it.

## References

_hook-finder.js_

```js
// Script to gather the shared library from disk and also
// from memory utilizing Frida. After reading the file from
// disk, it will then compare some sections of the file in
// order to hunt and identify potentially modified and hooked
// functions.
//
// Re-written over the ages for usage while
// unpacking Android applications by
// Tim 'diff' Strazzere, <tim -at- corellium.com> <diff -at- protonmail.com>
// Based off older code and concepts from lich4/lichao890427
//
// Corresponding blog https://corellium.com/blog/android-frida-finding-hooks

// Helper function for creating a native function for usage
function getNativeFunction(name, ret, args) {
  var mod = Module.findExportByName(null, name);
  if (mod === null) {
    return null;
  }

  var func = new NativeFunction(mod, ret, args);
  if (typeof func === 'undefined') {
    return null;
  }

  return func;
}

var open_ptr = getNativeFunction('open', 'int', ['pointer', 'int', 'int']);
var read_ptr = getNativeFunction('read', 'int', ['int', 'pointer', 'int']);
var close_ptr = getNativeFunction('close', 'int', ['int']);
var lseek_ptr = getNativeFunction('lseek', 'int', ['int', 'int', 'int']);

function getElfData(module) {
  console.log('Processing ', module.path);
  if (module.sections) {
    return true;
  }

  var fd = open_ptr(Memory.allocUtf8String(module.path), 0 /* O_RDONLY */, 0);
  if (fd == -1) {
    return false;
  }

  // Get elf header
  var header = Memory.alloc(64);
  lseek_ptr(fd, 0, 0 /* SEEK_SET */);
  read_ptr(fd, header, 64);

  // Allow for both 32bit and 64bit binaries
  var is32 = Memory.readU8(header.add(4)) === 1;
  module.is32 = is32;

  // Parse section headers
  var sectionHeaderOffset = is32
    ? Memory.readU32(header.add(32))
    : Memory.readU64(header.add(40)).toNumber(); // For some reason this is read as a string
  var sectionHeaderSize = is32
    ? Memory.readU16(header.add(46))
    : Memory.readU16(header.add(58));
  var sectionHeaderCount = is32
    ? Memory.readU16(header.add(48))
    : Memory.readU16(header.add(60));
  var sectionHeaderStringTableIndex = is32
    ? Memory.readU16(header.add(50))
    : Memory.readU16(header.add(62));

  var sectionHeaders = Memory.alloc(sectionHeaderSize * sectionHeaderCount);

  lseek_ptr(fd, sectionHeaderOffset, 0 /* SEEK_SET */);
  read_ptr(fd, sectionHeaders, sectionHeaderSize * sectionHeaderCount);

  var stringTableOffset = is32
    ? Memory.readU32(
        sectionHeaders.add(
          sectionHeaderSize * sectionHeaderStringTableIndex + 16
        )
      )
    : Memory.readU64(
        sectionHeaders.add(
          sectionHeaderSize * sectionHeaderStringTableIndex + 24
        )
      ).toNumber();
  var stringTableSize = is32
    ? Memory.readU32(
        sectionHeaders.add(
          sectionHeaderSize * sectionHeaderStringTableIndex + 20
        )
      )
    : Memory.readU64(
        sectionHeaders.add(
          sectionHeaderSize * sectionHeaderStringTableIndex + 32
        )
      ).toNumber();

  var stringTable = Memory.alloc(stringTableSize);
  lseek_ptr(fd, stringTableOffset, 0 /* SEEK_SET */);
  read_ptr(fd, stringTable, stringTableSize);
  var sections = [];

  var dynsym = undefined;
  var dynstr = undefined;
  var relplt = undefined;
  var reldyn = undefined;

  for (var i = 0; i < sectionHeaderCount; i++) {
    var sectionName = Memory.readUtf8String(
      stringTable.add(Memory.readU32(sectionHeaders.add(i * sectionHeaderSize)))
    );
    var sectionAddress = is32
      ? Memory.readU32(sectionHeaders.add(i * sectionHeaderSize + 12))
      : Memory.readU64(
          sectionHeaders.add(i * sectionHeaderSize + 16)
        ).toNumber();
    var sectionOffset = is32
      ? Memory.readU32(sectionHeaders.add(i * sectionHeaderSize + 16))
      : Memory.readU64(
          sectionHeaders.add(i * sectionHeaderSize + 24)
        ).toNumber();
    var sectionSize = is32
      ? Memory.readU32(sectionHeaders.add(i * sectionHeaderSize + 20))
      : Memory.readU64(
          sectionHeaders.add(i * sectionHeaderSize + 32)
        ).toNumber();

    if (['.text', '.rodata', '.got', '.got.plt'].includes(sectionName)) {
      var section = {};
      section.name = sectionName;
      section.memoryOffset = sectionAddress;
      section.fileOffset = sectionOffset;
      section.size = sectionSize;
      if (sectionSize > 0) {
        section.data = Memory.alloc(sectionSize);
        lseek_ptr(fd, sectionOffset, 0 /* SEEK_SET */);
        read_ptr(fd, section.data, sectionSize);
      } else {
        section.data = undefined;
      }
      sections.push(section);
    } else if (
      ['.dynsym', '.dynstr', '.rel.dyn', '.rel.plt'].includes(sectionName)
    ) {
      var section = {};
      section.name = sectionName;
      section.memoryOffset = sectionAddress;
      section.fileOffset = sectionOffset;
      section.size = sectionSize;
      if (sectionSize > 0) {
        section.data = Memory.alloc(sectionSize);
        lseek_ptr(fd, sectionOffset, 0 /* SEEK_SET */);
        read_ptr(fd, section.data, sectionSize);
      } else {
        console.log('No data section for', section.name);
        section.data = undefined;
      }

      if (section.name === '.dynsym') {
        dynsym = section;
      }
      if (section.name === '.dynstr') {
        dynstr = section;
      }
      if (section.name === '.rel.dyn') {
        reldyn = section;
      }
      if (section.name === '.rel.plt') {
        relplt = section;
      }
      sections.push(section);
    }
  }

  if (!!dynsym && !!dynstr) {
    var symbols = [];
    var stringTable = module.base.add(dynstr.memoryOffset);
    var structSize = is32 ? 16 : 24;
    for (var i = 0; i < dynsym.size / structSize; i++) {
      var symbolOffset = Memory.readU32(
        module.base.add(dynsym.memoryOffset).add(structSize * i)
      );
      symbols.push(Memory.readUtf8String(stringTable.add(symbolOffset)));
    }

    module.symbols = symbols;
  }

  var relmap = new Map();
  if (!!reldyn) {
    for (var i = 0; i < reldyn.size / 8; i++) {
      if (
        Memory.readU32(module.base.add(reldyn.memoryOffset).add(i * 8)) != 0 &&
        Memory.readU32(
          module.base
            .add(reldyn.memoryOffset)
            .add(i * 8)
            .add(4)
        ) >>
          8 !=
          0
      ) {
        relmap[
          Memory.readU32(module.base.add(reldyn.memoryOffset).add(i * 8))
        ] =
          Memory.readU32(
            module.base
              .add(reldyn.memoryOffset)
              .add(i * 8)
              .add(4)
          ) >> 8;
      }
    }
  }

  if (!!relplt) {
    for (var i = 0; i < relplt.size / 8; i++) {
      if (
        Memory.readU32(module.base.add(relplt.memoryOffset).add(i * 8)) != 0 &&
        Memory.readU32(
          module.base
            .add(relplt.memoryOffset)
            .add(i * 8)
            .add(4)
        ) >>
          8 !=
          0
      ) {
        relmap[
          Memory.readU32(module.base.add(relplt.memoryOffset).add(i * 8))
        ] =
          Memory.readU32(
            module.base
              .add(relplt.memoryOffset)
              .add(i * 8)
              .add(4)
          ) >> 8;
      }
    }
  }
  module.relmap = relmap;

  module.sections = sections;
  return true;
}

function findHooks(module) {
  if (module.sections === undefined) {
    if (!getElfData(module)) {
      return undefined;
    }
  }

  module.sections.forEach((section) => {
    if (section.size === 0) {
      return;
    }

    // It's important to cast the ArrayBuffer returned by `readByteArray` cannot be referenced incrementally
    var file = new Uint8Array(Memory.readByteArray(section.data, section.size));
    var memory = new Uint8Array(
      Memory.readByteArray(module.base.add(section.memoryOffset), section.size)
    );
    for (var i = 0; i < section.size; ) {
      if (['.rodata', '.text'].includes(section.name)) {
        if (file[i] != memory[i]) {
          console.log(
            '*** Potential variance found at ',
            DebugSymbol.fromAddress(
              module.base.add(section.memoryOffset).add(i)
            )
          );
          i += 4;
        }
        i++;
      } else if (['.got'].includes(section.name)) {
        break;
        // It shouldn't be as the got table isn't initialized until execution
        if (file[i] != memory[i]) {
          // todo compare the symbol to string against what it resolves too
        }
        i += module.is32 ? 4 : 8;
      } else {
        // Unscanned sections, to be added as needed
        break;
      }
    }
  });
}

// Quick and simple way to get the package name, assumes that the script
// was injected into an APK otherwise it won't work.
function getPackageName() {
  var fd = open_ptr(
    Memory.allocUtf8String('/proc/self/cmdline'),
    0 /* O_RDONLY */,
    0
  );
  if (fd == -1) {
    return 'null';
  }

  var buffer = Memory.alloc(32);
  read_ptr(fd, buffer, 32);
  close_ptr(fd);

  return Memory.readUtf8String(buffer);
}

// Adjust this as needed, often I don't need to scan anything outside of the
// included shared libraries and a few which are almost always in an apex folder.
// This logic will need to be changed if you're using a pre-apex version of Android
// to ensure it picked up the proper libraries for hunting
//
// While it doesn't hurt to scan everything, it's almost never needed and will just slow
// down the process at a linear scale.
//
// If you already know what you're hunting for, feel free to just return or look for
// libart, libdvm, etc, etc
function getRelevantModules() {
  var modules = [];
  var packagename = getPackageName();

  Process.enumerateModules().forEach((module) => {
    if (module.path.includes(packagename)) {
      modules.push(module);
      console.log('Adding ', module.path);
    } else if (module.path.includes('/apex')) {
      modules.push(module);
      console.log('Adding ', module.path);
    } else {
      console.log('Skipping ', module.path);
    }
  });

  return modules;
}

var modules = getRelevantModules();

modules.forEach((module) => {
  getElfData(module);
  findHooks(module);
});
```

Script to replace the version of `frida-server` on your iOS device.

```bash
#!/bin/bash
FRIDA_VER=$1
# contains plist
cd /Library/LaunchDaemons/
# move plist to root
mv re.frida.server.plist ~
cd ~
# unload service
launchctl unload re.frida.server.plist
# stash plist
mv re.frida.server.plist /Library/LaunchDaemons
mv /Library/LaunchDaemons/re.frida.server.plist /Library/LaunchDaemons/re.frida.server.backup
# fetch FRIDA
wget -O /tmp/frida_${FRIDA_VER}_iphoneos-arm.deb https://github.com/frida/frida/releases/download/${FRIDA_VER}/frida_${FRIDA_VER}_iphoneos-arm.deb
# update server, agent and plist
dpkg -i /tmp/frida_${FRIDA_VER}_iphoneos-arm.deb
# restore plist
mv /Library/LaunchDaemons/re.frida.server.backup /Library/LaunchDaemons/re.frida.server.plist
# launch service using new plist
launchctl load /Library/LaunchDaemons/re.frida.server.plist
# delete package
rm /tmp/frida_${FRIDA_VER}_iphoneos-arm.deb
```
