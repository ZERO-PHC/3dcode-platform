import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ArtgridComponent from '../components/ArtgridComponent';
import useOnScreen from '../hooks/useOnScreen';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { useArtworks } from '../contexts/ArtworksContext';


export default function ArtgridSection({ artworks, width, handleArtworkSelection }) {
    const { add9Artworks } = useArtworks()


    const scrollRef = useBottomScrollListener(() => add9Artworks());

    return (
        <ArtgridContainer ref={scrollRef}>
            <ArtgridComponent
                mobile={width < 768 ? true : false}
                artworks={artworks}
                currentWrapper={"main"}
                handleArtworkSelection={handleArtworkSelection}

            />
        </ArtgridContainer>)
}

const ArtgridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 100%;
  overflow: scroll;
  overflow-x: hidden;
  width: 100%;
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

  ::-webkit-scrollbar {
    width: 0rem;
    background: rgba(130, 132, 135, 0.23);
  }
`;
