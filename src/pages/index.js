import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Tabs from "../sections/Tabs";
import SamplerContent from "../sections/SamplerContent";
import MySamplers from "../sections/MySamplers";

import { useAuth } from "../contexts/AuthContext";
import { useNFTs } from "../contexts/NftsContext";

import { rarities } from "../rarities";

import styled from "styled-components";

let gradient1 = "89.11deg, #0e0d0d 25.47%, #3f8e76 99.28%";
let gradient2 = "89.11deg, #0e0d0d 25.47%, #413F77 99.28%";
let gradient3 = "89.11deg, #0e0d0d 25.47%, #B2BE21 121.65%";

export default function Home() {

  const { user } = useAuth();
  const { getSamplers, SelectedRarity, Samplers } = useNFTs();

  useEffect(() => {
    if (user) getSamplers(user?.addr);
  }, [user]);
  
  let bgColor;

  switch (SelectedRarity) {
    case "common":
      bgColor = gradient1;
      break;
    case "rare":
      bgColor = gradient2;
      break;
    case "legendary":
      bgColor = gradient3;
      break;

    default:
      break;
  }

  return (
    <Wrapper
    style={{
      background: `linear-gradient(${bgColor})`,
    }}
    >
      <Navbar />
      <main>
        <Tabs rarities={rarities} />
        <SamplerContent />
        <footer>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "black",
              width: "80%",
              height: "50%",
            }}
          >
            {Samplers.length > 0 && <MySamplers samplers={Samplers} />}{" "}
          </div>
        </footer>
      </main>
    </Wrapper>
  )
}

const Wrapper = styled.main`
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    
    main {
      max-width: 70%;
      width: 100%;
      background: white;
      height: 80%;
      border-radius: 9px;
      margin-bottom: 2em;
    }

    footer {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 20%;
    }
  `;