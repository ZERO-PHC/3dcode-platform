import Image from "next/image";
import React from "react";
import CommonSampler from "../../public/common_sampler.png";
import RareSampler from "../../public/rare_sampler.png";
import LegendarySampler from "../../public/legendary_sampler.png";

const SamplerModule = ({ sampler }) => {
  console.log("sampler", sampler.type)
  let src;
  switch (sampler.type) {
    case "common":
      src = CommonSampler;
      break;

    case "rare":
      src = RareSampler;
      break;

    case "legendary":
      src = LegendarySampler;
      break;

    default:
      src = CommonSampler;

      break;
  }

  return <Image src={src} alt="sampler-img" height={80} width={100} />;
}

export default SamplerModule;