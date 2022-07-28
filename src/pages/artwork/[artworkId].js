import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { animated, useSpring, config } from "react-spring";

import { useAuth } from "../../contexts/AuthContext";
import { useNFTs } from "../../contexts/NftsContext";

import Iconify from "../../components/Iconify";
import Navbar from "../../components/Navbar";
import TransactionComponent from "../../components/TransactionComponent";
import ArtworkPrompt from "../../components/ArtworkPrompt";
import ArtgridComponent from "../../components/ArtgridComponent";

import { db } from "../../firebase";
import { doc, updateDoc, onSnapshot, collection } from "firebase/firestore";
import PromptSection from "../../sections/PromptSection";
import { TwitterAuthProvider } from "firebase/auth";

const Logo = () => {
  return <Image layout="fill" src="/Logo.png" />;
};

export default function ArtworkDetails() {
  const { user, Coins, FirestoreUser } = useAuth();
  const router = useRouter();
  const { artworkId } = router.query;
  const [Loading, setLoading] = useState(false);
  const [Artwork, setArtwork] = useState(null);
  const [ArtworkImage, setArtworkImage] = useState();
  const [IsOwner, setIsOwner] = useState(true);
  const [IsFavorite, setIsFavorite] = useState(false);
  const [IsAnimating, setIsAnimating] = useState(false);
  const [Variations, setVariations] = useState([]);
  const variationsRef = React.useRef(null);

  // create a useEffect that will the artwork with the id of artworkId from the firestore database in realtime
  useEffect(() => {
    setLoading(true);
    const artworkRef = doc(db, "artworks", artworkId);
    const unsub = onSnapshot(artworkRef, (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      setArtwork(doc.data());
      setArtworkImage(doc.data().url);
      if (user) setIsOwner(doc.data().owner === user.email);

      setLoading(false);
    });

    return () => {
      // clean up the listener
      unsub();
    };
  }, [user]);

  useEffect(() => {
    if (artworkId) {
      const subColRef = collection(db, "artworks", artworkId, "variations");
      const unsub = onSnapshot(subColRef, (snapshot) => {
        let variations = [];

        snapshot.docs.forEach((doc, i) => {
          const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          console.log(source, " variation data: ", i, doc.data());

          variations.push(doc.data());
        });

        setVariations(variations);
      });
      return () => {
        // clean up the listener
        unsub();
      };
    }
  }, []);

  useEffect(() => {
    checkFavorites(FirestoreUser.favorites);
  }, [FirestoreUser]);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  // create a function called checkFavorites that will check if the artwork is in the favorites array of the user
  const checkFavorites = (favorites) => {
    console.log("favorites", favorites);
    if (favorites) {
      if (favorites.includes(artworkId)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  };

  const handleArtworkSelection = (artwork) => {
    setArtworkImage(artwork.url);
  };

  // create a function called handleBuy
  const handleBuy = async () => {
    setLoading(true);
    // if (Coins >= Artwork.price && !Artwork.purchased) {
    if (Coins >= Artwork.price) {
      // update the artwork to have the purchased property set to true that is on the artworks firestore collection
      const artworkRef = doc(db, "artworks", artworkId);
      await updateDoc(artworkRef, {
        purchased: true,
        owner: user.email,
      }).catch((err) => console.log(err));

      // add the artwork to the user's collection of purchased artworks
      const userRef = doc(db, "users", user.email);
      // console.log("firestore user", FirestoreUser.purchasedArtworks);
      await updateDoc(userRef, {
        purchasedArtworks: [...FirestoreUser.purchasedArtworks, artworkId],
        coins: Coins - Artwork.price,
      }).catch((err) => console.log(err));

      // setLoading(false);
    } else {
      alert("You don´t have enough coins");
    }
  };

  // create a function called handleAddFavorite that will add the artwork to the user's favorites
  const handleAddFavorite = async () => {
    // add the artwork to the user's collection of favorites
    const userRef = doc(db, "users", user.email);
    console.log("FirestoreUser", FirestoreUser);
    await updateDoc(userRef, {
      favorites: [...FirestoreUser?.favorites, artworkId],
    }).catch((err) => console.log(err));
  };

  const promptStyles = useSpring({
    opacity: IsAnimating ? 1 : 0,
    transform: IsAnimating ? "translateX(0%) " : "translateX(50%) ",
    delay: 500,
    // config: { duration: 500, tension: 100, friction: 200, mass: 1 },
    config: config.molasses,
  });

  const variationsAnimation = useSpring({
    opacity: IsAnimating ? 1 : 0,
    transform: IsAnimating ? "translateX(0%) " : "translateX(-50%) ",
    delay: 500,
    config: config.molasses,
    // config: { duration: 500, tension: 100, friction: 200, mass: 1 },
  });

  console.log("IsOwner", IsOwner);

  // create a useSpring hook with a config with a delay of 2000
  // const logoAnimation = useSpring({
  //   opacity: IsAnimating ? 1 : 0,
  //   transform: IsAnimating ? "translateX(0%) " : "translateX(50%) ",
  //   config: { delay: 2000 },

  const artworkAnimation = useSpring({
    opacity: IsAnimating ? 1 : 0,

    scale: IsAnimating ? 1 : 0.5,
    delay: 1000,
    config: config.molasses,
  });

  const promptAnimation = useSpring({
    opacity: IsOwner ? 1 : 0,
    fontSize: "0.9rem",
    delay: 500,
    config: config.molasses,
  });

  const placeholderAnimation = useSpring({
    opacity: !IsOwner ? 1 : 0,
    fontSize: "0.9rem",
    config: config.molasses,
    paddingLeft: "0.5rem",
  });

  const buyBtnAnimation = useSpring({
    opacity: IsOwner ? 0 : 1,
  });

  const downloadBtnAnimation = useSpring({
    opacity: IsOwner ? 1 : 0,
    width: IsOwner ? "44%" : "0%",
    config: config.molasses,
    delay: 1000,
  });

  const promptProps = {
    placeholderAnimation,
    promptAnimation,
    handleBuy,
    buyBtnAnimation,
    promptStyles,
    Artwork,
    IsOwner,
  };

  if (Artwork && Variations)
    return (
      <MainWrapper>
        <Navbar />
        <Image
          style={{ filter: "blur(12px)", opacity: 0.5 }}
          src={ArtworkImage}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          placeholder="blur"
          blurDataURL="/assets/placeholder.png"
          alt="artwork"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "end",
            width: "100vw",
            height: "100%",
            position: "relative",
          }}
        >
          <PromptSection {...promptProps} />
          <ArtworkContainer style={artworkAnimation}>
            <Image
              src={ArtworkImage}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL="/assets/placeholder.png"
              alt="artwork"
            />
            {/* <ArtworkDetailsWrapper> */}
            <Header>
              <FavoriteWrapper onClick={handleAddFavorite}>
                <Iconify
                  icon={
                    !IsFavorite
                      ? "ant-design:heart-outlined"
                      : "ant-design:heart-filled"
                  }
                />
              </FavoriteWrapper>

              <ArtworkTitle>
                {Artwork.name.toUpperCase()}
                <Underline />
              </ArtworkTitle>
            </Header>
            {/* </ArtworkDetailsWrapper> */}

            {/* <BuyBtnContainer > */}
            {/* {Artwork.owner !== user.email && ( */}
            {/* <BuyBtn style={buyBtnAnimation} onClick={handleBuy}>
                  BUY
                  <FlowPriceContainer>
                    {Artwork.price}
                    <div
                      style={{
                        height: "2.6rem",
                        width: "2.6rem",
                        position: "relative",
                        border: "2px solid #b6b6b6",
                        borderRadius: "50px",
                        marginRight: "-0.1rem",
                      }}
                    >
                      <Logo />
                    </div>
                  </FlowPriceContainer>
                </BuyBtn> */}
            {/* )} */}
            {/* </BuyBtnContainer> */}
            <Overlay />
            {IsOwner && (
              <DownloadWrapper
                target="_blank"
                href={ArtworkImage}
                download
                style={downloadBtnAnimation}
              >
                <div>Download</div>
                <Iconify size="1.6rem" icon="ant-design:download-outlined" />
              </DownloadWrapper>
            )}
          </ArtworkContainer>
          <VariationsWrapper>
            <VariationsContainer style={variationsAnimation}>
              <div style={{ paddingLeft: "1rem" }}>
                <ArtworkTitle>
                  {"VARIATIONS"}
                  <Underline />
                </ArtworkTitle>
              </div>

              <div
                ref={variationsRef}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <ArtgridComponent
                  variations={Variations}
                  currentWrapper={"details"}
                  handleArtworkSelection={handleArtworkSelection}
                  columns={"2"}
                  artworkId={artworkId}
                  isOwner={IsOwner}
                />
              </div>
            </VariationsContainer>
          </VariationsWrapper>
        </div>
        <AuthorContainer>
          <AuthorName>{Artwork.author.toUpperCase()}</AuthorName>
          <div style={{ width: "1rem" }}></div>
          <Avatar>
            <Image
              style={{ borderRadius: "50px", border: "2px solid black" }}
              src={Artwork.authorUrl}
              width={100}
              height={100}
              layout="fill"
              alt="avatar"
            />
          </Avatar>
        </AuthorContainer>
      </MainWrapper>
    );
}

