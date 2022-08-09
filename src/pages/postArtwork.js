import React, { useState, useEffect } from "react";
import Image from "next/image";
// imoport styled and keyframes from the styled-components library
import styled from "styled-components";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import { useAuth } from "../contexts/AuthContext";
import Iconify from "../components/Iconify";
import Spinner from "../atoms/Spinner";

import { collection, doc, addDoc, updateDoc } from "firebase/firestore";

// import useImage from the hooks folder
import { useImage } from "../hooks/useImage";

import { db } from "../firebase";
import ArtgridComponent from "../components/ArtgridComponent";
import { categories } from "../data/categories";
import VerticalSpace from "../atoms/VerticalSpace";
import Header from "../components/Header";

const images = [
  {
    id: 0,
    src:
      "https://mj-gallery.com/8d24ecb9-560f-4d95-9499-3a700932a372/grid_0.png",
    selected: false,
  },
  {
    id: 1,
    src:
      "https://mj-gallery.com/62f649d3-fc1f-4042-8bc5-1ad63da57497/grid_0.png",
    selected: false,
  },
  {
    id: 2,
    src:
      "https://mj-gallery.com/a7f943be-7992-4cfa-8c04-aebf9f801c8e/grid_0.png",
    selected: false,
  },
];

export default function PostArtwork() {
  const router = useRouter();
  const [Loading, setLoading] = React.useState(false);
  const { user, FirestoreUser } = useAuth();
  const [Description, setDescription] = useState();
  const [ArtworkImg, setArtworkImg] = useState("");
  const [SelectedEngine, setSelectedEngine] = useState("mid");
  const [Tags, setTags] = useState(categories);
  const [Images, setImages] = useState(images);
  const [Artwork, setArtwork] = useState({ ArtworkImg, SelectedEngine, Tags });
  const { hasLoaded, hasError, AspectRatio } = useImage(ArtworkImg);
  console.log("hasLoaded", hasLoaded, AspectRatio);

  const imgRef = React.useRef(null);

  useEffect(() => {
    console.log("imgRef", imgRef.current);
    // get the dimensions of the image from the url
  }, [ArtworkImg]);

  // create a function that returns a log out icon
  const LogoutIcon = () => {
    // import the iconify component with an logout icon prop
    return <Iconify icon="mdi-upload" />;
  };

  const handleArtworkSelection = (artwork) => {
    console.log("artwork selected: ", artwork);
    // setSelectedArtwork(artwork);
    // setShowDialog(true);
    router.push(`/artwork/${artwork.id}`);
  };

  const handleEngineSelection = (engine) => {
    setSelectedEngine(engine);
  };

  // function that updates the tags array to selected or not selected

  const handleTagSelection = (tag) => {
    const newTags = Tags.map((t) => {
      if (t.id === tag.id) {
        t.selected = !t.selected;
      }
      return t;
    });
    setTags(newTags);
  };

  const handleUrlInput = (e) => {
    // get the first 6 characterts of the event.target.value

    // check if the e.target.value includes labs.openai.com in the url
    // if it does, then set the artworkImg to the e.target.value
    // if it doesn't, then set the artworkImg to the e.target.value
    // if the e.target.value is empty, then set the artworkImg to the default image
    if (e.target.value.includes("labs.openai.com")) {
      setSelectedEngine("openai");
      setArtworkImg(e.target.value);
    } else if (e.target.value.includes("mj-gallery.com")) {
      setSelectedEngine("mid");
      setArtworkImg(e.target.value);
    } else {
      setArtworkImg(e.target.value);
      setSelectedEngine("");
    }

    const characters = e.target.value.substring(8, 16);
    console.log("first six characters: ", characters);
  };

  const getSelectedTags = () => {
    const selectedTags = Tags.filter((tag) => tag.selected);

    console.log("selected tags", selectedTags);
    const selectedTagsIds = selectedTags.map((tag) => tag.id);

    return selectedTagsIds;
  };

  // function called handlePost that takes in the artwork object and sends it to the database
  const handlePost = async () => {
    setLoading(true);

    const artwork = {
      tags: getSelectedTags(),
      ArtworkImg,
      SelectedEngine,
      AspectRatio,
      name: Description,
      state: "active",
      author: FirestoreUser.name,
      reactionPoints: 0,
      reactions: [],
      timestamp: Date.now(),
    };

    try {
      const docRef = await addDoc(collection(db, "artworks"), artwork);

      console.log("Document written with ID: ", docRef.id);

      resetTags();

      // update the user's artworks array with the new artwork

      const userRef = doc(db, "users", user.email);
      console.log("FirestoreUser", FirestoreUser);
      await updateDoc(userRef, {
        postedArtworks: [...FirestoreUser?.postedArtworks, docRef.id],
      }).catch((err) => console.log(err));
      console.log("updated doc");

      setLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }

    // redirect the user to the home page
    router.push("/");
  };

  const resetTags = () => {
    const newTags = Tags.map((t) => {
      t.selected = false;
      return t;
    });
    setTags(newTags);
  };

  const EngineDisplay = () => {
    if (SelectedEngine === "mid") {
      return (
        <section
          className={
            SelectedEngine === "mid" ? "ai-selected-container" : "ai-container"
          }
          onClick={() => handleEngineSelection("mid")}
        >
          <div className="avatar-box">
            <Image
              src={
                "https://pbs.twimg.com/profile_images/1500078940299272198/quB4bgi9_400x400.jpg"
              }
              layout="fill"
              alt="avatar"
              style={{ borderRadius: "50px" }}
            />
          </div>
          <div style={{ marginLeft: "1rem" }}>Midjourney</div>
        </section>
      );
    } else if (SelectedEngine === "openai") {
      return (
        <section
          className={
            SelectedEngine !== "mid" ? "ai-selected-container" : "ai-container"
          }
          onClick={() => handleEngineSelection("open")}
        >
          <div className="avatar-box">
            <svg
              id="openai-symbol"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 51 51"
            >
              <path d="M47.21,20.92a12.65,12.65,0,0,0-1.09-10.38A12.78,12.78,0,0,0,32.36,4.41,12.82,12.82,0,0,0,10.64,9a12.65,12.65,0,0,0-8.45,6.13,12.78,12.78,0,0,0,1.57,15A12.64,12.64,0,0,0,4.84,40.51a12.79,12.79,0,0,0,13.77,6.13,12.65,12.65,0,0,0,9.53,4.25A12.8,12.8,0,0,0,40.34,42a12.66,12.66,0,0,0,8.45-6.13A12.8,12.8,0,0,0,47.21,20.92ZM28.14,47.57a9.46,9.46,0,0,1-6.08-2.2l.3-.17,10.1-5.83a1.68,1.68,0,0,0,.83-1.44V23.69l4.27,2.47a.15.15,0,0,1,.08.11v11.8A9.52,9.52,0,0,1,28.14,47.57ZM7.72,38.85a9.45,9.45,0,0,1-1.13-6.37l.3.18L17,38.49a1.63,1.63,0,0,0,1.65,0L31,31.37V36.3a.17.17,0,0,1-.07.13L20.7,42.33A9.51,9.51,0,0,1,7.72,38.85Zm-2.66-22a9.48,9.48,0,0,1,5-4.17v12a1.62,1.62,0,0,0,.82,1.43L23.17,33.2,18.9,35.67a.16.16,0,0,1-.15,0L8.54,29.78A9.52,9.52,0,0,1,5.06,16.8ZM40.14,25,27.81,17.84l4.26-2.46a.16.16,0,0,1,.15,0l10.21,5.9A9.5,9.5,0,0,1,41,38.41v-12A1.67,1.67,0,0,0,40.14,25Zm4.25-6.39-.3-.18L34,12.55a1.64,1.64,0,0,0-1.66,0L20,19.67V14.74a.14.14,0,0,1,.06-.13L30.27,8.72a9.51,9.51,0,0,1,14.12,9.85ZM17.67,27.35,13.4,24.89a.17.17,0,0,1-.08-.12V13a9.51,9.51,0,0,1,15.59-7.3l-.3.17-10.1,5.83a1.68,1.68,0,0,0-.83,1.44Zm2.32-5,5.5-3.17L31,22.35v6.34l-5.49,3.17L20,28.69Z"></path>
            </svg>
          </div>
          <div style={{ marginLeft: "1rem" }}>DALL·E 2</div>
        </section>
      );
    } else {
      return <section></section>;
    }
  };

  // if (Loading) {
  //   return <div>Loading...</div>;
  // }

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSelectedImage = (src) => {
    setArtworkImg(src);
    // update the Images array with the selected image
    // const newImages = Images.map((i) => {
    //   if (i.id === id) {
    //     i.selected = true;
    //   } else {
    //     i.selected = false;
    //   }
    //   return i;
    // });
    // setImages(newImages);
  };

  const ImgOption = ({image}) => {
    const { hasLoaded, hasError, AspectRatio } = useImage(image.src);

    return (
      <>
      <Header/>
      <div
        onClick={() => handleSelectedImage(image.src)}
        style={{ display: "flex" }}
      >
        {hasLoaded ? (
          <img
            src={image.src}
            style={{
              objectFit: "contain",
              height: "4rem",
              border: "2px solid black",
            }}
            alt="artwork"
          />
        ) : (
          <div style={{ height: "4rem" }}>
            <div
              style={{
                height: "4rem",
                width: "3rem",
                backgroundColor: "black",
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner />
            </div>
          </div>
        )}
      </div>
      </>
    );
  };

  const ImagesOptions = () => {
    return Images.map((image, i) => {
      return <ImgOption key={i} image={image} />;
    });
  };

  return (
    <MainWrapper>
      {/* <Container> */}
      <div className="left-side">
        <section style={{ height: "10%" }}>
          <ArtworkTitle>NAME / DESCRIPTION</ArtworkTitle>
          <Underline />
        </section>
        <div>
          <input
            value={Description}
            onChange={handleDescriptionChange}
            placeholder="Awesome artwork rendition"
          ></input>
          <div style={{ width: "0.5rem" }}></div>
          {/* <PrimaryBtn onClick={logout}>
            Logout
            <LogoutIcon />
          </PrimaryBtn> */}
        </div>

        <div
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-evenly",
          }}
        ></div>
        <VerticalSpace height={"1rem"} />
        <section style={{ height: "9%" }}>
          <ArtworkTitle>SELECT ARTWORK</ArtworkTitle>
          <Underline />
        </section>
        <section
          style={{
            display: "flex",
            width: "80%",
            justifyContent: "space-around",
          }}
        >
          <ImagesOptions />
        </section>

        {/* <div>
          <input
            onChange={handleUrlInput}
            value={ArtworkImg}
            placeholder="https://mj-gallery.com/..."
          ></input>
          <div style={{ width: "0.5rem" }}></div>
        </div> */}
        <section
          style={{
            height: "10%",
            display: "flex",
            alignItems: "center",
            width: "80%",
            justifyContent: "end",
          }}
        >
          {/* <EngineDisplay /> */}
        </section>
        <section style={{ height: "10%" }}>
          <ArtworkTitle>TAGS (OPTIONAL)</ArtworkTitle>
          <Underline />
        </section>
        <section className="tags-section">
          {Tags.map((tag, index) => (
            <div
              key={index}
              className={
                tag.selected ? "selected-tag-container" : "tag-container"
              }
              onClick={() => handleTagSelection(tag)}
            >
              {tag.name}
            </div>
          ))}
        </section>
      </div>
      <div className="right-side">
        <main
          style={{
            width: "100%",
            textAlign: "left",
            padding: "0rem 2rem",
            margin: "3rem 0rem",
          }}
        >
          <ArtworkTitle>PREVIEW</ArtworkTitle>
          <Underline />
        </main>
        <section
          style={{
            // border: "2px solid black",
            height: "50%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {ArtworkImg && SelectedEngine ? (
            <div style={{ height: "100%" }}>
              <img
                ref={imgRef}
                style={{
                  border: "4px solid black",
                  width: "100%",
                  height: "100%",
                }}
                src={ArtworkImg}
                alt="img"
              />
            </div>
          ) : (
            <Iconify size="16rem" icon={"fa-image"} />
          )}
        </section>
        <section style={{ margin: "2rem 0rem" }}>
          <PrimaryBtn onClick={handlePost}>
             {"POST"}
            <div style={{ width: "0.5rem" }}></div>
            {Loading ? <Spinner /> : <LogoutIcon />}

            
          </PrimaryBtn>
        </section>
      </div>
    </MainWrapper>
  );
}

