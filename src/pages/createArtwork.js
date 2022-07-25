import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, addDoc } from "firebase/firestore";

const variations = [
  {
    name: "Variation 1",

    url:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/ZER__EC_Tough_Female_Futuristic_Samurai_with_a_neon_katana_and_15135cef-d015-45ac-a5e9-5ef38c953c44.png?alt=media&token=d5c8db99-5176-4f9e-8e07-b5c1af2f7c59",
  },
  {
    name: "Variation 2",

    url:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/ZER__EC_Tough_Female_Futuristic_Samurai_with_a_neon_katana_and_15135cef-d015-45ac-a5e9-5ef38c953c44.png?alt=media&token=d5c8db99-5176-4f9e-8e07-b5c1af2f7c59",
  },
  {
    name: "Variation 3",

    url:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/ZER__EC_Tough_Female_Futuristic_Samurai_with_a_neon_katana_and_15135cef-d015-45ac-a5e9-5ef38c953c44.png?alt=media&token=d5c8db99-5176-4f9e-8e07-b5c1af2f7c59",
  },
  {
    name: "Variation 4",

    url:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/ZER__EC_Tough_Female_Futuristic_Samurai_with_a_neon_katana_and_15135cef-d015-45ac-a5e9-5ef38c953c44.png?alt=media&token=d5c8db99-5176-4f9e-8e07-b5c1af2f7c59",
  },
];

const artworks = [
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 1",
    owner: "",
    state: "active",
    url:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/ZER__EC_Tough_Female_Futuristic_Samurai_with_a_neon_katana_and_15135cef-d015-45ac-a5e9-5ef38c953c44.png?alt=media&token=d5c8db99-5176-4f9e-8e07-b5c1af2f7c59",
    prompt: "Prompt 1",
    price: 33,
    variations,
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 2",
    owner: "",
    state: "active",
    url:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/ZER__EC_Tough_Female_Futuristic_Samurai_with_a_neon_katana_and_15135cef-d015-45ac-a5e9-5ef38c953c44.png?alt=media&token=d5c8db99-5176-4f9e-8e07-b5c1af2f7c59",
    prompt: "Prompt 2",
    price: 33,
    variations,
  },
];

export default function CreateArtwork() {
  useEffect(() => {
    createArtworks();
  }, []);

  // arrow function to create artwork
  const createArtworks = async () => {
    artworks.forEach(async (artwork) => {
      const docRef = await addDoc(collection(db, "artworks"), artwork);
      console.log("Document written with ID: ", docRef.id);

      const artworkRef = doc(db, "artworks", docRef.id);

      const colRef = collection(artworkRef, "variations");

      artwork.variations.forEach((variation) => {
        // add each variation to the artwork
        addDoc(colRef, variation);
      });
    });
  };
  return <div></div>;
}
