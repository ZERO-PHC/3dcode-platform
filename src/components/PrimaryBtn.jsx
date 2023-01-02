import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';


export default function PrimaryBtnComponent({ label, onClick }) {
  return (
    <PrimaryBtn onClick={onClick}>
      <span>
        {label}
      </span>

      <Icon icon="material-symbols:add-shopping-cart-sharp" style={{marginLeft:"1rem"}} />
      

    </PrimaryBtn>
  )
}

const PrimaryBtn = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  color: white;
  padding: 0.3rem 1rem;
  font-family: "Monument";
  text-transform: uppercase;

  font-size: medium;
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
