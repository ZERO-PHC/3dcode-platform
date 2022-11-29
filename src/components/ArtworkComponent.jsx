
import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from "styled-components";
import Image from "next/image";
import PrimaryBtnComponent from './PrimaryBtn';


export default function ArtworkComponent({
  artwork,
  handleArtworkSelection,
  currentWrapper,
  isOwner,
  idx,
  transform
  ,mobile
}) {


  const [Hovered, setHovered] = useState();
  // const lastArtwork = useRef();
  // const lastArtworkValue = useOnScreen(lastArtwork);

  // const nameAnimation = useSpring({
  //   opacity: Hovered ? 1 : 0,
  //   transform: Hovered ? 'translate(0%)' : 'translate(-30%)',
  // })
  // const underlineAnimation = useSpring({
  //   opacity: Hovered ? 0.5 : 0,
  //   transform: Hovered ? 'translateX(0%) skewX(-20deg)' : 'translateX(-30%) skewX(-20deg)',

  // })
  // const overlayAnimation = useSpring({
  //   opacity: Hovered ? 1 : 0,
  //   // transform: Hovered ? 'translateY(0%)' : 'translateY(0%)',
  // })





  const resolveWidth = () => {
    switch (currentWrapper) {
      case "dialog":
        return "5rem"
      case "details":
        return "6rem"
      case "main":
        // // if (!mobile) {
        return artwork.AspectRatio === "landscape" ? "32rem " : "16rem"
      // // // } else {
      //   return "8rem"
      // }

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
        // if (!mobile) {
        if (artwork.AspectRatio === "portrait") {
          return "26rem"
        } else {
          return "16rem"
        }
      // } else {
      //   return "13rem"
      // }

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

  if (mobile && artwork.AspectRatio == "landscape") return null

  return (
    // <div style={{
    //   filter: "blur(none)"
    // }}>
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
        <Image
          style={{ borderRadius: "0.5rem" }}
          src={artwork.ArtworkImg ? artwork.ArtworkImg : "/assets/images/coin.png"}
          alt={"img"}
          loading="lazy"
          placeholder="blur"
          blurDataURL="/assets/placeholder.png"
          layout="fill"
          />
      
      <ArtworkName isHovered={Hovered} >
        {artwork.name}
      </ArtworkName>
      <EngineName isHovered={Hovered}  >
        {artwork.SelectedEngine === "mid" ? <main style={{ position: "relative", borderRadius: "50px", height: "2rem", width: "2rem", border: "2px solid black", }}>
          <Image src="https://pbs.twimg.com/profile_images/1500078940299272198/quB4bgi9_400x400.jpg" layout="fill" alt="mid" style={{ borderRadius: "50px" }}
          />
        </main> : <Image src="https://pbs.twimg.com/profile_images/1500078940299272198/quB4bgi9_400x400.jpg" height={100} width={100}
          alt="low" />}
      </EngineName>
      <Underline isHovered={Hovered}  />
      {/* <Overlay style={overlayAnimation} /> */}
      <Overlay isHovered={Hovered} />
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
    // </div>
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
position: relative;
cursor: pointer;
margin:0.5rem;
color:white;
background-color: black;
border-radius:0.6rem;
text-transform: uppercase;
z-index: 0;
transform: !mobile   ?  ${(props) => props.transform} :  none;
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


const Overlay = styled.div`
background: linear-gradient(to top, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0) 100%);
  height: 100%;
  width: 100%;
  position: absolute;
  border-radius: 0.2rem;
  bottom: 0;
  opacity: ${(props) => props.isHovered ? "1" : "0"};
  transition: all 0.3s ease-in-out;

  &:hover {
    animation: ${animationOne} 0.3s ease-in-out; 
  }
  `

const ArtworkName = styled.div`
  position: absolute;
  bottom: 0.6rem;
  left: 0.5rem;
  font-size: 0.9rem;
  font-weight: 300;
  color: white;
  z-index: 4;
  // animate the translateX when hovered
  transform: ${(props) => props.isHovered ? "translateX(0rem)" : "translateX(-2rem)"};
  opacity: ${(props) => props.isHovered ? "1" : "0"};
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
  transform: ${(props) => props.isHovered ? "translateX(0rem)" : "translateX(0.5rem)"};
  opacity: ${(props) => props.isHovered ? "1" : "0"};
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
  transform: ${(props) => props.isHovered ? "translateX(0rem) skewX(-30deg)" : "translateX(-1rem) skewX(-30deg)"};
  opacity: ${(props) => props.isHovered ? "1" : "0"};
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


