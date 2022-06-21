import React from "react";
import SamplerModule from "../modules/SamplerModule";

const MySamplers = ({ samplers }) => {
    console.log("my samplers", samplers )
    const formattedSamplers = Object.values(samplers)
    console.log("samps", formattedSamplers)
    
  return (
    <div >
      { formattedSamplers.map((sampler, i) => (
        <SamplerModule key={i} sampler={sampler} />
      ))}
    </div>
  );
}

export default MySamplers