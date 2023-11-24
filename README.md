# Pushover API
> A package to interact with pushover

## Usage

```js
const { PushClient } = require("pushover-api")

let Credentials = {
    token: "APPLICATION TOKEN HERE",
    user: "USER TOKEN HERE"
}

const Client = new PushClient(Credentials)

async function sendMessage(message) {
    const Data = {
        title: "Notifications Test",
        message: message,

        priority: "NORMAL"
    }
    const result = await Client.send(Data)
    
    if ((await result) == true) {
        console.log("Sent successfully!")
    }
}

sendMessage("hii this should work!")
```

Outputs 'Sent Successfully' if provided credentials are valid

## License

MIT License

Copyright (c) 2023 Arthur

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.