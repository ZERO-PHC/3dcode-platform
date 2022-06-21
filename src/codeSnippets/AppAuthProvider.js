export const LoginCodes = {
  "ConfigFcl": `
  const fcl = require("@onflow/fcl");

  fcl.config({
      "app.detail.title": "App name",
      "app.detail.icon": "imagelink",
      "accessNode.api": "https://rest-testnet.onflow.org",
      "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
      "0xDeployer": "0x4ba0ed5a326eef6b",
      "0xCORE": "0x4ba0ed5a326eef6b"
      })
              `,
    "AuthContext": `
  import * as fcl from "@onflow/fcl";
  import { createContext, useContext, useEffect, useState } from "react";
  
  import "../flow/config";
  
  export const AuthContext = createContext({});
  
  export const useAuth = () => useContext(AuthContext);
  
  export default function AuthProvider({ children }) {
    const [user, setUser] = useState({ loggedIn: false, addr: undefined });
  
    useEffect(() => fcl.currentUser.subscribe(setUser), []);
  
    const logOut = async () => {
      await fcl.unauthenticate();
      setUser({ addr: undefined, loggedIn: false });
    };
  
    const logIn = async () => {
      const res = await fcl.authenticate();
    };
  
    const signUp = () => {
      fcl.signUp();
    };
  
  const value = {
      logOut,
      logIn,
      signUp,
      user,
    };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  }`,
  "AppAuthProvider" : `
  import "../../styles/globals.css";
  import AuthProvider from "../contexts/AuthContext"
  
  function MyApp({ Component, pageProps }) {
    return (
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    )
  }
  
  export default MyApp;`,
  "ComponentCode": `
  import { useAuth } from "../contexts/AuthContext";


  const Component = () => {
      const { logIn, logOut, user } = useAuth();

      return (
          <>
              <button onClick={logIn}>Login</button>
              <button onClick={logOut}>Logout</button>
              <p>User Address - {user.addr}</p>
          </>
      )
  }

  export default Component;
  `
}