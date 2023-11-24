# Pushover API
> A package to interact with pushover

## Usage

```js
const { PushClient } = require("pushover-api")

let Credentials = {
    token: "APPLICATION TOKEN HERE",
    user: "USER KEY HERE"
}

const Client = new PushClient(Credentials)

const Data = {
    title: "Test",
    message: "Hey",
    priority: "NORMAL" // LOWEST, LOW, NORMAL, HIGH, EMERGENCY
}
const result = Client.send(Data)

if (result) {
    console.log("Sent successfully!")
}
```

Outputs 'Sent Successfully' if provided credentials are valid