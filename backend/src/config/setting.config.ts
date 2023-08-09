import { registerAs } from '@nestjs/config';

export default registerAs('setting', () => ({
  paypal_client_id: process.env.PAYPAL_CLIENT_ID,
  paypal_client_secret: process.env.PAYPAL_SECRET_KEY,

  stripe_publishable_key: process.env.STRIPE_PUB_KEY,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
  stripe_webhook_endpoint_secret: process.env.STRIPE_WEBHOOK_SECRET,
}));
