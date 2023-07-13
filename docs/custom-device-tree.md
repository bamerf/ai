---
title: Custom Device Tree
description: How to configure and use a custom device tree.
tags:
  - Device Tree
  - Advanced Boot Options
---

A device tree is a representation of hardware used by boot loaders (such as iOS' iBoot) provided to the kernel. It is a hierarchical representation of devices by connection, used by the kernel to communicate with the I/O buses and other low-level hardware.

Instead of a stock device tree, you can specify a custom one. It must be unencrypted and unpacked. To upload a custom device tree, simply head to Settings and drag your file to upload it.
