import "../../styles/globals.css";
import "@stripe/stripe-js"


import AnimationProvider from "../contexts/animation/AnimationContext";
import AuthProvider from "../contexts/AuthContext";
import NftsProvider from "../contexts/NftsContext";
import TransactionProvider from "../contexts/TransactionContext";

function MyApp({ Component, pageProps }) {

  return (
      <AuthProvider>
        <TransactionProvider>
          <NftsProvider>
            <AnimationProvider>
              <Component {...pageProps} />
            </AnimationProvider>
          </NftsProvider>
        </TransactionProvider>
      </AuthProvider>
  );
}

export default MyApp;
