const NodeJWK = require('node-jwk');
const Request = require("request");

/**
 * Get JWK from URL
 * @param url
 * @return {Promise<Object>}
 */
function GetJWKFromUrl(url) {
    return new Promise(function (resolve, reject) {
        Request({
            url: url,
            json: true
        }, function (error, res, body) {
            if (!error && res.statusCode === 200) {
                resolve(NodeJWK.JWKSet.fromObject(body));
            } else {
                reject("Unable to fetch JWK: " + url);
            }
        })
    });
}

module.exports = function (RED) {
    function JWKS_TO_PEM(config) {
        RED.nodes.createNode(this, config);
        let node = this;

        node.on('input', async function (msg, send, done) {
            this.status({fill:"blue",shape:"dot",text:"loading"});

            let jwksUrl = msg['jwkurl'] || false;
            if (!jwksUrl) done(new Error('jwkurl is not defined'));

            try {
                let decodedKeys = {};
                const {keys} = await GetJWKFromUrl(jwksUrl);
                for (let key of keys) {
                    decodedKeys[key.kid] = key.key.toPublicKeyPEM()
                }
                msg.payload = {keys: decodedKeys};
                this.status({});
                send(msg);
            } catch (e) {
                this.status({fill:"red",shape:"ring",text:"Error"});
                done(e);
            }

        });
    }

    RED.nodes.registerType("jwks-to-pem", JWKS_TO_PEM);
}

