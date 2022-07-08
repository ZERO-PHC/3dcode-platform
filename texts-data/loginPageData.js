import { CssCode } from "../src/codeSnippets/CssCode"

export const LoginPageData = [
    {
        "title": "Welcome",
        "subtitle": "Authentication page guide",
        "content": "In this guide you will learn how to create an authentication page using FCL",
    },
    {
        "title": "Step 1",
        "subtitle": "Create a next js app",
        "subtitle2": "Install the flow fcl and types dependencies",
        "footer": "We used in our application some styling dependencies has well, feel free to use whatever you want in your app",
        "codeSnippet": ` 
            npm create next-app
            npm i @onflow/fcl @onflow/types 
        `
    },
    {
        "title": "Step 2",
        "subtitle": "Add the styles inside /styles/globals.css",
        "codeSnippet": `${CssCode.Globals}`
    },
    {
        "title": "Step 3",
        "subtitle": "Create a new Folder /flow",
        "subtitle2": "Inside of it create a file config.js",
        "codeSnippet": `
        const fcl = require("@onflow/fcl");

        fcl.config({
            "app.detail.title": "App name",
            "app.detail.icon": "imagelink",
            "accessNode.api": "https://rest-testnet.onflow.org",
            "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
            "0xDeployer": "0x4ba0ed5a326eef6b",
            "0xCORE": "0x4ba0ed5a326eef6b"
            })
        `
    },
    {
        "title": "Step 4",
        "subtitle": "Create a new folder contexts",
        "subtitle2": "Inside of it create a file /AuthContext.js",
        "content": "In our application we use contexts from React to interact with the blockchain through FCL",
        "codeSnippet":`
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
        }
        `
    },
    {
        "title": "Step 5",
        "subtitle": "Inside pages/_app.js add the AuthProvider",
        "codeSnippet": `
        import "../../styles/globals.css";
        import AuthProvider from "../contexts/AuthContext"
        
        function MyApp({ Component, pageProps }) {
            return (
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
            )
        }
        
        export default MyApp;
        `
    },
    {
        "title": "Step 6",
        "subtitle": "Inside your component/page that you will add the buttons to login and logout",
        "subtitle2": "Now we just need to import the Auth Context to our page or component and use the functions we created earlier",
        "codeSnippet": `
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
    },
    {
        "title": "Done",
        "subtitle": "You got it! Your application is already authenticating the users!",
        "subtitle2": "The next step is to login!"
    }
]