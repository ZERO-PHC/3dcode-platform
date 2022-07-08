import React from "react";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../contexts/AuthContext";

import { Icon } from "@iconify/react";
import styled from "styled-components";
import LearnLoginComp from "./LearnLoginComp";
import LearnMintComp from "./LearnMintComp";

const Navbar = () => {
    const { logIn, logOut, user } = useAuth();
    const router = useRouter();

    const [howToModal, setHowToModal] = useState(false)
    const [learnComp, setLearnComp] = useState(false)
  
    useEffect(() => {
      if (!user?.loggedIn) {
        router.push("/", undefined, { shallow: true });
      }
    }, [user]);
  
    return (
      <HeaderWrapper>
        <div>
          <Link href="/">
            <img src="/Logo.png" />
          </Link>
          <h2>SAMPLERS</h2>
        </div>
        {user?.addr ? (
          <section className="navbarSection">
            <div>

              <span 
              className="auth-btn" 
              onMouseEnter={() => setHowToModal(true)} 
              onMouseLeave={() => setHowToModal(false)}
              onClick={() => setLearnComp(true)}
              >?</span>
              {howToModal && <h4>Learn how you can make this page</h4>}
              {learnComp && <LearnMintComp setLearnComp={setLearnComp} loginFn={logIn}/>}

              <div className="addressBox">
                <div className="dot"></div>
                {user?.addr && (
                  <p>
                    {user?.addr.split(".")[0].length > 14
                      ? "0x..." + user?.addr.slice(user?.addr.length - 6)
                      : user?.addr.length > 14
                      ? "..." + user?.addr.slice(user?.addr.length - 6)
                      : user?.addr}
                  </p>
                )}  
              </div>
              <div style={{width:"1rem"}}></div>
              <div className="addressBox" onClick={logOut}>
                <Icon icon="majesticons:logout" height={"2em"} />
              </div>
            </div>
          </section>
        ) : (
          <div>
            <span className="auth-btn" 
            onMouseEnter={() => setHowToModal(true)} 
            onMouseLeave={() => setHowToModal(false)}
            onClick={() => setLearnComp(true)}
            >?</span>
            {howToModal && <h4>Learn how you can make this page</h4>}
            {learnComp && <LearnLoginComp setLearnComp={setLearnComp} loginFn={logIn}/>}
            <div className="auth-btn" onClick={logIn}>
              LOG IN / SIGN UP 
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
  color: white;
  z-index: 20;
  padding-left: 3rem;
  padding-right: 3rem;

.navbarSection {
  width: 27%;
  display: flex;
  justify-content:end;
}

div {
  display: flex;
  align-items: center;
}

.learnBtn{
  margin: 10px;
  padding: 10px;
}

h4{
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
  height: 0.8rem;
  width: 0.8rem;
  background: lightgreen;
  border-radius: 50px;
  margin-right: 0.5rem;
}

.addressBox {
  font-family: "Monument";
  font-size: 12px;
  padding: 5px 20px;
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

h1 {
  color: white;
  font-family: "MonumentBold";
}
`;
