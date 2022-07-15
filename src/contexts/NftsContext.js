import React, { useState, useContext, useEffect } from "react";
import * as fcl from "@onflow/fcl";

// ----------- SCRIPTS  -----------
import { getSamplersScript } from "../flow/cadence/scripts/get_samplers";
import { MINT_SAMPLER } from "../flow/cadence/transactions/mint_sampler";
import { PAID_MINT_SAMPLER } from "../flow/cadence/transactions/paid_mint_sampler";
import { useTransaction } from "./TransactionContext";
import { useAuth } from "./AuthContext";

export const NftsContext = React.createContext("");
export const useNFTs = () => useContext(NftsContext);

export default function NftsProvider({ children }) {
  const { getAccountObj, checkFlowBalance } = useAuth();
  const { setIsProcessing, setTransactionStatus, dispatch } = useTransaction();
  const [Samplers, setSamplers] = useState([]);
  const [SelectedRarity, setSelectedRarity] = useState("common");

  // ************* GETTERS ***********+++*
  async function getSamplers(addr) {
    try {
      const res = await fcl.query({
        cadence: getSamplersScript,
        args: (arg, t) => [arg(addr, t.Address)],
      });

      console.log("samplers res", res);
      setSamplers(res);

      // return result;
    } catch (error) {
      console.log("err:", error);
    }
  }

  ////// SETTERS
  const mintSampler = async (name, description, thumbnail, type, addr) => {
    console.log("minting sampler");
    setIsProcessing(true);

    let price = 0

    switch (type) {
      case "common":  
        price = 10;
        break;
      case "rare":  
        price = 30;
        break;
      case "legendary":
        price = 50;
        break;
    
      default:
        break;
    }

    const isBalanceEnough = await checkFlowBalance(price);

    if (isBalanceEnough) {
      try {
        const txid = await fcl.mutate({
          cadence: PAID_MINT_SAMPLER,
          args: (arg, t) => [
            arg(name, t.String),
            arg(description, t.String),
            arg(thumbnail, t.String),
            arg(type, t.String),
          ],
          limit: 999,
        });

        fcl.tx(txid).subscribe((res) => {
          switch (res.status) {
            case 1:
              setTransactionStatus("1");
              dispatch({ type: "increment" });
              break;
            case 2:
              setTransactionStatus("2");
              dispatch({ type: "increment" });
              break;
            case 3:
              setTransactionStatus("3");
              dispatch({ type: "increment" });
              break;
            case 4:
              setTransactionStatus("4");
              dispatch({ type: "increment" });
              getAccountObj();

              setTimeout(() => {
                setIsProcessing(false);
                getSamplers(addr);
                dispatch({ type: "decrement" });
              }, 2000);
              break;

            default:
              break;
          }
        });

        // console.log("txid", txid);
      } catch (error) {
        console.log("err", error);
      }
    } else {
      alert("You don't have enough Flow to complete this transaction");
    }
  };

  const value = {
    Samplers,
    SelectedRarity,
    setSelectedRarity,
    getSamplers,
    mintSampler,
  };

  return (
    <NftsContext.Provider value={value}> {children} </NftsContext.Provider>
  );
}
