import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ArtlistComponent from "../components/ArtlistComponent";
import useOnScreen from "../hooks/useOnScreen";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useArtworks } from "../contexts/ArtworksContext";
import { Icon } from "@iconify/react";

export default function ArtlistSection({
  artworks,
  width,
  handleArtworkSelection,
  isMobile,
  title
}) {
  const { add9Artworks } = useArtworks();

  // const scrollRef = useBottomScrollListener(() => add9Artworks());

  const centered = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "0rem",
  };

  const RightArrowIcon = () => (
    <div style={centered}>
      <Icon
        icon="carbon:chevron-right"
        style={{ color: "black", fontSize: "2.5rem", alignItems: "center" }}
      />
    </div>
  );

  return (
    // // <ArtlistContainer ref={scrollRef}>
    <ArtlistContainer>
      <TitleColumn>
        <TitleRow>
        <h2>{title}</h2>
        <RightArrowIcon />
      </TitleRow>
      <StyledRectangle />
      </TitleColumn>
      
      <ArtlistComponent
        // mobile={width < 768 ? true : false}
        artworks={artworks}
        currentWrapper={"main"}
        handleArtworkSelection={handleArtworkSelection}
        isMobile={isMobile}
      />
    </ArtlistContainer>
  );
}

const TitleColumn = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: end;
margin-bottom: 0rem;
margin-right: 3rem;

`;

const StyledRectangle = styled.div`
width: ${(props) => (props.active ? "6rem" : "12rem")};
height: 0.3rem;
background: rgba(0, 0, 0, 0.1);
transform: skew(20deg);
// transition: all 0.3s ease-in-out;
// opacity: ${(props) => (props.active ? 1 : 0.1)};
animation-fill-mode: forwards;
animation-iteration-count: 1;
animation-timing-function: ease-in-out;
animation-duration: 0.5s;
animation-name: extend;


@keyframes extend {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
`;

const TitleRow = styled.div`
  display: flex;
  justify-content:end;
  align-items: center;
  margin-bottom: 0rem;

  h2 {
    font-weight: lighter;
    color: black;
    font-size: 2.8rem;
    padding: 0rem 0rem 0rem 0rem;
    margin: 0rem 0rem 0rem 0rem;
  }
`;

const ArtlistContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  height: 50%;
  max-height: 50%;
  width: 100%;
  max-width: 100%;
  margin: 2rem 0rem;
  padding-top: 1rem;
`;
