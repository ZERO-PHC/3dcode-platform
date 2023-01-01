import React from "react";
import { Image } from "next/image";
import styled from "styled-components";
import ArtworkComponent from "./ArtworkComponent";
import { resolve } from "path";

export default function ArtgridComponent({
  currentWrapper,
  columns,
  variations,
  artworks,
  handleArtworkSelection,
  artworkId,
  isOwner,
  mobile,
  lastArtwork,
  lastArtworkValue,
  isMobile
}) {






  const Artgrid = styled.div`
          width: 100%;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;         
`;



  function renderArtworks() {
    return artworks.map((artwork, i) => {
      return (
        <ArtworkComponent
          key={i}
          artwork={artwork}
          handleArtworkSelection={handleArtworkSelection}
          currentWrapper={currentWrapper}
          idx={i}
          mobile={isMobile}

        />
      );
    });
  }

  return (
    <div style={{ margin: "6rem 0rem" }}>
      <Artgrid>
        {renderArtworks()}
      </Artgrid>
    </div>
  );
}
