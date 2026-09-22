# EpicExplorer

EpicExplorer is a React/Vite travel-booking frontend backed by an Express, MongoDB, Socket.IO API. The backend also contains optional Stripe, SMTP/OTP, Google OAuth, and Stellar testnet integrations.

## Requirements

- Node.js 20+ and npm
- MongoDB 6+ (local or a reachable MongoDB deployment)
- Credentials for any external flow you intend to use: SMTP, Stripe, Google OAuth, and Stellar testnet

## Fresh setup

1. Install dependencies:

   ```sh
   cd Backend && npm install
   cd ../EpicExplorerFrontend && npm install
   ```

2. Create environment files from the checked-in templates:

   ```sh
   cp Backend/.env.example Backend/.env
   cp EpicExplorerFrontend/.env.example EpicExplorerFrontend/.env
   ```

3. Set at least `MONGOURI`, `JWT_SECRET`, and `CLIENT_ORIGIN` in `Backend/.env`. Keep all private values server-side. Set `VITE_API_URL` in the frontend to the backend origin. `VITE_GOOGLE_CLIENT_ID` and `VITE_STRIPE_PUBLISHABLE_KEY` are public browser configuration values; the Stripe secret belongs only in `Backend/.env`.

## Run

Start MongoDB, then use two terminals:

```sh
cd Backend
npm run dev
```

```sh
cd EpicExplorerFrontend
npm run dev
```

The API listens on `http://localhost:5000` by default and the Vite app on `http://localhost:5173`. Verify the API with `curl http://localhost:5000/health`.

## Validation

```sh
cd Backend && npm test
cd ../EpicExplorerFrontend && npm run lint && npm run build
```

There are no migration or worker services in this repository. Mongoose creates/updates collections from the application models when the API connects; seed data must be supplied separately if a populated catalog is required. Socket.IO is part of the API process and does not require a separate worker.

## External services and limitations

- SMTP is required for signup OTP, resend OTP, and password-reset email delivery.
- Stripe requires valid server and publishable keys. Payment endpoints use fixed legacy demo amounts and still need product-specific pricing/session reconciliation before production payments.
- Stellar code targets the Stellar testnet and requires a funded admin account and secret seed. Friendbot/testnet availability is external.
- Google sign-in requires an OAuth client configured for the frontend origin.

Never commit `.env` files or credentials. Rotate any credentials that were previously present in repository history.
