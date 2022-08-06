import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/router";
import { animated, useSpring, config } from "react-spring";
// import "@tensorflow/tfjs";
import * as toxicity from "@tensorflow-models/toxicity";

import { useAuth } from "../../contexts/AuthContext";
import { useTransaction } from "../../contexts/TransactionContext";

import Iconify from "../../components/Iconify";
import Navbar from "../../components/Navbar";
import TransactionComponent from "../../components/TransactionComponent";
import ArtworkPrompt from "../../components/ArtworkPrompt";
import ArtgridComponent from "../../components/ArtgridComponent";

import { db } from "../../firebase";
import {
  doc,
  updateDoc,
  onSnapshot,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";
import PromptSection from "../../sections/PromptSection";
import { TwitterAuthProvider } from "firebase/auth";
import PromptVariations from "../../sections/PromptVariations";
import AnimatedEmoticon from "../../components/AnimatedEmoticon";
import CommentComponent from "../../components/CommentComponent";
import CommentsSection from "../../sections/CommentsSection";
import SnackbarComponent from "../../components/SnackbarComponent";
import Spinner from "../../atoms/Spinner";

export default function ArtworkDetails({ windowDimensions }) {
  const { setMessage, setIsProcessing } = useTransaction();
  const { user, Coins, FirestoreUser } = useAuth();
  const router = useRouter();
  const { artworkId } = router.query;
  const [Loading, setLoading] = useState(false);
  const [Artwork, setArtwork] = useState(null);
  const [ArtworkImage, setArtworkImage] = useState();
  const [IsFavorite, setIsFavorite] = useState(false);
  const [IsAnimating, setIsAnimating] = useState(false);
  const variationsRef = React.useRef(null);
  const [Comment, setComment] = useState();
  const [Reaction, setReaction] = useState();
  const [result, setResult] = useState("");
  const [Comments, setComments] = useState([]);
  const [open, setOpen] = useState(true);

  const threshold = 0.9;

  useEffect(() => {}, []);

  const width = windowDimensions.width;
  const mobile = width < 768;

  // create a useEffect that will the artwork with the id of artworkId from the firestore database in realtime
  useEffect(() => {
    const artworkRef = doc(db, "artworks", artworkId);
    const unsub = onSnapshot(artworkRef, (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      // console.log(source, " data: ", doc.data());
      setArtwork(doc.data());
      setArtworkImage(doc.data().ArtworkImg);
      setLoading(false);
    });

    return () => {
      // clean up the listener
      unsub();
    };
  }, [user]);

  useEffect(() => {
    if (artworkId) {
      let collectionRef = collection(db, "artworks", artworkId, "comments");

      onSnapshot(collectionRef, (querySnapshot) => {
        // const comments = querySnapshot.docs.filter(
        //   (doc) => !doc.data().active
        // );
        const comments = querySnapshot.docs;

        const formattedComments = comments.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        console.log("formattedComments", formattedComments);
        setComments(formattedComments);
      });
    }
  }, [artworkId]);

  useEffect(() => {
    checkFavorites(FirestoreUser.bookmarkedArtworks);
  }, [FirestoreUser]);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  // useEffect(() => {
  //   const keyDownHandler = event => {
  //     console.log('User pressed: ', event.key);

  //     if (event.key === 'Enter') {
  //       event.preventDefault();

  //       // 👇️ your logic here
  //       handleCommentPost()
        
  //     }
  //   };

  //   document.addEventListener('keydown', keyDownHandler);

  //   return () => {
  //     document.removeEventListener('keydown', keyDownHandler);
  //   };
  // }, []);
  const getToxicity = async (model) => {
    setIsProcessing(true);
    setLoading(false);

    const sentences = [Comment];

    model.classify(sentences).then((predictions) => {
      // `predictions` is an array of objects, one for each prediction head,
      // that contains the raw probabilities for each input along with the
      // final prediction in `match` (either `true` or `false`).
      // If neither prediction exceeds the threshold, `match` is `null`.

      console.log("preds", predictions);

      // loop over predictions
      let toxicMatches = 0;
      predictions.forEach((prediction) => {
        // if prediction is true

        if (prediction.results[0].match) {
          console.log("toxic");
          toxicMatches++;
        } else {
          console.log("not toxic");
        }

        if (toxicMatches > 0) {
          setMessage("Toxic message");
        } else {
          setMessage("Posted Comment");
        }

        setTimeout(() => {
          setIsProcessing(false);
        }, 4000);
      });

      toxicMatches === 0 && postComment();
    });
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleKeyboardPost = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommentPost();
    }
  }


  const handleCommentPost = async () => {
    setLoading(true);
    console.log("loading model");

    // toxicity.load(threshold).then((model) => {
    //       getToxicity(model);
    //     });

    postComment();
    // const model = await toxicity.load(threshold);

    // console.log("loaded model");

    // getToxicity(model);

    // const artworkRef = doc(db, "artworks", artworkId);

    // const colRef = collection(artworkRef, "comments");

    // // artwork.variations.forEach((variation) => {
    // // add each variation to the artwork
    // addDoc(colRef, { Comment }).catch((error) => {
    //   console.log(error);
    // });

    // // });
    // console.log("added doc");
  };

  const postComment = async () => {
    const artworkRef = doc(db, "artworks", artworkId);

    const colRef = collection(artworkRef, "comments");

    addDoc(colRef, { Comment, read: false }).catch((error) => {
      console.log(error);
    });
    setComment("");

    setLoading(false);
    console.log("added doc");

    const userRef = doc(db, "users", user.email);

    const notifsRef = collection(userRef, "notifications");

    addDoc(notifsRef, {
      notification: "You have a new comment!",
      read: false,
      artworkId
    }).catch((error) => {
      console.log(error);
    });
    console.log("added notif doc");
  };

  // addUserPoints(FirestoreUser.points);
  const addUserPoints = async () => {
    const userRef = doc(db, "users", FirestoreUser.email);
    const userData = {
      coins: FirestoreUser.coins + 30,
    };

    try {
      await updateDoc(userRef, userData);
      console.log("added points");
      setMessage("You earned 30 points for this reaction!");
      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    } catch (error) {
      console.log(error);
      alert("Error adding points, try again later");
    }
  };

  const handleReactionPost = async (reaction) => {
    setIsProcessing(true);
    setMessage("loading");

    const userRef = doc(db, "users", user.email);

    const notifsRef = collection(userRef, "notifications");

    addDoc(notifsRef, {
      notification: "Someone reacted to your artwork!",
      read: false,
      artworkId
    }).catch((error) => {
      console.log(error);
    });
    console.log("added notif doc");

    // update the reaction on the reactions object of the ArtworkId
    const artworkRef = doc(db, "artworks", artworkId);
    // const reactionsRef = collection(artworkRef, "reactions");

    const artworkReactions = await getArtworkReactions();
    console.log("artworkReactions", artworkReactions);

    const reactionData = {
      reactions: [...artworkReactions, reaction],
    };
    updateDoc(artworkRef, reactionData)
      .then(() => {
        console.log("reaction added");
        setTimeout(() => {
          setIsProcessing(false);
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });

    const colRef = collection(db, "reactions");

    // artwork.variations.forEach((variation) => {
    // add each variation to the artwork
    addDoc(colRef, { reaction, points: 3 })
      .then(() => {
        addUserPoints();
        // setMessage("You earned 3 points for reacting to this artwork!");

        // set processing true
      })
      .catch((error) => {
        console.log(error);
      });

    // });
    console.log("added doc");
  };

  const getArtworkReactions = async () => {
    const artworkRef = doc(db, "artworks", artworkId);

    try {
      const doc = await getDoc(artworkRef);
      console.log("doc", doc.data().reactions);
      return doc.data().reactions;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const inputProps = {
    handleCommentChange,
    handleCommentPost,
    handleKeyboardPost,
    Comment,
    Loading,
  };

  const checkFavorites = (favorites) => {
    console.log("favorites", favorites);
    if (favorites) {
      if (favorites.includes(artworkId)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  };

  // create a function called handleBuy
  const handleBuy = async () => {
    L(true);
    // if (Coins >= Artwork.price && !Artwork.purchased) {
    if (Coins >= Artwork.price) {
      // update the artwork to have the purchased property set to true that is on the artworks firestore collection
      const artworkRef = doc(db, "artworks", artworkId);
      await updateDoc(artworkRef, {
        purchased: true,
        owner: user.email,
      }).catch((err) => console.log(err));

      // add the artwork to the user's collection of purchased artworks
      const userRef = doc(db, "users", user.email);
      // console.log("firestore user", FirestoreUser.purchasedArtworks);
      await updateDoc(userRef, {
        purchasedArtworks: [...FirestoreUser.purchasedArtworks, artworkId],
        coins: Coins - Artwork.price,
      }).catch((err) => console.log(err));

      // L(false);
    } else {
      alert("You don´t have enough coins");
    }
  };

  // create a function called handleAddFavorite that will add the artwork to the user's favorites
  const handleAddFavorite = async () => {
    // add the artwork to the user's collection of favorites
    const userRef = doc(db, "users", user.email);
    console.log("FirestoreUser", FirestoreUser);
    await updateDoc(userRef, {
      bookmarkedArtworks: [...FirestoreUser?.bookmarkedArtworks, artworkId],
    }).catch((err) => console.log(err));
  };

  const promptStyles = useSpring({
    opacity: IsAnimating ? 1 : 0,
    transform: IsAnimating ? "translateX(0%) " : "translateX(50%) ",
    delay: 500,
    // config: { duration: 500, tension: 100, friction: 200, mass: 1 },
    config: config.molasses,
  });

  const variationsAnimation = useSpring({
    opacity: IsAnimating ? 1 : 0,
    transform: IsAnimating ? "translateX(0%) " : "translateX(-50%) ",
    delay: 500,
    config: config.molasses,
    // config: { duration: 500, tension: 100, friction: 200, mass: 1 },
  });

  // create a useSpring hook with a config with a delay of 2000
  // const logoAnimation = useSpring({
  //   opacity: IsAnimating ? 1 : 0,
  //   transform: IsAnimating ? "translateX(0%) " : "translateX(50%) ",
  //   config: { delay: 2000 },

  const artworkAnimation = useSpring({
    opacity: IsAnimating ? 1 : 0,

    scale: IsAnimating ? 1 : 0.5,
    delay: 1000,
    config: config.molasses,
  });

  const promptAnimation = useSpring({
    opacity: true ? 1 : 0,
    fontSize: "0.9rem",
    delay: 500,
    config: config.molasses,
  });

  const placeholderAnimation = useSpring({
    opacity: !true ? 1 : 0,
    fontSize: "0.9rem",
    config: config.molasses,
    paddingLeft: "0.5rem",
  });

  const buyBtnAnimation = useSpring({
    opacity: true ? 0 : 1,
  });

  const downloadBtnAnimation = useSpring({
    opacity: true ? 1 : 0,
    width: true ? "44%" : "0%",
    config: config.molasses,
    delay: 1000,
  });

  if (Artwork && Comments !== [])
    return (
      <>
        <MainWrapper>
          <div
            style={{
              height: "100%",
              width: "100%",
              position: "fixed",
              top: "0",
              background: "black",
            }}
          >
            <Image
              style={{
                filter: "blur(12px)",
                opacity: 0.5,
                position: "sticky",
                top: "0",
              }}
              src={ArtworkImage}
              layout="fill"
              objectFit="cover"
              objectPosition="center"
              placeholder="blur"
              blurDataURL="/assets/placeholder.png"
              alt="artwork"
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: `${mobile ? "column" : "row"}`,
              justifyContent: `${!mobile ? "space-evenly" : null}`,
              alignItems: `${!mobile ? "end" : "center"}`,
              width: "100vw",
              height: `${!mobile ? "100%" : null}`,
              position: "relative",
            }}
          >
            <main
              style={{
                height: "100%",
                width: "30%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "80%",
                  height: "100%",
                  justifyContent: "end",
                  marginBottom: "6rem",
                  alignItems: "center",
                }}
              >
                <ReactionsWrapper style={promptStyles}>
                  <PromptOverlay>
                    <section
                      style={{
                        position: "absolute",
                        top: "3px",
                        left: "10px",
                        height: "2.8rem",
                        zIndex: "1",
                      }}
                    >
                      <ReactionsTitle>REACTIONS</ReactionsTitle>
                      <Underline />
                    </section>

                    <section style={{ display: "flex", width: "100%" }}>
                      <div style={{ width: "50%" }}>
                        <AnimatedEmoticon
                          artboard={"Mindblown"}
                          handleReactionPost={() =>
                            handleReactionPost("mindblown")
                          }
                        />
                        <AnimatedEmoticon
                          artboard={"joy"}
                          handleReactionPost={() =>
                            handleReactionPost("lol")
                          }
                        />
                        <AnimatedEmoticon
                          artboard={"meh"}
                          handleReactionPost={() =>
                            handleReactionPost("meh")
                          }
                        />
                      </div>

                      <div style={{ width: "50%" }}>
                        <AnimatedEmoticon
                          artboard={"Onfire"}
                          handleReactionPost={() =>
                            handleReactionPost("fire")
                          }
                        />
                        <AnimatedEmoticon
                          artboard={"love"}
                          handleReactionPost={() =>
                            handleReactionPost("love")
                          }
                        />
                        <AnimatedEmoticon
                          artboard={"Onfire"}
                          handleReactionPost={() =>
                            handleReactionPost("trash")
                          }
                        />
                      </div>
                    </section>
                  </PromptOverlay>
                </ReactionsWrapper>
              </div>
            </main>
            <ArtworkContainer mobile={mobile} style={artworkAnimation}>
              <Image
                src={ArtworkImage}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                placeholder="blur"
                blurDataURL="/assets/placeholder.png"
                alt="artwork"
              />
              {/* <ArtworkDetailsWrapper> */}
              <Header>
                <FavoriteWrapper onClick={handleAddFavorite}>
                  <Iconify
                    icon={!IsFavorite ? "mdi-bookmark-outline" : "mdi-bookmark"}
                  />
                </FavoriteWrapper>

                <ArtworkTitle>
                  {Artwork.name.toUpperCase()}
                  <Underline />
                </ArtworkTitle>
              </Header>

              <Overlay />
            </ArtworkContainer>
            <CommentsSection
              animation={variationsAnimation}
              {...inputProps}
              comments={Comments}
            />
          </div>
          <AuthorContainer>
            {/* <AuthorName>{Artwork.author.toUpperCase()}</AuthorName> */}
            <AuthorName>{Artwork.author.toUpperCase()}</AuthorName>
            <div style={{ height: "4.5rem" }}></div>
            <div
              style={{ position: "absolute", bottom: "1.7rem", zIndex: "2" }}
            >
              <Avatar>
              <svg width="2.4rem" height="2.4rem" viewBox="0 0 72 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M55.3199 66.382L55.3201 66.285C55.3201 53.8012 46.6457 43.6812 35.9454 43.6812C25.245 43.6812 16.5707 53.8012 16.5707 66.285L16.5707 66.312C6.60339 59.91 0 48.7261 0 36C0 16.1177 16.1177 0 36 0C55.8823 0 72 16.1177 72 36C72 48.7727 65.3483 59.9917 55.3199 66.382ZM22.7484 31.3223C23.8232 37.6715 29.349 42.5069 36.0041 42.5069C43.4295 42.5069 49.449 36.4874 49.449 29.062C49.449 21.6366 43.4295 15.6172 36.0041 15.6172C30.8627 15.6172 26.3953 18.5031 24.1335 22.7434C25.1523 22.0953 25.948 23.3626 25.9292 25.6566C25.9098 28.0236 25.0305 30.5872 23.9653 31.3827C23.5002 31.73 23.0765 31.6828 22.7484 31.3223ZM28.1133 27.0044C28.092 29.5983 29.3989 31.4914 31.0322 31.2327C32.6655 30.974 34.0068 28.6615 34.0281 26.0676C34.0494 23.4736 32.7426 21.5806 31.1092 21.8393C29.4759 22.0979 28.1346 24.4105 28.1133 27.0044Z" fill="black" />
                  </svg>
              </Avatar>
            </div>

            <Avatar>
              <Image
                style={{ borderRadius: "50px", border: "2px solid black" }}
                src={
                  Artwork.SelectedEngine === "mid"
                    ? "https://pbs.twimg.com/profile_images/1500078940299272198/quB4bgi9_400x400.jpg"
                    : "https://pbs.twimg.com/profile_images/1500078940299272198/quB4bgi9_400x400.jpg"
                }
                width={100}
                height={100}
                layout="fill"
                alt="avatar"
              />
            </Avatar>
          </AuthorContainer>
        </MainWrapper>
      </>
    );
}

const MainWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  padding: 0;
`;

const ReactionsWrapper = styled(animated.div)`
  height: 70%;
  width: 100%;
  background: rgba(130, 132, 135, 0.23);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  color: white;
  position: relative;
`;

const PromptOverlay = styled.div`
  position: sticky;
  top: 0px;
  z-index: 1;
  width: 100%;
  height: 80%;
  background: linear-gradient(180deg, black 10%, rgba(130, 132, 135, 0) 100%);
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const Overlay = styled(animated.div)`
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 20%,
    rgba(0, 0, 0, 0) 100%
  );
  height: 100%;
  width: 100%;
  position: absolute;
  // border-radius: 0.8rem;
  bottom: 0;
  z-index: 1;
`;

// create a styled component called AuthorName that has a rotation of -90deg the the is vertical
const AuthorName = styled.div`
  font-size: 0.7rem;
  font-weight: bold;
  color: lightgrey;
  transform: rotate(-90deg);
  text-align: center;
  // height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  padding: 0;
  margin: 0;
`;

// create a styled component called Avatar that is a circle with a background image
const Avatar = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: white;
  margin-right: 0.5rem;
  border: 1px solid white;

  @media (max-width: 768px) {
    width: 1.8rem;
    height: 1.8rem;
  }

  @media (max-width: 480px) {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

// create a styled component called AuthorContainer that has a height of 20% and a width of 100% and  a right alignment
const AuthorContainer = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 10px;
  color: white;
  // height: 19%;
  width: 2%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
  font-size: 0.8rem;
  font-family: "Monument", sans-serif;
  text-align: right;

  @media (max-width: 768px) {
    height: 100%;
    width: 100%;

    position: sticky;
    bottom: 0;
    right: 0;
  }

  @media (max-width: 480px) {
    height: 100%;
    width: 100%;
    position: -webkit-sticky;
    position: sticky;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    right: 10px;
    justify-content: center;
    align-items: self-end;
  }
`;

// create a styled component called FavoriteWrapper that has a background color of white and a border radius of 50px with a height of 3 rem and a width of 3 rem
const FavoriteWrapper = styled.div`
  position: absolute;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50px;
  height: 2.4rem;
  width: 2.4rem;
  top: 0.5rem;
  right: 0.7rem;
  cursor: pointer;
`;

// create a img styled component  called ArtworkBackground that has a blurred  image
const ArtworkBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(10px);
  z-index: -1;
  object-fit: cover;
`;

// create some keyframes for the scale animation of the ArtworkContainer
const scale = keyframes`

  0% {
    transform: scale(0.5);
  }

  100% {
    transform: scale(1);
  }
`;

// create some keyframes to animate and move in the x axis
const moveX = keyframes`

  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-100%);
  }
`;

// create a fadeIn animation with keyframes
const fadeIn = keyframes`
0% {
  opacity: 0;
  }
  100% {
    opacity: 1;
    }
    `;

// create a styled component that implement the fadeIn animation and the scale animation

const ArtworkContainer = styled(animated.div)`
  display: flex;
  color: white;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  transform: scale(0.5);
  height: 86%;
  width: 30rem;
  position: relative;
  margin-bottom: 1rem;
  margin-top: 0rem;
  @media (max-width: 768px) {
    height: auto;
    width: 100vw;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: left;
    height: 80%;
    width: 10rem;
    position: relative;
    overflow: hidden;
  }

  @media (max-width: 480px) {
    height: 40rem;
    width: 40rem;
    background-size: cover;

    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-blend-mode: multiply;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 80%;
    position: relative;
    overflow: hidden;
  }
`;

// create the underline component that has a white skewed rectangle that is 40% of the width of the artwork container
const Underline = styled.div`
  width: 20%;
  height: 0.2rem;
  background-color: white;
  transform: skewX(-20deg);
  left: 0;
  @media (max-width: 768px) {
    width: 50%;
    height: 0.5rem;
    background-color: white;
    transform: skewX(-20deg);
  }
  @media (max-width: 480px) {
    width: 50%;
    height: 0.3rem;
    background-color: white;
    transform: skewX(-20deg);
  }
`;

// create a styled component called ArtworkTitle that has a font size of 3rem and a font weight of bold a text align of left a width of 100 a height of 30%
const ArtworkTitle = styled.h1`
  font-family: "Monument", sans-serif;
  letter-spacing: 0.1rem;
  position: relative;
  font-size: 1.2rem;
  text-align: left;
  width: 100%;
  height: 10%;
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
const ReactionsTitle = styled.h1`
  font-family: "Monument", sans-serif;
  letter-spacing: 0.1rem;
  position: relative;
  font-size: 1rem;
  text-align: left;
  width: 100%;
  height: 10%;
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

// create header component that has a row
const Header = styled.div`
  display: flex;
  z-index: 2;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 10%;
  padding-left: 1rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
  }
`;

// create a component called BackButton that has a white background a border radius us 50 px and a center alignment
const BackButton = styled.div`
  background-color: black;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  height: 2rem;
  width: 2rem;
  border: 2px solid #b6b6b6;
  padding: 0.5rem;
  @media (max-width: 768px) {
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
  }
  @media (max-width: 480px) {
    background-color: white;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
  }
`;

{
  /* <text y='216%' x='-70%'></text> */
}
// create a styled component called VariationsWrapper that aligns all the items to the left side and has a width of 100% and a height of 20%

// create a styled component called ArtworkDetailsWrapper that has a width of 40% a max--width of 40% and a black gradient background color from left to right
const ArtworkDetailsWrapper = styled.div`
  padding: 0rem 1rem;
  height: 80%;
  width: 40%;
  max-width: 40%;

  @media (max-width: 768px) {
    width: 100%;
    max-width: 100%;
  }
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
  }
`;
