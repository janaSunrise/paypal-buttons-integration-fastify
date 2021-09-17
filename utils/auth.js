const { clientID, clientSecret } = require('./env');

const paypalSDK = require('@paypal/checkout-server-sdk');

// Change this to `ProductionEnvironment` when it's live.
const paypalEnvironment = new paypalSDK.core.SandboxEnvironment(
  clientID,
  clientSecret
);
const paypalClient = new paypalSDK.core.PayPalHttpClient(paypalEnvironment);

module.exports = { paypalClient, paypalEnvironment, paypalSDK };
