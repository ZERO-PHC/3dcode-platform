import { CssCode } from "../src/codeSnippets/CssCode"

export const MintPageData = [
    {
        "title": "Welcome",
        "subtitle": "Mint NFT guide",
        "content": "At the end of this guide your application will be able to mint nfts and fetch and display the nfts that the address has",
    },
    {
        "title": "Step 1",
        "subtitle": "Create a new Context to call transactions and scripts to the Flow Blockchain",
        "subtitle2": "Create a new folder inside /contexts/NftsContext.js",
        "content": "Inside of it import FCL and the useAuth from /AuthContext.js",
        "codeSnippet": ` 
        import React, { useState, useContext, useEffect } from "react";
        import * as fcl from "@onflow/fcl";
        
        import { useAuth } from "./AuthContext";
        
        export const NftsContext = React.createContext("");
        export const useNFTs = () => useContext(NftsContext);
        
        export const NftsProvider = ({ children }) => {
        
        //Here we will add the functions that will:
        
        //GET THE NFTs from the Wallet
        //MINT new NFTs
        
        const value = {};
        
          return (
            <NftsContext.Provider value={value}> {children} </NftsContext.Provider>
          );
        }
        `
    },
    {
        "title": "Step 2",
        "subtitle": "Now we will import and use this new context in our application",
        "subtitle2": "Inside of /pages/_app.js import the new NftsContext",
        "codeSnippet": `
        import "../styles/globals.css";
        import AuthProvider from "../contexts/AuthContext"
        import NftsProvider  from "../contexts/NftsContext"
        
        function MyApp({ Component, pageProps }) {
        return (
            <AuthProvider>
            <NftsProvider>
                <Component {...pageProps} />
            </NftsProvider>
            </AuthProvider>
        )
        }
        
        export default MyApp;
        `
    },
    {
        "title": "Step 3",
        "subtitle": "Get back to you NftsContext.js file",
        "subtitle2": "Inside of it we will create some states to handle with the NFTs",
        "codeSnippet": `
        import React, { useState, useContext, useEffect } from "react";
        import * as fcl from "@onflow/fcl";

        import { useAuth } from "./AuthContext";

        export const NftsContext = React.createContext("");
        export const useNFTs = () => useContext(NftsContext);

        export const NftsProvider = ({ children }) => {

        const [Samplers, setSamplers] = useState([]);
        const [SelectedRarity, setSelectedRarity] = useState("common");
        const [IsLoading, setIsLoading] = useState(false);

        //Here we will add the functions that will:

        //GET THE NFTs from the Wallet
        //MINT new NFTs

        const value = {};

        return (
            <NftsContext.Provider value={value}> {children} </NftsContext.Provider>
        );
        }
        `
    },
    {
        "title": "Step 4",
        "subtitle": "Create a folder with your scripts",
        "subtitle2": "Inside your flow folder create /flow/cadence/scripts",
        "content": "Inside of it create a file get_samplers.js",
        "codeSnippet":`
        import Samplers from 0xDeployer
        import MetadataViews from 0xDeployer

        pub fun main(address: Address): [Samplers.NFTMetaData] {
            let collection = getAccount(address).getCapability(Samplers.CollectionPublicPath)
                            .borrow<&Samplers.Collection{MetadataViews.ResolverCollection}>()
                            ?? panic("Could not borrow a reference to the nft collection")

            let ids = collection.getIDs()

            let answer: [Samplers.NFTMetaData] = []

            for id in ids {
            
            let nft = collection.borrowViewResolver(id: id)
            let view = nft.resolveView(Type<Samplers.NFTMetaData>())!

            let display = view as! Samplers.NFTMetaData
            answer.append(display)
            }
            
            return answer
        }
        `
    },
    {
        "title": "Step 5",
        "subtitle": "Create a folder with your transactions",
        "subtitle2": "Inside your flow folder create /flow/cadence/transactions",
        "content": "Inside of it create a file mint_sampler.js",
        "codeSnippet": `
        import Samplers from 0xDeployer
        import NonFungibleToken from 0xDeployer
        import MetadataViews from 0xDeployer
        
        transaction(name: String, description: String, thumbnail: String, type: String) {
            let RecipientCollection: &Samplers.Collection{NonFungibleToken.CollectionPublic}
        
            prepare(signer: AuthAccount) {
        
            //SETUP EXAMPLE NFT COLLECTION
            if signer.borrow<&Samplers.Collection>(from: Samplers.CollectionStoragePath) == nil {
                signer.save(<- Samplers.createEmptyCollection(), to: Samplers.CollectionStoragePath)
                signer.link<&Samplers.Collection{NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection}>(Samplers.CollectionPublicPath, target: Samplers.CollectionStoragePath)
            }
        
            self.RecipientCollection = signer.getCapability(Samplers.CollectionPublicPath)
                                        .borrow<&Samplers.Collection{NonFungibleToken.CollectionPublic}>()!
            }
        
            execute {
                Samplers.mintNFT(recipient: self.RecipientCollection, name: name, description: description, thumbnail: thumbnail, type: type)
            }
            }
        `
    },
    {
        "title": "Step 6",
        "subtitle": "Now we can add the functions that will get the NFTs and mint the NFTs",
        "subtitle2": "Import the script and transactions (created in the “todo → cadenceApp”)",
        "content": "We will export them inside our values object",
        "codeSnippet": `
        import React, { useState, useContext, useEffect } from "react";
        import * as fcl from "@onflow/fcl";
        
        // ----------- SCRIPTS  -----------
        import { getSamplersScript } from "../flow/cadence/scripts/get_samplers";
        import { MINT_SAMPLER } from "../flow/cadence/transactions/mint_sampler";
        import { useAuth } from "./AuthContext";
        
        export const NftsContext = React.createContext("");
        export const useNFTs = () => useContext(NftsContext);
        
        export default function NftsProvider({ children }){
            
            const [Samplers, setSamplers] = useState([]);
            const [SelectedRarity, setSelectedRarity] = useState("common");
            const [IsLoading, setIsLoading] = useState(false);
        
            const getSamplers = async (addr) => {   
            try {
                const res = await fcl.query({
                cadence: getSamplersScript,
                args: (arg, t) => [arg(addr, t.Address)],
                });
        
            } catch (error) {
                console.log("err:", error);
            }
            }
        
            const mintSampler = async (name, description, thumbnail, type, addr) => {
            console.log("minting sampler");
            setIsLoading(true);
        
            try {
                const txid = await fcl.mutate({
                cadence: MINT_SAMPLER,
                args: (arg, t) => [
                    arg(name, t.String),
                    arg(description, t.String),
                    arg(thumbnail, t.String),
                    arg(type, t.String),
                ],
                limit: 999,
                });
        
                fcl.tx(txid).subscribe((res) => {
                if (res.status === 4) {
                    setIsLoading(false);
                getSamplers(addr)
                }
                });
        
                console.log("txid", txid);
            } catch (error) {
                console.log("err", error);
            }
            };
        
            const value = {
            Samplers,
            SelectedRarity,
            setSelectedRarity,
            getSamplers,
            mintSampler,
            IsLoading
            };
        
            return (
            <NftsContext.Provider value={value}> {children} </NftsContext.Provider>
            );
        };
    `
    },
    {
        "title": "Step 6",
        "subtitle": "Inside your page/component where you will mint and show the nfts that the address has:",
        "subtitle2": "Import the NftsContext ",
        "codeSnippet": `
        import React, { useEffect } from "react";
        import { useAuth } from "../contexts/AuthContext";
        import { useNFTs } from "../contexts/NftsContext";
        
        export default function Home() {
            const { logIn, logOut, user } = useAuth();
            const { getSamplers, SelectedRarity, Samplers, mintSampler } = useNFTs();
        
            useEffect(() => {
                if (user) getSamplers(user?.addr);
                }, [user]);
        
            const handleMint = async () => {
                mintSampler("nft", "lvl 1 nft", "t1", SelectedRarity, user?.addr);
                };
        
            console.log("my samplers", Samplers )
            const formattedSamplers = Object.values(Samplers)
            console.log("samps", formattedSamplers)
        
            return (
            <>
            <div>
                <button onClick={logIn}>Login</button>
                <button onClick={logOut}>Logout</button>
                <p>User Address - {user.addr}</p>
            </div>
        
            <div>
                    <button onClick={() => handleMint()}>
                    MINT
                </button>
        
                    <div>
                    { formattedSamplers.map((sampler, i) => (
                        <div key={i}>
                        <h1>{sampler.id}</h1>
                        <h2>{sampler.name}</h2>
                        <h3>{sampler.type}</h3>
                        </div>
                    ))}
                </div>
            </div>
        
            </>
            )
        }
        `
    },
    {
        "title": "Done",
        "subtitle": "You got it! Your application is already minting and showing all the nfts that the authenticated address has"
    }
]