const PackWrapper2 = styled.div`
  height: 20rem;
  width: 16rem;
  background: linear-gradient(
    180deg,
    #0f9cec -32.64%,
    rgba(0, 0, 0, 1) 101.55%
  );
  border-radius: 0.5rem;
`;
const PackWrapper3 = styled.div`
  height: 20rem;
  width: 16rem;

  border-radius: 0.5rem;
`;

const PacksRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const PacksWrapper = styled.section`
  height: 60%;
  display: flex;
  flex-direction: column;
`;

const PrimaryBtn = styled.div`
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  color: white;
  padding: 0.5rem 2.4rem;
  font-family: "Monument";
  text-transform: uppercase;

  font-size: 1.4rem;
  border: 2px solid #b6b6b6;
  border-radius: 40px;

  & button {
    display: none;
    padding: 5px 15px;
    margin: 0px 10px;
    border-radius: 10px;
    font-family: "Monument";
    font-size: 0.7rem;
    transition: 1s;
  }

  &:hover {
    cursor: pointer;

    & button {
      display: flex;
    }
  }
`;

// create a styled component called BalanceWrapper that has a font-size of 6rem a height of 20% and a width of 100%
const BalanceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100vw;
  height: 16%;
  font-size: 2rem;
  color: black;
  text-shadow: 0 0 0.2rem #000;

  @media (max-width: 768px) {
    font-size: 4rem;
  }
