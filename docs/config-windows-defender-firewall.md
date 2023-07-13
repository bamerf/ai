---
title: Configuring Windows Defender Firewall on Windows 7
description: Allow Corellium to establish a VPN connection on Windows machines.
tags:
  - Guides
  - Windows 7
  - Windows Defender Firewall
---

By default, Windows Defender Firewall blocks inbound connections, preventing Corellium devices from establishing a connection to a VPN-connected Windows computer. This prevents proxies, like Burp, from working, because the VM instance must be configured to proxy its traffic through the VPN-connected Windows computer.

To add a Firewall rule to allow network traffic originating from Corellium, on Windows 7, follow these instructions:

## Instructions

1. Open Windows Defender Firewall.

2. Click **Advanced Settings** on the left-hand side.

3. Click **Inbound Rules** on the left-hand side.

4. Click `New Rule...` on the right-hand side. The New Inbound Rule Wizard will appear. Select the `Custom` radio button, then click **Next**.

5. Select the `All Programs` radio button, then click **Next**.

6. Click **Next**.

7. Select `These IP addresses` for the first question, then click **Add...**.

8. Enter `10.11.3.0/22`, the VPN subnet. Then click **OK**.

9. Select `These IP addresses` for the second question, then click **Add...**. Enter the VM instance subnet `10.11.0.0/15` then click **OK**.

10. Click **Next**.

11. Select `Allow the connection`, then click **Next**.

12. Check off `Domain`, `Private`, and `Public`. Then, click **Next**.

13. Name the rule, then click **Finish**.

14. You should see your rule in the Inbound Rules tab.

You should now be able to establish connections from a Corellium VM instance to your VPN-connected client.
