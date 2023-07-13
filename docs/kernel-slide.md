---
title: Kernel Slide
description: Kernel Slide is a security feature in iOS devices.
---

Kernel Slide is a security feature in iOS devices. It is a random offset that is added to the kernel base address. This prevents attackers from knowing the exact location of the kernel in memory.

On Corellium virtual devices, you can modify the slide value used by iOS to relocate the iOS kernel during boot, to randomize addresses located inside the kernel.

This value can be set to one of the following values:

- `0`: Disable KASLR for this device (default)
- `(empty)`: Choose a random kernel slide during each boot
- `(value)`: Set the kernel slide to the specified value during each boot. The value should be specified in hexadecimal, be 16KB aligned (`0x4000` aligned), and between `0x0` and `0x40000000`
