---
title: Debug Accelerator
description: Learn how to use the Debug Accelerator.
---

The Corellium Debug Accelerator reduces the effect of network latency and makes debugging experience natural.

See up to a 10x improvement in debugging speed.

## Use Debug Accelerator on macOS and Linux

    -  On Linux, set the Debug Accelerator binary as executable.
        ```bash
        chmod u+x /path/to/debug_accelerator_linux_x86_64
        ```

    - On MacOS, run the installer for Debug Accelerator for macOS. Click through the prompts and complete the installation. The executable will be installed under `/usr/local/bin/`.

2. Connect to the Virtual Device's VPN. Refer to [our VPN article](/features/connect/vpn) for more details.

3. Make note of your device's Services IP from the **Connect** tab. In our example, we use `10.11.1.1`.

4. Run the Debug Accelerator, referencing `<services_ip>:4000` for the remote host and port then `127.0.0.1:4000` for the local host and port. Look for a response: `Listening on '127.0.0.1:4000'`.

   ```bash
   /path/to/debug_accelerator 10.11.1.1:4000 127.0.0.1:4000
   ```

5. Slightly modify the gdb command from the AVH device's **Connect**, referencing the localhost IP.

   ```bash
   lldb --one-line "gdb-remote 127.0.0.1:4000"
   ```

6. You will notice a significant performance improvement when debugging.
   - Speed when using standard debugging:

## Use Debug Accelerator on Windows CLI

1. Install [LLVM](https://releases.llvm.org/download.html) for your system type.

2. Connect to the Virtual Device's VPN. Refer to [our VPN article](/features/connect/vpn) for more details.

3. Make note of your device's Services IP from the **Connect** tab. In our example, we use `10.11.1.11`.

4. Download and run the installer for Debug Accelerator for Windows. The executable will be installed under `C:\Program Files\Corellium\Debug Accelerator`.

5. Run Debug Accelerator and configure Remote to `<services_ip>:4000` and Local to `127.0.0.1:4000`.

6. The program will continue running in the background. Right-click on the systray icon, click Log..., and look for a line that says `Listening on '127.0.0.1:4000'`.

7. From PowerShell or Windows Command Prompt, modify the lldb command provided for the device through the web interface with your localhost IP and port 4000.

   ```bash
   lldb --one-line "gdb-remote 127.0.0.1:4000"
   ```

8. You will notice a significant performance improvement when debugging.
