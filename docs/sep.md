---
title: SEP
description: SEP is a security coprocessor in Apple devices.
---

SEP is a security coprocessor in Apple devices. It is responsible for the secure enclave, which is a secure area of memory that can only be accessed by the SEP. SEP is also responsible for the Touch ID sensor.

## SEP Firmware Binary

On a Corellium virtual device, SEP firmware can be run in an emulator instead of protocol-level SEP emulation. An unencrypted img4 or raw binary image must be provided. This may not be changed after device creation. You can also patch SEPOS to print debug messages to the console.

## SEP Bootrom

The SEP firmware binary can be loaded via SEP ROM image instead of directly loaded into SEP memory. A raw binary image must be provided. This may not be changed after device creation.
