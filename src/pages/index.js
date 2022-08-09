import { useState, useEffect, useRef } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useArtworks } from "../contexts/ArtworksContext";
import styled from "styled-components";
import { useRouter } from "next/router";
// import useSWR from "swr";
import useSWR from "swr";
import Iconify from "../components/Iconify";
import FAB from "../components/FAB/FAB";
import ArtgridSection from "../sections/ArtgridSection";
import Image from "next/image";
import PrimaryBtnComponent from "../components/PrimaryBtn";
import VerticalSpace from "../atoms/VerticalSpace";
import LogoWrapper from "../components/LogoWrapper";

export default function Home({ windowDimensions }) {
  const { user, login } = useAuth();
  const { router } = useRouter();
  const [PageLoading, setPageLoading] = useState();
  const {
    Artworks,
    SelectedCategory,
    MainCategory,
    handleCategorySelection,
    handleMainCategorySelection,
    handleCategoryHover,
    handleArtworkSelection,
    Categories,
    MainCategories,
  } = useArtworks();
  const [ShowDialog, setShowDialog] = useState(false);
  const width = windowDimensions.width;
  // const fetcher = (url) => fetch(url).then((res) => console.log(res.json())); // your main function export default function Profile() { //for relative and absolute paths const { data, error } = useSWR('/api/user', fetcher) if (error) return <div>failed to load</div> //for the loading you can create your custom component and insert instead of div, like this you keep same styling if (!data) return <div>loading...</div> if (data) return <div>hello {data.name}!</div> }
  // const { data, error } = useSWR("/", fetcher);

  useEffect(() => {}, [router]);

  // function called handleDrawer that updates the show state to true
  const MainCategoryIcon = ({ idx }) => {
    if (idx === 0) {
      return (
        <Iconify
          icon="akar-icons:thunder"
          color={MainCategory === "new" ? "black" : "lightgrey"}
        />
      );
    } else if (idx === 1) {
      return (
        // <Iconify
        //   icon="ant-design:rise-outlined"
        //   color={MainCategory === "new" ? "black" : "lightgrey"}
        // />
        <Iconify
          icon="fa6-solid:fire"
          color={MainCategory === "hot" ? "black" : "lightgrey"}
        />
      );
    } else {
      return (
        <Iconify
          icon="akar-icons:thunder"
          color={MainCategory === "rising" ? "black" : "lightgrey"}
        />
      );
    }
  };

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  // if (Artworks && data)
  if (Artworks)
    return (
      <>
        <Wrapper>
          {!user && (
            <Overlay>
              <main
                style={{
                  background: "white",
                  width: "28rem",
                  height: "14rem",
                  borderRadius: "1rem",
                  color: "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div>
                  <LogoWrapper />
                </div>
                <VerticalSpace height={"0rem"} />
                <div>
                  <PrimaryBtnComponent
                    label="Log in / Sign up"
                    onClick={login}
                  />
                </div>
              </main>
            </Overlay>
          )}

          <main className="mainContent">
            <section className="sidebar">
              <div className="main-categories">
                {MainCategories.map((category, idx) => (
                  <MainCategoryStyles
                    key={category.id}
                    onPointerEnter={() => handleCategoryHover(category.id)}
                    onClick={() =>
                      handleMainCategorySelection(category.id, category)
                    }
                  >
                    <MainCategoryIcon idx={idx} />
                    <div style={{ width: "0.5rem" }}></div>
                    <div>
                      {category.name}
                      <StyledRectangle active={category.selected} />
                    </div>
                  </MainCategoryStyles>
                ))}
              </div>
              <div className="categories-wrapper">
                {Categories.map((category) => (
                  <CategoryStyles
                    key={category.id}
                    onPointerEnter={() => handleCategoryHover(category.id)}
                    onClick={() =>
                      handleCategorySelection(category.id, category)
                    }
                  >
                    {category.name}
                    <StyledRectangle active={category.active} />
                    <ActiveHighlight selected={category.selected} />
                  </CategoryStyles>
                ))}
              </div>
            </section>
            <ArtgridSection
              artworks={Artworks}
              width={width}
              handleArtworkSelection={handleArtworkSelection}
            />
          </main>
          <FAB />
        </Wrapper>
      </>
    );
}

const Overlay = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
`;

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
  overflow-x: hidden;
  overflow: hidden;

  .categories-wrapper {
    height: 70%;
    maxheight: 70%;
    overflow: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0rem;
      background: rgba(130, 132, 135, 0.23);
    }
  }

  .main-categories {
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: end;
    border-bottom: 1px solid #b6b6b6;
    // margin-top: 40%;
  }

  .mainContent {
    width: 100%;
    background: lighten(#fafafa, 10%);
    height: 100%;
    display: flex;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0rem;
      background: rgba(130, 132, 135, 0.23);
    }
  }

  .sidebar {
    height: 100%;

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
const MainCategoryStyles = styled.div`
position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 20%;
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
