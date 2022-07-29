import { useState, useEffect } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useNFTs } from "../contexts/NftsContext";

import styled from "styled-components";
import { useRouter } from "next/router";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { categories } from "../categories";

import Navbar from "../components/Navbar";
import ArtgridComponent from "../components/ArtgridComponent";
import DialogSection from "../sections/DialogSection";
import Iconify from "../components/Iconify";
import FAB from "../components/FAB/FAB";

const actions = [
  { label: "About", icon: <Iconify icon="mdi-plus" />, onClick: console.log },
  { label: "Profile", icon: <Iconify icon="mdi-plus" />, onClick: console.log },
  { label: "Picture", icon: <Iconify icon="mdi-plus" />, onClick: console.log },
  { label: "Trash", icon: <Iconify icon="mdi-plus" />, onClick: console.log },
];

export default function Home({ windowDimensions }) {
  // alert(windowDimensions.width);
  const { user } = useAuth();
  const { getSamplers, SelectedRarity, Samplers } = useNFTs();
  const [Categories, setCategories] = useState(categories);
  const [Artworks, setArtworks] = useState([]);
  const [ShowDialog, setShowDialog] = useState(false);
  const [SelectedCategory, setSelectedCategory] = useState("2D");
  const [SelectedArtwork, setSelectedArtwork] = useState(null);

  const router = useRouter();
  const width = windowDimensions.width;

  useEffect(() => {
    const colRef = collection(db, "artworks");
    const unsub = onSnapshot(colRef, (snapshot) => {
      const activeDocs = snapshot.docs.filter((doc) => {
        return doc.data().state === "active";
      });

      console.log("activeDocs", activeDocs);

      const artworks = activeDocs.map((doc, i) => {
        // console.log(source, " artwork data: ", i, doc.data());

        // return only artworks that are active
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      console.log("artworks", artworks);

      setArtworks(artworks);
    });
    return () => {
      // clean up the listener
      unsub();
    };
  }, []);

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

  // create a function that navigates to the artworkDetails page using the next/router
  const handleNavigation = (id) => {
    router.push(`/artwork/${SelectedArtwork.id}`);
  };

  // create a function called handleartworkselection that updates the showdialog state to true
  const handleArtworkSelection = (artwork) => {
    console.log("artwork selected: ", artwork);
    // setSelectedArtwork(artwork);
    // setShowDialog(true);
    router.push(`/artwork/${artwork.id}`);
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

  // function called handleDrawer that updates the show state to true

  if (Artworks)
    return (
      <>
        <Wrapper>
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
            <ArtgridContainer>
              <ArtgridComponent
                mobile={width < 768 ? true : false}
                artworks={Artworks}
                currentWrapper={"main"}
                columns={width < 768 ? "2" : "4"}
                handleArtworkSelection={handleArtworkSelection}
              />
            </ArtgridContainer>
          </main>
          <FAB />
        </Wrapper>
      </>
    );
}

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

// create header component that has a row

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

const Wrapper = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 0;
  margin: 0;
  overflowx: hidden;
  overflow: hidden;

  .mainContent {
    width: 100%;
    background: lighten(#fafafa, 10%);
    height: 100%;
    display: flex;
    overflowx: hidden;
  }

  .sidebar {
    height: 100%;
    width: 20%;
    background: lighten(#fafafa, 10%);
    border-right: 1.5px solid lightgrey;

    @media (max-width: 768px) {
      visibility: hidden;
      width: 0px;
    }
  }

  ::-webkit-scrollbar {
    width: 0rem;
    background: rgba(130, 132, 135, 0.23);
  }
`;

// create a stylec component called ArtgridContainer that has a height of 100% and a width of 100% a display flex a center alignment
const ArtgridContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  max-height: 100%;
  overflow: scroll;
  width: 100%;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
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
  height: 4rem;
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
