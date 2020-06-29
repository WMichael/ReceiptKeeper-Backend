# Receipt Keeper - Frontend
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
1. Pull this repo & the [backend](https://github.com/WMichael/ReceiptKeeper-Backend) repo.
2. Follow the steps on the [backend](https://github.com/WMichael/ReceiptKeeper-Backend) repo to setup & run the backend server.
3. Create a .env file in the root of the project, with the following variable: `REACT_APP_PORT=${PORT_OF_BACKEND}` replacing ${PORT_OF_BACKEND} with the port of the backend server.
4. Finally run `npm start`.
