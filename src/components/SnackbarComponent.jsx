import React, { useState, useEffect } from "react";

import styled, { keyframes } from "styled-components";
import { useTransaction } from "../contexts/TransactionContext";
import { useSpring, config, animated } from "react-spring";
import Spinner from "../atoms/Spinner";

export default function SnackbarComponent({ open, comment }) {
  const { TransactionStatus, state, IsProcessing, Message } = useTransaction();

  const snackbarAnimation = useSpring({
    scale: IsProcessing ? 1 : 0,
    opacity: IsProcessing ? 1 : 0,
  })


  if (IsProcessing)

    return (
      <Main style={snackbarAnimation}>
        {Message !== "loading" ? <span style={{ fontSize: "0.8rem" }}>{Message}</span>
          :
          <LoadingWrapper>
            <Spinner />
          </LoadingWrapper>}
        {/* <small style={{ fontSize: "0.6rem", marginBottom:"10px" }}>{statusDisplay}</small> */}
        {/* <ProgressBar>
        <ProgressBarInner   />
      </ProgressBar> */}
      </Main>
    );
}



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

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ProgressBarInner = styled(animated.div)`
  background: lightgreen;
  width: ${(props) => props.progress}%;
  height: 100%;
  border-radius: 5px;
`;

const Main = styled(animated.main)`
  position: absolute;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;

  border: 1px solid white;
  skew: -10deg;
  justify-content: center;
  align-items: left;
  background-color: black;
  color: white;
  bottom: 2rem;
  left: 4rem;
  z-index: 99;
  border-radius: 12px;
`;

