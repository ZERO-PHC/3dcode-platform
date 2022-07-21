import React from "react";
import { Image } from "next/image";
import styled from "styled-components";
import ArtworkComponent from "./ArtworkComponent";

export default function ArtgridComponent({
  currentWrapper,
  columns,
  artworks,
  handleArtworkSelection,
  artworkId
}) {
  const Artgrid = styled.div`
width: 80%;
display: grid;
grid-template-columns: repeat(${(props) => props.columns} , 1fr);
grid-gap: 2rem;
height: 100%;
`;

  function renderArtworks() {
    return artworks.map((artwork) => {
      return (
        <ArtworkComponent
          key={artwork.id}
          artwork={artwork}
          handleArtworkSelection={handleArtworkSelection}
          isDialog={currentWrapper === "dialog"}
        />
      );
    });
  }

  function getVariations() {
    const ids = artworks[artworkId].variations;
    // console.log(ids, "ids");
    const variationsObjs = artworks.filter((artwork) =>
      ids.includes(artwork.id)
    );
    console.log("variationsObjs", variationsObjs);
    return variationsObjs;
  }

  function renderVariations() {
    const variations = getVariations(artworks);
    console.log("variations", variations);
    return variations.map((variation) => {
      return (
        <ArtworkComponent
          key={variation.id}
          artwork={variation}
          handleArtworkSelection={handleArtworkSelection}
          isDialog={currentWrapper === "dialog" || currentWrapper === "details"}
        />
      );
    });
  }

  return (
    <div>
      <Artgrid columns={columns}>
        {currentWrapper === "dialog" || currentWrapper === "details" ? renderVariations() : renderArtworks()}
      </Artgrid>
    </div>
  );
}
