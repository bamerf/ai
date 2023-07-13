---
title: Custom Kernels
description: How to upload and use your custom kernel.
tags:
  - Kernel
  - Advanced Boot Options
  - KASAN
  - Kcov
---

The kernel is a program at the core of a device's operating system and has complete control over everything in the system. The iOS kernel is the [XNU](https://en.wikipedia.org/wiki/XNU) kernel of [Darwin](<https://en.wikipedia.org/wiki/Darwin_(operating_system)>), whereas Android uses a modified version of the Linux kernel with further architectural changes implemented by Google.

On Enterprise Accounts, a custom Linux kernel can be uploaded for **Android** devices. It will be used instead of the default Linux kernel. For instance, you may want to customize a kernel to:

- generate a vmlinux to aid kernel debugging.
- enable debug symbols.
- add instrumentation, like [KASAN](https://www.kernel.org/doc/html/v4.14/dev-tools/kasan.html) or
  [Kcov](https://simonkagstrom.github.io/kcov/index.html).
- add or remove exploit mitigations.
- integrate training modules or revert security patches, for security testing.

For **iOS** devices, you can upload and use any compatible ARM kernel to be used instead of the stock kernel.

For either device, simply drag your custom kernel into the appropriate place in Settings to upload it. All custom kernels must be unencrypted and uncompressed.
