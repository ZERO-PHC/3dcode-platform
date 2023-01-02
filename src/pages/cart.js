import React, { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";

// import useArtworks from the context folder
import { useArtworks } from "../contexts/ArtworksContext";

const stripePromise = loadStripe("price_1MLcaFJ1nxfzB4nBGV0ciQDf");

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartItem = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 16px;
`;

const CartItemImage = styled.img`
  height: 50px;
  object-fit: contain;
  width: 50px;
`;

const CartItemName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const CartItemPrice = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const CartTotal = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin: 16px;
  text-align: right;
`;

const Cart = () => {
  const { cart } = useArtworks();
  

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);
 

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const resolveEndpoint = () => {
    const endpoint = "/api/checkout_sessions";
    const args = cart.map((item) => `id=${item.id}&quantity=1`).join("&");
    const finalEndpoint = `${endpoint}?${args}`;

    console.log("finalEndpoint", finalEndpoint)
    return finalEndpoint;
  };

  return (
    <CartContainer>
      {cart.map((item) => (
        <CartItem key={item.id}>
          <CartItemImage src={item.imageUrl} />
          <div>
            <CartItemName>{item.id}</CartItemName>
            <CartItemPrice>${item.price}</CartItemPrice>
          </div>
        </CartItem>
      ))}
      <CartTotal>Total: ${total}</CartTotal>
      <form action={resolveEndpoint()} method="POST">
        <section>
          <button type="submit" role="link">
            Go to Checkout
          </button>
        </section>
        <style jsx>
          {`
            section {
              background: #ffffff;
              display: flex;
              flex-direction: column;
              width: 400px;
              height: 112px;
              border-radius: 6px;
              justify-content: space-between;
            }
            button {
              height: 36px;
              background: #556cd6;
              border-radius: 4px;
              color: white;
              border: 0;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.2s ease;
              box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
            }
            button:hover {
              opacity: 0.8;
            }
          `}
        </style>
      </form>
    </CartContainer>
  );
};

export default Cart;
