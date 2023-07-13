---
title: Snapshots
description: Save, recover, and clone your virtual device using snapshots.
---

_Note: In this article, we will use the jailbroken iPhone 6 that was created in our Quickstart for iOS tutorial._

## What are Snapshots?

Snapshots give you the ability to save the state of a device and then restore or clone that state at a moment’s notice. Save valuable setup time by instantly returning to a previously saved state, creating clones to run multiple tests from the same starting environment, or providing all students in a virtual classroom an identical starting VM.

In comparison to recreating a test environment on a real device, Snapshots can significantly reduce the time to reproduce bugs or repeat tests. You can take **up to 5 snapshots** per virtual device.

Every virtual device automatically captures a new snapshot right after the initial creation, providing a quick and easy way to revert to that fresh image. You can take up to five snapshots per virtual device.

## Taking a Snapshot

This tutorial will demonstrate Snapshots by creating and restoring them.

1. Go to the device created in the Quickstart for iOS tutorial.

2. Power down the device by clicking the power symbol.

3. Take a snapshot by opening the Snapshot menu and then clicking TAKE NEW SNAPSHOT.

4. Now we have saved a snapshot let's break the device. Click on CONSOLE.

5. Power the device back on by clicking the power button.

6. In the Console, push return to display sh-5.0 #, type `rm -rf /etc`, then push return again.

7. Now restart the device.

8. The device will fail to boot, and the console will periodically display `wdog restart`. This will validate the device is broken as it cannot log in normally.

## Restoring a Snapshot

1. Now we are going to restore the snapshot. Go back to the Snapshots page.

2. Click "RESTORE" next to "Snapshot #1". The device will be restored. You will be able to validate the device is working by booting up to the home screen as usual.

## Cloning a Snapshot

To clone a snapshot into a new device, simply go to your desired snapshot and press the "Clone" button. If you're an Enterprise customer, this will prompt you to select a project in which to create the new device.

## Other Notes

You must turn off virtual Android devices to take a snapshot. If you are trying to take a snapshot for an Android device, make sure the device is in the Off state first.
