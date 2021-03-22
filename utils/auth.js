import { clientID, clientSecret } from './env';

const checkoutNodeJsSdk = require('@paypal/checkout-server-sdk');

// Change this to `ProductionEnvironment` when it's live.
const environment = new checkoutNodeJsSdk.core.SandboxEnvironment(clientID, clientSecret);
const client = new checkoutNodeJsSdk.core.PayPalHttpClient(environment);

module.exports = {client, environment, checkoutNodeJsSdk};
