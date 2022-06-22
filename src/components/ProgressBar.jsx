import React from "react";
import styled from "styled-components";
import { useAnimation } from "../contexts/animation/AnimationContext";
import { useRive } from "rive-react";

export default function ProgressBar() {
    const { RiveComp } = useAnimation()


  return (
    <Wrapper>
        {RiveComp}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;

  height: 2rem;
`;
