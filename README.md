# Painting On Demand Web App

A User-interface Web App using technology of AI to generate various filters and print on demand

## Table of Contents

- [Features](#features)
- [Quick run](#quick-run)
- [Comfortable development](#comfortable-development)
- [Links](#links)
- [Automatic update of dependencies](#automatic-update-of-dependencies)
- [Database utils](#database-utils)
- [Tests](#tests)

## Features

- [x] Database ([typeorm](https://www.npmjs.com/package/typeorm)).
- [x] Seeding.
- [x] Config Service ([@nestjs/config](https://www.npmjs.com/package/@nestjs/config)).
- [x] Mailing ([nodemailer](https://www.npmjs.com/package/nodemailer),
      [@nestjs-modules/mailer](https://www.npmjs.com/package/@nestjs-modules/mailer)).
- [x] Sign in and sign up via email.
- [x] Social sign in (Apple, Facebook, Google, Twitter).
- [x] Admin and User roles.
- [x] I18N ([nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)).
- [x] File uploads. Support local and Amazon S3 drivers.
- [x] Swagger.
- [x] E2E and units tests.
- [x] Docker.
- [x] CI (Github Actions).

# Getting Started

These instructions will get you a copy of the project up and running on your local machine for production or development.

# Prerequisites

- [Docker (for production)](https://docs.docker.com/engine/install/ubuntu/)
- [Node.js](https://nodejs.org/)
- [React Native](https://reactnative.dev/)

# Installation

Clone the repository

```
git clone https://github.com/RidaEn-nasry/Painting-Ecom-Webapp.git
cd Painting-Ecom-Webapp
```

To deploy using docker (for production)

```
sudo bash deploy.sh (comming soon)
```

Edit Env file

```
cp env-example .env

Change DATABASE_HOST=postgres to DATABASE_HOST=localhost

Change MAIL_HOST=maildev to MAIL_HOST=localhost

```

To deploy using bash (for development)

```
# Start backend

cd backend

docker compose up -d postgres adminer maildev

npm install

npm run migration:run

npm run seed:run

npm run start:dev

# Start frontend

cd frontend

npm install

npm start

```
