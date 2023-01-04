import React, { useRef, useEffect, useState } from "react";
import { Image } from "next/image";
import styled from "styled-components";
import ArtworkComponent from "./ArtworkComponent";
import { resolve } from "path";
import { Icon } from "@iconify/react";

export default function ArtlistComponent({
  currentWrapper,
  artworks,
  handleArtworkSelection,
  isMobile,
}) {
  const containerRef = useRef(null);
  const [IsPointerDown, setIsPointerDown] = useState(false)
  const [IsPointerOver, setIsPointerOver] = useState(false)

  useEffect(() => {
    // while the pointer is down on the artgrid, scroll according to pointer movement
    if (IsPointerDown) {
      containerRef.current.addEventListener("pointermove", handlePointerMove);
    } else {
      containerRef.current.removeEventListener("pointermove", handlePointerMove);
    }

    return () => {
      // containerRef.current.removeEventListener("pointermove", handlePointerMove);
    }

  }, [IsPointerDown]);

  function handlePointerDown(event) {
    event.preventDefault()
    setIsPointerDown(true);
  }

  function handlePointerUp() {
    setIsPointerDown(false);
  }

  function handlePointerEnter() {
    // if the pointer is down, don't change the cursor
    if (IsPointerDown) return;

    setIsPointerOver(true);
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
          isPointerDown={IsPointerDown}
        />
      );
    });
  }

  return (
      <ArtList ref={containerRef} onPointerDown={handlePointerDown} IsPointerDown={IsPointerDown} onPointerUp={handlePointerUp} onPointerEnter={handlePointerEnter} isPointerOver={IsPointerOver}>
        {renderArtworks()}
      </ArtList>
  );
}

const ArtList = styled.div`
  width: 100%;
  max-width: 100%;
  display: flex;
  overflow-x: scroll;
  white-space: nowrap;
  padding-left: 20%;
  height: 100%;
  border-bottom: 1px solid #eaeaea;
  margin:0rem 0rem;
  cursor: ${props => resolveCursor(props.IsPointerDown, props.isPointerOver)};
  ::-webkit-scrollbar {
    height: 0px;
  }

`;

function resolveCursor(IsPointerDown, isPointerOver) {
  if (IsPointerDown) return "grabbing";
  if (isPointerOver) return `url(${"/cursor.png"}), grab`;
  return "default";
}