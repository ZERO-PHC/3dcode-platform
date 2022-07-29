import "../../styles/globals.css";
import "@stripe/stripe-js";
import React from "react";

import AnimationProvider from "../contexts/animation/AnimationContext";
import AuthProvider from "../contexts/AuthContext";
import NftsProvider from "../contexts/NftsContext";
import TransactionProvider from "../contexts/TransactionContext";
import Layout from "../sections/Layout";

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
          <AnimationProvider>
            <Layout windowDimensions={windowDimensions}>
              <Component {...pageProps} windowDimensions={windowDimensions} />
            </Layout>
          </AnimationProvider>
        </NftsProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default MyApp;
