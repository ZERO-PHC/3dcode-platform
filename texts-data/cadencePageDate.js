import { SamplersContract } from "../src/codeSnippets/SamplersContract"

export const CadencePageData = [
    {
        "title": "Welcome",
        "subtitle": "Samplers Contract deployment guide",
        "content": "Our goal is not to teach you all the details of building this smart contract, it is very simple and beginner level. On this page we will show you how to deploy it for the next FCL teachings",
        "content2": "If you want to learn about Cadence and Smart Contracts, we recommend that you join the next Emerald Academy Bootcamp"
    },
    {
        "title": "Step 1",
        "subtitle": "Create a new folder inside your preference path named /samplersContract",
        "subtitle2": "Open it in your IDE",
        "path": "In your terminal use the follow command inside the path /samplersContract",
        "footer": "This command will create a flow.json file inside your folder! Live it there, we will change it soon",
        "codeSnippet": ` flow init `
    },
    {
        "title": "Step 2",
        "subtitle": "Inside of your folder /samplersContract create a new file named Samplers.cdc",
        "span": "If you have Cadence Smart Contracts knowlodge feel free to change the contract information and customize with your project information",
        "path": "Inside of /samplersContract/Samplers.cdc paste the Samplers Contract code bellow:",
        "codeSnippet": `${SamplersContract}`
    },
    {
        "title": "Step 3",
        "subtitle": "Let's create an account that we will use to deploy the Smart Contract",
        "subtitle2": "Through the flow cli in your terminal we will generate two keys:",
        "subtitle3": "One Private Key and one Public Key",
        "content": "if you do not know what are these keys you can learn about <a>here</a>",
        "path": "In your terminal digit the command bellow:",
        "footer": "Save the keys for a moment, we will need them in the next steps.",
        "codeSnippet": `flow keys generate`
    },
    {
        "title": "Step 4",
        "subtitle": "Go to the Flow Faucet Testnet website and past your Public Key that you just generated",
        "subtitle2": "You can use the pattern Signature Algorithm and Hash Algorithm",
        "subtitle3": "Click in create Account and copy the Address that will be generated",
    },
    {
        "title": "Step 5",
        "subtitle": "Get back to your IDE and open the file flow.json",
        "subtitle2": "We need to add the account information to the flow CLI recognize and access our account to deploy the smart contract",
        "path": "Inside the json add the testnet-account information like bellow:",
        "codeSnippet": `"accounts": {
            "emulator-account": {
                "address": "f8d6e0586b0a20c7",
                "key": "7bcbfcbdef659560a433b78c1022b8c1490272ff11f7d2b7b01c4bf983dfa51e"
            },
            "testnet-account": {
                "address": "PASTE YOUR ADDRESS HERE!",
                "key": {
                    "type": "hex",
                    "index": 0,
                    "signatureAlgorithm": "ECDSA_P256k",
                    "hashAlgorithm": "SHA3_256",
                    "privateKey": "PASTE YOUR PRIVATE KEY HERE"
                }
            }
        }`,
        "alert": "true"
    },
    {
        "title": "Step 6",
        "subtitle": "Now we need to add in our flow.json the contract path",
        "path": "Add the path to the contracts json object inside flow.json, just like bellow:",
        "codeSnippet": `"contracts": { "Samplers": "./samplersContract/Samplers.cdc" }`
    },
    {
        "title": "Step 7",
        "subtitle": "And let the flow CLI know that we want to deploy this contract",
        "path": "To do it, inside your deployments add the code bellow:",
        "codeSnippet": `
        "deployments": {
			"testnet": {
				"testnet-account": [
					"Samplers"
				]
			}
		}`
    },
    {
        "title": "Step 8",
        "subtitle": "There it go! You got it!",
        "subtitle2": "Now we just need to run in our terminal the command to deploy the contract",
        "path": "To do it, inside your terminal run the command bellow:",
        "footer": "Now we can go to our Samplers Application and learn how to make it!",
        "codeSnippet":`flow project deploy --network=testnet`
    }
]