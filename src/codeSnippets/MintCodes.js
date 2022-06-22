export const MintCodes = {
  "NftsContext": `
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
`,
    "appJsNftsContext": `
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
`,
  "StatesNFTs" : `
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
`,
  "ScriptSampler": `
  export const getSamplersScript = \`

  import Samplers from 0xDeployer
  import MetadataViews from 0xDeployer

  pub fun main(address: Address): [NFT] {
    let collection = getAccount(address).getCapability(Samplers.CollectionPublicPath)
                      .borrow<&Samplers.Collection{MetadataViews.ResolverCollection}>()
                      ?? panic("Could not borrow a reference to the nft collection")

    let ids = collection.getIDs()

    let answer: [NFT] = []

    for id in ids {
      
      // Get the basic display information for this NFT
      let nft = collection.borrowViewResolver(id: id)

      // Get the basic display information for this NFT
      let view = nft.resolveView(Type<Samplers.NFTMetaData>())!

      let display = view as! Samplers.NFTMetaData

      answer.append(
        NFT(
          id: id, 
          name: display.name, 
          description: display.description, 
          thumbnail: display.thumbnail,
          type: display.type
        )
      )
    }

    return answer
  }

  pub struct NFT {
    pub let id: UInt64
    pub let name: String 
    pub let description: String 
    pub let thumbnail: String
    pub let type: String
    
    init(id: UInt64, name: String, description: String, thumbnail: String, type: String) {
      self.id = id
      self.name = name 
      self.description = description
      self.thumbnail = thumbnail
      self.type = type
    }
  }
  \`
  `,
  "TransactionSampler":`
  export const MINT_SAMPLER = \`

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
  \`;
  `,
  "FuctionsNFTs": `
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
  `,
  "ComponentMintNFTs": `
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
}