---
title: Restoring a physical device to a Corellium virtual device
description: Learn how to back up and restore a physical device to a Corellium virtual device.
tags:
  - iOS
  - Restore
  - Backup
---

## Overview

On a Corellium virtual device, you can restore a backup of a physical device. This is useful for bringing a physical device into the virtual world for testing and analysis without risking the physical device.

**Note: this feature is currently in beta and only available to select users.**

## Creating a backup

You can create a backup of a physical device using a variety of tools, including:

- [MacOS](https://support.apple.com/en-gb/HT211229)
- [iTunes](https://support.apple.com/en-gb/HT212156)
- `idevicebackup2` by [`libimobiledevice`](https://github.com/libimobiledevice/libimobiledevice), an open-source tool for backing up and restoring iOS devices.

For example, the following code shows how to create a backup using `idevicebackup2` on MacOS using [Homebrew](https://brew.sh/):

```bash
# Install idevicebackup2
brew install libimobiledevice

# Ensure idevicebackup2 is functioning
idevicebackup2 -v

# Enable backup encryption
idevicebackup2 encryption on "[PASSWORD]"

# Create a new backup. This will create a folder for the iPhone UDID.
idevicebackup2 backup --full
```

<aside>Ensure you enable backup encryption. Without encryption, the backup won't include some sensitive user data.</aside>

## Restoring a backup

### Using the Corellium UI

To restore a physical backup, you will need to go to `Settings > General` in the Corellium UI. Scroll down to the section titled "Restore a VM".

Drag and drop your backup file into the box, then press "Save changes".

You'll be presented with a confirmation dialog. Press "Restore" to continue.

Wait for the device to upgrade and reboot.

You'll be presented with a confirmation once the device has finished restoring.

### Using the REST API

Use the following endpoints from our REST API:

- Upload a backup image: [/v1/images](https://app.corellium.com/api/docs#post-/v1/images)
- Restore the backup: [/v1/instances/{instanceId}/restoreBackup](https://app.corellium.com/api/docs#post-/v1/instances/-instanceId-/restoreBackup)

### Using the JavaScript API (legacy)

Use the following methods from our old JavaScript API:

- Upload a backup image: [uploadImage(type, filePath, name, progress)](https://corellium.github.io/corellium-api/Instance.html#uploadImage)
- Restore the backup: [restoreBackup()](https://corellium.github.io/corellium-api/Instance.html#restoreBackup)

### Using the new JavaScript API

Use the following methods from our new JavaScript API:

- Upload a backup image: [v1CreateImage(type, encoding, opts)](https://github.com/corellium/js-client-api/blob/master/docs/CorelliumApi.md#v1createimage)
- Restore the backup: [v1RestoreBackup(instanceId)](https://github.com/corellium/js-client-api/blob/master/docs/CorelliumApi.md#v1RestoreBackup)

Here is an example that shows how to use the new JavaScript API to create a backup and restore it to an instance:

```js
// NODE_TLS_REJECT_UNAUTHORIZED=0
var fs = require('fs');
var { ApiClient, CorelliumApi } = require('@corellium/client-api');
const path = require('path');

var defaultClient = new ApiClient('https://app.corellium.co/api');
// Configure Bearer (ApiToken or JWT) access token for authorization: BearerAuth
var BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = '[access_token]';
// process.env.CORELLIUM_API_ACCESS_TOKEN;

var api = new CorelliumApi(defaultClient);

// var args = process.argv.slice(2);
var instance = '[instance_id]'; // args[0]

var backup = path.join(__dirname, 'backup.zip');

fs.readFile(backup, (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  var opts = {
    encapsulated: false,
    instance,
    name: 'backup.zip',
    file: data,
  };

  api
    .v1CreateImage('backup', 'plain', opts)
    .then((image) => {
      api
        .v1RestoreBackup(instance)
        .then(() => {
          console.log('Done');
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
});
```

### Using the Python API

Use the following methods from our Python API:

- Upload a backup image: [v1_create_image(type, encoding, encapsulated=encapsulated, name=name, project=project, instance=instance, file=file)](https://github.com/corellium/python-api-client/blob/master/docs/CorelliumApi.md#v1_create_image)
- Restore the backup: [v1_restore_backup(instance_id)](https://github.com/corellium/python-api-client/blob/master/docs/CorelliumApi.md#v1_restore_backup)

Here is an example that shows how to use the Python API to create a backup and restore it to an instance:

```python
import os
import asyncio
import corellium_api
from corellium_api.rest import ApiException

# The client must configure the authentication and authorization parameters
# in accordance with the API server security policy.
# Examples for each auth method are provided below, use the example that
# satisfies your auth use case.

# Configure Bearer authorization (ApiToken or JWT): BearerAuth
configuration = corellium_api.Configuration(
    host = "https://app.corellium.com/api"
    ssl_ca_cert = "./ca_cert.cer"
)
configuration.access_token = '[access_token]'

async def main():
    # Enter a context with an instance of the API client
    async with corellium_api.ApiClient(configuration) as api_client:
        # Create an instance of the API class
        api_instance = corellium_api.CorelliumApi(api_client)
        try:
            instance_id = '[instance_id]'

            image = await api_instance.v1_create_image('backup', 'plain', encapsulated='false',
              name='backup.zip', instance=instance_id, file='../backup.zip')

            print(f'Uploaded backup image ${image.id}')

            await api_instance.v1_restore_backup(instance_id)
            print(f'Backup restore successful')
        except ApiException as e:
            print('Exception when calling CorelliumApi->v1_restore_backup: %s\n' % e)

asyncio.run(main())
```

### Using the CLI

Use the following commands from our CLI:

- Upload a backup image: `corellium image create`
- Restore the backup: `corellium instance restore-backup`

### Using `idevicebackup2` and USBFlux

After installing [USBFlux](/features/connect/usbflux) and synthetically connecting your virtual device, you can use the following code to restore a backup:

```bash
# Check that the virtual device is connected.
idevice id

# Restore backup to Virtual Device
idevicebackup2 \
  --password "[PASSWORD]" \
  --remove \
  --system \
  --settings \
  -s '[IPHONE UDID]' \
  -u '[VM UDID]' \
  restore
```

Following this, the virtual device will reboot and show a progress bar under Apple logo restoring files, then boot to SpringBoard.

## Interoperability

If you're restoring a backup from a physical device to a Corellium virtual device on your own, you can use a combination of backup and restore methods. The following table shows the different combinations and the expected result:

| Backup Method    | Restore Method   | Result                                                                                    |
| ---------------- | ---------------- | ----------------------------------------------------------------------------------------- |
| iTunes           | iTunes           | Everything is restored as expected                                                        |
| iTunes           | `idevicebackup2` | Everything is restored as expected, assuming flags include `--remove --system --settings` |
| `idevicebackup2` | iTunes           | Unknown                                                                                   |
| `idevicebackup2` | `idevicebackup2` | Everything is restored as expected, assuming flags include `--remove --system --settings` |

<aside>For device restores using `idevicebackup2`, the flags `--remove --system --settings` are required to restore everything. If you don't include these flags, only a partial restore will occur.</aside>

## Notes

- If you're on an on-site instance, the relevant IPSWs will need to be sourced on a network-enabled device, then added to your on-site instance prior to updating. You can learn more about this process [here](/getting-started/onsite-setup/onsite-custom-ipsw).
- Updating an iOS device only works via the "restore" process - not "over the air" (OTA) updates.
- When an iOS device is updated, the stock Apple apps (Mail, Reminders, etc.) are automatically scheduled for an update due to a conflict in their current app signatures and those stored in the Trust Cache. Until the update is complete, they are marked as invalidated by iOS. This is a normal process and does not affect the functionality of the device, however it does mean you will need an internet connection to update the apps.
- We do not support backups from iCloud.
