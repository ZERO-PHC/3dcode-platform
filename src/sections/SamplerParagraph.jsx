import React from "react";
import { useNFTs } from "../contexts/NftsContext";
import CommonParagraph from "./CommonParagraph";
import LegendaryParagraph from "./LegendaryParagraph";
import RareParagraph from "./RareParagraph";

const SamplerParagraph = () => {
  const { SelectedRarity } = useNFTs();
  
  if (SelectedRarity === "common") {
    return <CommonParagraph />;
  } else if (SelectedRarity === "rare") {
    return <RareParagraph />;
  } else {
    return <LegendaryParagraph />;
  }
}

export default SamplerParagraph