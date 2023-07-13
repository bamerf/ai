---
title: Backup and Restore
description: Corellium servers are all connected on a single Layer 2 network.
tags:
  - Guides
  - On-Site
  - On-Premise
  - Altra
sidebar_position: 11
---

Learn how to create a backup of the data in your on-premises deployment, including the hardware configuration, virtual devices, projects, users, custom firmware, snapshots, and more.

## Prepare to Back Up the Data

Before starting the backup, make sure that all devices are stopped (shut down) and that no users are interacting with the web interface or the API.

## The Components to Back Up

The following components are required for a complete backup:
- The MariaDB database, using `mysqldump`
- The configuration files in `/etc/corellium/`
- The image files, referenced by `imageDataPath` in `coordinator.json`
- The firmware files mounted to `/var/ipsw/`
- The LVM device volumes listed in `lvs -S 'lv_attr !~ ^t' stack-volumes`

## Restore a Server Backup

Recover the data that was backed up: 
- The MariaDB database state
- The configuration files
- The image files
- The firmware files
- The LVM device volumes

## Automated Backup Script

Corellium is in the process of creating a backup script that would safely stop all the devices and back up all the necessary components.
