---
title: Setting Up Your Stack
description: How to get your Hardware and Software stack up and running.
tags:
  - Guides
  - On-Site
  - On-Premise
  - Altra
sidebar_position: 9
---

## Hardware

1. Connect the 1GbE BMC (Management) port to your management network via an Ethernet cable.
2. Connect the top 1GbE port to your regular network.
3. Plug in the power to turn on the servers.

Note: servers can take 3-5 minutes to boot.

### Rack Installation

1. Remove the long slender cardboard box from the Ampere Altra casing.
2. Open and remove contents from packaging.
3. Detach the Inner and Outer rail(s) from Left/Right. 
4. Attach the Inner rail(s) to the Corellium server.
5. Attach the Outer rails assembly to the Rack, making sure the connection is secure. (Note: Please check rack post type. The rail pre-installed type is for square hole post. If rack post is round hole post, please switch to the suitable screws). *If you need further assistance please refer to link below and view section 1. A + B*
6. Reattach the Server and Inner Rail(s) to the Outer Rail(s) assembly on the Rack.

[KingSlide Server Manual](/files/server_manual_25HB2-3A0202-K0R_railkit_installation_sop.pdf)

## Software

Go to IP and follow the installer's instructions.

Obtain your Laptop IP Address, Netmask, and Controller IP Address from the Initial Networking Configuration and Passwords document. Configure the laptop with the following networking information:

- IP Address: Laptop IP
- Netmask: Netmask
- Gateway: <none or unspecified\>
- DNS: <none or unspecified\>

In a command line on the laptop, enter:

```bash
ping [Controller IP Address]
```

Wait until the server starts responding, then use the web browser on the laptop to go to **https://[Controller IP Address]:8088/**. Then, do the following:

1. Fill out the temporary Corellium UI username and password provided in the **Initial Networking Configuration and Passwords** document.
2. Fill out the required information. For more details, please read the Installation Overview section. Make sure that the Networking Information and Virtual Device Networking section are filled out with correct information. The defaults for the other sections are acceptable.
3. Click Reconfigure Corellium.

You may have to refresh the page from time to time to get updated progress information. Because you may have changed the servers’ networking information, the server may become unreachable during the process unless you also change your laptop’s networking information. In any case, the installation will proceed without the web browser being connected.

Wait for the process to finish and for the servers to all reboot.

### Finalize networking configuration

You will need to set up DNS for the domain you chose during setup. This can be done by adding it to your institution’s DNS server, or by adding it as a static DNS entry in the `hosts` file on each laptop that will be accessing Corellium.

Physically connect the Corellium servers to your institution’s network.

Verify that the Corellium servers are reachable by ping through your institution’s network.

### Log In

1. Navigate to the domain you chose during setup.
2. Log in using the Corellium UI username and password. The initial ones are listed in the Initial Networking Configuration and Passwords document. If you changed the Administrator Password setting during setup, the password will be that instead.
3. Create projects and users for your installation.

If you move the service IP, you have to delete the project and recreate it. The IP ranges assigned to projects happen when they’re created.
