import React, { useState, useEffect } from "react";

import styled, { keyframes } from "styled-components";
import { useTransaction } from "../contexts/TransactionContext";
import { useSpring, config, animated } from "react-spring";

export default function SnackbarComponent({open, comment}) {
  const { TransactionStatus, state, IsProcessing, Message } = useTransaction();

  const snackbarAnimation = useSpring({
    scale: IsProcessing ? 1 : 0,
    opacity: IsProcessing ? 1 : 0,
  })

  const ProgressBar = styled.div`
    background: transparent;
    border: 1px solid #fff;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 10px;
    overflow: hidden;
  `;
  const ProgressBarInner = styled.div`
    background: lightgreen;
    width: ${(props) => props.progress}%;
    height: 100%;
    border-radius: 5px;
  `;

  const Main = styled(animated.main)`
    position: absolute;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    height: 10rem;
    width: 24rem;
    border: 1px solid white;
    skew: -10deg;
    display: flex;
    justify-content: center;
    align-items: left;
    background-color: black;
    color: white;
    bottom: 2rem;
    left: 4rem;
    z-index: 99;
    border-radius: 12px;
  `;

  

  if(IsProcessing)

  return (
    <Main style={snackbarAnimation}>
    <span style={{ fontSize: "0.8rem", marginBottom:"10px" }}>{Message}</span>
      {/* <small style={{ fontSize: "0.6rem", marginBottom:"10px" }}>{statusDisplay}</small> */}
      <ProgressBar>
        <ProgressBarInner progress={state.count} />
      </ProgressBar>
    </Main>
  );
}
