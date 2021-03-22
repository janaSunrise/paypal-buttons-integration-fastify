const fastify = require('fastify')({ logger: true });
const env = require('./utils/env');

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
