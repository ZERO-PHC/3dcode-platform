import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";
import Iconify from "./Iconify";


import { collection, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";


const Navbar = ({ handleDrawer }) => {
  const { login, logout, user, Coins, Notifications } = useAuth();
  const [IsOpen, setIsOpen] = useState(false);

  // get if the screen is mobile or not
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);


  // check if the screen is mobile or not
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else if (window.innerWidth < 1024) {
      setIsTablet(true);
    } else {
      setIsDesktop(true);

    }
  }, []);


  const router = useRouter();

  const [howToModal, setHowToModal] = useState(false);
  const [learnComp, setLearnComp] = useState(false);
  const [NextDay, setNextDay] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const updateNotifications = () => {
    //update the notifications of the user to read true using the updateDoc function
    // create a ref to the user's notifications with firebase firestore v9
    toggleDrawer();

    Notifications.forEach(notification => {
      const notifRef = doc(db, "users", user.email, "notifications", notification.id);

      updateDoc(notifRef, { read: true });
    })
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
    // const docRef = doc(db, "nextDay", "nextDay");
    // const docSnap = await getDoc(docRef);
    // console.log("docSnap", docSnap.data().nextDay);
    // setNextDay(docSnap.data().nextDay);
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


  const handleSeeComment = (id) => {
    console.log("id", id);
    router.push(`/artwork/${id}`);
  }

  const NotifComponent = ({ notification, artworkId }) => {
    return (<div style={{ padding: "0.5rem", fontSize: "0.8rem", borderBottom: "0.5px solid lightgrey", display: "flex", flexDirection: "column" }}>
      <section>
        {notification}
      </section>
      <section style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "0.5rem", fontSize: "0.7rem", color: "lightgray" }}>
        <div>
        </div>
        {notification === "You have a new comment!" && <div onClick={() => handleSeeComment(artworkId)} style={{ cursor: "pointer" }}>SEE COMMENT</div>
        }
      </section>
    </div>)
  }




  return (
    <HeaderWrapper >
      <div>
        <Link href="/">
          <Image height={50} width={50} src="/Logo.png" />
        </Link>
      </div>

      {/* {!IsLoading && NextDay ? <TimerComponent nextDay={NextDay} /> : <div>loading</div>} */}

      {user ? (
        <>

          {<>
            <section className="navbar-section" >
              <main style={{ cursor: "default", minWidth: "16rem" }} className="navbar-main">
                <CoinsRow>
                  <Image style={{ cursor: "default", }} height={36} width={36} src="/assets/coin.png" alt="coin" />
                  <span>
                    {Coins}
                  </span >
                </CoinsRow>
                <div style={{ width: "0.5rem", cursor: "default" }}></div>
                <div className="buy-container">
                  <span>
                    Buy Coins

                  </span>
                </div>
              </main>
              {/* { !isMobile &&  <div className="notifs-container" >
            <div className="avatar" onClick={toggleDrawer} style={{ cursor: "pointer" }}>
              <svg width="2.4rem" height="2.4rem" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M36 72C16.1177 72 0 55.8823 0 36C0 16.1177 16.1177 0 36 0C55.8823 0 72 16.1177 72 36C72 55.8823 55.8823 72 36 72ZM51.0347 43.0816C51.1028 43.1644 51.1714 43.2479 51.2408 43.3315C51.5842 43.7463 51.8015 44.2508 51.8669 44.7853C51.9323 45.3198 51.8432 45.8618 51.6099 46.3472C51.1143 47.3834 50.0684 48.0288 48.8721 48.0288H24.1367C22.9348 48.0288 21.8817 47.3826 21.3877 46.3416C21.1554 45.8564 21.0671 45.3147 21.1331 44.7809C21.1991 44.247 21.4166 43.7432 21.76 43.3291C21.8764 43.186 21.991 43.0478 22.1038 42.9119L22.1516 42.8542C23.9149 40.7257 24.9792 39.4397 24.9792 33.405C24.9792 27.9276 27.1733 24.3618 31.6881 22.5031C31.7125 22.4895 31.7344 22.4719 31.753 22.4511C32.4488 20.1232 34.3523 18.5625 36.5 18.5625C38.6477 18.5625 40.552 20.1232 41.2478 22.4535C41.2664 22.4751 41.2886 22.4933 41.3135 22.5071C43.2482 23.3031 44.716 24.3802 45.8019 25.8C47.2745 27.7218 48.0216 30.2843 48.0216 33.4074C48.0216 39.4365 49.0864 40.7244 50.8465 42.8533L50.8492 42.8566C50.9105 42.9305 50.9723 43.0058 51.0347 43.0816ZM39.7856 53.5285C38.7925 54.1225 37.6572 54.4366 36.5 54.4375C35.343 54.4364 34.2078 54.1222 33.2149 53.5283C32.2219 52.9343 31.4083 52.0827 30.8601 51.0638C30.8342 51.0149 30.8215 50.9602 30.8231 50.9049C30.8247 50.8496 30.8405 50.7956 30.8692 50.7483C30.8978 50.701 30.9382 50.6619 30.9864 50.6348C31.0346 50.6077 31.0891 50.5936 31.1444 50.5938H41.8572C41.9125 50.5937 41.9668 50.6079 42.0149 50.6351C42.063 50.6622 42.1033 50.7013 42.1318 50.7486C42.1604 50.796 42.1762 50.8498 42.1777 50.9051C42.1793 50.9603 42.1665 51.015 42.1407 51.0638C41.5925 52.0829 40.7787 52.9345 39.7856 53.5285Z" fill="black" />
              </svg>
            </div>
              { Notifications.length > 0 && <div style={{
              height: "0.8rem", border: "1px solid black",
              width: "0.8rem", background: "lightgreen",
              borderRadius: "50px", position: "absolute",
              bottom: 0, right: 0,
            }}>

            </div>} */}
              {/* {IsOpen && <NotifsWrapper >
              <main style={{ height: "100%", width: "100%", position: "relative" }}>
                <section style={{
                  position: "sticky",
                  top: "0rem",
                  padding: "0rem 0.5rem",
                  display: "flex", height: "2rem", width: "100%", justifyContent: "end", alignItems: "center", borderBottom: "1px solid lightgrey", background: "black"
                }}>
                  <div
                    onClick={updateNotifications}
                    style={{ display: "flex", cursor: "pointer", background: "black", height: "1.4rem", width: "1.4rem", justifyContent: "center", alignItems: "center", border: "2px solid lightgrey", borderRadius: "50px" }}>
                    <Iconify icon="mdi-close" />
                  </div>
                </section>

                {Notifications?.length > 0 ? Notifications.map(notif => <NotifComponent key={notif.id} {...notif} />)
                  : <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%", textAlign: "center", fontSize: "1rem" }}> You don´t have new notifications  </div>}


              </main>
            </NotifsWrapper>} */}
              {/* </div>} */}
              {!isMobile && <div className="avatarBox" onClick={() => router.push("/profile")}>
                <div style={{ height: "100%", marginBottom: "0.4rem" }}>
                  <svg width="2.3rem" height="2.3rem" viewBox="0 0 72 67" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M55.3199 66.382L55.3201 66.285C55.3201 53.8012 46.6457 43.6812 35.9454 43.6812C25.245 43.6812 16.5707 53.8012 16.5707 66.285L16.5707 66.312C6.60339 59.91 0 48.7261 0 36C0 16.1177 16.1177 0 36 0C55.8823 0 72 16.1177 72 36C72 48.7727 65.3483 59.9917 55.3199 66.382ZM22.7484 31.3223C23.8232 37.6715 29.349 42.5069 36.0041 42.5069C43.4295 42.5069 49.449 36.4874 49.449 29.062C49.449 21.6366 43.4295 15.6172 36.0041 15.6172C30.8627 15.6172 26.3953 18.5031 24.1335 22.7434C25.1523 22.0953 25.948 23.3626 25.9292 25.6566C25.9098 28.0236 25.0305 30.5872 23.9653 31.3827C23.5002 31.73 23.0765 31.6828 22.7484 31.3223ZM28.1133 27.0044C28.092 29.5983 29.3989 31.4914 31.0322 31.2327C32.6655 30.974 34.0068 28.6615 34.0281 26.0676C34.0494 23.4736 32.7426 21.5806 31.1092 21.8393C29.4759 22.0979 28.1346 24.4105 28.1133 27.0044Z" fill="black" />
                  </svg>
                </div>
              </div>}
            </section>
            {/* <section onClick={handleDrawer}
            >
              <Iconify
                size={"2rem"}
                color="white"
                icon="mdi-menu"
                onClick={handleDrawer}
              />

mo            </section> */}
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

const CoinsRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0rem 0.5rem 0 0.3rem;
  font-size: 1.2rem;
  font-weight: bold;
  `

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

  .buy-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 60%;
    min-width: 9rem;
    height: 2.4rem;
    background-color: black;
    text-transform: uppercase;
    color: white;
    border-radius: 0 0.5rem  0.5rem 0;
    padding:0;


    span {
      font-size: 0.9rem;
      margin: 1rem;
      font-weight: 600;
    
    }
  }

  .auth-btn{
    cursor: pointer;
  }
  


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
  // width: 28%;
  display: flex;
  justify-content: end;

  .navbar-main{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 2.4rem;
    border-radius: 0.5rem;
    background-color: #D9D9D9;
    color: black;
    padding:0rem 0rem;
    

  }

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
  position: relative;
  cursor: pointer;
  height: 2.3rem;
  width: 2.3rem;
  border-radius:50%;
  background: white;
  color:white;
  display: flex;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: -0.2rem;
}
  .notifs-container {
  position: relative;
  height: 2.3rem;
  width: 2.3rem;
  border-radius:50%;
  background: white;
  color:white;
  display: flex;
  border: 1px solid black;
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

const NotifsWrapper = styled.div`
display: flex;
border: 2px solid lightgrey;
flex-direction: column;
  height:16rem;
  max-height:16rem;
  overflow:auto;
  width:20rem;
  background: black;
  color:white;
  border-radius:0.5rem;
  position:absolute;
  top:1.2rem;
  right:0;

  ::-webkit-scrollbar {
    width: 0rem;
    background: rgba(130, 132, 135, 0.23);

  }

`;
