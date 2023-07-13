---
title: How to Take Screenshots
description: How to take screenshots on iOS and Android devices
todo-list: TODO update the link to this paragraph when added to the site
tags:
  - iOS
  - Android
  - Screenshots
  - Console
  - Troubleshooting
---

You can simulate taking screenshots on both our iPhone and Android virtual machines.

### iPhone Screenshots

You can take screenshots utilizing [AssistiveTouch](https://www.makeuseof.com/tag/iphone-screenshot-without-button/) from the interface of the virtual machine.

Alternatively, you take a screenshot using our API with the virtual hardware buttons. Please review our helpful [Holding Down Two Virtual Hardware Buttons](https://support.corellium.com/en/articles/6342042-api-example-holding-down-two-virtual-hardware-buttons) Corellium Support article.

### Android Screenshots

1. Visit the Console screen
2. Hit `Enter`
3. Run `input keyevent KEYCODE_SYSRQ`. This will simulate a screenshot, and the image will be stored in Photos.
