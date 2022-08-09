import React, { useState, useEffect } from "react";

import styled, { keyframes } from "styled-components";
import { useTransaction } from "../contexts/TransactionContext";
import Spinner from "../atoms/Spinner";

export default function SnackbarComponent({ open, comment }) {
  const { TransactionStatus, state, IsProcessing, Message } = useTransaction();



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

 const opacity = keyframes`
 from {
   opacity: 0;
   scale:0;
 }
 to {
   opacity: 1;
   scale:1;
 }
`;




const ProgressBar = styled.div`
  background: transparent;
  border: 1px solid #fff;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  animation: ${opacity} 0.3s ease-in-out;
`;

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;


const Main = styled.main`
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

