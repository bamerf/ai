---
title: Trust Cache
description: How to configure and use the trust cache.
tags:
  - Trust Cache
  - Advanced Boot Options
---

A trust cache is a collection of hashes for known Apple system binaries. It's designed to prevent binaries that aren't signed by Apple from running for security purposes.

When your iOS device is non-jailbroken, certain binaries can still be run, even if they are not signed by Apple. To modify the trust cache, simply head to Settings and add your binaries to the appropriate text field.

Multiple hashes are delimited by newlines.

To find the code directory hash of a binary, use:

```bash
codesign -dvvv <binary>
```
