---
title: Type and Tap on Virtual Devices
description: Learn how to type and tap on the device interface.
sidebar_position: 7
---

Typing and tapping on the virtual device's interface is easy.

## Enable the Corellium Agent

Corellium virtual devices generally include a background agent that allows for keyboard passthrough.

- On jailbroken iOS devices, the agent is automatically included.

- On non-jailbroken iOS devices, during the initial device creation, _leave the option enabled_ to install the agent.

## Use the Web Interface

When using the Corellium web interface, your local mouse and keyboard will automatically be passed through to the virtual device.

Simply use your mouse to click on the iOS field then start typing on your keyboard.

## Use the API

The Corellium REST API includes [an option for providing input to a virtual device] (https://app.corellium.com/api/docs#post-/v1/instances/-instanceId-/input).

You will need to include an instance ID, which you can find in the URL on the web interface, and a JSON request body.

Under the Examples dropdown, you can see how to:

1. Touch for 100ms
2. Swipe with one finger
3. Swipe with two fingers
4. Type a string of characters
5. Touch, wait, then type

For example, to input a string of characters, use the following JSON request body:

```js
[
  {
    text: 'Hello, world',
  },
];
```
