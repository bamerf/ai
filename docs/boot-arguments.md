---
title: Boot Arguments
description: Configure your device's boot sequence
tags:
  - Boot args
  - Boot Arguments
  - Advanced Boot Options
  - Advanced Settings
---

Boot Arguments are specific configuration flags passed to the kernel during the boot process. Every kernel has certain arguments it accepts and the values of these flags can be changed.

In general, it isn't safe to remove or change the default arguments if you aren't sure what you're doing, since the device and UI features may no longer work correctly.

For Android devices, Linux kernel command-line parameters are documented [here](https://www.kernel.org/doc/html/latest/admin-guide/kernel-parameters.html).

For iOS devices, the default boot arguments are:

```bash
-v debug=0x14e serial=3 gpu=0 ioasm_behavior=0 -vm_compressor_wk_sw
```

Vendor devices may offer other undocumented command-line parameters.

To customize your boot arguments, simply head to the Corellium **Settings** tab, open the General subtab, modify the appropriate text field, then click **SAVE & REBOOT**.
