---
title: Fridump with Corellium
description: Dumps the memory of a process utlizing the Frida framework.
tags:
  - Guides
  - Frida
---

# Fridump with Corellium

Fridump allows you to dump a process's memory by utilizing the Frida framework.

## Prequisites

- Make sure you have Frida installed on your local computer, and that it matches the Frida version on the virtual device.
- Ensure you are connected to the VPN with the proper configuration profile.
- Have Python installed and added the alias to your `.zshrc` configuration file.
- USBflux downloaded and connected to the device you wish to dump the memory from.

1. Clone the Fridump repository.

```
git clone https://github.com/Nightbringer21/fridump.git
```

2. Change directories into the repository.

```
cd fridump
```

3. Display the Fridump help menu.

```
python fridump.py -h
```

4. You can view all running process with Frida in order to find the active process to initiate the memory dump from.

```
Frida-ps -U
```

5. Start the memory dump by specifying a USB connection to the device and selecting a running process.

```
python fridump.py -U Safari
```

6. All dumped memory will appear in the dump folder.
