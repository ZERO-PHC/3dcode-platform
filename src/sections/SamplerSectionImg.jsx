import Image from "next/image";
import React from "react";
import { useNFTs } from "../contexts/NftsContext";
import CommonSampler from "../../public/common_sampler.png";
import RareSampler from "../../public/rare_sampler.png";
import LegendarySampler from "../../public/legendary_sampler.png";

const SamplerParagraph = () => {
  const { SelectedRarity } = useNFTs();
  if (SelectedRarity === "common") {
    return <Image src={CommonSampler} alt="sampler-img" />;
  } else if (SelectedRarity === "rare") {
    return <Image src={RareSampler} alt="sampler-img" />;
  } else {
    return <Image src={LegendarySampler} alt="sampler-img" />;
  }
}

export default SamplerParagraph