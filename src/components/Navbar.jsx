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
import TimerComponent from "./TimerComponent";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'


import { collection, onSnapshot, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";


const Navbar = ({ handleDrawer }) => {
  const { login, logout, user, Coins } = useAuth();
  const [IsOpen, setIsOpen] = useState(false);

  const router = useRouter();

  const [howToModal, setHowToModal] = useState(false);
  const [learnComp, setLearnComp] = useState(false);
  const [NextDay, setNextDay] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }
  useEffect(() => {
    getNextDay();
    // get the artworks from the ids of the user's purchased artworks

    // setPurchasedArtworks();

  }, []);

  const getNextDay = async () => {
    // loop over the artworkIds and get the artwork for each one using the getDoc function
    setIsLoading(true);

    // loop over the artworkIds and get the artwork for each one using the getDoc function
    const docRef = doc(db, "nextDay", "nextDay");
    const docSnap = await getDoc(docRef);
    console.log("docSnap", docSnap.data().nextDay);
    setNextDay(docSnap.data().nextDay);
    setIsLoading(false);
  }

  const handleNavigation = (e) => {
    router.push("/coins")
  }



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




  return (
    <HeaderWrapper >
      <div>
        <Link href="/">
          <Image height={50} width={50} src="/Logo.png" />
        </Link>
      </div>

      {!IsLoading && NextDay ? <TimerComponent nextDay={NextDay} /> : <div>loading</div>}

      {user ? (
        <>

          {<> <section className="navbar-section" >
            

            <div className="avatarBox" onClick={() => router.push("/favorites")}>
              <Iconify
                size={"1.2rem"}
                color="black"
                icon="akar-icons:heart"
              />
            </div>
            <div className="avatarBox" onClick={() => router.push("/profile")}>
              <Iconify
                size={"1.5rem"}
                color="black"
                icon="mdi-account-circle-outline"
              />
            </div>

          </section>
            {/* <section onClick={handleDrawer}
            >
              <Iconify
                size={"2rem"}
                color="white"
                icon="mdi-menu"
                onClick={handleDrawer}
              />

            </section> */}
          </>
          }
        </>
      ) : (
        <div>

          <div className="auth-btn" onClick={login}>
            LOG IN / SIGN UP
          </div>
          {/* <div className="code-container">
            <Iconify size={"1.5rem"} color="black" icon="mdi-code-brackets" />
          </div> */}
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
  color:${(props) => props.width > 768 ? "black" : "white"};
  z-index: 20;
  padding-left: 3rem;
  padding-right:3rem;
  background-color: rgba(255, 255, 255, 0.5);
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5));
  backdrop-filter: blur(10px); /* blur effect to the backdrop */
  background-color: rgba(255, 255, 255, 0.2);


  z-index: 20;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  position: fixed;

  @media (max-width: 768px) {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

  @media (max-width: 400px) {

    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }

 
  

  .navbar-section {
  width: 20 %;
  display: flex;
  justify-content: end;

  // @media (max-width: 768px) {
  //   visibility: hidden;
  // }
}
  

  div {
  display: flex;
  align - items: center;
}

  .learnBtn {
  margin: 10px;
  padding: 10px;
}

  h4 {
  position: absolute;
  top: 55px;
  right: 100px;
  font - size: 12px;
  padding: 10px;
  background - color: black;
  border - radius: 30px;
}

  h2 {
  font - family: "MonumentBold";
  color: white;
}

  img {
  width: 90px;

    &:hover {
    cursor: pointer;
  }
}

  .code - container {
  display: flex;
  justify - content: center;
  align - items: center;
  height: 2.3rem;
  width: 2.3rem;
  border - radius: 50px;
  border: 2px solid #b6b6b6;
  margin - right: 1rem;
}

  .auth - btn {
  font - family: "Monument";
  font - size: 12px;
  padding: 10px 30px;
  background - color: gray;
  border - radius: 40px;
  background - color: black;
  color: white;
  border: 2px solid lightgray;

      /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;

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
  border - radius: 50px;
  margin - right: 0.5rem;
}

  .avatarBox {
  height: 2.3rem;
  width: 2.3rem;
  border-radius:50%;
  background-color: white;
  color:white;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: -0.2rem;
}

  .addressBox {
  position: relative;
  z - index: 100;
  display: flex;
  justify - content: space - between;
  align - items: center;
  width: 100 %;
  background - color: black;
  color: white;
  margin - right: 0.5rem;
  margin - left: 1rem;
  font - family: "Monument";
  text - transform: uppercase;

  font - size: 1rem;
  height: 2.3rem;
  padding - left: 0.8rem;
  border: 2px solid #b6b6b6;
  border - radius: 40px;
   
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
}

  h1 {
  color: white;
  font - family: "MonumentBold";
}
`;
