---
title: Projects
description: Virtual devices are organized into Projects.
tags:
  - Guides
  - On-Site
  - On-Premise
  - Altra
sidebar_position: 3
---

Virtual devices are organized into [projects](/getting-started/enterprise-accounts/managing-projects). The more projects you wish to add to Corellium, the greater amount of IP space Corellium will need in virtual device static IP mode. Before installing Corellium, you must estimate how many projects you will need to create and figure out how much IP space (and where) to assign to Corellium’s projects. For more discussion on this, see Virtual Device Network in the Networking in Corellium section.

Corellium allocates the IP ranges for each project, starting from a value the administrator configures. For example, if you configure `10.15.14.0`, the first project created will have a range of `10.15.14.0` to `10.15.15.255`, the second will have a range of `10.15.16.0` to `10.15.17.255`, etc.

Note that because of this, Corellium needs one contiguous IP space for its projects and virtual devices.
