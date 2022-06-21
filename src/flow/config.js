const fcl = require("@onflow/fcl");

fcl.config({
    "app.detail.title": "Samplers", // this adds a custom name to our wallet
    "app.detail.icon": "https://res.cloudinary.com/do4mactw0/image/upload/v1655577809/Logo_m6ofww.png", // this adds a custom image to our wallet
    "accessNode.api": process.env.NEXT_PUBLIC_ACCESS_NODE, // this is for the local emulator
    "discovery.wallet": process.env.NEXT_PUBLIC_WALLET, // this is for the local dev wallet
    "0xDeployer": process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, // this auto configures `0xDeployer` to be replaced by the address in txs and scripts
    "0xCORE": process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    })