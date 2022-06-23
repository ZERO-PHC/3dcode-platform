export const FlowJson = {
    "testNetAccout" : `
    "accounts": {
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
	"deployments": `
		"deployments": {
			"testnet": {
				"testnet-account": [
					"Samplers"
				]
			}
		}
 `
}