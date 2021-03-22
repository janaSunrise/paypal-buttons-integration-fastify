require('dotenv');

const clientID = process.env.PAYPAL_CLIENT_ID || "PAYPAL-SANDBOX-CLIENT-ID";
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "PAYPAL-SANDBOX-CLIENT-SECRET";
const merchantID = process.env.MERCHANT_ID;

module.exports = {clientID: clientID, clientSecret: clientSecret, merchantID: merchantID};
