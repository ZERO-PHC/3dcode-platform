import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { resolve } from "path";
import { useArtworks } from "../contexts/ArtworksContext";
import { useRouter } from "next/router";

// array of 6 icons that contains  wow fire love fire meh trash

export default function ProfileArtworksModule({artworks}) {
    const router = useRouter();

    const handleNavigation = (id) => {
        router.push(`/artwork/${id}`);
    };


  const ProfileArtworkComponent = ({ artwork }) => {
    console.log("artwork", artwork);
    return (
      <ArtworkWrapper onClick={() => handleNavigation(artwork.id)}>
        <div style={{ position: "relative" }}>
          <Image
            style={{ border: "2px solid black" }}
            src={
              artwork.ArtworkImg
                ? artwork.ArtworkImg
                : "/assets/images/coin.png"
            }
            alt={"img"}
            loading="lazy"
            placeholder="blur"
            blurDataURL="/assets/placeholder.png"
            height={"2rem"}
            width={"2rem"}
          />
        </div>
      </ArtworkWrapper>
    );
  };

  return artworks.map((artwork) => (
    <ProfileArtworkComponent key={artwork.id} artwork={artwork} />
  ));
}

const ArtworkWrapper = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 10rem;
  height: 8rem;
  border: 1px solid black;
  // padding:1rem 0.5rem;
  color: black;
  margin: 0.5rem 0rem;
`;

const Table = styled.table`
  width: 20rem;
  tr {
    border-bottom: 1px solid black;
  }
  td {
    width: 1rem;
    height: 1rem;
    // border: 1px solid black;
    text-align: center;
  }
`;
