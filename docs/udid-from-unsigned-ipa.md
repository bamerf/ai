---
title: Finding Your UDID from an Unsigned IPA
description: Let's find a UDID!
tags:
  - Guides
  - Unsigned IPA
  - IPA
  - UDID
---

To find the UDID from a signed IPA, you can use the script below (for macOS).

## Instructions

Simply put your IPA somewhere on your local disk, open your Terminal application, and execute the script to extract the UDID.
```bash
./get_udid.sh /path/to/application.ipa
```
## Script

[Download](/files/get_udid.sh)

`get_udid.sh`
```bash
#!/bin/bash
IPA=$1
PROVISION=$(unzip -Z1 "${IPA}" | grep embedded.mobileprovision)
if [ -z "${PROVISION}" ]
then
echo "[!] unable to find provisioning profile"
exit 1
fi
echo "[+] found provisioning profile at ${PROVISION}"
unzip -p "${IPA}" "${PROVISION}" > /tmp/embedded.mobileprovision
echo "[+] UDIDs:"
awk '/ProvisionedDevice/, /\/array/' /tmp/embedded.mobileprovision | awk -F'<string>|<\/string>' '$0=$2'
rm /tmp/embedded.mobileprovision
```

