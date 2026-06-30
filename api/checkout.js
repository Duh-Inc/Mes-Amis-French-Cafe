/* =============================================
   Mes Amis Café — Vercel Serverless Function
   api/checkout.js
   ============================================= */

const { Client, Environment } = require('square');

module.exports = async function (req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { sourceId, cart, contact } = req.body;

  if (!sourceId || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Missing sourceId or cart.' });
  }

  const squareClient = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: Environment.Sandbox, // change to Environment.Production when going live
  });

  const locationId = process.env.SQUARE_LOCATION_ID;

  try {
    /* 1. Create order */
    const { result: orderResult } = await squareClient.ordersApi.createOrder({
      idempotencyKey: `order-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      order: {
        locationId,
        lineItems: cart.map(item => ({
          name:     item.name,
          quantity: String(item.qty),
          basePriceMoney: {
            amount:   BigInt(Math.round(item.price * 100)),
            currency: 'USD',
          },
        })),
        metadata: {
          customerName:  `${contact?.firstName || ''} ${contact?.lastName || ''}`.trim(),
          customerEmail: contact?.email  || '',
          customerPhone: contact?.phone  || '',
        },
      },
    });

    const order = orderResult.order;

    /* 2. Process payment */
    const { result: paymentResult } = await squareClient.paymentsApi.createPayment({
      idempotencyKey:    `pay-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      sourceId,
      orderId:           order.id,
      locationId,
      amountMoney: {
        amount:   order.totalMoney.amount,
        currency: 'USD',
      },
      buyerEmailAddress: contact?.email,
      note: `Mes Amis Café — ${contact?.firstName || 'Customer'}`,
    });

    const payment = paymentResult.payment;
    console.log(`[Vercel] Payment ${payment.status} — Order ${order.id}`);

    res.status(200).json({
      orderId:   order.id,
      paymentId: payment.id,
      status:    payment.status,
    });

  } catch (err) {
    console.error('[Vercel] Square error:', err);
    const detail = err.result?.errors?.[0]?.detail || err.message || 'Payment failed.';
    res.status(500).json({ error: detail });
  }
};
