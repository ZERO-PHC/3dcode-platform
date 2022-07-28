import React from "react";
import { Image } from "next/image";
import styled from "styled-components";
import ArtworkComponent from "./ArtworkComponent";

export default function ArtgridComponent({
  currentWrapper,
  columns,
  variations,
  artworks,
  handleArtworkSelection,
  artworkId,
  isOwner
}) {

  console.log("isOwner", isOwner)


  const Artgrid= styled.div`
padding-top: ${(props) => props.paddingTop};} ;
width: 80%;
display: grid;
grid-template-columns: repeat(${(props) => props.columns} , 1fr);
grid-gap: ${props => props.gridGap};
height: 100%;
`;

  function renderArtworks() {
    return artworks.map((artwork, i) => {
      return (
        <ArtworkComponent
          key={i}
          artwork={artwork}
          handleArtworkSelection={handleArtworkSelection}
          currentWrapper={currentWrapper}
          isOwner={true}
          idx={i}
        />
      );
    });
  }


  function renderVariations() {
    // const variations = getVariations(artworks);
    console.log("variations", variations);
    return variations.map((variation, i) => {
      return (
        // <div key={i}>w</div>
        <ArtworkComponent
          key={i}
          artwork={variation}
          handleArtworkSelection={handleArtworkSelection}
          isOwner={isOwner}
          currentWrapper={currentWrapper}
        />
      );
    });
  }

  return (
    <div>
      <Artgrid
      gridGap={currentWrapper === "dialog" || currentWrapper === "details" ? "1rem 2rem" : "4rem  2rem" }
      columns={columns} paddingTop={currentWrapper === "dialog" || currentWrapper === "details" ? "0rem" : "3rem"}>
        {currentWrapper === "dialog" || currentWrapper === "details" ? renderVariations() : renderArtworks()}
      </Artgrid>
    </div>
  );
}
