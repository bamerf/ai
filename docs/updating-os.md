---
title: Updating your OS version
description: Learn how to update your OS version to the latest available version.
tags:
  - Update
  - iOS
---

## Overview

On a Corellium iOS device, it is possible to update the iOS version to a later available version. This is useful for testing how your application behaves on a newer version of the OS, or for testing how your application behaves when the OS is updated. For example, if you have an virtual iPhone 12 running iOS 14.1, you'll be able to upgrade to iOS 15.1. This includes support for installing pre-release (beta) versions.

**Note: this feature is currently in beta and only available to select users.**

## Updating your OS version

### Using the Corellium UI

To update your OS version, you will need to go to `Settings > General` in the Corellium UI. Scroll down to the section titled "Update iOS Version".

From here, select a version to upgrade to, then press "Save changes"

You'll be presented with a confirmation dialog. Press "Update" to continue.

Wait for the device to upgrade and reboot.

You'll be presented with a confirmation once the device has finished upgrading. Here, you'll see the device version has been updated.

Close the confirmation dialog and examine the toolbar to see the new version.

### Using the Corellium API / SDK

To update your OS version, you can use one of the following endpoints from our various APIs and SDKs:

- REST API: [/v1/instances/{instanceId}/upgrade](https://app.corellium.com/api/docs#post-/v1/instances/-instanceId-/upgrade)
- JS API (corellium): [instance.upgrade(options)](https://corellium.github.io/corellium-api/Instance.html#upgrade)
- JS API (client): [v1UpgradeInstance(instanceId, instanceUpgradeBody)](https://github.com/corellium/js-client-api/blob/master/docs/CorelliumApi.md#v1UpgradeInstance)
- Python: [v1_upgrade_instance(instance_id, instance_upgrade_body)](https://github.com/corellium/python-api-client/blob/master/docs/CorelliumApi.md#v1_upgrade_instance)
- CLI: `corellium instance upgrade`

### Example JavaScript

Here is an example of how to update an instance using the JavaScript API:

```js
// NODE_TLS_REJECT_UNAUTHORIZED=0
var { ApiClient, CorelliumApi } = require('@corellium/client-api');

var defaultClient = new ApiClient('https://app.corellium.co/api');
// Configure Bearer (ApiToken or JWT) access token for authorization: BearerAuth
var BearerAuth = defaultClient.authentications['BearerAuth'];
BearerAuth.accessToken = '[access_token]';
// BearerAuth.accessToken = process.env.CORELLIUM_API_ACCESS_TOKEN;

var api = new CorelliumApi(defaultClient);

// var args = process.argv.slice(2);
var instanceId = '[instance_id]'; // args[0]
var os = '16.1'; // args[1]
var osbuild = '20B79'; // args[2]

var instanceUpgradeBody = {
  os,
  osbuild,
};

api.v1UpgradeInstance(instanceId, instanceUpgradeBody).then(
  () => {
    console.log('API called successfully.');
  },
  (error) => {
    console.error(error);
  }
);
```

### Example Python

Here is an example of how to update an instance using the Python API:

```python
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

            api_response = await api_instance.v1_upgrade_instance(instance_id, {
                'os': '16.1',
                'osbuild': '20B79'
            })
            print(api_response)
        except ApiException as e:
            print("Exception when calling CorelliumApi->v1_upgrade_instance: %s\n" % e)

asyncio.run(main())
```

## Notes

- If you're on an on-site instance, the relevant IPSWs will need to be sourced on a network-enabled device, then added to your on-site instance prior to updating. You can learn more about this process [here](/getting-started/onsite-setup/onsite-custom-ipsw).
- Updating an iOS device only works via the "restore" process - not "over the air" (OTA) updates.
- When an iOS device is updated, the stock Apple apps (Mail, Reminders, etc.) are automatically scheduled for an update due to a conflict in their current app signatures and those stored in the Trust Cache. Until the update is complete, they are marked as invalidated by iOS. This is a normal process and does not affect the functionality of the device, however it does mean you will need an internet connection to update the apps.
- Application binaries can not be restored because they require Apple account — same as all Corellium virtual devices, there's no App Store access so you will need to source application binaries manually.
