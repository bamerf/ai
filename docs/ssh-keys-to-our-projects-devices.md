---
title: Add SSH Keys to Your Projects and Devices
description: How to set up SSH keys for authenticating your virtual devices.
tags:
  - Device Tree
  - Advanced Boot Options
---

Corellium supports [standard SSH keys](https://www.ssh.com/ssh/key/), which make use of public key cryptography for authentication when connecting your local computer with virtual devices.

In this article, we will show how to create new SSH key pairs using Terminal or PowerShell. We will then show you how to add public keys to your Corellium project and verify this key on new devices you create.

## Step 1: Create a New Public-Private Key Pair

We will utilize the [ssh-keygen tool](https://www.ssh.com/academy/ssh/keygen), which is installed by default on all three major operating systems, and the [Ed25519 signature scheme](https://en.wikipedia.org/wiki/EdDSA#Ed25519).

### Generate a Key Pair with Terminal

1. Open Terminal and run `ssh-keygen -t ed25519`.

   - Use the default file location `~/.ssh/id_ed25519` by pressing the return key.
   - Enter an optional passphrase for added security. In this example, we will leave the passphrase field blank.
   - Confirm your optional passphrase.

2. The terminal will show the location of your identification (private key) and public key files, the key fingerprint, and the randomart image.

3. View the contents of the file using `cat ~/.ssh/id_ed25519.pub`.

4. Copy the output to use later in Step 2. In our example, we will copy the following:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAINMptfhsX9BQ2gU8hl7I/Xoel88K25RGyW74ASgw2ABG user1@user1s-MacBook-Pro.local
```

### Generate a Key Pair with PowerShell

1. Open PowerShell and enter `cd ~/.ssh`.
2. Start the key generation process using `ssh-keygen -t ed25519`.
   - Use the default file location (_C:\Users\your-user\.ssh\id_ed25519_) by pressing the Enter key.
   - Enter an optional passphrase for added security. In this example, we will leave the passphrase field blank.
   - Confirm the passphrase.
3. PowerShell will show the location of your identification (private key) and public key files, the key fingerprint, and the randomart image.
4. View the contents of the file using `cat .\id_ed25519.pub`.
5. Copy the output, which we will use in Step 2. In our example, we will copy:

```text
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIIURGEJFM5/YvlWysZT4nSnT5bjovGK/Uj8d6fUBsBUp <user>@Lenovo-Laptop
```

## Step 2: Add Your SSH Public Key to Your Project

You can add the public key either through the web interface or using the Corellium API.

### Add Your Public Key using Our Web Interface

1. Log in to your Corellium enterprise domain as the administrator.
2. Click **ADMIN** on the top-right menu to open the Admin Panel and go to the Projects tab.

3. On the Projects page, scroll down to the "Authorized Keys" section of your preferred project and click **NEW KEY**. Leave the key type as SSH. Paste the entire output from the end of Step 1 as the key and click **CREATE**. If you don't enter an optional label, the system will use your public key comment.

### Add Your Public Key using Corellium API Calls

The [Corellium API](https://github.com/corellium/corellium-api) supports adding SSH keys to your project using the command line.

1. Install the Corellium API in the Terminal.

```bash
npm install @corellium/corellium-api
```

2. In your Node.js file, log in to your endpoint.

```js
const corellium = new Corellium({
  endpoint: 'https://app.corellium.com',
  apiToken: '<your_API_token>',
});

corellium.login();
```

3. Save your project as a variable. Customers on Individual plans only have one project named "Default Project".

```js
let project = await corellium.projectNamed('Default Project');
```

4. Add the SSH key to your project using the [project.addKey](https://corellium.github.io/corellium-api/Project.html#addKey) method. Alternatively, you can use the [Corellium.addProjectKey](https://corellium.github.io/corellium-api/Corellium.html#addProjectKey) method.

```js
await project.addKey(
  'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH9Mo34lnhVXISRum4uQIPx2VMRHQ/24Jm303N5osjde',
  'ssh',
  'myKeyLabel'
);
```

Please note: the parameter key must include the encryption algorithm for your key. For example, if `cat ~/.ssh/id_ed25519.pub` returns `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH9Mo34lnhVXISRum4uQIPx2VMRHQ/24Jm303N5osjde user1@user1-1.local` the key parameter would be `ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH9Mo34lnhVXISRum4uQIPx2VMRHQ/24Jm303N5osjde`.

## Step 3: Verify Your SSH Key on Newly Created iOS Devices

After adding you add the public key to your project, all devices you create under that project will automatically include the public key.

Keys are copied to iOS devices during creation, and you cannot add SSH keys to an existing iOS device. Keys are _not_ copied to Android devices during creation.

1. Create a new device and wait for it to boot.
2. Click on the **Settings** tab, then click **General**.

3. Scroll down to the _SSH Keys_ section and verify the information matches your public key from Step 1.

You're all set. Happy authenticating!
