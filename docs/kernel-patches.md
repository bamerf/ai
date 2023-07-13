---
title: Kernel Patches
description: Enable or disable patches applied to the kernel to maximize developer convenience.
---

On a Corellium Virtual Device, Certain patches are applied to the kernel to maximize developer convenience. You can switch between Developer Kernel Patches and Stock Kernel Patches.

With Stock Kernel Patches, a jailbroken device may be unable to boot when using stock kernel patches, so make sure your `/etc/fstab` is set back to read-only for root.

Additionally, you can also choose to boot without a snapshot mount. By default, the System partition is an immutable snapshot. Disabling the snapshot mount makes it easier to modify.
