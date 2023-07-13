---
title: Customizing Device IDs
description: How to customize your device's ECID and UDID.
tags:
  - device settings
  - device IDS
  - ECID
  - UDID
---

Devices, like iPhones and Androids, have various identifiers unique to that particular device. By default, we randomize these IDs when provisioning a new device. However, you can optionally specify your own.

There are two types of IDs, let's explore them both.

## Exclusive Chip Identification (ECID)

The ECID (also called the Unique Chip ID) is an identifier unique to every unit, specifically every SoC (System on a Chip). It's a 64-bit hex integer, 16 digits long. You can set a custom ECID upon creation, but you cannot change this value after the device has been created.

If you are obtaining an ECID from a real device, note that some ECIDs may have zeros appended at the end. These zeros may not be displayed in your physical device's settings.

If your custom ECID is not 16 digits, you can append enough zeros at the end to make it 16 digits long. For example, `A5F6BB0104` can become `A5F6BB0104000000`.

## Unique Device ID (UDID)

The UDID is another unique device identifier, this one specific to iPhones. You can specify a custom iPhone UDID and can adjust this value at any time.

For iPhone X and earlier, the UDID must be in a 40-character hex format, such as `cd05c79c81aa835ac87f3a9a7597f82f32fe8491`.

For iPhone XS and later, the UDID must be in an _[8-character hex]-[16-character hex]_ format, such as `00008101-45F2DEB7CCD2F856`.

If you aren't certain which format your device model requires, check the default UDID that is set upon creation. If you are using a UDID from a physical device, ensure you are using the correct UDID format for your specific iPhone model.
