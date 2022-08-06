import "../../styles/globals.css";
// import "@stripe/stripe-js";
import React,{useEffect} from "react";

import AuthProvider from "../contexts/AuthContext";
import ArtworkProvider from "../contexts/ArtworksContext";
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
            const loader = document.getElementById('globalLoader');
        if (loader)
            loader.style.display = 'none';
    }
}, []);

  return (
    <AuthProvider>
      <TransactionProvider>
        <ArtworkProvider>
            <Layout windowDimensions={windowDimensions}>
              <SnackbarComponent  />
              <Component {...pageProps} windowDimensions={windowDimensions} />
            </Layout>
        </ArtworkProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default MyApp;
