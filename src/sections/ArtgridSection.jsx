import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ArtgridComponent from "../components/ArtgridComponent";
import useOnScreen from "../hooks/useOnScreen";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useArtworks } from "../contexts/ArtworksContext";

export default function ArtgridSection({
  artworks,
  width,
  handleArtworkSelection,
  isMobile,
}) {
  const { add9Artworks } = useArtworks();

  // const scrollRef = useBottomScrollListener(() => add9Artworks());

  return (
    // // <ArtgridContainer ref={scrollRef}>
    <ArtgridContainer>
        <TitleRow>
        <h2>FEATURED</h2>
      </TitleRow>
      <ArtgridComponent
        // mobile={width < 768 ? true : false}
        artworks={artworks}
        currentWrapper={"main"}
        handleArtworkSelection={handleArtworkSelection}
        isMobile={isMobile}
      />
    </ArtgridContainer>
  );
}

const TitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0rem;

  h2 {
    font-weight: lighter;
    color: rgb(158, 158, 158);
    font-size: 2.4rem;
    padding-bottom: 0;
    margin-bottom: 0.5rem;
  }
`;

const ArtgridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  height: 100%;
  max-height: 100%;
  // padding-left: 28%;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
  }
`;
