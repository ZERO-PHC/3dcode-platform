import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/router";
import { db } from "../../firebase";
import {
  doc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";

import { useAuth } from "../../contexts/AuthContext";
import { useTransaction } from "../../contexts/TransactionContext";
import Iconify from "../../components/Iconify";
import AnimatedEmoticon from "../../components/AnimatedEmoticon";
import HeaderComponent from "../../components/Header";
import CommentsSection from "../../sections/CommentsSection";
import CommentComponent from "../../components/CommentComponent";
import { useArtworks } from "../../contexts/ArtworksContext";
import SceneSection from "../../sections/SceneSection";

export default function ArtworkDetails({ windowDimensions }) {
  const { setMessage, setIsProcessing } = useTransaction();
  const { user, Coins, FirestoreUser } = useAuth();
  const router = useRouter();
  const { artworkId } = router.query;
  const [Loading, setLoading] = useState(false);
  const [Scene, setScene] = useState({})
  const [ArtworkImage, setArtworkImage] = useState();
  const [IsFavorite, setIsFavorite] = useState(false);
  const [IsAnimating, setIsAnimating] = useState(false);
  const variationsRef = React.useRef(null);
  const [Comment, setComment] = useState();
  const [Reaction, setReaction] = useState();
  const [result, setResult] = useState("");
  const [Comments, setComments] = useState([]);
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const {setSelectedProduct, SelectedCode, SelectedContent} = useArtworks()

  // check if the screen is mobile or not
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else if (window.innerWidth < 1024) {
      setIsTablet(true);
    } else {
      setIsDesktop(true);
    }
  }, []);

  const threshold = 0.9;

  useEffect(() => {}, []);

  const width = windowDimensions.width;
  const mobile = width < 768;

  // create a useEffect that will the artwork with the id of artworkId from the firestore database in realtime
  useEffect(() => {
    const artworkRef = doc(db, "scenes", artworkId);
    const unsub = onSnapshot(artworkRef, (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      setScene(doc.data());
      setSelectedProduct(doc.data());
      setArtworkImage(doc.data().ArtworkImg);
      setLoading(false);
    });

    return () => {
      // clean up the listener
      unsub();
    };
  }, [user]);


  
  if (Scene)
    return (
      <>
        <HeaderComponent />
        <MainWrapper>
          <>
            <ArtworkContainer mobile={mobile}>
              <Overlay />
              <SceneSection />
              <div className="tags-container">
                {Scene.name}
              </div>
            </ArtworkContainer>
            <CommentsSection title={"CODE"} code={Scene.code} productId={artworkId} />
          </>
          
        </MainWrapper>
      </>
    );
}

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  .tags-container {
    width: 100%;
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 600;
    position: absolute;
    top: 2rem;
    text-transform: uppercase;
    color: white;
    z-index:99;
    text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    letter-spacing: 0.2rem;
    text-decoration: underline;
  }
`;

// keyframes of opacity and transformX for the artwork
const reactionsAnimation = keyframes`

  0% {
    opacity: 0;
    transform: translateX(100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
  `;

const ReactionsWrapper = styled.div`
  height: 70%;
  width:${(props) => (props.mobile ? "50%" : "30%")};}  
  background: rgba(130, 132, 135, 0.23);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
  position: relative;
  margin-top: ${(props) => (props.mobile ? "0" : "10rem")};
  animation: ${reactionsAnimation} 1.6s ease-out;
  // transition: all 1.5s ease-out;
`;

const PromptOverlay = styled.div`
  position: sticky;
  top: 0px;
  z-index: 1;
  width: 100%;
  height: 80%;
  background: linear-gradient(180deg, black 10%, rgba(130, 132, 135, 0) 100%);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const Overlay = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 20%,
    rgba(0, 0, 0, 0) 100%
  );
  height: 100%;
  width: 100%;
  position: absolute;
  // border-radius: 0.8rem;
  bottom: 0;
  z-index: 1;
`;

// create a styled component called AuthorName that has a rotation of -90deg the the is vertical
const AuthorName = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
  color: lightgrey;
  transform: rotate(-90deg);
  text-align: center;
  // height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 0;
  margin: 0;
`;

// create a styled component called Avatar that is a circle with a background image
const Avatar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: white;
  margin-right: 0.5rem;
  border: 1px solid white;

  @media (max-width: 768px) {
    width: 1.8rem;
    height: 1.8rem;
  }

  @media (max-width: 480px) {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

// create a styled component called AuthorContainer that has a height of 20% and a width of 100% and  a right alignment
const AuthorContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 10px;
  color: white;
  // height: 19%;
  width: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-family: "Monument", sans-serif;
  text-align: right;

  @media (max-width: 768px) {
    height: 100%;
    width: 100%;

    position: sticky;
    bottom: 0;
    right: 0;
  }

  @media (max-width: 480px) {
    height: 100%;
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    right: 10px;
    justify-content: center;
    align-items: self-end;
  }
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
  transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);

    }
    `;

const ArtworkContainer = styled.div`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // height: 100%;
  height: 50vh;
  min-height: 50vh;

  width: 100%;
  position: relative;
  margin-bottom: 0rem;
  margin-top: 0rem;
  opacity: 1;
  // animation: ${fadeIn} 2s ease-out;
`;

// create the underline component that has a white skewed rectangle that is 40% of the width of the artwork container
const Underline = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: rgba(255, 255, 255, 0.5);
  transform: skewX(-20deg);
  left: 0;
  @media (max-width: 768px) {
    width: 50%;
    height: 0.5rem;
    background-color: white;
    transform: skewX(-20deg);
  }
  @media (max-width: 480px) {
    width: 50%;
    height: 0.3rem;
    background-color: white;
    transform: skewX(-20deg);
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
const ReactionsTitle = styled.h1`
  font-family: "Monument", sans-serif;
  letter-spacing: 0.1rem;
  position: relative;
  font-size: 1rem;
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
