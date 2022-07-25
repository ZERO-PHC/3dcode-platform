import Image from "next/image";
import React from "react";
// imoport styled and keyframes from the styled-components library
import styled from "styled-components";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";

import Navbar from "../components/Navbar";

let stripePromise;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
  }

  return stripePromise;
};

export default function Coins() {
  const [IsHovered, setIsHovered] = React.useState(false);
  const router = useRouter();
  const [StripeError, setStripeError] = React.useState(null);
  const [Loading, setLoading] = React.useState(false);
  const basicItem = {
    price: "price_1LOS2jJ1nxfzB4nBMGUBz6Uy",
    quantity: 1,
  };
  const proItem = {
    price: "price_1LOp90J1nxfzB4nB69nj8pm3",
    quantity: 1,
  };
  const creativeItem = {
    price: "price_1LOpACJ1nxfzB4nBpbLNeiQ5",
    quantity: 1,
  };

  const checkoutBasicOptions = {
    lineItems: [basicItem],
    mode: "payment",
    successUrl: `http://localhost:3000`,
    cancelUrl: `http://localhost:3000`,
  };
  const checkoutProOptions = {
    lineItems: [proItem],
    mode: "payment",
    successUrl: `http://localhost:3000`,
    cancelUrl: `http://localhost:3000`,
  };
  const checkoutCreativeOptions = {
    lineItems: [creativeItem],
    mode: "payment",
    successUrl: `http://localhost:3000`,
    cancelUrl: `http://localhost:3000`,
  };

  const redirectToCheckout = async (option) => {
    console.log("redirectTocheckout");
    setLoading(true);

    let checkoutOption;
    switch (option) {
      case "basic":
        checkoutOption = checkoutBasicOptions;
        break;
      case "pro":
        checkoutOption = checkoutProOptions;
        break;
      case "creative":
        checkoutOption = checkoutCreativeOptions;
        break;

      default:
        break;
    }

    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOption);
    console.log("error", error);

    if (error) setStripeError(error.message);
    setLoading(false);
  };

  if (StripeError) alert(StripeError);

  // create an animated styled component that animates the background color on hover
  const AnimatedBackground = styled.div`
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    height: 20rem;
    width: 16rem;
    border-radius: 0.5rem;
    background: linear-gradient(
      180deg,
      #2addd3 -69.34%,
      rgba(0, 0, 0, 1) 101.55%
    );
    transition: background 2s ease-in-out;
    &:hover {
      background: linear-gradient(
        180deg,
        #2addd3 -29.34%,
        rgba(0, 0, 0, 1) 101.55%
      );
    }
  `;

  const AnimatedBackground2 = styled.div`
    cursor: pointer;
    position: relative;
    margin-left: 2rem;
    margin-right: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    height: 20rem;
    width: 16rem;
    border-radius: 0.5rem;
    background: linear-gradient(
      180deg,
      #0f9cec -69.64%,
      rgba(0, 0, 0, 1) 101.55%
    );
    transition: background 2s ease-in-out;
    &:hover {
      background: linear-gradient(
        180deg,
        #0f9cec -32.64%,
        rgba(0, 0, 0, 1) 101.55%
      );
    }
  `;

  const AnimatedBackground3 = styled.div`
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #fff;
    height: 20rem;
    width: 16rem;
    border-radius: 0.5rem;
    background: linear-gradient(
      180deg,
      #dbff00 -69.79%,
      rgba(0, 0, 0, 1) 101.55%
    );
    transition: background 2s ease-in-out;
    &:hover {
      background: linear-gradient(
        180deg,
        #dbff00 -24.79%,
        rgba(0, 0, 0, 1) 101.55%
      );
    }
  `;

  const PriceWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    height: 8rem;
    width: 12rem;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 0.5rem;
  `;

  return (
    <MainWrapper>
      <Navbar />
      <Container>
        <section style={{ height: "10%" }}>
          <ArtworkTitle>{"Balance".toUpperCase()}</ArtworkTitle>
          <Underline />
        </section>
        <BalanceWrapper>
          <div>{"0"}</div>
          <div style={{ width: "0.5rem" }}></div>
          <div>
            <Image height={50} width={50} src="/assets/coin.png" />
          </div>
        </BalanceWrapper>
        <PacksWrapper>
          <div
            style={{ height: "20%", marginTop: "2rem", marginBottom: "1rem" }}
          >
            <ArtworkTitle>{"Select your Pack".toUpperCase()}</ArtworkTitle>
            <Underline />
          </div>
          <PacksRow>
            <AnimatedBackground
              onPointerEnter={() => setIsHovered(true)}
              onClick={() => redirectToCheckout("basic")}
            >
              <div style={{ position: "absolute", top: 0, left: 10 }}>
                <p>
                  Basic
                  <br />
                  Pack{" "}
                </p>
              </div>
              <PriceWrapper>
                <div
                  style={{
                    display: "flex",
                    height: "50%",
                    alignItems: "center",
                  }}
                >
                  {"$5"}
                </div>
                <div
                  style={{
                    height: "0.05rem",
                    background: "white",
                    width: "3rem",
                  }}
                />
                <section
                  style={{
                    display: "flex",
                    height: "50%",
                    alignItems: "center",
                  }}
                >
                  <div>100</div>
                  <div style={{ width: "0.5rem" }}></div>
                  <div>
                    <Image height={40} width={40} src="/assets/coin.png" />
                  </div>
                </section>
              </PriceWrapper>
            </AnimatedBackground>
            <AnimatedBackground2
              onClick={() => redirectToCheckout("pro")}
              onPointerEnter={() => setIsHovered(true)}
            >
              <div style={{ position: "absolute", top: 0, left: 10 }}>
                <p>
                  Pro
                  <br />
                  Pack{" "}
                </p>
              </div>
              <PriceWrapper>
                <div
                  style={{
                    display: "flex",
                    height: "50%",
                    alignItems: "center",
                  }}
                >
                  {"$10"}
                </div>
                <div
                  style={{
                    height: "0.05rem",
                    background: "white",
                    width: "3rem",
                  }}
                />
                <section
                  style={{
                    display: "flex",
                    height: "50%",
                    alignItems: "center",
                  }}
                >
                  <div>300</div>
                  <div style={{ width: "0.5rem" }}></div>
                  <div>
                    <Image height={40} width={40} src="/assets/coin.png" />
                  </div>
                </section>
              </PriceWrapper>
            </AnimatedBackground2>
            <AnimatedBackground3
              onClick={() => redirectToCheckout("creative")}
              onPointerEnter={() => setIsHovered(true)}
            >
              <div style={{ position: "absolute", top: 0, left: 10 }}>
                <p>
                  Creative
                  <br />
                  Pack{" "}
                </p>
              </div>
              <PriceWrapper>
                <div
                  style={{
                    display: "flex",
                    height: "50%",
                    alignItems: "center",
                  }}
                >
                  {"$25"}
                </div>
                <div
                  style={{
                    height: "0.05rem",
                    background: "white",
                    width: "3rem",
                  }}
                />
                <section
                  style={{
                    display: "flex",
                    height: "50%",
                    alignItems: "center",
                  }}
                >
                  <div>1000</div>
                  <div style={{ width: "0.5rem" }}></div>
                  <div>
                    <Image height={40} width={40} src="/assets/coin.png" />
                  </div>
                </section>
              </PriceWrapper>
            </AnimatedBackground3>
          </PacksRow>
        </PacksWrapper>
      </Container>
    </MainWrapper>
  );
}

const PackWrapper2 = styled.div`
  height: 20rem;
  width: 16rem;
  background: linear-gradient(
    180deg,
    #0f9cec -32.64%,
    rgba(0, 0, 0, 1) 101.55%
  );
  border-radius: 0.5rem;
