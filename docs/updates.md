---
title: Updates
description: Corellium will provide updates to you via the Files Portal. 
tags:
  - Guides
  - On-Site
  - On-Premise
  - Altra
sidebar_position: 10
---

Corellium will provide updates to you via the Files Portal. The URL and login details can be found in your *Initial Networking Configuration and Passwords* document.

To install an update, download the update package file from the Files Portal.

1. Transfer the Corellium upgrade (the `.tar.xz` tarball) to the Controller Node (e.g. via SCP) into the home directory of the root user at `/root`.
2. SSH into the Controller Node.
3. Over SSH, extract the Corellium upgrade via `tar xvf <update name>.tar.xz`. The files should all be extracted to `/root/<update name>`
4. Change the directory into the top directory of the update: `cd <update name>`
5. Start the updater: `./install.sh`.
6. Use the web browser on the laptop to go to the URL listed by install.sh.
7. Fill out the required information. For more details, please read the Architecture Overview. Your settings should have transferred, but make sure they are correct.
8. Click Upgrade Corellium.
9. Wait for the process to finish and for the servers to all reboot.
