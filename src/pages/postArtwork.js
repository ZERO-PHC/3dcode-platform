import React, { useState, useEffect } from "react";
import Image from "next/image";
// imoport styled and keyframes from the styled-components library
import styled from "styled-components";
import { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";

import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import Iconify from "../components/Iconify";

import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import ArtgridComponent from "../components/ArtgridComponent";

export default function PostArtwork() {
  const router = useRouter();
  const [Loading, setLoading] = React.useState(false);
  const { user, FirestoreUser, logout } = useAuth();
  const [PurchasedArtworks, setPurchasedArtworks] = useState([]);

  useEffect(() => {
    if (FirestoreUser) {
      // get the artworks from the ids of the user's purchased artworks
      // setPurchasedArtworks();
    }
  }, [FirestoreUser]);

  // create a function that returns a log out icon
  const LogoutIcon = () => {
    // import the iconify component with an logout icon prop
    return <Iconify icon="mdi-logout" />;
  };

  const handleArtworkSelection = (artwork) => {
    console.log("artwork selected: ", artwork);
    // setSelectedArtwork(artwork);
    // setShowDialog(true);
    router.push(`/artwork/${artwork.id}`);
  };

  // if (Loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <MainWrapper>
      {/* <Container> */}
      <div className="left-side">
        <section style={{ height: "10%" }}>
          <ArtworkTitle>NAME </ArtworkTitle>
          <Underline />
        </section>
        <div>
          <input placeholder="The name of my Artwork"></input>
          <div style={{ width: "0.5rem" }}></div>
          {/* <PrimaryBtn onClick={logout}>
            Logout
            <LogoutIcon />
          </PrimaryBtn> */}
        </div>
        <section style={{ height: "10%" }}>
          <ArtworkTitle>USED A.I.</ArtworkTitle>
          <Underline />
        </section>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <section className="ai-selected-container" onClick={logout}>
            <div className="avatar-box">
              <Image
                src={
                  "https://pbs.twimg.com/profile_images/1500078940299272198/quB4bgi9_400x400.jpg"
                }
                layout="fill"
                alt="avatar"
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div style={{ marginLeft: "1rem" }}>Midjourney</div>{" "}
          </section>
          <div style={{ width: "0.5rem" }}></div>

          <section className="ai-container" onClick={logout}>
            <div className="avatar-box">
             

              <svg
                id="openai-symbol"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 51 51"
              >
                <path d="M47.21,20.92a12.65,12.65,0,0,0-1.09-10.38A12.78,12.78,0,0,0,32.36,4.41,12.82,12.82,0,0,0,10.64,9a12.65,12.65,0,0,0-8.45,6.13,12.78,12.78,0,0,0,1.57,15A12.64,12.64,0,0,0,4.84,40.51a12.79,12.79,0,0,0,13.77,6.13,12.65,12.65,0,0,0,9.53,4.25A12.8,12.8,0,0,0,40.34,42a12.66,12.66,0,0,0,8.45-6.13A12.8,12.8,0,0,0,47.21,20.92ZM28.14,47.57a9.46,9.46,0,0,1-6.08-2.2l.3-.17,10.1-5.83a1.68,1.68,0,0,0,.83-1.44V23.69l4.27,2.47a.15.15,0,0,1,.08.11v11.8A9.52,9.52,0,0,1,28.14,47.57ZM7.72,38.85a9.45,9.45,0,0,1-1.13-6.37l.3.18L17,38.49a1.63,1.63,0,0,0,1.65,0L31,31.37V36.3a.17.17,0,0,1-.07.13L20.7,42.33A9.51,9.51,0,0,1,7.72,38.85Zm-2.66-22a9.48,9.48,0,0,1,5-4.17v12a1.62,1.62,0,0,0,.82,1.43L23.17,33.2,18.9,35.67a.16.16,0,0,1-.15,0L8.54,29.78A9.52,9.52,0,0,1,5.06,16.8ZM40.14,25,27.81,17.84l4.26-2.46a.16.16,0,0,1,.15,0l10.21,5.9A9.5,9.5,0,0,1,41,38.41v-12A1.67,1.67,0,0,0,40.14,25Zm4.25-6.39-.3-.18L34,12.55a1.64,1.64,0,0,0-1.66,0L20,19.67V14.74a.14.14,0,0,1,.06-.13L30.27,8.72a9.51,9.51,0,0,1,14.12,9.85ZM17.67,27.35,13.4,24.89a.17.17,0,0,1-.08-.12V13a9.51,9.51,0,0,1,15.59-7.3l-.3.17-10.1,5.83a1.68,1.68,0,0,0-.83,1.44Zm2.32-5,5.5-3.17L31,22.35v6.34l-5.49,3.17L20,28.69Z"></path>
              </svg>
            </div>
            <div style={{ marginLeft: "1rem" }}>DALL·E 2</div>
          </section>
        </div>
        <section style={{ height: "10%" }}>
          <ArtworkTitle>ARTWORK LINK</ArtworkTitle>
          <Underline />
        </section>
        <div>
          <input placeholder="https://i.mj.run/..."></input>
          <div style={{ width: "0.5rem" }}></div>
          {/* <PrimaryBtn onClick={logout}>
            Logout
            <LogoutIcon />
          </PrimaryBtn> */}
        </div>
      </div>
      <div className="right-side">
        <ArtworkTitle>PREVIEW</ArtworkTitle>
        <Underline />
        <section style={{ border: "2px solid black" }}>image</section>
      </div>
      {/* <PacksWrapper>
          <div
            style={{ height: "20%", marginTop: "2rem", marginBottom: "1rem" }}
          >
            <ArtworkTitle>{"Your ".toUpperCase()}</ArtworkTitle>
            <Underline />
          </div>
        </PacksWrapper> */}
      {/* </Container> */}
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

const PrimaryBtn = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 10rem;
  background-color: black;
  color: white;
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  font-family: "Monument";
  text-transform: uppercase;

  font-size: 1rem;
  height: 2.3rem;
  padding-left: 0.8rem;
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

// create a styled component called BalanceWrapper that has a font-size of 6rem a height of 20% and a width of 100%
const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100vw;
  height: 16%;
  font-size: 2rem;
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
  display: flex;
  position: relative;
  width: 100%;
  padding: 0rem 12rem;
  margin-top: 4em;
  height: 100vh;
  flex-direction: row;
  align-items: center;
  background-color: white;

  //   padding: 0;

  .left-side {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 3rem 1rem;
    width: 50%;
    height: 100%;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 100%;
  }

  .ai-selected-container {
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 80%;
    background-color: black;
    color: white;
    margin-right: 0.5rem;
    font-family: "Monument";
    text-transform: uppercase;

    font-size: 1rem;
    height: 2.3rem;
    padding-left: 0rem;
    padding-right: 1rem;
    // border: 2px solid #b6b6b6;
    border-radius: 40px;
  }

  .ai-container {
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 80%;
    color: black;
    margin-right: 0.5rem;
    font-family: "Monument";
    text-transform: uppercase;

    font-size: 1rem;
    height: 2.3rem;
    padding-left: 0rem;
    padding-right: 1rem;
    border: 2px solid black;
    border-radius: 40px;
  }

  .avatar-box {
    position: relative;
    height: 2.3rem;
    width: 2.3rem;
    border-radius: 50px;
    background-color: white;
    color: white;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: -0.2rem;
    margin-left: -0.2rem;
  }

  // create an input that has a placeholder of "The title of my artwork" with a light grey of 2 px when it is not focused and a black of 2 px when it is focused
  input {
    width: 100%;
    height: 100%;
    border: 2px solid #b6b6b6;
    border-radius: 12px;
    font-family: "Monument", sans-serif;
    font-size: 1.2rem;
    text-align: left;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: #fafafa;
    color: black;
    text-shadow: 0 0 0.1rem #000;
    &:focus {
      outline: none;
      border: 2px solid black;
    }
  }
`;

const Container = styled.div`
  width: 70%;
  //   padding: 2rem 0rem;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
