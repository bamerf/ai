---
title: Configuration
description: Corellium is shipped configured to use a specific static IP address and netmask.
tags:
  - Guides
  - On-Site
  - On-Premise
  - Altra
sidebar_position: 7
---

Corellium is shipped configured to use a specific static IP address and netmask. In case the configured static IP address conflicts with your institution’s network, we advise you to complete the setup with Corellium machines not initially connected to your institution’s network. Corellium servers require the use of static IP addresses. Corellium servers cannot operate with DHCP. The Controller Node will output a setup URL on the serial console as it boots up, so it is advisable to have the serial console connected when booting the Controller Node for the first time.

Going to the URL provided will allow you to provide the configuration settings Corellium needs to set itself up. Even after Corellium is set up, on future reboots of the Controller node, the setup URL will be printed on the serial console, and still may be used to change configuration settings and rerun setup. It is also possible to completely reset Corellium using this interface if something goes wrong. After initial setup, however, the setup interface will require the administrator’s username and password (which are configured during initial setup).

During reconfiguration, because the authentication server itself needs to be brought down and set up again, the progress indicator may not be accurate. The setup will be complete when the controller node reboots.

We will provide you shell usernames and passwords to the root accounts of all the machines we send you, though we recommend not modifying the software configuration manually. SSH access via password authentication is enabled on all
the machines.

If you have a Multi-Node setup, the Corellium controller node uses the SSH password authentication to connect to the other nodes to update and set up the configuration on each of them. The correct password to the root accounts of each node other than the controller node must be provided during updates and (re)configurations.
