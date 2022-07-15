import React, { useState, useEffect } from "react";

import styled, { keyframes } from "styled-components";
import { useTransaction } from "../contexts/TransactionContext";

export default function TransactionComponent() {
  const { TransactionStatus, state, IsProcessing } = useTransaction();

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

  const Main = styled.main`
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
    position: absolute;
    background-color: black;
    color: white;
    bottom: 2rem;
    left: 4rem;
    z-index: 1;
    border-radius: 12px;
  `;

  let statusDisplay;
  let statusTitle;

  switch (TransactionStatus) {
    case "0":
      statusDisplay = "Waiting for transaction approval";
      statusTitle = "Initializing";

      break;
    case "1":
      statusDisplay =
        " The transaction has been received by a collector but not yet finalized in a block..";
      statusTitle = "Pending";

      break;
    case "2":
      statusDisplay =
        "The consensus nodes have finalized the block that the transaction is included in.";
      statusTitle = "Finalizing";

      break;
    case "3":
      statusDisplay =
        "The execution nodes have produced a result for the transaction";
      statusTitle = "Finalized";

    case "4":
      statusDisplay =
        "The verification nodes have verified the transaction, and the seal is included in the latest block";
      statusTitle = "Sealed";

      break;

    default:
      break;
  }

  if(IsProcessing)

  return (
    <Main>
      <kmd style={{ fontSize: "0.8rem", marginBottom:"10px" }}>{statusTitle}</kmd>
      <small style={{ fontSize: "0.6rem", marginBottom:"10px" }}>{statusDisplay}</small>
      <ProgressBar>
        <ProgressBarInner progress={state.count} />
      </ProgressBar>
    </Main>
  );
}

// create transition animation for the component
// https://www.styled-components.com/docs/api#transition
