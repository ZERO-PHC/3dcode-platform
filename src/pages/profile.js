import React, { useState, useEffect } from "react";
import Image from "next/image";
// imoport styled and keyframes from the styled-components library
import styled from "styled-components";
import { useRouter } from "next/router";
// import { loadStripe } from "@stripe/stripe-js";

import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import Iconify from "../components/Iconify";

import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import ArtgridComponent from "../components/ArtgridComponent";
import ProfileArtworksModule from "../modules/ProfileArtworksModule";
import Header from "../components/Header";

export default function Profile() {
  const router = useRouter();
  const [Loading, setLoading] = React.useState(false);
  const { user, FirestoreUser, logout } = useAuth();
  const [PostedArtworks, setPostedArtworks] = useState([]);
  const [BookmarkedArtworks, setBookmarkedArtworks] = useState([]);
  const [Category, setCategory] = useState("posted");

  useEffect(() => {
    if (FirestoreUser) {
      getPostedArtworks(FirestoreUser.postedArtworks);
      getBookmarkedArtworks(FirestoreUser.bookmarkedArtworks);
    }
  }, [FirestoreUser]);

  const getPostedArtworks = async (artworkIds) => {
    // loop over the artworkIds and get the artwork for each one using the getDoc function
    setLoading(true);

    console.log(artworkIds, "artworkIds");

    // loop over the artworkIds and get the artwork for each one using the getDoc function
    const artworks = await Promise.all(
      artworkIds.map(async (artworkId) => {
        const docRef = doc(db, "artworks", artworkId);
        const docSnap = await getDoc(docRef);
        return docSnap.data();
      })
    );

    setLoading(false);

    console.log("artworks", artworks);
    setPostedArtworks(artworks);
  };

  const getBookmarkedArtworks = async (artworkIds) => {
    // loop over the artworkIds and get the artwork for each one using the getDoc function
    setLoading(true);

    console.log(artworkIds, "artworkIds");

    // loop over the artworkIds and get the artwork for each one using the getDoc function
    if (artworkIds.length > 0) {
      const artworks = await Promise.all(
        artworkIds.map(async (artworkId) => {
          const docRef = doc(db, "artworks", artworkId);
          const docSnap = await getDoc(docRef);
          return docSnap.data();
        })
      );
      console.log("artworks", artworks);
      setBookmarkedArtworks(artworks);
    }

    setLoading(false);
  };

  // create a function that returns a log out icon
  const LogoutIcon = () => {
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
    <>
    <Header />
    <MainWrapper>
      <Container>
        <section style={{ height: "10%" }}>
          <ArtworkTitle>PROFILE</ArtworkTitle>
          <Underline />
        </section>
        <BalanceWrapper>
          <div>{FirestoreUser && FirestoreUser.name.toUpperCase()}</div>
          <div>{user && user.email.toUpperCase()}</div>
          <div style={{ width: "0.5rem" }}></div>
          <PrimaryBtn onClick={logout}>
            Logout
            <div style={{ width: "0.5rem" }}></div>
            <LogoutIcon />
          </PrimaryBtn>
        </BalanceWrapper>
        <PacksWrapper>
          <div
            style={{ height: "20%", marginTop: "2rem", marginBottom: "1rem" }}
          >
            <ArtworkTitle>{"Your Artworks".toUpperCase()}</ArtworkTitle>
            <Underline />
          </div>
          <section style={{ display: "flex" }}>
            <PrimaryBtn
              onClick={() => setCategory("posted")}
              selected={Category === "posted"}
            >
              Posted
              <div style={{ width: "0.5rem" }}></div>
              <Iconify icon="mdi-upload" />
            </PrimaryBtn>
            <PrimaryBtn
              onClick={() => setCategory("bookmarked")}
              selected={Category === "bookmarked"}
            >
              Bookmarked
              <div style={{ width: "0.5rem" }}></div>
              <Iconify icon="mdi-bookmark" />
            </PrimaryBtn>
          </section>
          {PostedArtworks.length > 0 ? (
            <ProfileArtworksModule
              artworks={
                Category === "posted" ? PostedArtworks : BookmarkedArtworks
              }
            />
          ) : (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Category === "posted"
                ? "No Posted Artworks"
                : "No Bookmarked Artworks"}
            </div>
          )}
        </PacksWrapper>
      </Container>
    </MainWrapper>
    </>
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
  background-color: ${(props) => (props.selected ? "black" : "transparent")};
  color: ${(props) => (props.selected ? "white" : "black")};
  margin-right: 0.5rem;
  margin-top: 0.5rem;
  font-family: "Monument";
  text-transform: uppercase;

  font-size: 1rem;
  height: 2.3rem;
  padding: 0.5rem 0.8rem;
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
  height: 20%;
  margin-top: 1rem;
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
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 3.5rem 0rem;
`;

const Container = styled.div`
  width: 70%;
  padding: 2rem 0rem;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