`;
const PackWrapper3 = styled.div`
  height: 20rem;
  width: 16rem;

  border-radius: 0.5rem;
`;

const PacksRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const PacksWrapper = styled.section`
  height: 60%;
  display: flex;
  flex-direction: column;
`;

// create a styled component called BalanceWrapper that has a font-size of 6rem a height of 20% and a width of 100%
const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100vw;
  height: 16%;
  font-size: 6rem;
  color: black;
  text-shadow: 0 0 0.2rem #000;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const Underline = styled.div`
  width: 6%;
  height: 0.2rem;
  background-color: black;
  transform: skewX(-20deg);
  left: 0;
  @media (max-width: 768px) {
    width: 10%;
    height: 0.5rem;
    background-color: black;
    transform: skewX(-20deg);
    bottom: 0;
    left: 0;
  }
  @media (max-width: 480px) {
    width: 10%;
    height: 0.5rem;
    background-color: black;
    transform: skewX(-20deg);
    bottom: 0;
    left: 0;
  }
`;

const ArtworkTitle = styled.h1`
  font-family: "MonumentBold", sans-serif;
  letter-spacing: 0.1rem;
  position: relative;
  font-size: 1.2rem;
  text-align: left;
  width: 100%;
  height: 20%;
  @media (max-width: 768px) {
    font-size: 1.6rem;
    font-weight: bold;
    text-align: left;
    width: 100%;
    height: 30%;
  }
  @media (max-width: 480px) {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: left;
    width: 100%;
    height: 30%;
  }
`;

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 0;
`;

const Container = styled.div`
  width: 70%;
  padding: 2rem 0rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
