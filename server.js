/* =============================================
   Mes Amis Café — Backend Server
   Node + Express + Square SDK
   Handles: POST /api/checkout
   Run: node server.js
   ============================================= */

'use strict';

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const { Client, Environment } = require('square');

const app  = express();
const PORT = process.env.PORT || 3000;

/* ── Square client ── */
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox,   // change to Environment.Production when going live
});

/* ── Middleware ── */
app.use(express.json());
app.use(cors({
  // Allow your local dev server and eventually your live domain
  origin: [
    'https://127.0.0.1:8443',
    'https://localhost:8443',
    // 'https://yourdomain.com',  // add before launch
  ],
}));

/* ── POST /api/checkout ──────────────────────────
   Body: {
     sourceId: string,        // Square card token from browser
     cart: [{id, name, price, qty}],
     contact: {firstName, lastName, email, phone}
   }
   Returns: { orderId, paymentId, status }
   ─────────────────────────────────────────────── */
app.post('/api/checkout', async (req, res) => {
  const { sourceId, cart, contact } = req.body;

  if (!sourceId || !Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: 'Missing sourceId or cart.' });
  }

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
    console.log(`[Server] Payment ${payment.status} — Order ${order.id}`);

    res.json({ orderId: order.id, paymentId: payment.id, status: payment.status });

  } catch (err) {
    console.error('[Server] Square error:', err);
    const detail = err.result?.errors?.[0]?.detail || err.message || 'Payment failed.';
    res.status(500).json({ error: detail });
  }
});

/* ── Health check ── */
app.get('/api/health', (_, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Mes Amis backend running on http://localhost:${PORT}`);
});
