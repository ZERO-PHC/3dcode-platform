
import React, { useState, useEffect } from 'react';

import styled from "styled-components";
import Image from "next/image";
import { animated, config, useSpring } from "react-spring";

export default function ArtworkComponent({
  artwork,
  handleArtworkSelection,
  currentWrapper,
  isOwner,
  idx,
  mobile
}) {

  const [Hovered, setHovered] = useState();


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



  // console.log("isOwner", isOwner)

  const resolveWidth = () => {
    switch (currentWrapper) {
      case "dialog":
        return "5rem"
      case "details":
        return "6rem"
      case "main":
        if (!mobile) {
          return "16rem"
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
        return "10rem"
        case "main":
          if (!mobile) {
            return "26rem"
          } else {
            return "13rem"
          }

      default:
        break;
    }
  }

  const resolveTransform = () => {
    switch (idx) {
      case 0:
        return "TranslateY(10%)"
      case 2:
        return "TranslateY(10%)"
      case 4:
        return "TranslateY(10%) TranslateX(30%)"
      case 5:
        return "TranslateX(30%)"
      case 6:
        return "TranslateY(10%) TranslateX(30%)"

      default:
        return "0rem 0rem"
    }

  }

  if (!isOwner) {
    return (
      <div style={{
        filter: "blur(6px)"
      }}>
        <Artwork
          onClick={() => handleArtworkSelection(artwork)}
          key={artwork.url}
          width={resolveWidth()}
          height={resolveHeight()}
          isOwner={isOwner}
          mobile={width > 768 ? false : true}
          margin={resolveTransform(idx)}
        >
          <Image
            style={{ borderRadius: "0.8rem" }}
            src={artwork.url}
            alt={"artwork.url"}
            layout="fill"
          />

        </Artwork>
      </div >

    );
  } else {
    return (
      <div style={{
        filter: "blur(none)"
      }}>
        <Artwork
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={() => handleArtworkSelection(artwork)}
          key={artwork.url}
          width={resolveWidth()}
          height={resolveHeight()}
          isOwner={isOwner}
          transform={resolveTransform()}

        >
          <Image
            style={{ borderRadius: "0.8rem" }}
            src={artwork.url}
            alt={"artwork.url"}
            // placeholder="blur"
            // blurDataURL="/assets/placeholder.png"
            layout="fill"
          />
          <ArtworkName style={nameAnimation}>
            {artwork.name}
          </ArtworkName>
          <Underline style={underlineAnimation} />
          <Overlay style={overlayAnimation} />
        </Artwork>
      </div>
    );
  }
}

const Artwork = styled.div`
cursor: pointer;
position: relative;
transform: ${(props) => props.transform};
width: ${(props) => props.width};
height: ${(props) => props.height};
border-radius: 0.7rem;
transition: all 0.3s ease -in -out;
  &:hover {
  box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.4);
}

  @media (max-width: 768px) {
    width: ${(props) => props.width / 2};
    height: ${(props) => props.height / 2};
`;


const Overlay = styled(animated.div)`
background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 0.8rem;
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


