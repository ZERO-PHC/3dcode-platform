import React from "react";
import styled from "styled-components";
import Image from "next/image";

export default function ArtworkComponent({
  artwork,
  handleArtworkSelection,
  currentWrapper,
  isOwner
}) {

  // create a function called resolve blur that has an if statement that checks if the isDialog and isOwner props are true
  // if they are true, then return the blur class
  // if they are false, then return the empty string
  // const resolveBlur = (isDialog, isOwner) => {
  //   if (isDialog && !isOwner) {
  //     return "6px";
  //   } else if (isDialog && isOwner) {
  //     return "none";
  //   } else {
  //     "none";
  //   }
  // }



  const Artwork = styled.div`
  cursor: pointer;
    position: relative;
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    border-radius: 0.8rem;
    // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.4);
    }
  `;

  // console.log("isOwner", isOwner)

  const resolveWidth = () => {
    switch (currentWrapper) {
      case "dialog":
        return "5rem"
      case "details":
        return "5rem"
      case "main":
        return "16rem"

      default:
        break;
    }
  }

  const resolveHeight = () => {
    switch (currentWrapper) {
      case "dialog":
        return "10rem"
      case "details":
        return "10rem"
      case "main":
        return "26rem"

      default:
        break;
    }
  }

  if (!isOwner) {
    return (
      <div style={{
        filter: "blur(6px)"
      }}>
        <Artwork
          onClick={() => handleArtworkSelection(artwork)}
          key={artwork.url}
          width={resolveWidth()}
          height={resolveHeight()}
          isOwner={isOwner}
        >
          <Image
            style={{ borderRadius: "0.8rem" }}
            src={artwork.url}
            alt={"artwork.url"}
            layout="fill"
          />
        </Artwork>
      </div >

    );
  } else {
    return (
      <div style={{
        filter: "blur(none)"
      }}>
        <Artwork
          onClick={() => handleArtworkSelection(artwork)}
          key={artwork.url}
          width={resolveWidth()}
          height={resolveHeight()}
          isOwner={isOwner}
        >
          <Image
            style={{ borderRadius: "0.8rem" }}
            src={artwork.url}
            alt={"artwork.url"}
            layout="fill"
          />
        </Artwork>
      </div>

    );
  }


}
