---
title: Custom Ramdisk
description: How to configure and use a custom Ramdisk.
tags:
  - Custom Ramdisk
  - Advanced Boot Options
---

A ramdisk is a piece of software typically designed to upgrade the device's firmware and the NOR (flash chip the application processor boots from), as well as the baseband device (the chipset that manages all cellular antenna-related functions).

With Corellium, you have the option to boot the device from a custom ramdisk instead of from the standard NAND. The file must be unencrypted and unpacked, and the file size cannot exceed 40MB. Remember that in addition to uploading the desired ramdisk, you must also adjust the boot arguments to use it.

To upload a custom ramdisk, simply head to Settings and drag your file to upload it.

For example, you may want to customize a kernel to:

- generate a vmlinux to aid kernel debugging
- enable debug symbols
- add instrumentation, like KASAN or Kcov
- add or remove exploit mitigations
- integrate training modules or revert security patches, for security testing
