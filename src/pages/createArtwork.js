import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";
import { categories } from "../data/categories";

const portraitImgs = [
  "https://mj-gallery.com/71fbcac0-0cd4-4f5e-b268-65f12b94b386/grid_0.png",
  "https://mj-gallery.com/31ad34f3-82a3-4fa8-a40c-53b97c892a82/grid_0.png",
  "https://mj-gallery.com/43801740-618d-48fc-82ca-a5b65ee669cb/grid_0.png",
  "https://mj-gallery.com/d425cd4f-f6a0-4f02-bd33-670af6f287cd/grid_0.png",
  "https://mj-gallery.com/cfc81780-3776-42f0-acda-3c856cd637d7/grid_0.png",
  "https://mj-gallery.com/3c8bfd7d-89d1-4709-a016-2312bed8702a/grid_0.png",
];
const landscapeImgs = [
  "https://mj-gallery.com/9218c558-9d7a-4118-9df6-24f2de4d4ce6/grid_0.png",
  "https://mj-gallery.com/66f87693-184b-4576-a69b-5e6e7bc7ed9c/grid_0.png",
  "https://mj-gallery.com/af8da145-ad9c-40fb-863e-292276b3a947/grid_0.png",
  "https://mj-gallery.com/74c2a92e-948b-4251-b739-93f3fe57852e/grid_0.png",
  "https://mj-gallery.com/8b6acff4-1402-4ca0-8ed9-604e90036fdd/grid_0.png",
  "https://mj-gallery.com/13c84a99-4d4d-40fb-8598-5e4982916d14/grid_0.png",
];
const squareImgs = [
  "https://mj-gallery.com/b0cf6b15-35a7-4a56-8b29-6a2dffd952ba/grid_0.png",
  "https://mj-gallery.com/eb71c4f5-5015-4016-9ffb-79b472d226fd/grid_0.png",
  "https://mj-gallery.com/b2970698-58fa-49ee-83fc-caed01c186ec/grid_0.png",
  "https://mj-gallery.com/5a2c8c42-ce09-4bd1-b6ce-a189cb409f38/grid_0.png",
  "https://mj-gallery.com/4d9d3bd0-96bb-42c5-b801-68d29fb0c5e2/grid_0.png",
  "https://mj-gallery.com/f60f61c5-6f6e-466a-b82b-d962ca45e34e/grid_0.png",
];

const artworks = [
  { img: portraitImgs[0], aspectRatio: "portrait" },
  { img: portraitImgs[1], aspectRatio: "portrait" },
  { img: portraitImgs[2], aspectRatio: "portrait" },
  { img: portraitImgs[3], aspectRatio: "portrait" },
  { img: portraitImgs[4], aspectRatio: "portrait" },
  { img: portraitImgs[5], aspectRatio: "portrait" },
  { img: landscapeImgs[0], aspectRatio: "landscape" },
  { img: landscapeImgs[1], aspectRatio: "landscape" },
  { img: landscapeImgs[2], aspectRatio: "landscape" },
  { img: landscapeImgs[3], aspectRatio: "landscape" },
  { img: landscapeImgs[4], aspectRatio: "landscape" },
  { img: landscapeImgs[5], aspectRatio: "landscape" },
  { img: squareImgs[0], aspectRatio: "square" },
  { img: squareImgs[1], aspectRatio: "square" },
  { img: squareImgs[2], aspectRatio: "square" },
  { img: squareImgs[3], aspectRatio: "square" },
  { img: squareImgs[4], aspectRatio: "square" },
  { img: squareImgs[5], aspectRatio: "square" },
];

function getRandomTags() {
  const randomTags = ["all"];
  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * categories.length);
    randomTags.push(categories[randomIndex === 0 ? 1 : randomIndex].id);
  }
  return randomTags;
}

const getArtworks = () =>
  artworks.map((artwork, index) => ({
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: `Artwork ${index}`,
    state: "active",
    ArtworkImg: artwork.img,
    AspectRatio: artwork.aspectRatio,
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: getRandomTags(3),
    timestamp: Date.now(),
  }));

export default function CreateArtwork() {
  useEffect(() => {
    // nested functions each one with their own category
    createArtworks();
  }, []);

  // arrow function to create artwork
  const createArtworks = async () => {
    getArtworks().forEach(async (artwork) => {
      const docRef = await addDoc(collection(db, "artworks"), artwork);

      console.log("Document written with ID: ", docRef.id);

      // update the artwork using the updateDoc function
      const newDocRef = doc(db, "artworks", docRef.id);

      const res = await updateDoc(newDocRef, {
        id: docRef.id,
      });

      console.log("updated doc");
    });
  };
  return <div></div>;
}
