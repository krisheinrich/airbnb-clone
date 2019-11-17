import 'dotenv/config';
import Booking from '../../models/booking';

const { STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET } = process.env;

const stripe = require('stripe')(STRIPE_SECRET_KEY);

export const post = async (req, res, next) => {

  const signature = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    res.writeHead(400, {
      'Content-Type': 'application/json'
    });

    console.error(err.message);

    res.end(JSON.stringify({ status: 'success', message: `Webhook Error: ${err.message}` }));
    return;
  }

  // Update Booking as paid after Stripe checkout
  if (event.type === 'checkout.session.completed') {
    const sessionId = event.data.object.id;

    try {
      await Booking.update({ paid: true }, { where: { sessionId } });
    } catch (err) {
      console.error(err);
    }
  }

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify({ received: true }));
};
