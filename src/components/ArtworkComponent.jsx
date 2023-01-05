import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import PrimaryBtnComponent from "./PrimaryBtn";

export default function ArtworkComponent({
  artwork,
  handleArtworkSelection,
  currentWrapper,
  isOwner,
  idx,
  transform,
  mobile,
  isPointerDown,
}) {
  const [Hovered, setHovered] = useState();

  return (
    // <div style={{
    //   filter: "blur(none)"
    // }}>
    <Artwork
      onPointerEnter={() => {
        if (!isPointerDown) {
          setHovered(true);
        }
      }}
      onPointerLeave={() => setHovered(false)}
      onClick={() => handleArtworkSelection(artwork)}
      key={idx}
      width={"14rem"}
      height={"10rem"}
      isOwner={isOwner}
      transform={transform}
      isPointerDown={isPointerDown}
      isHovered={Hovered}
    >
      <Image
        style={{ borderRadius: "12px" }}
        src={Hovered ? "/assets/orbit.gif" : "/assets/sphere.png"}
        alt={"img"}
        loading="lazy"
        placeholder="blur"
        blurDataURL="/assets/sphere.png"
        objectFit="cover"
        layout="fill"
        quality={100}
      />

      <ArtworkName isHovered={Hovered}>{artwork.name}</ArtworkName>

      <Underline isHovered={isPointerDown ? false :  Hovered} />
      {/* <Overlay style={overlayAnimation} /> */}
      <Overlay isHovered={isPointerDown ? false :  Hovered} />
    </Artwork>
  );
}

const animationOne = keyframes`

  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Artwork = styled.div`
display: inline-block;
position: relative;
cursor:${props => props.isPointerDown ? "grabbing" : "pointer"} ;
margin:3rem 3rem;
color:white;
background-color: black;
border-radius:14px;
text-transform: uppercase;
z-index: 0;
transform: !mobile   ?  ${(props) => props.transform} :  none;
width: ${(props) => props.width};
height: ${(props) => props.height};
min-width: 14rem;
// border-radius: 0.2rem;
transition: all 0.3s ease-in-out;
  &:hover {
  box-shadow:${props => props.isHovered ? "0 0.4rem 0.5rem rgba(0, 0, 0, 0.2)" : null}   ;
}

  @media (max-width: 768px) {
    width: ${(props) => props.width / 2};
    height: ${(props) => props.height / 2};
`;

const Overlay = styled.div`
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 12px;
  bottom: 0;
  opacity: ${(props) => (props.isHovered ? "0" : "1")};
  transition: all 0.3s ease-in-out;

  &:hover {
    animation: ${ props => props.isHovered ? animationOne : null} 0.3s ease-in-out;
  }
`;

const ArtworkName = styled.div`
  position: absolute;
  bottom: 0.6rem;
  left: 0.5rem;
  font-size: 0.9rem;
  font-weight: 300;
  color: white;
  z-index: 4;
  // animate the translateX when hovered
  transform: ${(props) =>
    props.isHovered ? "translateX(-2rem)" : "translateX(0rem)"};
  opacity: ${(props) => (props.isHovered ? "0" : "1")};
  transition: all 0.3s ease-in-out;
`;

const EngineName = styled.div`
  position: absolute;
  bottom: 0.6rem;
  right: 0.5rem;
  font - size: 1.2rem;
  color: white;
  z-index: 2;
  // animate the translateX when hovered
  transform: ${(props) =>
    props.isHovered ? "translateX(0rem)" : "translateX(0.5rem)"};
  opacity: ${(props) => (props.isHovered ? "1" : "0")};
  transition: all 0.9s ease-in-out;

  `;

const Underline = styled.div`
  position: absolute;
  width: 20%;
  opacity: 0.5;
  z-index: 2;
  height: 0.2rem;
  background-color: rgba(255, 255, 255, 0.5);
  left: 0.4rem;
  bottom: 0.5rem;
  // animate the translateX when hovered
  transform: ${(props) =>
    props.isHovered
      ? "translateX(-1rem) skewX(-30deg)"
      : "translateX(0rem) skewX(-30deg)"};
  opacity: ${(props) => (props.isHovered ? "0" : "1")};
  transition: all 0.6s ease-in-out;

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
