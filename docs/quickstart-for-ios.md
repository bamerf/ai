---
title: Quickstart for iOS
description: This article demonstrates how to create an iOS device along with some basic functionalities of the device's interface.
sidebar_position: 5
---

## Introduction

Corellium supports a wide range of iOS devices, namely iPhones and iPads, which may be jailbroken or non-jailbroken. Our iOS devices are supported by a range of tools to facilitate security research and testing not possible with physical devices or emulators.

## What is Jailbreaking?

On iOS, a jailbreak is typically a third-party program that uses a string of vulnerabilities to achieve root access. But because Corellium controls the whole software stack, we don't need to use vulnerabilities to gain root access: we can simply build root access in.

This means you get reliable access to untethered jailbroken environments across all models and versions, typically within days of release, without the need to use tools that withhold vulnerabilities from the vendor.

For convenience, all our jailbroken devices come pre-installed with Cydia, a third-party app store, to enable researchers to instrument and inspect code on the device in ways that aren't possible in a non-jailbroken environment.

## Jailbroken vs Non-Jailbroken

Jailbroken devices are useful for testing applications that require root access, or for testing applications that are designed to detect jailbroken devices. Non-jailbroken devices are useful for testing applications that are designed to detect non-jailbroken devices, or for standard QA testing.

Jailbroken Corellium devices include the following features:
- Filesystem read-write support
- Relaxed Apple Mobile File Integrity, sandbox, and code-sign mitigations
- Bootstrap with various console utilities
- Substitute (tweaks) support
- SSH server support
- FRIDA support
- Cydia support

On Corellium, non-jailbroken devices may be created without the `corelliumd` agent, which you can learn more about [here](/troubleshooting-faqs/what-is-corelliumd).

## Limitations

Due to a lack of GPU (Metal) support, certain applications are not able to launch. This includes the native Maps, Watch, and Find My Friends apps. In addition, this will cause certain elements of the UI to render improperly. For example, components of the Notes and Reminders apps will not appear, and the background of the multi-tasking view may go blank.

Corellium also does not support logging into an iCloud account or downloading apps from the App Store.

The following peripherals are not currently supported for iOS:

- Cellular (calls, text messages)
- Camera
- NFC
- Bluetooth