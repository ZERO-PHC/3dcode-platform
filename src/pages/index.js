import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Tabs from "../sections/Tabs";
import SamplerContent from "../sections/SamplerContent";
import MySamplers from "../sections/MySamplers";

import { useAuth } from "../contexts/AuthContext";
import { useNFTs } from "../contexts/NftsContext";

import { rarities } from "../rarities";

import styled from "styled-components";

import { Icon } from "@iconify/react";
// import the next router object
import { useRouter } from "next/router";

import { artworks } from "../artworks";
import Image from "next/image";
import { categories } from "../categories";

import TransactionComponent from "../components/TransactionComponent";
import ArtgridComponent from "../components/ArtgridComponent";
import Iconify from "../components/Iconify";
// create and array of 20 items

// create a dialog component that show the details of the artwork selected that animates in and out
const Dialog = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;

  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);

  z-index: 10;
  animation: fadeIn 0.5s ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-direction: normal;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

// create a component that renders the artwork details that animates in and out with 2 divs in a row  with border radius and a white background
const ArtworkDetails = styled.div`
  position: relative;
  width: 46%;
  top: 5%;
  left: -4%;

  height: 80%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  animation: fadeIn 0.5s ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-play-state: running;
  animation-fill-mode: forwards;
  animation-duration: 0.5s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const PromptDetails = styled.div`
  position: relative;
  padding: 1rem;
  padding-top: 3rem;
  width: 26%;
  top: 5%;
  left: -6%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: white;
  animation: fadeIn 0.5s ease-in-out;
  animation-fill-mode: forwards;
  animation-delay: 0.5s;
  animation-timing-function: ease-in-out;
  animation-iteration-count: 1;
  animation-direction: normal;
  animation-play-state: running;
  animation-fill-mode: forwards;
  animation-duration: 0.5s;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

// create and array of object of the categories of an art gallery
// import the categories from the categories.js file

// create an array of objects called icons that have a name, id, color, background, border, text, and icon
const icons = [
  {
    name: "Art",
    id: "art",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "akar-icons:heart",
    active: true,
  },
  {
    name: "Craft",
    id: "craft",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "🧪",
    active: false,
  },
];

// create an array of objects called prompts that have a name, id, color, background, border, text, and icon

// create an array of 4 objects called icons that have a name, id, color, background, border, text, and icon  that are used to create the 4 tabs in the sampler
const prompts = [
  {
    name: "favorite",
    id: "art",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "akar-icons:heart",
    active: true,
  },
  {
    name: "buy",
    id: "craft",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "icon-park-outline:buy",
    active: false,
  },
  {
    name: "close",
    id: "technology",
    color: "#f5f5f5",
    background: "#f5f5f5",
    border: "#f5f5f5",
    text: "#f5f5f5",
    icon: "ep:close-bold",
    active: false,
  },
];

