# Fusion

## Add Project Data

Project data is stored in this open repo as JSON.

Add content via pull-request here:

```
/src/projects/mainnet.ts
```

## Devnet Testing

- You will still have to take the following steps to get an option in your wallet that will show up

1. Make sure your wallet has devnet SOL (got to trade.PsyOptions faucet page to claim some, be sure to set the network to devnet)
2. Claim some PSY from that faucet page as well
3. [OPTIONAL] Head to [initialize market page](https://trade.psyoptions.io/#/initialize-market). Again **be sure to change the network to devnet** and create whatever style option you want
4. Head to the [mint page](https://trade.psyoptions.io/#/mint). Again **be sure to change the network to devnet** and fill in the SAME EXACT parameters you had before. This will fill the option market key at the top and allow you to mint options.
   - You can use the 12/30/2022 $1 PSY CALL market with address `Ap8vsZspKn3oGBhf166oJR5pcMcg7JS2b7TAh1yfSmg6`
5. After minting the options go back to fusion and connect your wallet.

## Development

### Install

`git clone git@github.com:mithraiclabs/psyoptions-management.git`

`yarn install`

### Run

`yarn start`

### DevTools

The project uses recoil and some experimental dev tools.

`src/components/DevTools`

In the browser, you can use these commands:

- changeMonitorKey `ctrl-m`
- changePositionKey `ctrl-q`
- toggleVisibilityKey `ctrl-h`

The console and dock monitor will update after recoil state changes
