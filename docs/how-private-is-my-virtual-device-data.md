---
title: How private is my virtual device data?
description: Wondering how private your data is? In short, very.
tags:
  - Privacy
  - Troubleshooting
---

Wondering how private your data is? In short, very.

While the Corellium may collect information about you and your usage of our website and app user interface (see our [Privacy Policy](https://www.corellium.com/legal/privacy) for details), we do not collect any information from inside your virtual devices, nor from any network traffic on your project networks.

All virtual device data is encrypted at rest. Keys are used to protect your data from the cloud provider and other third party services; they are not used for any purpose outside of managing your virtual devices and and protecting them from access by third parties. Additionally, keys are not saved on the computes and are only available while the virtual machine is assigned to that compute.

We do add a daemon to Android and iOS devices called `corelliumd` that collects certain information from the VM. You can learn more about that [here](/troubleshooting-faqs/what-is-corelliumd).