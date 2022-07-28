import "../../styles/globals.css";
import "@stripe/stripe-js";

import AnimationProvider from "../contexts/animation/AnimationContext";
import AuthProvider from "../contexts/AuthContext";
import NftsProvider from "../contexts/NftsContext";
import TransactionProvider from "../contexts/TransactionContext";
import Layout from "../sections/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <TransactionProvider>
        <NftsProvider>
          <AnimationProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AnimationProvider>
        </NftsProvider>
      </TransactionProvider>
    </AuthProvider>
  );
}

export default MyApp;
