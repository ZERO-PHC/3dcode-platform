import React from "react";
import styled from "styled-components";

const Switch = styled.main`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.3rem;
  //   width: 8rem;
  color: transparent;
  border-radius: 50px;
  border: 2px solid #b6b6b6;
  font-size: 0.9rem;
`;

// created styled component for the switchButton that has some border corners on the left only
const SwitchTestnetButton = styled.button`
  padding-left: 0.8rem;
  padding-right: 0.8rem;

  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  color: transparent;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: black;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  decoration: none;
  color: white;
  font-family: "Monument";
`;
const SwitchMainnetButton = styled.button`
  font-family: "Monument";
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 50%;
  color: #B6B6B6;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  decoration: none;
  padding-right: 0.8rem;
  padding-left: 0.8rem;
`;

export default function NetworkSwitch() {
  return (
    <Switch>
      <SwitchTestnetButton>TESTNET</SwitchTestnetButton>
      <SwitchMainnetButton>MAINNET</SwitchMainnetButton>
    </Switch>
  );
}
