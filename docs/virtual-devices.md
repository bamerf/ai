---
title: Virtual Devices
description: Virtual devices each have a virtual interface that they can use to access the outside world.
tags:
  - Guides
  - On-Site
  - On-Premise
  - Altra
sidebar_position: 2
---

Virtual devices each have a virtual interface that they can use to access the outside world. Corellium has an internal DHCP server that exclusively gives IPs to virtual devices. In addition to the IP assigned to the virtual device’s wi-fi interface, Corellium also allocates a per-device IP that users can interact with the device with. Many services are hosted on this per-device IP, such as the ability to connect USB devices to the virtual device using USBIP.

The simplest way to configure Corellium is to have Corellium use a DHCP server you already have set up on your network to determine the IP addresses to use for the Wi-Fi and service IPs. This has the drawback of having each device have semi-randomly assigned IP addresses that are not memorable.

Corellium can also be used in virtual device static IP mode. In this mode, **each project in Corellium has its own `/23` IP space**, and virtual devices within the project are assigned addresses within that `/23` IP space. For example, if the project has the IP space `10.11.2.0/23`, the first virtual device would have a wi-fi IP of `10.11.2.1` and a services IP of `10.11.3.1`.

In other words, each project is given a consecutive range of 512 IP addresses, starting from an IP address whose 3rd part must be an even number. For example, `10.11.4.0` would be a valid starting address for the project’s range, but not `10.11.5.0`.

This system makes it easy for users to quickly remember the IP addresses of their devices and be able to easily access them with their tools, streamlining their process.
