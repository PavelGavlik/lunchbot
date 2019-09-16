# lunchbot

Daily menus parsed in neat form for copy-pasting to Slack. Like this:

```
$ yarn start
yarn run v1.17.3
$ ts-node src/index.ts
:whale: *Kavárna Velryba*

Květákový krém se žlutým kari
39 Kč

Pečené papriky
plněné pikantní fazolovo-zeleninovým ragú s tomatovou omáčkou
125 Kč

Steak z kuřecích prsou
s vinnou omáčkou a parmezánovým bramborem
125 Kč

Trhané vepřové maso BBQ,
bílé zelí s jalapeňos, čedar, dresink a hranolky
125 Kč

Spaghetti
se sušenými rajčaty, černými olivami, česnekem, chilli a parmezánem
125 Kč
✨  Done in 3.77s.
```

## Installation

To get this running install:
1. Node.js (check supported version(s) in [package.json](./package.json))
1. Yarn (package manager)
1. JavaScript Dependencies (by running `yarn`)

Launches the test suite in the watch mode.

## Configuration options

Edit [src/index.ts](./src/index.ts) to change what is being parsed.

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
- [coming soon](https://github.com/PavelGavlik/lunchbot/issues/3)

## Available commands

### `yarn start`

Runs the app.

### `yarn test`

Launches the test suite (powered by lightweight Mocha test runner).

### `yarn test:watch`

Launches the test suite in watch mode.
