---
title: What is corelliumd?
description: Learn about the corelliumd daemon.
---

Corellium adds a daemon called `corelliumd` to Android and iOS devices. It also adds a helper application called `com.corellium.CorelliumdHelper` to Android devices.

The `corelliumd` daemon enables handy utilities such as keyboard passthrough for virtual devices, meaning you can type on your host keyboard and have it appear on the virtual device

These daemons also collect certain information from the VM to enable functionality for the Apps and Files features. This information is only used in Apps and Files and is not transmitted to Corellium.

iOS devices can be created without the `corelliumd` daemon, but Apps and Files will not be available on such devices.