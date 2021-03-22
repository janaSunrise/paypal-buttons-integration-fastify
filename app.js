const fastify = require('fastify')({ logger: true });

const auth = require('./utils/auth');
const env = require('./utils/env');
const createOrder = require('./utils/create_order');

// App constants
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;

// Templating
fastify.register(require('point-of-view'), {
  engine: {
    ejs: require('ejs')
  }
})

// Declare a route
fastify.get('/', async (req, res) => {
  return res.view('/templates/index.ejs', { clientID: env.clientID, merchantID: env.merchantID });
})

fastify.get('/paypal/payment', async (req, res) => {
  let order;
  try {
    order = await auth.client.execute(createOrder.request);
  } catch (err) {
    console.error(err);
    return res.status(500);
  }

  return { orderID: order.result.id };
})

fastify.get('/paypal/capture', async (req, res) => {
  const orderID = req.body.orderID;

  const request = new auth.checkoutNodeJsSdk.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await auth.client.execute(request);
    const captureID = capture.result.purchase_units[0].payments.captures[0].id;
  } catch (err) {
    console.error(err);
    return res.status(500);
  }

  res.status(200);
})

// Run the server
const start = async () => {
  try {
    await fastify.listen(port, host);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

// Start the server
start();
