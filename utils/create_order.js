import { checkoutNodeJsSdk } from './auth';

const request = new checkoutNodeJsSdk.orders.OrdersCreateRequest();
request.headers["prefer"] = "return=representation";
request.requestBody({
    intent: 'CAPTURE',
    application_context: {
        cancel_url: "https://example.com/cancel",
        return_url: "https://example.com/return"
    },
    purchase_units: [{
        reference_id: "dummy_ref_id__1",
        amount: {
            currency_code: 'USD',
            value: '1.00'
        }
    }]
});

module.exports = {request};
