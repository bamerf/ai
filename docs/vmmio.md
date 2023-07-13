---
title: Custom VMMIO
description: Virtual Memory Mapped I/O (VMMIO) is a mechanism for emulating hardware devices.
---

Virtual Memory Mapped I/O (VMMIO) is a mechanism for emulating hardware devices. On a virtual device, custom virtual MMIO ranges can be added to the device and driven through a TCP socket.

When specifying a custom VMMIO range, you must specify a series of parameters:

- `start` - start address for beginning of vMMIO range
`size` - the size of the range to use for vMMIO
- `irq` - system IRQs, 1-16 ranges must be specified
- `port` - TCP port for vMMIO usage
