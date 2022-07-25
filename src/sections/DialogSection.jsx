import { Icon } from "@iconify/react";
import { collection, onSnapshot } from "firebase/firestore";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import styled from "styled-components";

import { db } from "../firebase";

import ArtgridComponent from "../components/ArtgridComponent";

// import icons file

// create an array of objects called icons that has a
const icons = [
  {
    name: "favorite",
    id: "art",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "icon-park-outline:buy",
    active: true,
  },
  {
    name: "buy",
    id: "craft",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "akar-icons:heart",

    active: false,
  },
  {
    name: "close",
    id: "technology",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "ep:close-bold",
    active: false,
  },
];

export default function DialogSection({ SelectedArtwork, handleArtworkSelection, handleNavigation, setShowDialog }) {
  const [Variations, setVariations] = useState([])

  useEffect(() => {
    const subColRef = collection(
      db,
      "artworks",
      SelectedArtwork.id,
      "variations"
    );
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
  }, [SelectedArtwork]);


  return (
    <Dialog onClick={() => setShowDialog(false)}>
      <PromptDetails>
        <Header>
          <ArtworkTitle>
            Name
            <Underline />
          </ArtworkTitle>
        </Header>
        <PromptContainer>

          <div style={{ marginLeft: "0rem" }}>
            Buy this Artwork to unlock this prompt and it´s variations
          </div>
        </PromptContainer>
        <VariationsContainer>
          {/* <ArtworkTitle>
          Variations
          <Underline />
        </ArtworkTitle> */}
          <ArtgridComponent
            variations={Variations}
            handleArtworkSelection={handleArtworkSelection}
            currentWrapper={"dialog"}
            columns={"2"}
            artworkId={SelectedArtwork.id}
          />
        </VariationsContainer>
        <AuthorContainer>
          <h2>{"ZERO".toUpperCase()}</h2>
          <div style={{width:"0.5rem"}}></div>
          <Avatar>
            {/* <Image
              src={SelectedArtwork.author}
              width={100}
              height={100}
              layout="fill"
              alt="avatar"
            /> */}

          </Avatar>
        </AuthorContainer>
      </PromptDetails>
      <ArtworkDetails>
        <Image
          style={{ borderRadius: "0.6rem" }}
          src={SelectedArtwork.url}
          alt={"name"}
          layout="fill"
        />
      </ArtworkDetails>

      <IconColumn>
        {icons.map((prompt) => (
          <IconContainer key={prompt.id}>
            <Icon
              onClick={() => handleNavigation()}
              icon={prompt.icon}
              height={28}
            />
          </IconContainer>
        ))}
      </IconColumn>
    </Dialog>
  )
}

// create a styled component called Avatar that is a circle with a background image
const Avatar = styled.div`
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: grey;
  margin-right: 0.5rem;
      


  
`;




// create a styled component called AuthorContainer that has a height of 20% and a width of 100% and  a right alignment
const AuthorContainer = styled.div`
  height: 20%;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-family: "MonumentBold", sans-serif;
  text-align: right;
`;

// create a styled component called VariationsContainer with a height of 30% and a width of 100%
const VariationsContainer = styled.div`

  height: 60%;  
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;`

const IconColumn = styled.div`
width: 0%;
height: 30%;
top: -5%
right: -3%;
display: flex;
flex-direction: column;
justify-content: start;
align-items: center;
border-radius: 50px;
// background-color: lightgrey;
transition: all 0.3s ease-in-out;
`;

// create a style component called IconContainer that renders a white circle with a border radius of 50px and a center alignment
const IconContainer = styled.div`
width: 3rem;
height: 3rem;
margin: 0.5rem;
background-color: white;
border-radius: 50px;
display: flex;
justify-content: center;
align-items: center;
transition: all 0.3s ease-in-out;
`;


const PromptContainer = styled.div`
   height: 30%;
   width: 100%;
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
 `;


// create the underline component that has a white skewed rectangle that is 40% of the width of the artwork container
const Underline = styled.div`
width: 20%;
height: 0.2rem;
background-color: black;
transform: skewX(-20deg);
position: absolute;
top: 1.3rem;
left: 0;
@media (max-width: 768px) {
 width: 100%;
 height: 0.5rem;
 background-color: black;
 transform: skewX(-20deg);
 position: absolute;
 bottom: 0;
 left: 0;
}
@media (max-width: 480px) {
 width: 100%;
 height: 0.5rem;
 background-color: bla;
 transform: skewX(-20deg);
 position: absolute;
 bottom: 0;
 left: 0;
}
`;

// create a styled component called ArtworkTitle that has a font size of 3rem and a font weight of bold a text align of left a width of 100 a height of 30%
const ArtworkTitle = styled.h2`
position: relative;
font-size: 1.2rem;
font-family: "MonumentBold", sans-serif;
text-transform: uppercase;
letter-spacing: 0.05rem;
text-align: left;
width: 100%;
height: 30%;
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

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
width: 100%;
height: 10%;
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

const Dialog = styled.div`
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 position: absolute;

 width: 100%;
 height: 100vh;
 background-color: rgba(0, 0, 0, 0.5);

 z-index: 10;
 animation: fadeIn 0.5s ease-in-out;
 animation-fill-mode: forwards;
 animation-delay: 0.5s;
 animation-duration: 0.5s;
 animation-timing-function: ease-in-out;
 animation-iteration-count: 1;
 animation-direction: normal;

 @keyframes fadeIn {
   0% {
     opacity: 0;
   }
   100% {
     opacity: 1;
   }
 }
`;

// create a component that renders the artwork details that animates in and out with 2 divs in a row  with border radius and a white background
const ArtworkDetails = styled.div`
 position: relative;
 width: 26%;
 top: 5%;
 left: -4%;

 height: 80%;
 display: flex;
 flex-direction: row;
 justify-content: center;
 align-items: center;
 border-radius: 10px;
 background-color: white;
 animation: fadeIn 0.5s ease-in-out;
 animation-fill-mode: forwards;
 animation-delay: 0.5s;
 animation-timing-function: ease-in-out;
 animation-iteration-count: 1;
 animation-direction: normal;
 animation-play-state: running;
 animation-fill-mode: forwards;
 animation-duration: 0.5s;

 @keyframes fadeIn {
   0% {
     opacity: 0;
   }
   100% {
     opacity: 1;
   }
 }
`;

const PromptDetails = styled.div`
 position: relative;
 padding-top: 0.5rem;
 padding-left:1rem;
 padding-right:1rem;
 width: 26%;
 top: 5%;
 left: -6%;
 height: 80%;
 display: flex;
 flex-direction: column;
 justify-content: start;
 align-items: center;
 border-radius: 10px;
 background-color: white;
 animation: fadeIn 0.5s ease-in-out;
 animation-fill-mode: forwards;
 animation-delay: 0.5s;
 animation-timing-function: ease-in-out;
 animation-iteration-count: 1;
 animation-direction: normal;
 animation-play-state: running;
 animation-fill-mode: forwards;
 animation-duration: 0.5s;

 @keyframes fadeIn {
   0% {
     opacity: 0;
   }
   100% {
     opacity: 1;
   }
 }
`;
