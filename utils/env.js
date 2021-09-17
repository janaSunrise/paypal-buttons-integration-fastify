require('dotenv').config();

// Get the environment variables
const clientID = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
const merchantID = process.env.MERCHANT_ID;

module.exports = { clientID, clientSecret, merchantID };
