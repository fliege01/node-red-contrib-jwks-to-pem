require("should");
const helper = require("node-red-node-test-helper");
const jwks2pem_node = require("../jwks-to-pem.js");

describe('jwks-to-pem Node', function () {

    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function (done) {
        helper.unload();
        helper.stopServer(done);
    });

    it('should be loaded', function (done) {
        let flow = [{id: "n1", type: "jwks-to-pem", name: "jwks-to-pem"}];
        helper.load(jwks2pem_node, flow, function () {
            let n1 = helper.getNode("n1");
            try {
                n1.should.have.property('name', 'jwks-to-pem');
                done();
            } catch (err) {
                done(err);
            }
        });
    });

    it('should make payload lower case', function (done) {
        this.timeout(5000);
        let flow = [{id: "n1", type: "jwks-to-pem", name: "jwks-to-pem", wires: [["n2"]]}, {id: "n2", type: "helper"}];
        helper.load(jwks2pem_node, flow, function () {
            const n1 = helper.getNode("n1");
            const n2 = helper.getNode("n2");
            n2.on("input", function (msg) {
                msg.should.have.property('payload');
                done();
            });
            n1.receive({jwkurl: 'https://gist.githubusercontent.com/fliege01/b41fc28ec236a21456f711599e46fc8c/raw/f8c24a1eff0882546fbc017dfe7cc4438c5e5050/jwks.json'});
        });
    });
});