---
title: X/Y Coordinates
description: How to figure out the X/Y coordinates of a specific element on the screen.
---

By holding down the "meta" key (⌘ on Mac, ⊞ on Windows) and moving your cursor across the device screen, you can see the X/Y coordinates of that specific position. This is useful for figuring out the coordinates of an element that you want to click on using the Corellium API.

The coordinates are shown in the bottom left corner of the screen in two formats: **Physical** which is the actual pixel position on the screen and **Normalized** which is the position of the pixel relative to the video stream. The latter is what you should use when writing your automation scripts.
