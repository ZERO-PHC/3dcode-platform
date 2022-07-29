import React, { useState, useEffect } from "react";

import styled from "styled-components";
import Navbar from "../components/Navbar";
import Image from "next/image";
import Iconify from "../components/Iconify";

export default function Layout({ children, windowDimensions }) {
  const [Show, setShow] = useState(false);

  const handleDrawer = () => {
    console.log("handling");
    setShow(!Show);
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
      <main style={{ height: "100%", overflowX: "hidden" }}>{children}</main>
    </main>
  );
}

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
