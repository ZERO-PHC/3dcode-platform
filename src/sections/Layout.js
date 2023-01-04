import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Iconify from "../components/Iconify";
import { useArtworks } from "../contexts/ArtworksContext";
import { useRouter } from "next/router";

export default function Layout({ children, windowDimensions }) {
  const [Show, setShow] = useState(false);
  const [IsHome, setIsHome] = useState(false);
  const  router  = useRouter();
  // destructure the useArtworks context to get the categories and artworks
  const {
    Categories,
    MainCategories,
    handleCategorySelection,
    handleMainCategorySelection,
    handleCategoryHover,
    MainCategory,
  } = useArtworks();

  const handleDrawer = () => {
    console.log("handling");
    setShow(!Show);
  };

  // listen to the
  useEffect(() => {

    // if the route is home set the isHome state to true
    if (router.pathname === "/") {
      setIsHome(true);
    }

    const handleRouteChange = (url) => {
      console.log(
        `App is changing to ${url}`
      )

      if (url === "/") {
        setIsHome(true);
      }
      if (url !== "/") {
        setIsHome(false);
      }
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])


  const MainCategoryIcon = ({ idx, icon, id }) => {
    return (
      <Iconify
        icon={icon}
        color={MainCategory === id ? "black" : "lightgrey"}
      />
    );
  };

  // alert(windowDimensions.);
  return (
    <main style={{ height: "100vh", maxHeight: "100vh", overflow: "hidden" }}>
      <Navbar windowDimensions={windowDimensions} handleDrawer={handleDrawer} />
      <Drawer show={Show}>
        <div>
          <div
            // onClick={handleNavigation}
            className="addressBox"
          >
            {300}
            <div className="avatarBox">
              <Image height={50} width={50} src="/assets/coin.png" />
            </div>
          </div>
        </div>
      </Drawer>
      <main
        style={{
          position: "relative",
          height: "100%",
          overflowX: "hidden",
          padding: "8vh 0",
        }}
      >
        {IsHome && (
          <Sidebar>
            <div className="main-categories">
              {MainCategories.map((category, idx) => (
                <MainCategoryStyles
                  key={category.id}
                  onPointerEnter={() => handleCategoryHover(category.id)}
                  onClick={() =>
                    handleMainCategorySelection(category.id, category)
                  }
                >
                  <MainCategoryIcon
                    idx={idx}
                    icon={category.icon}
                    id={category.id}
                  />
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
                  onClick={() => handleCategorySelection(category.id, category)}
                >
                  {category.name}
                  <ActiveHighlight selected={category.selected} />
                </CategoryStyles>
              ))}
            </div>
          </Sidebar>
        )}
        {children}
      </main>
    </main>
  );
}

const MainCategoryStyles = styled.div`
text-transform: uppercase;
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
  font-weight: medium;
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

const CategoryStyles = styled.div`
text-transform: uppercase;
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
  font-weight: medium;
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

const Sidebar = styled.div`
  position: fixed;
  height: 100%;
  z-index: 90;

  background: #f5f5f5;
  border-right: 1.5px solid lightgrey;

  @media (max-width: 768px) {
    visibility: hidden;
    width: 0px;
  }

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
    justify-content: start;
    padding-top: 10%;
    padding-bottom: 30%;
    border-bottom: 1px solid #b6b6b6;
    // margin-top: 40%;
  }
`;

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
  left: -0.5rem;
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

// create a Drawer component with a background color of white and a width of 50%
const Drawer = styled.div`
  background-color: black;
  width: 60%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 2;
  padding-top:20%;
  overflow-x: hidden;
  transition: all 0.3s ease-in-out;
  opacity: ${(props) => (props.show ? 1 : 0)};
  transform: ${(props) => (props.show ? "translateX(0)" : "translateX(100%)")};

  .addressBox {
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: space - between;
    align-items: center;
    width: 100 %;
    background-color: black;
    color: white;
    margin-right: 0.5rem;
    margin-left: 1rem;
    font-family: "Monument";
    text-transform: uppercase;
  
    font-size: 1rem;
    height: 2.3rem;
    padding-left: 0.8rem;
    border: 2px solid #b6b6b6;
    border-radius: 40px;
     
      & button {
      display: none;
      padding: 5px 15px;
      margin: 0px 10px;
      border - radius: 10px;
      font - family: "Monument";
      font - size: 0.7rem;
      transition: 1s;
    }
  
      &:hover {
      cursor: pointer;
  
        & button {
        display: flex;
      }
    }

    .avatarBox {
      height: 2.3rem;
      width: 2.3rem;
      border-radius: 50px;
      background-color: #ffff;
      border: 2px solid #b6b6b6;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 0.5rem;
      margin-right: -0.2rem;
    }
`;
