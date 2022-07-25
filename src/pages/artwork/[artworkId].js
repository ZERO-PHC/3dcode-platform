import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { animated, useSpring } from "react-spring";

import { useAuth } from "../../contexts/AuthContext";
import { useNFTs } from "../../contexts/NftsContext";

import Iconify from "../../components/Iconify";
import Navbar from "../../components/Navbar";
import TransactionComponent from "../../components/TransactionComponent";
import ArtworkPrompt from "../../components/ArtworkPrompt";
import ArtgridComponent from "../../components/ArtgridComponent";

import { db } from "../../firebase";
import { doc, updateDoc, onSnapshot, collection } from "firebase/firestore";

const Logo = () => {
  return <Image layout="fill" src="/Logo.png" />;
};

export default function ArtworkDetails() {
  const { user, Coins, FirestoreUser } = useAuth();
  const router = useRouter();
  const { artworkId } = router.query;
  const [Loading, setLoading] = React.useState(false);
  const [Artwork, setArtwork] = useState(null);
  const [ArtworkImage, setArtworkImage] = useState();
  const [IsOwner, setIsOwner] = useState(false);
  const [IsFavorite, setIsFavorite] = useState(false);
  const [IsAnimating, setIsAnimating] = useState(false);
  const [Variations, setVariations] = useState([]);
  const variationsRef = React.useRef(null);

  // create a useEffect that will get the artwork with the id of artworkId from the firestore database in realtime
  useEffect(() => {
    const artworkRef = doc(db, "artworks", artworkId);
    const unsub = onSnapshot(artworkRef, (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      setArtwork(doc.data());
      setArtworkImage(doc.data().url);
      if (user) setIsOwner(doc.data().owner === user.email);
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
    if (Coins >= Artwork.price && !Artwork.purchased) {
      // update the artwork to have the purchased property set to true that is on the artworks firestore collection
      const artworkRef = doc(db, "artworks", artworkId);
      await updateDoc(artworkRef, {
        purchased: true,
        owner: user.email,
      }).catch((err) => console.log(err));

      // add the artwork to the user's collection of purchased artworks
      const userRef = doc(db, "users", user.email);
      console.log("firestore user", FirestoreUser.data().purchasedArtworks);
      await updateDoc(userRef, {
        purchasedArtworks: [
          ...FirestoreUser.data().purchasedArtworks,
          artworkId,
        ],
      }).catch((err) => console.log(err));

      // setLoading(false);
    }
  };

  // create a function called handleAddFavorite that will add the artwork to the user's favorites
  const handleAddFavorite = async () => {
    // add the artwork to the user's collection of favorites
    const userRef = doc(db, "users", user.email);
    await updateDoc(userRef, {
      favorites: [...FirestoreUser.favorites, artworkId],
    }).catch((err) => console.log(err));
  };

  const promptStyles = useSpring({
    opacity: IsAnimating ? 1 : 0,
    transform: IsAnimating ? "translateX(0%) " : "translateX(50%) ",
  });

  const variationsAnimation = useSpring({
    opacity: IsAnimating ? 1 : 0,
    transform: IsAnimating ? "translateX(0%) " : "translateX(-50%) ",
  });

  const artworkAnimation = useSpring({
    scale: IsAnimating ? 1 : 0.5,
    // config: { duration: 1000 }
  });

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
            alignItems: "center",
            width: "100vw",
            height: "100%",
            position: "relative",
          }}
        >
          <PromptContainer>
            <PromptWrapper style={promptStyles}>
              <ArtworkTitle>
                {"PROMPT"}
                <Underline />
              </ArtworkTitle>
              {!IsOwner ? (
                <p style={{ fontSize: "0.9rem" }}>
                  Buy this Artwork to unlock this prompt <br /> and it´s
                  variations
                </p>
              ) : (
                <p style={{ fontSize: "0.9rem" }}>{Artwork.prompt}</p>
              )}
            </PromptWrapper>
          </PromptContainer>
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

            <BuyBtnContainer>
              {Artwork.owner !== user.email && (
                <BuyBtn onClick={handleBuy}>
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
                </BuyBtn>
              )}
            </BuyBtnContainer>
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
          <AuthorContainer>
            <h2>{Artwork.author.toUpperCase()}</h2>
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
        </div>
      </MainWrapper>
    );
}

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

const PromptWrapper = styled(animated.div)`
  position: relative;
  background: rgba(130, 132, 135, 0.23);
  padding: 0rem 1rem;
  width: 60%;
  height: 100%;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
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
`;

// create a styled component called AuthorContainer that has a height of 20% and a width of 100% and  a right alignment
const AuthorContainer = styled.div`
  position: absolute;
  bottom: 0;
  color: white;
  height: 10%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
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
  height: 90%;
  width: 30rem;
  position: relative;
  margin-bottom: 1rem;
  margin-top: 1rem;
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

// create a component called BuyBtnContainer that has a height of 30% and a width of 100% a center alignment and a display flex
const BuyBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30%;
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 100%;
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 100%;
  }
`;

// create a component called BuyBtn that has a white background a border radius us 50 px and a center alignment
const BuyBtn = styled.div`
  display: flex;
  position: relative;
  background-color: black;
  border-radius: 50px;
  align-items: center;
  justify-content: start;
  padding-left: 0.8rem;
  font-size: 1.5rem;
  font-weight: bold;
  height: 2.6rem;
  width: 12rem;
  border: 2px solid #b6b6b6;
  // padding-: 0.5rem;

  &:hover {
    cursor: pointer;
  }
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

// create PromptContainer component that has a 50% height text align to left
const PromptContainer = animated(styled.div`
 
  height: 60%;
  position: relative;
  z-index: 1;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
  padding-top: 1rem;
  text-align: left;
  border-radius: 50px;
  @media (max-width: 768px) {
    height: 50%;
    text-align: left;
    background-color: white;
    border-radius: 50px;
  }
  @media (max-width: 480px) {
    height: 50%;
    text-align: left;
    background-color: white;
    border-radius: 50px;
  }
`);

// create a component called FlowPriceContainer that has a white background a border radius us 50 px a border of 2px solid #b6b6b6 color black and a position absolute a top of 0 a left of 0 a width of 100% a height of 30%
const FlowPriceContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  right: 0;
  padding-left: 0.6rem;
  width: 54%;
  height: 100%;
  background-color: white;
  border-radius: 50px;
  color: black;
  border: 1px solid #b6b6b6;
  @media (max-width: 768px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background-color: white;
    border-radius: 50px;
    border: 2px solid #b6b6b6;
  }
  @media (max-width: 480px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background-color: white;
    border-radius: 50px;
    border: 2px solid #b6b6b6;
  }
`;

{
  /* <text y='216%' x='-70%'></text> */
}
// create a styled component called VariationsWrapper that aligns all the items to the left side and has a width of 100% and a height of 20%
const VariationsWrapper = styled.div`
  curson: pointer;

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
