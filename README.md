## node-red-contrib-jwks-to-pem

This module pulls an JWK JSON-Object from *msg.jwkurl* and convert it into an representative JS Object.

Example:
```
msg.payload = {
    keys: {
        'key-id':   '-----BEGIN PUBLIC KEY-----\n' +
                    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAk7V9nJALlyBxbU2Tq5j6\n' +
                    'eyRBHXckLAn5w2QmV9KR90bBCNqGks+aSRHG7AKrWwb1lyFAb2WuA63Me/uZY9Lb\n' +
                    '-----END PUBLIC KEY-----',
        [...]
    }
}
```
