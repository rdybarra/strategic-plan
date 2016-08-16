# Strategic Plan Web App
## *A playground for Angular2*

---

This app is node (express) on the back-end, and angular2 on the front end. It's a playground where I can learn Angular2.

## Installation
1. [Install rethinkdb](https://www.rethinkdb.com/docs/install/)
2. [Install browsersync](https://www.browsersync.io/docs#installation)
3. `$ npm install` at root.
4. `$ npm install` within `client_app`.

## Usage
1. Ensure rethinkdb is running with default dev settings: `$ rethinkdb`
2. `$ npm start`
3. `% npm run start-client`

## Progress
In the progress of transition to being able to do CRUD on plan steps that wasn't persisted to actually hitting the DB. Currently you can RUD. Key todos:

1. Add ability to persist Created steps.
2. CRUD on plans.
3. Expose UI necessary to add 2nd step. The current UI lets you add steps to plans that have 0 or 2+ steps.
