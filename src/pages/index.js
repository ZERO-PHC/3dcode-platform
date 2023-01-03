import { useState, useEffect, useRef } from "react";

import { useAuth } from "../contexts/AuthContext";
import { useArtworks } from "../contexts/ArtworksContext";
import styled from "styled-components";
import { useRouter } from "next/router";
import useSWR from "swr";
import Iconify from "../components/Iconify";
import FAB from "../components/FAB/FAB";
import ArtlistSection from "../sections/ArtlistSection";
import Image from "next/image";
import PrimaryBtnComponent from "../components/PrimaryBtn";
import VerticalSpace from "../atoms/VerticalSpace";
import LogoWrapper from "../components/LogoWrapper";
import Head from "next/head";
import Header from "../components/Header";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.

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
  // const fetcher = (url) => fetch(url).then((res) => console.log(res.json())); // your main function export default function Profile() { //for relative and absolute paths const { data, error } = useSWR('/api/user', fetcher) if (error) return <div>failed to load</div> //for the loading you can create your custom component and insert instead of div, like this you keep same styling if (!data) return <div>loading...</div> if (data) return <div>hello {data.name}!</div> }
  // const { data, error } = useSWR("/", fetcher);

  useEffect(() => {}, [router]);

  // function called handleDrawer that updates the show state to true

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;
  // if (Artworks && data)
  if (Artworks)
    return (
      <>
        <Header />
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
            <ArtlistSection
              title={"FEATURED"}
              isMobile={isMobile}
              artworks={Artworks}
              width={width}
              handleArtworkSelection={handleArtworkSelection}
            />
            <ArtlistSection
              title={"NEW"}
              isMobile={isMobile}
              artworks={Artworks}
              width={width}
              handleArtworkSelection={handleArtworkSelection}
            />
            <ArtlistSection
              title={"FREE"}
              isMobile={isMobile}
              artworks={Artworks}
              width={width}
              handleArtworkSelection={handleArtworkSelection}
            />
          </main>
          {!isMobile && <FAB />}
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

const Wrapper = styled.main`
  position: relative;
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  overflow: hidden;

  .mainContent {
    // height: 100vh;
    width: 100vw;
    background: lighten(#fafafa, 10%);
    display: flex;
    flex-direction: column;
    align-items: start;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 0rem;
      background: rgba(130, 132, 135, 0.23);
    }
  }

  ::-webkit-scrollbar {
    width: 0rem;
    background: rgba(130, 132, 135, 0.23);
  }
`;
