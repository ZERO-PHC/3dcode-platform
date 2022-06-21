import React, { useEffect } from "react";
import Image from 'next/image';
import styled from "styled-components";
import {SamplersDivider} from "../../public/samplers.svg";

import { useAuth } from "../contexts/AuthContext";
import { useNFTs } from "../contexts/NftsContext";
import Spinner from "../atoms/Spinner";
import SamplerParagraph from "./SamplerParagraph";
import SamplerSectionImg from "./SamplerSectionImg";

const SamplerContent = () => {
        
        const {
            SelectedRarity,
            Samplers,
            getSamplers,
            mintSampler,
            IsLoading,
          } = useNFTs();
          const { user, logIn } = useAuth();
        
          const handleMint = async () => {
            mintSampler("nft", "lvl 1 nft", "t1", SelectedRarity, user?.addr);
          };
        
          return (
            <section
              style={{
                height: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "",
              }}
            >
              <Wrapper>
                { user.loggedIn ? (
                  <div style={{ width: "70%" }}>
        
                    <h1>{SelectedRarity.toUpperCase()}</h1>
                    <SamplerParagraph />
                    <button onClick={() => handleMint()}>
                      {IsLoading ? <Spinner /> : "MINT"}
                    </button>
                    
                  </div>
                ) : (
                  <div style={{ width: "50%" }}>
                    <h1>Welcome</h1>
                    <p>Sign Up to get your free NFT!</p>
                    <button onClick={logIn}> SIGN UP </button>
                  </div>
                )}
                
                <div
                  style={{
                    display: "flex",
                    height: "50vh",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <SamplerSectionImg />
                </div>
              </Wrapper>
              {/* <SamplersDivider style={{ width: "100%" }} /> */}
              <Image src="/samplers.svg" width="1600px" height="700"/>
            </section>
          );
}

export default SamplerContent

const Wrapper = styled.div`
  padding: 2rem;
  display: flex;
  height: 70%;

  h1{
    font-family: MonumentBold;
    letter-spacing: .05rem;
  }

  button{
    font-family: "Monument";
    height: 2rem;
    width: 7rem;
    background: #000;
    border-radius: 20px;
    color: #fff;

    &:hover{
      cursor: pointer;
    }
  }
`;