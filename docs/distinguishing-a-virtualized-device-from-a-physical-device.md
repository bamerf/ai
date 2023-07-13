---
title: Distinguishing a Virtualized Device from a Physical Device
description: Distinguishing a Virtualized Device from a Physical Device
tags:
  - iOS
  - Android
---

Our customers sometimes ask about how their scripts and apps can determine if they're running on a Corellium device.

In this article, we discuss a few methods depending on your device type.

## Checking an iOS Device from Its Command Line

All virtualized iOS devices start with `CORELLIUM`, for example, `CORELLIUM-I13PM`.

You can check the device serial number in the iOS console using the code `ioreg -w0 -l | grep IOPlatformSerialNumber`.

The response will look similar to "IOPlatformSerialNumber" = "CORELLIUM-I13PM" on virtualized iOS devices.

## Checking an iOS Device from Its Display

1. Open the Settings app and navigate to General then About.
2. Notice that the virtual devices' serial number includes "CORELLIUM".

## Checking an iOS Device from a macOS Command Line

You can also identify virtualized devices using a connected macOS computer with the following steps:

1. Go to the Connect tab and set up the VPN connection. We recommend the OpenVPN client
   [Viscosity for macOS](https://www.sparklabs.com/viscosity/).
2. Download the USBFlux dmg from the Connect tab, install the app, then start the service.
3. Install [the iMobileDevice library](https://libimobiledevice.org/) with `brew install libimobiledevice`.
4. Check the connected device's serial number using `ideviceinfo | grep ^SerialNumber`.
5. You will see responses like SerialNumber: CORELLLLIUM-I13PM in the terminal.

## Checking from an Android Device Command Line

There are at least three methods to distinguish Corelium devices using the command line.

### Android Method 1

You can determine the Android device manufacturer in the Android console using `getprop ro.product.manufacturer`. The response will be Corellium on virtualized Android devices.

### Android Method 2

A second method for Android is to search the list of installed packages for the `corellliumdhelper` package.

The command `pm list packages | grep corellium` should return `package:com.corellium.corelliumdhelper` on virtualized
devices.

### Android Method 3

A third method is to search for prop files matching the appropriate model name.

Running this command:

```bash
find . -name '*.prop' 2>/dev/null -exec grep -HIn 'Corellium Generic' '{}' ';'
```

will include the following response in the output:

```text
./system/product/etc/build.prop:8:ro.product.product.model=Corellium Generic
./system/system_ext/etc/build.prop:8:ro.product.system_ext.model=Corellium Generic
./vendor/vendor_dlkm/etc/build.prop:8:ro.product.vendor_dlkm.model=Corellium Generic
./vendor/odm_dlkm/etc/build.prop:8:ro.product.odm_dlkm.model=Corellium Generic
```

Alternatively, switching first to the superuser with `su` then running the command will return six prop files instead of four:

```text
./system/product/etc/build.prop:8:ro.product.product.model=Corellium Generic
./system/system_ext/etc/build.prop:8:ro.product.system_ext.model=Corellium Generic
./vendor/vendor_dlkm/etc/build.prop:8:ro.product.vendor_dlkm.model=Corellium Generic
./vendor/odm/etc/build.prop:8:ro.product.odm.model=Corellium Generic
./vendor/odm_dlkm/etc/build.prop:8:ro.product.odm_dlkm.model=Corellium Generic
./vendor/build.prop:8:ro.product.vendor.model=Corellium Generic
```

## Checking an Android Device from Its Display

Follow these steps to determine visually if Corellium is virtualizing an Android device:

1. Load an Android device to its home screen. We are using a Generic Android device running firmware version 12.0.0 for this example.

2. Swipe up from the bottom of the screen to open the list of apps.

3. Open the Settings app.

4. Scroll down to the bottom of the Settings menu and the "About emulated device" section.

5. Scroll down to see that the Device name is "Corellium Generic," the phone number is "+1-555-123-4567," the SIM status is "Corellium," and the Model is "Corellium Generic."
