import "../../styles/globals.css";
import AnimationProvider from "../contexts/animation/AnimationContext";
import AuthProvider from "../contexts/AuthContext";
import NftsProvider from "../contexts/NftsContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <NftsProvider>
        <AnimationProvider>
          <Component {...pageProps} />
        </AnimationProvider>
      </NftsProvider>
    </AuthProvider>
  );
}

export default MyApp;
