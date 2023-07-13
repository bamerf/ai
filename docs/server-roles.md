---
title: Server Roles
description: There are two possible roles in Corellium - the compute and the controller.
tags:
  - Guides
  - On-Site
  - On-Premise
  - Altra
sidebar_position: 4
---

## Overview

There are two possible roles in Corellium: The **compute** role and the **controller** role. Each server (or node) can take on one or more of these two roles. Note that in some cases, one physical chassis can contain two logical servers (e.g., when we ship what is called “dual-node” servers). In this case, each logical server (or node) must be treated as an entirely separate server.

Nodes that serve the compute role are the ones that run the virtual devices. These nodes necessarily have to be Arm servers running our proprietary hypervisor.

Nodes that serve the controller role are the ones that run the front-facing Corellium software. Compute nodes report to the controller nodes, which coordinate the cluster. The controller nodes take care of the allocation and scheduling of virtual devices onto the compute nodes. They also store the virtual device firmware and serve it to compute nodes that request them. They also store custom kernels and other images uploaded by users.

## Multi-Node Setups

In the Multi-Node setup, Corellium configures one of the servers to be a controller node as well as a compute node. It comes equipped with extra disks to store the large virtual device firmware files.

The Controller Node will be your single point of contact with the Corellium software. It runs the Corellium user interface. Additionally, the Controller Node can be used to upgrade, reconfigure, or reset Corellium if necessary since it contains credentials necessary to alter the other servers.

## Single-Node Setups

In the Single-Node setup, Corellium configures the same server to be both a controller node and a compute node. When we refer to the Controller Node in the document, we are referring to that server, even though it serves both as a controller and a compute node.
