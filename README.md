# lunchbot

Daily menus delivered to your Slack channel

## Installation

To get this running install:
1. Node.js (check supported version(s) in [package.json](./package.json))
1. Yarn (package manager)
1. JavaScript Dependencies (by running `yarn`)

Launches the test suite in the watch mode.

## Configuration options

#### Velryba
- no configuration necessary

#### Zomato
- `apiKey: string`
  - Zomato API key, can be obtained at https://developers.zomato.com/api
- `id: number`
  - Restautant ID, can be obtained from restautant page ([sample](https://www.zomato.com/la-loca#denni_menu)) source code by searching for RES_ID
- `name: string`
  - Restaurant name
- `emoji?: string`
  - optional Slack emoji, defaults to "knife_fork_plate"

#### Slack
- coming soon

## Available commands

### `yarn start`

Runs the app.

### `yarn test`

Launches the test suite (powered by lightweight Mocha test runner).

### `yarn test:watch`

Launches the test suite in watch mode.
