import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { useNFTs } from "../contexts/NftsContext";

export default function Tab({ label, img }) {
  const { setSelectedRarity } = useNFTs();

  return (
   <>div</>
  );
}

const Wrapper = styled.div`
  display: flex;
`;
