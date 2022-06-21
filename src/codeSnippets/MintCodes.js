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

  async function getSamplers(addr) {   
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
import { useAuth } from "../contexts/AuthContext";
import { useNFTs } from "../contexts/NftsContext";

import Spinner from "../atoms/Spinner";

export default function Home() {
    const { logIn, logOut, user } = useAuth();
	const { getSamplers, SelectedRarity, Samplers, mintSampler } = useNFTs();

		useEffect(() => {
	    if (user) getSamplers(user?.addr);
        }, [user]);

		console.log("my samplers", samplers )
    const formattedSamplers = Object.values(samplers)
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
              <SamplerModule key={i} sampler={sampler} />
            ))}
	      </div>
		</div>

	</>
  )
}
  `
}