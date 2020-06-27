# Receipt Keeper - Backend
Web application used for tracking receipts. Currently deployed on [Heroku](https://receiptkeeper1.herokuapp.com/).

## Current features
* Add, Delete & Update receipts.

## Upcoming features
* User authentication with OAuth.

## Stack
* ReactJS
* Express
* NodeJS

## How to run locally
1. Pull this repo & the [frontend](https://github.com/WMichael/ReceiptKeeper-Frontend) repo.
2. Create a .env file in the root of the project, with the following variables: `PORT=${PORT}
DB=${DB_URL}
` replacing ${PORT} with the port you want to run on & ${DB_URL} with the Mongo DB you want to connect to.
3. Start the server by running `npm run dev`.
4. Follow the steps on the [frontend](https://github.com/WMichael/ReceiptKeeper-Frontend) repo to start the frontend.

