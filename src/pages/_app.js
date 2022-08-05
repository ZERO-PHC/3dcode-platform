import "../../styles/globals.css";
import "@stripe/stripe-js";
import React from "react";

import AnimationProvider from "../contexts/animation/AnimationContext";
import AuthProvider from "../contexts/AuthContext";
import NftsProvider from "../contexts/ArtworksContext";
import TransactionProvider from "../contexts/TransactionContext";
import Layout from "../sections/Layout";
import SnackbarComponent from "../components/SnackbarComponent";

function MyApp({ Component, pageProps }) {
  // get the dimensions of the window and store them in the state
  const [windowDimensions, setWindowDimensions] = React.useState({});

  React.useEffect(() => {
    setWindowDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  return (
    <AuthProvider>
      <TransactionProvider>
        <NftsProvider>
            <Layout windowDimensions={windowDimensions}>
              <SnackbarComponent  />
              <Component {...pageProps} windowDimensions={windowDimensions} />
            </Layout>
        </NftsProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default MyApp;