const DownloadWrapper = styled(animated.a)`
  position: absolute;
  z-index: 1;
  cursor: pointer;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 12rem;
  height: 3.4rem;
  border-top-right-radius: 0.5rem;
  background-color: rgba(0, 0, 0, 0.6);
  border-top: 2.6px solid lightgrey;
  border-right: 1px solid lightgrey;
  text-transform: uppercase;
`;

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  padding: 0;
`;

const Overlay = styled(animated.div)`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 20%,
    rgba(0, 0, 0, 0) 100%
  );
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 0.8rem;
  bottom: 0;
  z-index: 1;
`;

// create a styled component called AuthorName that has a rotation of -90deg the the is vertical
const AuthorName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  transform: rotate(-90deg);
  text-align: center;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 0;
  margin: 0;
`;

const VariationsContainer = styled(animated.div)`
  background: rgba(130, 132, 135, 0.23);
  padding: 0rem 0rem;
  width: 60%;
  height: 100%;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

// create a styled component called Avatar that is a circle with a background image
const Avatar = styled.div`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: grey;
  margin-right: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
`;

// create a styled component called AuthorContainer that has a height of 20% and a width of 100% and  a right alignment
const AuthorContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 10px;
  color: white;
  height: 19%;
  width: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-family: "Monument", sans-serif;
  text-align: right;
`;

