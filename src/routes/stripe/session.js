import 'dotenv/config';

const { BASE_URL, STRIPE_SECRET_KEY, STRIPE_PUBLIC_KEY } = process.env;

export const post = async (req, res, next) => {

  const { amount } = req.body;

  const redirectUrl = `${BASE_URL}/bookings`;

  const stripe = require('stripe')(STRIPE_SECRET_KEY);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      name: 'Booking house on Airbnb clone',
      amount: 100 * amount,
      currency: 'usd',
      quantity: 1
    }],
    success_url: redirectUrl,
    cancel_url: redirectUrl
  });

  res.writeHead(200, {
    'Content-Type': 'application/json'
  });

  res.end(JSON.stringify({
    status: 'success',
    sessionId: session.id,
    stripePublicKey: STRIPE_PUBLIC_KEY
  }));
};
