
import React, { useState, useEffect, useRef } from 'react';

import styled from "styled-components";
import Image from "next/image";
import { animated, config, useSpring } from "react-spring";
import PrimaryBtnComponent from './PrimaryBtn';
import { useOnScreen } from '../hooks/useOnScreen';


export default function ArtworkComponent({
  artwork,
  handleArtworkSelection,
  currentWrapper,
  isOwner,
  idx,
  mobile,
  transform

}) {


  const [Hovered, setHovered] = useState();
  // const lastArtwork = useRef();
  // const lastArtworkValue = useOnScreen(lastArtwork);

  const nameAnimation = useSpring({
    opacity: Hovered ? 1 : 0,
    transform: Hovered ? 'translate(0%)' : 'translate(-30%)',
  })
  const underlineAnimation = useSpring({
    opacity: Hovered ? 0.5 : 0,
    transform: Hovered ? 'translateX(0%) skewX(-20deg)' : 'translateX(-30%) skewX(-20deg)',

  })
  const overlayAnimation = useSpring({
    opacity: Hovered ? 1 : 0,
    // transform: Hovered ? 'translateY(0%)' : 'translateY(0%)',

  })



  const resolveWidth = () => {
    switch (currentWrapper) {
      case "dialog":
        return "5rem"
      case "details":
        return "6rem"
      case "main":
        if (!mobile) {
          return artwork.AspectRatio === "landscape" ? "32rem " : "16rem"
        } else {
          return "8rem"
        }

      default:
        break;
    }
  }

  const resolveHeight = () => {
    switch (currentWrapper) {
      case "dialog":
        return "10rem"
      case "details":
        if (artwork.AspectRatio === "portrait") {
          return "10rem"
        } else {
          return "2rem"
        }
      case "main":
        if (!mobile) {
          if (artwork.AspectRatio === "portrait") {
            return "26rem"
          } else {
            return "16rem"
          }
        } else {
          return "13rem"
        }

      default:
        break;
    }
  }

  const resolveTransform = (idx) => {

    // get the last and next artwork to be rendered with the idx

    // switch (idx) {
    //   // case 0:
    //   //   // return "TranslateY(10%)"
    //   // case 2:
    //   //   // return "TranslateY(10%)"
    //   case 4:
    //     return "TranslateY(-38.5%) "
    //   // case 5:
    //   //   return "TranslateX(30%)"
    //   case 6:
      //     return "TranslateY(-38.5%)"
    //   case 8:
    //     return "TranslateY(-60%)"
    //   case 7:
    //     return "TranslateY(-60%)"

      // default:
      //   return "0rem 0rem"
    // }

  }

  return (
    <div style={{
      filter: "blur(none)"
    }}>


      <Artwork
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={() => handleArtworkSelection(artwork)}
        key={idx}
        width={resolveWidth()}
        height={resolveHeight()}
        isOwner={isOwner}
        transform={transform}

      >
        {idx !== 6 ?
          <Image
            style={{ borderRadius: "0.5rem" }}
            src={artwork.ArtworkImg}
            alt={artwork.ArtworkImg}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/assets/placeholder.png"
            layout="fill"
          /> :
          //<video with au
          <video autoPlay loop muted src="https://storage.googleapis.com/dream-machines-output/f4e5341a-d06c-42a9-8023-413d3b55fd47/video.mp4" style={{ height: "16rem", borderTopLeftRadius: "0.6rem", borderTopRightRadius: "0.6rem", borderBottom: "0.5px solid lightgrey" }} />
        }
        <ArtworkName style={nameAnimation}>
          {artwork.name}
        </ArtworkName>
        <EngineName style={nameAnimation}>
          {artwork.SelectedEngine === "mid" ? <main style={{ position: "relative", borderRadius: "50px", height: "2rem", width: "2rem", border: "2px solid black", }}>
            <Image src="https://pbs.twimg.com/profile_images/1500078940299272198/quB4bgi9_400x400.jpg" layout="fill" alt="mid" style={{ borderRadius: "50px" }}
            />
          </main> : <Image src="https://pbs.twimg.com/profile_images/1500078940299272198/quB4bgi9_400x400.jpg" height={100} width={100}
            alt="low" />}
        </EngineName>
        <Underline style={underlineAnimation} />
        <Overlay style={overlayAnimation} />
        {idx === 6 && <div style={{ height: "40%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}  >
          <div style={{ width: "100%", textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <header style={{ fontSize: "small" }}>Created with</header>
            <main style={{ position: "relative", borderRadius: "50px", height: "2rem", width: "2rem", border: "2px solid black", margin: "0.5rem" }}>
              <Image src="https://pbs.twimg.com/profile_images/1500078940299272198/quB4bgi9_400x400.jpg" layout="fill" alt="mid" style={{ borderRadius: "50px", marginLeft: "0.5rem" }}
              />
            </main>
          </div>

          <PrimaryBtnComponent label={"Get your free trial"} />
        </div>}
      </Artwork>
    </div>
  );


}

// }

const Artwork = styled.div`
cursor: pointer;
position: relative;
margin:0.5rem;
color:white;
background-color: black;
border-radius:0.6rem;
text-transform: uppercase;
transform: ${(props) => props.transform};
width: ${(props) => props.width};
height: ${(props) => props.height};
// border-radius: 0.2rem;
transition: all 0.3s ease-in-out;
  &:hover {
  box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.4);
}

  @media (max-width: 768px) {
    width: ${(props) => props.width / 2};
    height: ${(props) => props.height / 2};
`;


const Overlay = styled(animated.div)`
background: linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
  height: 100%;
  width: 100%;
  position: absolute;
  // border-radius: 0.2rem;
  bottom: 0;
  z-index:1;
  `

const ArtworkName = styled(animated.div)`
  position: absolute;
  bottom: 0.6rem;
  left: 0.5rem;
  font - size: 1.2rem;
  color: white;
  z-index: 2;

  `;

const EngineName = styled(animated.div)`
  position: absolute;
  bottom: 0.6rem;
  right: 0.5rem;
  font - size: 1.2rem;
  color: white;
  z-index: 2;

  `;

const Underline = styled(animated.div)`
  position: absolute;
  width: 20%;
  opacity: 0.5;
  z-index: 2;
  height: 0.2rem;
  background-color: white;
  transform: skewX(-20deg);
  left: 0.4rem;
  bottom: 0.5rem;
  @media(max - width: 768px) {
    width: 100 %;
    height: 0.5rem;
    background - color: white;
    transform: skewX(-20deg);
    position: absolute;
    bottom: 0;
    left: 0;
  }
  @media(max - width: 480px) {
    width: 100 %;
    height: 0.5rem;
    background - color: white;
    transform: skewX(-20deg);
    position: absolute;
    bottom: 0;
    left: 0;
  }
  `;


