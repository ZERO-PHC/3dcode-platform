import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, doc, addDoc, updateDoc } from "firebase/firestore";

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
  "https://mj-gallery.com/13c84a99-4d4d-40fb-8598-5e4982916d14/grid_0.png"
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
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: portraitImgs[0],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "portrait",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: portraitImgs[1],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "portrait",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: portraitImgs[2],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "portrait",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: portraitImgs[3],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "portrait",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: portraitImgs[4],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "portrait",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: portraitImgs[5],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "portrait",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: landscapeImgs[0],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "landscape",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: landscapeImgs[1],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "landscape",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: landscapeImgs[2],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "landscape",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: landscapeImgs[3],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "landscape",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: landscapeImgs[4],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "landscape",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: landscapeImgs[5],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "landscape",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: landscapeImgs[6],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "landscape",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: squareImgs[0],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "square",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: squareImgs[1],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "square",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
  },
  {
    author: "zerø",
    authorUrl:
      "https://firebasestorage.googleapis.com/v0/b/flowty-14109.appspot.com/o/profileImage.jpg?alt=media&token=c73d72e1-946a-4c4c-b083-dcac3fcd92d3",
    name: "Artwork 6",
    state: "active",
    ArtworkImg: squareImgs[2],
    prompt: "Prompt 6",
    price: 33,
    AspectRatio: "square",
    SelectedEngine: "mid",
    reactionPoints: 0,
    tags: ["all"],
    timestamp: Date.now(),
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