export default function Home() {
  const { user } = useAuth();
  const { getSamplers, SelectedRarity, Samplers } = useNFTs();
  const [Categories, setCategories] = useState(categories);
  const [Artworks, setArtworks] = useState(artworks);
  const [ShowDialog, setShowDialog] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState("2D");
  const [SelectedArtwork, setSelectedArtwork] = useState(null);

  const router = useRouter();

  useEffect(() => {
    if (user) getSamplers(user?.addr);
  }, [user]);

  // create a styled component that renders a skewed rectangle that is black if is active or grey if not
  const StyledRectangle = styled.div`
    width: ${(props) => (props.active ? "6rem" : "3rem")};
    height: 0.2rem;
    background: ${(props) => (props.active ? "black" : "lightgrey")};
    transform: skew(-20deg);
    // transition: all 0.3s ease-in-out;
    // opacity: ${(props) => (props.active ? 1 : 0.1)};
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-duration: 0.5s;
    animation-name: extend;


    @keyframes extend {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  `;

  // create a component that returns a column of icons with a white background and border radius of 50px  and a padding of 10px
  const IconColumn = styled.div`
    width: 0%;
    height: 30%;
    top: -5%
    right: -3%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    border-radius: 50px;
    // background-color: lightgrey;
    transition: all 0.3s ease-in-out;
  `;

  // create a style component called IconContainer that renders a white circle with a border radius of 50px and a center alignment
  const IconContainer = styled.div`
    width: 3rem;
    height: 3rem;
    margin: 0.5rem;
    background-color: white;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
  `;

  // create a function that navigates to the artworkDetails page using the next/router
  const handleNavigation = (id) => {
    router.push(`/artwork/${SelectedArtwork.id}`);
  };

  // create a function called handleartworkselection that updates the showdialog state to true
  const handleArtworkSelection = (artwork) => {
    setSelectedArtwork(artwork);
    setShowDialog(true);
  };

  // create a function that changes the active state of the first category using the setCategories state
  const handleCategoryHover = (id) => {
    setCategories(
      Categories.map((category) => {
        if (category.id === id) {
          category.active = true;
        } else {
          category.active = false;
        }
        return category;
      })
    );
  };

  const handleCategorySelection = (id, category) => {
    setSelectedCategory(category);
    setCategories(
      Categories.map((category) => {
        if (category.id === id) {
          category.selected = true;
        } else {
          category.selected = false;
        }
        return category;
      })
    );
  };

  // create a component called CatefgoryTitle with  the text rotated in 90 degrees  aligned on the middle right side with an absolute position
  const CategoryTitle = styled.div`
    position: absolute;
    top: 50%;
    right: -4%;

    transform: translate(-50%, -50%) rotate(90deg);
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    background-color: black;
    transition: all 0.3s ease-in-out;
    &:hover {
      box-shadow: 0 0.6rem 1rem rgba(0, 0, 0, 0.4);
    }
  `;

  // create a component called ActiveHighlight that renders a black rectangle with a position absolute a left of 0 and the top right corner and the bottom down corner have a border radius of 50px
  const ActiveHighlight = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
    width: 3%;
    height: 100%;
    background-color: black;
    transition: all 0.3s ease-in-out;
    visibility: ${(props) => (props.selected ? "visible" : "hidden")};
  `;

  // create the underline component that has a white skewed rectangle that is 40% of the width of the artwork container
  const Underline = styled.div`
    width: 20%;
    height: 0.2rem;
    background-color: black;
    transform: skewX(-20deg);
    position: absolute;
    top: 1.3rem;
    left: 0;
    @media (max-width: 768px) {
      width: 100%;
      height: 0.5rem;
      background-color: black;
      transform: skewX(-20deg);
      position: absolute;
      bottom: 0;
      left: 0;
    }
    @media (max-width: 480px) {
      width: 100%;
      height: 0.5rem;
      background-color: bla;
      transform: skewX(-20deg);
      position: absolute;
      bottom: 0;
      left: 0;
    }
  `;

  // create a styled component called ArtworkTitle that has a font size of 3rem and a font weight of bold a text align of left a width of 100 a height of 30%
  const ArtworkTitle = styled.h2`
    position: relative;
    font-size: 1.2rem;
    font-family: "MonumentBold", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
    text-align: left;
    width: 100%;
    height: 30%;
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
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 10%;
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

  // create a component called BuyBtnContainer that has a height of 30% and a width of 100% a center alignment and a display flex
  const BuyBtnContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 100%;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 30%;
      width: 100%;
    }
    @media (max-width: 480px) {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      height: 30%;
      width: 100%;
    }
  `;

  // create a component called BuyBtn that has a white background a border radius us 50 px and a center alignment
  const BuyBtn = styled.div`
    display: flex;

    position: relative;
    background-color: black;
    border-radius: 50px;
    align-items: center;
    justify-content: start;
    padding-left: 0.8rem;
    font-size: 1.5rem;
    font-weight: bold;
    height: 2.6rem;
    width: 12rem;
    border: 2px solid #b6b6b6;
    // padding-: 0.5rem;

    &:hover {
      cursor: pointer;
    }
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
  // create PromptContainer component that has a 50% height text align to left
  const PromptContainer = styled.div`
    height: 50%;
    width: 100%;
    text-align: left;
    border-radius: 50px;
    @media (max-width: 768px) {
      height: 50%;
      text-align: left;
      background-color: white;
      border-radius: 50px;
    }
    @media (max-width: 480px) {
      height: 50%;
      text-align: left;
      background-color: white;
      border-radius: 50px;
    }
  `;

  return (
    <>
      <Wrapper style={{}}>
        <Navbar />
        {ShowDialog && (
          <Dialog onClick={() => setShowDialog(false)}>
            <PromptDetails>
              <Header>
                <ArtworkTitle>
                  Name
                  <Underline />
                </ArtworkTitle>
              </Header>
              <PromptContainer>
                <ArtworkTitle>
                  Prompt
                  <Underline />
                </ArtworkTitle>
                <div style={{ marginLeft: "0rem" }}>
                  Buy this NFT to unlock this prompt
                </div>
              </PromptContainer>
              <ArtworkTitle>
                Variations
                <Underline />
              </ArtworkTitle>
              <ArtgridComponent
                artworks={Artworks}
                handleArtworkSelection={handleArtworkSelection}
                currentWrapper={"dialog"}
                columns={"2"}
                artworkId={SelectedArtwork.id}
              />
            </PromptDetails>
            <ArtworkDetails>
              <Image
                style={{ borderRadius: "0.6rem" }}
                src={SelectedArtwork.src}
                alt={SelectedArtwork.name}
                layout="fill"
              />
            </ArtworkDetails>

            <IconColumn>
              {prompts.map((prompt) => (
                <IconContainer key={prompt.id}>
                  <Icon onClick={() => handleNavigation()} icon={prompt.icon} />
                </IconContainer>
              ))}
            </IconColumn>
          </Dialog>
        )}
        <main className="mainContent">
          <section className="sidebar">
            {Categories.map((category) => (
              <CategoryStyles
                key={category.id}
                onPointerEnter={() => handleCategoryHover(category.id)}
                onClick={() => handleCategorySelection(category.id, category)}
              >
                {category.name}
                <StyledRectangle active={category.active} />
                <ActiveHighlight selected={category.selected} />
              </CategoryStyles>
            ))}
          </section>
          {Artworks && (
            <ArtgridComponent
              artworks={Artworks}
              currentWrapper={"main"}
              columns={"4"}
              handleArtworkSelection={handleArtworkSelection}
            />
          )}
        </main>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 0;

  .mainContent {
    width: 100%;
    background: lighten(#fafafa, 10%);
    height: 100%;
    display: flex;
  }

  .sidebar {
    height: 100%;
    width: 20%;
    background: lighten(#fafafa, 10%);
    border-right: 1.5px solid lightgrey;
  }
`;

// create a styles component for the categories with a decorative underline skewed to the right
const CategoryStyles = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: 4rem%;
  background-color: ${(props) => props.color};
  border-radius: 10px;
  margin: 10px;
  padding: 10px;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${(props) => props.text};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.background};
    color: black;
  &:active {
    background-color: ${(props) => props.background};
    color: ${(props) => props.text};
  }
  &:focus {
    outline: none;
  }
  &:after {
    content: "${(props) => props.icon}";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 2rem;
    color: ${(props) => props.text};
  }
`;
