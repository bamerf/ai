---
title: Introduction
description: Some things to know before you get started with your on-site Ampere Altra deployment.
tags:
  - Guides
  - On-Site
  - On-Premise
  - Altra
sidebar_position: 1
---

We refer to your setup of Corellium as your domain. Your domain contains users (including the administrator user), projects, teams, and virtual devices. Your domain must be assigned a human-readable name (e.g., the name of your company) and a machine-readable name (e.g., your-company.corellium.net).

Users access Corellium through a web interface. This web interface is served on the traditional HTTP and HTTPS ports `80` and `443` on the controller node (see Server Roles in Corellium).

Although users can access the web interface directly by the IP address of the controller node, it is preferred for you to configure their DNS settings so that they may access it through the domain name (e.g., your-company.corellium.net).

Note that although we give `corellium.net` as the example suffix for your domain name, we do not and cannot publish the local, private IP address of your Corellium controller node to public DNS, so you must add that as an entry in your private DNS.

Corellium requires HTTPS. A self-signed certificate is automatically generated and must be accepted by your users.
Alternatively, you may provide a certificate and key for Corellium to use.
