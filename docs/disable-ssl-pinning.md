---
title: Disable SSL Pinning (iOS only)
description: Use a simple API command to disable SSL pinning on iOS
tags:
  - SSL Pinning
  - API
---

Secure Socket Layering helps to protect communications from nefarious third parties.

Software engineers may need to disable SSL pinning for certain applications such as development and testing. For a more in-depth explanation, please refer to this article about [certificates and public key pinning](https://owasp.org/www-community/controls/Certificate_and_Public_Key_Pinning).

Use the Corellium API to control SSL pinning on your virtual devices.

To disable SSL pinning, use the [disableSSLPinning()](https://corellium.github.io/corellium-api/Agent.html#disableSSLPinning) method.

```js
await agent.disableSSLPinning();
```

To re-enable SSL pinning afterward, use the [enableSSLPinning()](https://corellium.github.io/corellium-api/Agent.html#enableSSLPinning) method.

```js
await agent.enableSSLPinning();
```

Alternatively, you can use the [isSSLPinningEnabled()](https://corellium.github.io/corellium-api/Agent.html#isSSLPinningEnabled) method which returns a boolean to check the current state.

```js
await agent.isSSLPinningEnabled();
```
