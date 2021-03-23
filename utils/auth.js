const env = require('./env');

const paypalSDK = require('@paypal/checkout-server-sdk');

// Change this to `ProductionEnvironment` when it's live.
const environment = new paypalSDK.core.SandboxEnvironment(env.clientID, env.clientSecret);
const client = new paypalSDK.core.PayPalHttpClient(environment);

module.exports = {client, environment, paypalSDK};