`;

const Underline = styled.div`
  width: 6%;
  height: 0.2rem;
  background-color: black;
  transform: skewX(-20deg);
  left: 0;
  @media (max-width: 768px) {
    width: 10%;
    height: 0.5rem;
    background-color: black;
    transform: skewX(-20deg);
    bottom: 0;
    left: 0;
  }
  @media (max-width: 480px) {
    width: 10%;
    height: 0.5rem;
    background-color: black;
    transform: skewX(-20deg);
    bottom: 0;
    left: 0;
  }
`;

const ArtworkTitle = styled.h1`
  font-family: "MonumentBold", sans-serif;
  letter-spacing: 0.1rem;
  position: relative;
  font-size: 1.2rem;
  text-align: left;
  width: 100%;
  height: 20%;
  @media (max-width: 768px) {
    font-size: 1.6rem;
    font-weight: bold;
    text-align: left;
    width: 100%;
    height: 30%;
  }
  @media (max-width: 480px) {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: left;
    width: 100%;
    height: 30%;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  padding: 0rem 12rem;
  margin-top: 4em;
  height: 100vh;
  flex-direction: row;
  align-items: center;
  background-color: white;

  .tags-section {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 20%;
    flex-wrap: wrap;
  }

  .selected-tag-container {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 2rem;
    background-color: black;
    color: white;
    border-radius: 50px;
    margin: 0.5rem;
    font-size: 0.7rem;
    text-transform: uppercase;
  }
  .tag-container {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 2rem;
    color: black;
    border: 2px solid black;
    border-radius: 50px;
    margin: 0.5rem;
    font-size: 0.7rem;
    text-transform: uppercase;
  }

  //   padding: 0;

  .left-side {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    padding: 3rem 1rem;
    width: 50%;
    height: 100%;
  }

  .right-side {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 50%;
    height: 100%;
  }

  .ai-selected-container {
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // width: 80%;
    background-color: black;
    color: white;
    margin-right: 0.5rem;
    font-family: "Monument";
    text-transform: uppercase;
    cursor: pointer;

    font-size: 1rem;
    height: 2.3rem;
    padding-left: 0rem;
    padding-right: 1rem;
    // border: 2px solid #b6b6b6;
    border-radius: 40px;
  }

  .ai-container {
    position: relative;
    z-index: 100;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    // width: 80%;
    color: black;
    margin-right: 0.5rem;
    font-family: "Monument";
    text-transform: uppercase;

    font-size: 1rem;
    height: 2.3rem;
    padding-left: 0rem;
    padding-right: 1rem;
    border: 2px solid black;
    border-radius: 40px;
  }

  .avatar-box {
    position: relative;
    height: 2.3rem;
    width: 2.3rem;
    border-radius: 50px;
    background-color: white;
    color: white;
    border: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: -0.2rem;
    margin-left: -0.2rem;
  }

  // create an input that has a placeholder of "The title of my artwork" with a light grey of 2 px when it is not focused and a black of 2 px when it is focused
  input {
    width: 100%;
    height: 100%;
    border: 2px solid #b6b6b6;
    border-radius: 12px;
    font-family: "Monument", sans-serif;
    font-size: 1.2rem;
    text-align: left;
    padding: 0.5rem;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    background-color: #fafafa;
    color: black;
    text-shadow: 0 0 0.1rem #000;
    &:focus {
      outline: none;
      border: 2px solid black;
    }
  }
`;

const Container = styled.div`
  width: 70%;
  //   padding: 2rem 0rem;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
