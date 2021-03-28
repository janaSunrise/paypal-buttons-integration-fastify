const fastify = require('fastify')({ logger: true });

const auth = require('./utils/auth');
const env = require('./utils/env');
const createOrder = require('./utils/create_order');

// App constants
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
const template_prefix = "/templates"

// Templating
fastify.register(require('point-of-view'), {
    engine: {
        ejs: require('ejs')
    }
})

// Declare a route
fastify.get('/payments', async (req, res) => {
    return res.view(`${template_prefix}/payment.ejs`, { clientID: env.clientID, merchantID: env.merchantID });
})

fastify.get('/api/paypal/payment', async (req, res) => {
    let order;
    try {
        order = await auth.client.execute(createOrder.request);  // Execute the order, get the result from API.
    } catch (err) {
        console.error(err);
        return res.status(500);
    }

    return { result: order.result };  // Returns as the alias result with the result of the order.
})

fastify.post('/api/paypal/capture', async (req, res) => {
    let capture;
    const orderID = req.body.orderID;

    const request = new auth.paypalSDK.orders.OrdersCaptureRequest(orderID);  // Object to capture the funds from the order.
    request.headers["prefer"] = "return=representation";
    request.requestBody({});

    try {
        capture = await auth.client.execute(request);
        let captureID = capture.result.purchase_units[0].payments.captures[0].id;
    } catch (err) {
        console.error(err);
        return res.status(500);
    }

    return { result: capture.result };  // Returned as the JSON structure where result is accessed.
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
