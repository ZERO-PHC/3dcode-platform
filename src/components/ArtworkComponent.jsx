import React from "react";
import styled from "styled-components";
import Image  from "next/image";

export default function ArtworkComponent({
  artwork,
  handleArtworkSelection,
  isDialog,
}) {
  const Artwork = styled.div`
    position: relative;
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    filter: blur(${(props) => (props.isDialog ? "6px" : "none")});
    border-radius: 0.8rem;
    // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.4);
    }
  `;

  return (
    <Artwork
        onClick={() => handleArtworkSelection(artwork)}
      key={artwork.id}
      size={isDialog ? "6rem" : "12rem"}
      isDialog={isDialog}
    >
      <Image
        style={{ borderRadius: "0.8rem" }}
        src={artwork.src}
        alt={artwork.name}
        layout="fill"
      />
    </Artwork>
  );
}
