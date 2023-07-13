---
title: Manipulate the Built-In Frida Server Version on iOS and Android Devices
description: Frida is a dynamic code instrumentation toolkit for developing, researching, and reversing applications.
tags:
  - Guides
  - Frida
---

This guide covers the exact steps to take to play around with the exact `frida-server` version you desire. Something to keep in mind; while this guide will allow you to update or downgrade to any `frida-server` version, not all versions are going to be compatible. 

## Replacing the Built-in Frida Server on Android

How to go about changing the `frida-server` version on Android devices.

1. Download the latest `frida-server` binary for the arm64 architecture. This can be built from source or grabbed from the release tags on [Frida's github](https://github.com/frida/frida/releases). Specifically, you're looking for 
`frida-server-{RELEASE-NUMBER}-android-arm64.xz`.
```
wget https://github.com/frida/frida/releases/download/x.y.z/frida-server-x.y.z-android-arm64.xz
```
2.  Decompress the file.
```
xz -d frida-server-x.y.z-android-arm64.xz
```
3. Connect to the device, you can grab the command from the UI.
```
adb connect {Services IP}:5001
```
4. Become super user.
```
adb root
```
5. Push the `frida-server` file to the virtual device.
```
adb push frida-server-x.y.z-android-arm64 /data/local/tmp
```
6. Make the file executable.
```
adb shell chmod +x /data/local/tmp/frida-server-x.y.z-android-arm64
```
7. Tells the frida-server to listen on a specific interface, in this case we need to use the Host IP of the device.
```
adb shell /data/local/tmp/frida-server-x.y.z-android-arm64 -l {Wifi IP} &
```
8. Now that you have the frida-server listening on the Host IP interface, you can now attach to an application by specifying the Host IP with the -H argument in your terminal.

Assuming `frida-server` has been run properly, frida on your host machine should automatically see this as a connected USB device. You can test this by running the normal `frida-ps -U` command.

If you have more than one device connected to the host machine with `adb` enabled, then scripts and different commands may have issues identifying which device to talk to. When connecting to a device over TCP/IP, the "serial number" becomes the IP address and port. This means you can identify the devices using the `Services IP` for both `adb` and `frida` commands like below:
```
adb -s 10.30.71.1:5001 shell /data/local/tmp/frida-server -l {Host IP}
```

For usage in a Frida script, you'll need to utilize the Device Manager and assert which device you want to connect to. Below is an example python script that would load a script against a specific package name:
```python
#!/usr/bin/python3
# unpacker.py
import frida
import sys
device_ip = '10.x.x.x:5001'
script_name = 'emulator_cloak.js'
fd = open(script_name, 'r')
package_name = 'diff.strazzere.anti'
def on_message(message, data):
if message['type'] == 'send':
print('[*] {0}'.format(message['payload']))
else:
print(message)

dm = frida.get_device_manager()
device = dm.get_device(device_ip)
pid = device.spawn([package_name])
session = device.attach(pid)
script = session.create_script(fd.read())
fd.close()
script.on('message', on_message)
script.load()
device.resume(pid)
sys.stdin.read()
```

## Replacing the Built-In Frida Server on iOS

This can be achieved with the following script placed in the references section of this article. Complete the following steps to replace the `frida-server` binary for iOS.

Important note: Updating `frida-server` to version 16.0.8 will not work, this is a known issue.
  
1. Create a bash file that will contain the script.
```
touch frida_upate.sh
```
2.  Edit the bash file and paste in the script below(recommended to first ssh into the device before attempting to edit the file).
```
vim frida_update.sh
```
3. Make the script executable for your user.
```
chmod u+x frida_update.sh
```
4. Run the the script from the root directory of your iOS device and pass in the version of `frida-server` you would like to run.
```
cd ~
```
```
./frida_update 16.0.5
```
5. You can verify the `frida-server` was updated.
```
frida-server --version
```
You can now  begin interacting with device's frida-server.

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