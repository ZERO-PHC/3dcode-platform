import React, { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";

// import useArtworks from the context folder
import { useArtworks } from "../contexts/ArtworksContext";
import Image from "next/image";
import { useRouter } from "next/router";

import PrimaryBtn from "../components/PrimaryBtn";
import SecondaryButton from "../components/SecondaryButton";
import SearchbarComponent from "./SearchbarComponent";


const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3% 0% 0 0%;
  border: 0.5px solid lightgrey;
  width: 100%;
  height: 60vh;
  min-height: 60vh;
`;

const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 50%;
  height: 100%;
`;

const CartItem = styled.div`
  align-items: start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 16px;
  padding: 0rem 8rem;
`;

const CartItemImage = styled.div`
  // height: 6rem;
  // width: 8rem;
  border-radius: 4px;
`;

const CartItemName = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  padding: 0;
`;

const CartItemPrice = styled.div`
  font-size: 2rem;
  font-weight: lighter;
`;

const CartTotal = styled.div`
  font-size: 24px;
  font-weight: bold;
  min-width: 40.3%;
  text-align: right;
  padding-right: 8rem;
  text-transform: uppercase;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin: 0;
  padding: 2rem 0;
  width: 100%;
  
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: 0;
  padding: 1.6rem 0;
  border-top: 0.5px solid lightgrey;
`;

const PurchasedScenes = ({scenes}) => {
  const router = useRouter();

  const CartHeader = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
    padding: 0rem 3rem;
    border-bottom: 0.5px solid lightgrey;
    text-transform: uppercase;
    max-height: 1rem;
    width: 100%;
    height: 3rem;
    min-height: 3rem;
    border: 0.5px solid lightgrey;
    border-bottom: none;

    h2 {
      font-size: 1.6rem;
      font-weight: bold;
      margin: 0;
      padding: 0;
    }

  `;

  const handleItemNavigation = (id) => {
    router.push(`/artwork/${id}`);
  };


  return (
    <Main>
      <CartHeader>
          <SearchbarComponent />    
      </CartHeader>
      <CartContainer> 
        {scenes.map((item) => (
          <CartItem key={item.id}>
            <CartItemImage onClick={() => handleItemNavigation(item.id)}>
              <Image
                src={"/assets/orbit.gif"}
                alt={"img"}
                width={300}
                height={150}
              />
            </CartItemImage>
            <ItemColumn>
              {/* <CartItemName>{item.nombre}</CartItemName> */}
              <div>
              <CartItemName>{"Nombre"}</CartItemName>
              </div>
              <div>
              </div>
              
            </ItemColumn>
          </CartItem>
        ))}

        
      </CartContainer>
    </Main>
  );
};

export default PurchasedScenes;
