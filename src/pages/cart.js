import React, { useState } from "react";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";

// import useArtworks from the context folder
import { useArtworks } from "../contexts/ArtworksContext";
import Image from "next/image";

const stripePromise = loadStripe("price_1MLcaFJ1nxfzB4nBGV0ciQDf");

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 3% 0% 0 0%;
  border: 0.5px solid lightgrey;
  width: 60%;
  height: 60vh;
  min-height: 60vh;
`;

const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: flex-end;
  width: 50%;
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
  min-width: 33.3%;
  text-align: right;
  padding-right: 8rem;
  text-transform: uppercase;
`;

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 6rem 0;
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

    console.log("finalEndpoint", finalEndpoint);
    return finalEndpoint;
  };

  return (
    <Main>
      <CartContainer>
        {cart.map((item) => (
          <CartItem key={item.id}>
            <CartItemImage>
              <Image
                src={"/assets/orbit.gif"}
                alt={"img"}
                width={300}
                height={150}
              />
            </CartItemImage>
            <ItemColumn>
              {/* <CartItemName>{item.nombre}</CartItemName> */}
              <CartItemName>{"Nombre"}</CartItemName>
              <CartItemPrice>$ 12{item.price}</CartItemPrice>
            </ItemColumn>
          </CartItem>
        ))}

        <Footer>
          <div style={{ minWidth: "33.3%" }}></div>
          <div style={{ minWidth: "33.3%", textAlign: "center" }}>
            <form action={resolveEndpoint()} method="POST">
              <section>
                <button
                  type="submit"
                  role="link"
                  style={{
                    background: "black",
                    fontFamily: "Monument",
                    textTransform: "uppercase",
                    fontWeight: "lighter",
                    color: "white",
                    padding: "0.3rem 1rem",
                    border: "2px solid #b6b6b6",
                    borderRadius: "40px",
                    fontSize:"medium",
                  }}
                >
                  Go to Checkout
                </button>
              </section>
            </form>
          </div>

          <CartTotal>Total: ${total}</CartTotal>
        </Footer>
      </CartContainer>
    </Main>
  );
};

export default Cart;
