---
title: How to add a custom IPSW on an On-Site Deployment
description: Use our how-to guide to add a custom IPSW file to on-site deployment.
tags:
  - Guides
  - Custom IPSW
  - On-site
sidebar_position: 5
---

Keen on bringing your own Apple software but stuck on the custom IPSW? Use our how-to guide to add a custom IPSW file to on-site deployment.

Using SCP, transfer the IPSW you want to add to the controller node. While you’ve likely modified your controller host during the setup process, we’ll refer to the original one in your Initial Networking Configuration and Passwords document, called Controller IP Address.

## Process

- The address of the controller node is the same as the one used to access the Corellium web interface.
- The username and password for the root shell account have been provided to you in this document under "shell root
password" in the Initial Networking Configuration and Passwords document.

1. Use the `scp` command to copy the `custom.ipsw` to `root@[Controller IP Address]`. The destination location does not matter as long as it is not in `/var/ipsw`.

```bash
scp custom.ipsw root@[Controller IP Address]:~/
```

2. SSH into the controller node with the shell user account provided.

```bash
ssh root@[Controller IP Address]
```

3. Become root.

```bash
sudo -s
```

4. Add the custom IPSW file. You must specify the absolute path of the custom IPSW.

```bash
node /usr/share/corellium/fwupdater/addfw.js /home/ubuntu/custom.ipsw
```

## Finishing Up

Now, just wait for the command to complete. Changes will be reflected in the web user interface after 30 minutes. You
may immediately trigger an update by restarting the web user interface.

```bash
systemctl restart frontend
```