// create a styled component called FavoriteWrapper that has a background color of white and a border radius of 50px with a height of 3 rem and a width of 3 rem
const FavoriteWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  height: 2.4rem;
  width: 2.4rem;
  top: 0.5rem;
  right: 0.7rem;
  cursor: pointer;
`;

// create a img styled component  called ArtworkBackground that has a blurred  image
const ArtworkBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
  object-fit: cover;
`;

// create some keyframes for the scale animation of the ArtworkContainer
const scale = keyframes`

  0% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
`;

// create some keyframes to animate and move in the x axis
const moveX = keyframes`

  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
`;

// create a fadeIn animation with keyframes
const fadeIn = keyframes`
0% {
  opacity: 0;
  }
  100% {
    opacity: 1;
    }
    `;

// create a styled component that implement the fadeIn animation and the scale animation

const ArtworkContainer = styled(animated.div)`
  // animation: ${scale} 1.3s ease-in-out;
  // animation-fill-mode: forwards;
  // animation-timing-function: ease-in-out;
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  transform: scale(0.5);
  height: 86%;
  width: 30rem;
  position: relative;
  margin-bottom: 1rem;
  margin-top: 0rem;
  @media (max-width: 768px) {
    height: auto;
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 40rem;
    width: 40rem;
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 480px) {
    height: 40rem;
    width: 40rem;
    background-size: cover;

    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 40rem;
    width: 40rem;
    position: relative;
    overflow: hidden;
  }
`;

// create the underline component that has a white skewed rectangle that is 40% of the width of the artwork container
const Underline = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: white;
  transform: skewX(-20deg);
  left: 0;
  @media (max-width: 768px) {
    width: 100%;
    height: 0.5rem;
    background-color: white;
    transform: skewX(-20deg);
    position: absolute;
    bottom: 0;
    left: 0;
  }
  @media (max-width: 480px) {
    width: 100%;
    height: 0.5rem;
    background-color: white;
    transform: skewX(-20deg);
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;

// create a styled component called ArtworkTitle that has a font size of 3rem and a font weight of bold a text align of left a width of 100 a height of 30%
const ArtworkTitle = styled.h1`
  font-family: "Monument", sans-serif;
  letter-spacing: 0.1rem;
  position: relative;
  font-size: 1.2rem;
  text-align: left;
  width: 100%;
  height: 10%;
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

// create header component that has a row
const Header = styled.div`
  display: flex;
  z-index: 2;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 10%;
  padding-left: 1rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
  }
`;

// create a component called BackButton that has a white background a border radius us 50 px and a center alignment
const BackButton = styled.div`
  background-color: black;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  height: 2rem;
  width: 2rem;
  border: 2px solid #b6b6b6;
  padding: 0.5rem;
  @media (max-width: 768px) {
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
  }
  @media (max-width: 480px) {
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
  }
`;

{
  /* <text y='216%' x='-70%'></text> */
}
// create a styled component called VariationsWrapper that aligns all the items to the left side and has a width of 100% and a height of 20%
const VariationsWrapper = styled.div`
  curson: pointer;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  z-index: 0;
  align-items: center;
  width: 40%;
  height: 60%;
  @media (max-width: 768px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 20%;
  }
  @media (max-width: 480px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 20%;
  }
`;

// create a styled component called ArtworkDetailsWrapper that has a width of 40% a max--width of 40% and a black gradient background color from left to right
const ArtworkDetailsWrapper = styled.div`
  padding: 0rem 1rem;
  height: 80%;
  width: 40%;
  max-width: 40%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
  }
`;
