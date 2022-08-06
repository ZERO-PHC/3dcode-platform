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
}) {






  const Artgrid = styled.div`
          width: 100%;
          display: flex;
          justify-content: center;
          flex-wrap: wrap;         
`;


  const resolveTransform = (i) => {
    // the aspect ratio of the artwork in the index - 1
    // get the aspect ratio of the artwork that is before the current artwork
    // if the current artwork aspect ration is portrait and it isn´t the first artwork 
    // if (artworks[i].AspectRatio === "portrait" && i !== 0) {
    if (artworks[i].AspectRatio === "portrait" && i !== 0) {
      // it the next artwork is landscape
      if (artworks[i + 1].AspectRatio === "landscape") {
        return "TranslateY(-38.5%)"
      }
    } else if (artworks[i].AspectRatio === "landscape") {
      // if the current artwork is landscape and it isn´t the first artwork 
      // and the next artwork is portrait
      if (artworks[i + 1]?.AspectRatio === "landscape") {
        return "TranslateY(-60%)"
      } else if (artworks[i - 1]?.AspectRatio === "landscape" && i !== 0) {
        return "TranslateY(-60%)"
      }

      else {
        return null
      }

    }
    // return artworks[(i - 1)].AspectRatio === "square" && artworks[i + 1] === "landscape" ? "TranslateY(-38.5%)" : null;
  }

  function renderArtworks() {
    return artworks.map((artwork, i) => {
      return (
        <ArtworkComponent
          key={i}
          artwork={artwork}
          handleArtworkSelection={handleArtworkSelection}
          currentWrapper={currentWrapper}
          idx={i}
          mobile={mobile}
          transform={resolveTransform(i)}

        />
      );
    });
  }

  return (
    <div style={{ margin: "0rem 0rem" }}>
      <Artgrid>
        {renderArtworks()}
      </Artgrid>
    </div>
  );
}
