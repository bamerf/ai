---
title: iBoot
description: iBoot is a bootloader for iOS devices.
---

iBoot is a bootloader for iOS devices. It is the first piece of code that runs when an iOS device is powered on. It is responsible for loading the kernel and other components of the operating system.

On a Corellium virtual device, the application processor can be started from iBoot instead of booting the device directly from the kernel. A raw binary image or unencrypted img4 must be provided.

Additionally, instead of booting the device directly from the kernel or iBoot, the application processor can be started from a custom BootROM image. This is cumulative with the iBoot image. A raw binary image must be provided.

Although iBoot and BootROM will be allowed to read and verify the next stage from NAND, the chainload will be intercepted and the images substituted for those you specify in the settings.

You can also patch iBoot / BootROM to disable signature checks.
