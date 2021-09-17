const fastify = require('fastify')({ logger: true });

const { paypalClient, paypalSDK } = require('./utils/auth');
const { clientID, merchantID } = require('./utils/env');
const createOrder = require('./utils/createOrder');

// App constants
const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;
const templatePrefix = '/templates';

// Templating
fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  }
});

// Routes
fastify.get('/payments', async (req, res) => {
  return res.view(`${templatePrefix}/payment.ejs`, {
    clientID: clientID,
    merchantID: merchantID
  });
});

fastify.get('/api/paypal/payment', async (req, res) => {
  let order;

  try {
    // Execute the order, get the result from API.
    order = await paypalClient.execute(createOrder.request);
  } catch (err) {
    console.error(err);
    return res.status(500);
  }

  // Returns as the alias result with the result of the order.
  return { result: order.result };
});

fastify.post('/api/paypal/capture', async (req, res) => {
  let capture;

  // Get the Order ID from the request body
  const orderID = req.body.orderID;

  // Object to capture the funds from the order.
  const request = new paypalSDK.orders.OrdersCaptureRequest(orderID);
  request.headers['prefer'] = 'return=representation';
  request.requestBody({});

  try {
    capture = await paypalClient.execute(request);
    let captureID = capture.result.purchase_units[0].payments.captures[0].id;
  } catch (err) {
    console.error(err);
    return res.status(500);
  }

  // Returned as the JSON structure where result is accessed.
  return { result: capture.result };
});

// Run the server
const start = async () => {
  try {
    await fastify.listen(port, host);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

// Start the server
start();
