import React, { useRef, useEffect, useState } from "react";
import { Image } from "next/image";
import styled from "styled-components";
import ArtworkComponent from "./ArtworkComponent";
import { resolve } from "path";
import { Icon } from "@iconify/react";

export default function ArtgridComponent({
  currentWrapper,
  artworks,
  handleArtworkSelection,
  isMobile,
}) {
  const containerRef = useRef(null);
  const [IsPointerDown, setIsPointerDown] = useState(false)

  useEffect(() => {
    // while the pointer is down on the artgrid, scroll according to pointer movement
    if (IsPointerDown) {
      containerRef.current.addEventListener("pointermove", handlePointerMove);
    } else {
      containerRef.current.removeEventListener("pointermove", handlePointerMove);
    }

    return () => {
      containerRef.current.removeEventListener("pointermove", handlePointerMove);
    }

  }, [IsPointerDown]);

  function handlePointerDown() {
    setIsPointerDown(true);
  }

  function handlePointerUp() {
    setIsPointerDown(false);
  }

  function handlePointerMove(e) {
    containerRef.current.scrollLeft += e.movementX;
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
          mobile={isMobile}
        />
      );
    });
  }

  return (
      <Artgrid ref={containerRef} onPointerDown={handlePointerDown} onPointerUp={handlePointerUp}>
        {renderArtworks()}
      </Artgrid>
  );
}

const Artgrid = styled.div`
  width: 80%;
  max-width: 80%;
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
`;
