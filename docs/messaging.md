---
title: Messaging
description: Receive simulated SMS messages on your virtual iOS device.
tags:
  - Integrated tools
  - Messaging
  - iOS
---

Corellium lets you formulate simulated text messages to your virtual iOS device. You can construct a standard simulated SMS, or you can build with Raw Hex data.

## Standard Incoming SMS Text

1. Open the **Messaging** tab to send messages to your iPhone.
2. Enter the phone number and message then click **SEND**. The number _must_ be formatted like this: `+1 234 567 890`. The message text be anything!
3. You should see an "incoming SMS text" notification. Click on the notification to open the Messages app.

## SMS Text using Raw Hex Data

### Formatting the Raw Hex Data

In our Messaging feature, we support sending raw messages - hex data that will be directly injected into `+[CTMMSEncoder decodeSmsFromData:]` to produce a `CTMessage` object.

The format for this hex data follows this format:

### Example Data

| Data                                                                                                           | Significance                                                                     |
| -------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| 04                                                                                                             | "4" Size of timestamp integer in bytes                                           |
| 61 b6 c3 23                                                                                                    | "1639367459" big-endian integer timestamp encoded using time interval since 1970 |
| 2b 31 32 33 34 35 36 37 38 39 30 00                                                                            | "+1234567890" null-terminated UTF8 encoded phone number                          |
| 48 65 6c 6c 6f 20 57 6f 72 6c 64 21 00                                                                         | "Hello World!" null-terminated UTF8 encoded message                              |
| 00                                                                                                             | "" null-terminated UTF8 encoded service number                                   |
| 35 43 31 35 46 37 34 35 2d 44 42 37 43 2d 34 35 38 42 2d 42 39 46 46 2d 33 30 32 36 32 44 33 39 39 31 33 33 00 | "5C15F745-DB7C-458B-B9FF-30262D399133" null-terminated UTF8 encoded UUID         |
| 80                                                                                                             | Flags: 0x80 signifies the last field                                             |

## Sending a Raw Hex Message

1. Open the Messaging tab and click the link to "Send raw binary data instead."
2. Enter the raw hex and click SEND. In our example, we will use the following (including the spaces):

```text
04 61 b6 c3 23 2b 31 32 33 34 35 36 37 38 39 30 00 48 65 6c 6c 6f 20 57 6f 72 6c 64 21 00 00 35 43 31 35 46 37 34 35 2d 44 42 37 43 2d 34 35 38 42 2d 42 39 46 46 2d 33 30 32 36 32 44 33 39 39 31 33 33 00 80
```

3. You should see an immediate confirmation that the message was sent. A few seconds later, you should also see an incoming message notification.
4. Click on the notification or open the Messages app to read the SMS.
