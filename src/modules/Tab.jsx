import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { useNFTs } from "../contexts/NftsContext";
import CommonActive from "../../public/tab1-active.svg"

export default function Tab({ label, img }) {
  const { setSelectedRarity } = useNFTs();

  return (
    <Wrapper onClick={() => setSelectedRarity(label)}>
      {/* <CommonActive /> */}
      <Image src={img} alt="sphere"  />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;
