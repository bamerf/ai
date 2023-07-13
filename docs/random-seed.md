---
title: Random Seed
description: Random Seed is a security feature in iOS devices.
---

Random Seed is a security feature in iOS devices. It is a random number that is used to seed the random number generator. This prevents attackers from knowing the exact value of the random number generator.

On Corellium virtual devices, you can modify the 64-byte hex random seed provided by iBoot to the iOS kernel. This affects certain things like the `dyld` shared cache slide. By default, it is randomized during each boot.
