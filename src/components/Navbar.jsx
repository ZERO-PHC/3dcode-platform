import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import flowLogo from "../../public/assets/FlowLogo.png";

import { useAuth } from "../contexts/AuthContext";

import { Icon } from "@iconify/react";
import styled from "styled-components";
import LearnLoginComp from "./LearnLoginComp";
import LearnMintComp from "./LearnMintComp";
import NetworkSwitch from "./NetworkSwitch";
import Iconify from "./Iconify";

const Navbar = () => {
  const { logIn, logOut, user, FlowBalance } = useAuth();
  const [IsOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [howToModal, setHowToModal] = useState(false);
  const [learnComp, setLearnComp] = useState(false);

  const MyImage = (props) => {
    return (
      <Image
        src={flowLogo}
        alt="logo"
        // width={500}
        // height={500}
      />
    );
  };

  // create a function that returns an Icon component from the react-iconify library

  // create a dropdown menu that animates when the user clicks the addressBox div button and displays the user's address
  // handle visibility of the dropdown menu with props.isOpen

  const Dropdown = styled.div`
    position: absolute;
    top: 2.2rem;
    text-align: left;
    width: 100%;
    right: 0;
    background-color: #fff;
    border-radius: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.2);
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    animation: fadeIn 0.5s ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: 0.5s;
    animation-iteration-count: 1;
    animation-timing-function: ease-in-out;
    animation-duration: 0.5s;
    animation-name: fadeIn;
    visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};

    @keyframes fadeIn {
      0% {
        opacity: 0;
        transform: translateY(-1rem);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // create a styled component called dropdown item that has a height of 1.5rem and a width of 100% and a center align text
  const DropdownItem = styled.div`
    height: 1.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-family: "Monument";
    color: black;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #fff;
      background-color: black;
    }
  `;

  return (
    <HeaderWrapper>
      <div>
        <Link href="/">
          <Image height={50} width={50} src="/Logo.png" />
        </Link>
        <h2>SAMPLERS</h2>
      </div>

      {user?.addr ? (
        <>
          <section className="navbarSection">
            <div>
              <div
                onPointerEnter={() => setIsOpen(true)}
                onPointerLeave={() => setIsOpen(false)}
                className="addressBox"
              >
                <div className="avatarBox">
                  <Iconify
                    size={"1.5rem"}
                    color="black"
                    icon="mdi-account-circle-outline"
                  />
                </div>
                <Dropdown isOpen={IsOpen}>
                  <DropdownItem>FLOW: {FlowBalance}</DropdownItem>
                  <DropdownItem>My NFTs</DropdownItem>
                  <DropdownItem>My Favorites</DropdownItem>
                  <DropdownItem>Logout</DropdownItem>
                </Dropdown>
              </div>
            </div>
          </section>
          <section className="navbarSection">
            <div>
              <div
                onPointerEnter={() => setIsOpen(true)}
                onPointerLeave={() => setIsOpen(false)}
                className="addressBox"
              >
                <div className="avatarBox">
                  <Iconify
                    size={"1.5rem"}
                    color="black"
                    icon="mdi-account-circle-outline"
                  />
                </div>
                <Dropdown isOpen={IsOpen}>
                  <DropdownItem>FLOW: {FlowBalance}</DropdownItem>
                  <DropdownItem>My NFTs</DropdownItem>
                  <DropdownItem>My Favorites</DropdownItem>
                  <DropdownItem>Logout</DropdownItem>
                </Dropdown>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div>
          {/* <span
            className="auth-btn"
            onMouseEnter={() => setHowToModal(true)}
            onMouseLeave={() => setHowToModal(false)}
            onClick={() => setLearnComp(true)}
          >
            ?
          </span> */}
          {howToModal && <h4>Learn how you can make this page</h4>}
          {learnComp && (
            <LearnLoginComp setLearnComp={setLearnComp} loginFn={logIn} />
          )}
          <div className="auth-btn" onClick={logIn}>
            LOG IN / SIGN UP
          </div>
          <div className="code-container">
            <Iconify size={"1.5rem"} color="black" icon="mdi-code-brackets" />
          </div>
        </div>
      )}
    </HeaderWrapper>
  );
};

export default Navbar;

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 10%;
  width: 100%;
  color: black;
  z-index: 20;
  padding-left: 3rem;
  padding-right: 3rem;
  background-color: #ffff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  .navbarSection {
    width: 40%;
    display: flex;
    justify-content: end;
  }

  div {
    display: flex;
    align-items: center;
  }

  .learnBtn {
    margin: 10px;
    padding: 10px;
  }

  h4 {
    position: absolute;
    top: 55px;
    right: 100px;
    font-size: 12px;
    padding: 10px;
    background-color: black;
    border-radius: 30px;
  }

  h2 {
    font-family: "MonumentBold";
    color: white;
  }

  img {
    width: 90px;

    &:hover {
      cursor: pointer;
    }
  }

  .code-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.3rem;
    width: 2.3rem;
    border-radius: 50px;
    border: 2px solid #b6b6b6;
    margin-right: 1rem;
  }

  .auth-btn {
    font-family: "Monument";
    font-size: 12px;
    padding: 10px 30px;
    background-color: gray;
    border-radius: 40px;
    background: radial-gradient(
        54.9% 630.78% at 48.69% 44.74%,
        rgba(253, 253, 253, 0.12) 0%,
        rgba(248, 241, 255, 0.6) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

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
        &:hover {
          cursor: pointer;
        }
      }
    }
  }

  .dot {
    height: 0.5rem;
    width: 0.5rem;
    border: 2px solid black;
    background: lightgreen;
    border-radius: 50px;
    margin-right: 0.5rem;
  }

  .avatarBox {
    height: 2.3rem;
    width: 2.3rem;
    border-radius: 50%;
    background-color: #ffff;
    border: 2px solid #b6b6b6;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.5rem;
    margin-right: -0.2rem;
  }

  .addressBox {
    position: relative;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-right: 0.5rem;
    margin-left: 1rem;
    font-family: "Monument";
    text-transform: uppercase;

    font-size: 0.9rem;
    background-color: gray;
    height: 2.3rem;
    padding-left: 0.8rem;
    border: 2px solid #b6b6b6;
    border-radius: 40px;
    background: radial-gradient(
        54.9% 630.78% at 48.69% 44.74%,
        rgba(253, 253, 253, 0.12) 0%,
        rgba(248, 241, 255, 0.6) 100%
      )
      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

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
  }

  h1 {
    color: white;
    font-family: "MonumentBold";
  }
`;
