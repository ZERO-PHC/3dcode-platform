import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

export default function SecondaryBtnComponent({ label, onClick }) {
  return (
    <SecondaryBtn onClick={onClick}>
      <span>{label}</span>

      {label != "COPY" ? (
        <Icon
          icon="material-symbols:close"
          style={{ marginLeft: "0.5rem" }}
        />
      ) : (
        <Icon icon="carbon:copy" style={{ marginLeft: "1rem" }} />
      )}
    </SecondaryBtn>
  );
}

const SecondaryBtn = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  color: black;
  padding: 0.2rem 1rem;
  font-family: "Monument";
  text-transform: uppercase;

  font-size: medium;
  border: 2px solid black;
  border-radius: 40px;

  & button {
    display: none;
    padding: 5px 15px;
    margin: 0px 10px;
    border-radius: 10px;
    font-family: "Monument";
    font-size: 0.7rem;
    transition: 1s;
  }

  &:hover {
    cursor: pointer;

    & button {
      display: flex;
    }
  }
`;
