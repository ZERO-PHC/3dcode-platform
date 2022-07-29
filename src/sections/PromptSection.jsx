import React, { useState } from 'react'
import { animated, config, useSpring } from "react-spring"
import Image from "next/image"
import styled from 'styled-components';
import Iconify from '../components/Iconify';
import PromptTextSection from './PromptTextSection';
import ArgumentsSection from './ArgumentsSection';
import FlagsSection from './FlagsSection';


const Logo = () => {
  return <Image layout="fill" src="/Logo.png" alt="logo" />;
};

// array of 2 elements called images
const images = [0, 1]

export default function PromptSection({ mobile, placeholderAnimation, promptAnimation, handleBuy, buyBtnAnimation, promptStyles, Artwork, IsOwner }) {
  const [Hovered, setHovered] = useState(false);
  const [SelectedIdx, setSelectedIdx] = useState(0);
  const [TooltipText, setTooltipText] = useState("Click to copy");
  const promptRef = React.useRef();
  const flagsRef = React.useRef();
  const topRef = React.useRef();

  // function that shows a 

  const tooltipAnimation = useSpring({
    opacity: Hovered ? 1 : 0,
    transform: Hovered ? 'translateY(0px)' : 'translateY(10px)',
    config: config.stiff,
  });


  // function called handleSelection that changes the state of SelectedIdx
  const handleSelection = (idx, action) => {
    setSelectedIdx(idx);
    setHovered(action)
  }

  // function called  handleClick that copies the data argument to the clipboard 
  const handleClick = (data) => {
    navigator.clipboard.writeText(data);
    setTooltipText('Copied!');
  }



  // arrow function called PromptElement
  const PromptElement = ({ idx }) => {
    console.log("idx", idx)
    return (
      <LinkIconWrapper onClick={() => handleClick("data")} onPointerEnter={() => handleSelection(idx, true)} onPointerLeave={() => handleSelection(idx, false)}  >
        {(Hovered && SelectedIdx === idx) && <TooltipWrapper style={tooltipAnimation} >
          {TooltipText}
        </TooltipWrapper>}
        <Iconify icon="mdi-link" />
      </LinkIconWrapper>
    )
  }


  // function called handleIconClick that scrolls to the bottom of the promptRef
  const handleIconClick = (location) => {
    console.log("handling icon click")
    // autoscroll to bottom of the promptRef.current
    if (location === "bottom") {
      flagsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      topRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }



  return (
    <PromptContainer mobile={mobile} >
      <PromptWrapper mobile={mobile} ref={promptRef} style={promptStyles}>

        <div style={{ height: IsOwner ? "100%" : "70%" }}>

          <PromptOverlay>
            <PromptHeader>

              <ArtworkTitle>
                {"PROMPT"}
                <Underline />
              </ArtworkTitle>
              <IconsContainer>
                <IconWrapper onClick={() => handleIconClick("top")}>
                  <Iconify icon="akar-icons:image" />
                </IconWrapper>
                <IconWrapper onClick={() => handleIconClick("top")}>
                  <Iconify icon="bx:text" />
                </IconWrapper>
                <IconWrapper onClick={() => handleIconClick("bottom")}>
                  <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="4" height="4" fill="#D9D9D9" />
                    <rect x="5" width="4" height="4" fill="#D9D9D9" />
                    <rect y="6" width="4" height="4" fill="#D9D9D9" />
                    <rect x="5" y="6" width="4" height="4" fill="#D9D9D9" />
                  </svg>

                </IconWrapper>
                <IconWrapper onClick={() => handleIconClick("bottom")}>
                  <svg width="16" height="2" viewBox="0 0 16 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="7" height="2" fill="#D9D9D9" />
                    <rect x="9" width="7" height="2" fill="#D9D9D9" />
                  </svg>

                </IconWrapper>
              </IconsContainer>
            </PromptHeader>
          </PromptOverlay>
          <section >
            {!IsOwner ? (
              <animated.p style={placeholderAnimation}>
                Buy this Artwork to unlock the variations and it´s
                prompt
              </animated.p>
            ) : (
              <animated.div style={{
                ...promptAnimation, padding: "0rem 0.6rem", marginTop: "-2.2rem"
              }}>
                <ImagesWrapper ref={topRef}>
                  <IconWrapper>
                    <Iconify icon="akar-icons:image" />
                  </IconWrapper>
                  <LinksContainer>

                    {images.map((idx) => (<PromptElement key={idx} idx={idx} />))}


                  </LinksContainer>
                </ImagesWrapper>
                <PromptTextSection topRef={topRef} />
                <ArgumentsSection bottomRef={flagsRef} />
                <FlagsSection bottomRef={flagsRef} />
              </animated.div>
            )}
          </section>
          {/* <ClipboardWrapper></ClipboardWrapper> */}


        </div>


        <BuyBtnContainer>
          <BuyBtn style={buyBtnAnimation} onClick={handleBuy}>
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
        </BuyBtnContainer>

      </PromptWrapper>
    </PromptContainer>)
}
const PromptWrapper = styled(animated.div)`
  position: relative;
  overflow: scroll;
  overflow-x: hidden;
  background: rgba(130, 132, 135, 0.23);
  width: ${props => props.mobile ? "100%" : "60%"};
  height: 100%;
  color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: start;

  ::-webkit-scrollbar {
    width: 0rem;
    background: rgba(130, 132, 135, 0.23);

  }
`;

// const ClipboardWrapper = styled.div`
// position: fixed;
// z-index: 1;
// bottom: 0;
// display: flex;
// justify-content: center;
// align-items: center;
// height: 10%;
// width: 100%;
// background: rgba(217, 217, 217, 0.2);
// border: 2px solid #EDDDDD;

// `;
const TooltipWrapper = styled(animated.div)`
  height: 1.5rem;
  width: 6rem;
  position: absolute;
  top: -1rem;
  left: 1rem;
  border-radius: 3px;
  background: rgb(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  color: black;
  z-index: 2;
  text-transform: uppercase;

  
`;


const LinksContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0.6rem 0.6rem;
  
`;

const ArgContainer = styled.div`
  text-align: left;
  margin-bottom: 0.3rem;
  `

const ArgsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.6rem 0.6rem;
  `

const ImagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 1rem 0rem;
  width: 100%;
`;
const TextWrapper = styled.div`
  display: flex;
    position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0.5rem 0rem;
  width: 100%;
`;

const PromptHeader = styled.div`
    display: flex;  
    justify-content: space-between;
    align-items: center;
    height: 20%;
    width: 100%;
    position: sticky;
    top: 5%;
    padding: 0rem 0.6rem;
`;

const PromptOverlay = styled.div`
  position: sticky;
  top: 0px;
  z-index: 1;
  height: 30%;
  background: linear-gradient(180deg, #2C3B3B 50%, rgba(130, 132, 135, 0) 100%);
`;




const IconsContainer = styled.div`
  width: 50%;
  height: 100%;
  justify-content: space-around;
  align-items: center;
  display: flex;
`;

const IconWrapper = styled.div`
position: relative;
 height: 1.6rem;
 width: 1.6rem;
 display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #b6b6b6;
  border-radius: 6px;
`;
const LinkIconWrapper = styled.div`
position: relative;
 height: 1.6rem;
 width: 1.6rem;
 margin-right: 0.5rem;
 display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #b6b6b6;
  border-radius: 6px;
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

const Underline = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: white;
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


// create a component called BuyBtn that has a white background a border radius us 50 px and a center alignment

const BuyBtn = styled(animated.div)`
  position: relative;
  display: flex;
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
  margin-bottom: 3rem;
  height: 60%;
  position: relative;
  z-index: 1;
  width: ${props => props.mobile ? "80%" : "40%"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center
  padding-top: 1rem;
  text-align: left;
  border-radius: 50px;
  @media (max-width: 768px) {
    // height: 50%;
    text-align: left;
  }
  @media (max-width: 480px) {
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

const ArtworkTitle = styled.h1`
  font-family: "Monument", sans-serif;
  letter-spacing: 0.1rem;
  position: relative;
  font-size: 1.2rem;
  text-align: left;
  width: 50%;
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
