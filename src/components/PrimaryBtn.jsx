import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export default function PrimaryBtnComponent({ label }) {
    return (
        <PrimaryBtn>{label}</PrimaryBtn>
    )
}

const PrimaryBtn = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  color: white;
  padding: 0.2rem 0.5rem;
  font-family: "Monument";
  text-transform: uppercase;

  font-size: small;
  border: 2px solid #b6b6b6;
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
