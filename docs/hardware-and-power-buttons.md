---
title: Hardware and Power Buttons
description: Wondering what the buttons around the screen do?
sidebar_position: 6
---

## Hardware Buttons

Buttons representing the physical device's hardware buttons are displayed on the left-hand side of the device. Different device types will display different buttons, depending on what is available on the real device.

For example, older iOS devices will display a Home button to represent the physical Home button, but newer devices will not display a Home button, since the "Home" functionality became gesture-based.

Some common buttons here include volume up, volume down and keyboard toggles.

## Power Buttons

- Pause: Unlike a physical device, your virtual device can be paused. This action suspends device activity but does not shut down the device. Simply click to pause, and click again to unpause.
- Restart: The restart button is akin to rebooting a physical device. It's the same as powering the device off and on again.
- Power On / Off: Powering the virtual device off is like powering off a physical device. All applications are shut down, and information about the current state of the device is not preserved. When a device is in the "Off" state, it becomes Stored, and it no longer occupies CPU cores.

## Accessing the Android App Switcher

These instructions guide how to open the App Switcher on Android devices using the command line or mouse gestures.

### Open the App Switcher with the Command Line

Navigate to the Console tab and enter the following command:

```bash
input keyevent KEYCODE_APP_SWITCH
```

You can find more [information about keyevent commands](https://developer.android.com/reference/android/view/KeyEvent) in the Android developer documentation.

### Open the App Switcher with Mouse Gestures

1. After your device is powered on, swipe up on the home screen then open Settings.

1. In the Settings app, open System > Gestures > System Navigation > Gesture Navigation

1. Change the Gesture Navigation from the default 3-button navigation.

- With Gesture navigation, swipe up from the bottom and hold to open the App Switcher.
- With 2-button navigation, swipe up from the bottom to open the App Switcher.
