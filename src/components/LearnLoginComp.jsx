import { LoginCodes } from '../codeSnippets/AppAuthProvider';

import styled from "styled-components";
import EducationalBox from './EducationalBox';
import { CssCode } from '../codeSnippets/CssCode';
import { useState } from 'react';


const LearnLoginComp = ({setLearnLoginComp}) => {
    const [level, setLevel] = useState(0);

    const oneMore = () => {
        if(level != 4) setLevel(level + 1)
    }

    const lessOne = () => {
        if(level != 0) setLevel(level - 1)
    }
    
    return (
        <Wrapper>
            <Header>
                <button onClick={() => setLearnLoginComp(false)}>x</button>
                <h1>How can you make this page?</h1>
            </Header>
            <Main>
                <section>
                    { level == 0 && 
                    <>
                        <EducationalBox 
                        title="Create a next js app"
                        subtitle="Install the flow fcl and types dependencies"
                        codeSnippet={LoginCodes.NpmDependencies}
                        footer="We used in our application some styling dependencies has well, feel free to use whatever you want in your app"
                        />
                    </>
                    }
                    { level == 1 && 
                    <>
                        <EducationalBox 
                        title="Add the styles inside /styles/globals.css"
                        codeSnippet={CssCode.Globals}
                        />
                    </>
                    }

                    {level == 2 &&
                        <EducationalBox
                        title="Create a new Folder /flow"
                        subtitle="Inside of it create a file config.js"
                        codeSnippet={LoginCodes.ConfigFcl}
                        />
                    }
                    {level == 3 && 
                        <EducationalBox 
                        title="Create a new folder contexts"
                        subtitle="Inside of it create a file /AuthContext.js"
                        content="In our application we use contexts from React to interact with the blockchain through FCL"
                        codeSnippet={LoginCodes.AuthContext}
                        />
                    }
                    { level == 4 &&
                        <EducationalBox 
                        title="Inside pages/_app.js add the AuthProvider"
                        codeSnippet={LoginCodes.AppAuthProvider}
                        />
                    }
                    {level == 5 &&
                        <EducationalBox 
                        title="Inside your component/page that you will add the buttons to login and logout"
                        subtitle="Now we just need to import the Auth Context to our page or component and use the functions we created earlier"
                        codeSnippet={LoginCodes.ComponentCode}
                        />
                    }
                    <box>
                        <p onClick={() => lessOne()}> before </p>
                        <p onClick={() => oneMore()}> next </p>
                    </box>
                </section>
            </Main>
        </Wrapper>
    )
}

export default LearnLoginComp;

const Header = styled.header`
    display: flex;
    justify-content: center;
`

const Main = styled.div`

    section{
        width: 100% !important;
        padding: 14px 90px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-wrap: wrap;
        text-align: center;
        
        > div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            height: 60vh;
            margin: 30px;
            padding: 20px;
            text-align: center;
            border: 1px solid white;
            overflow-y: overlay;
        }
    }
    pre,
    code,
    textarea,
    kbd,
    samp,
    tt {
    width: 90%;
    overflow: hidden !important;
    font-size: 14px !important;
    } 
    div{

        h2{
            font-size: 17px;
        }

        h3{
            font-size: 12px;
        }

        p{
            font-size: 10px;
            margin: 20px 30px;
        }
    }

`

const Wrapper = styled.main`
    background-color: #732190 !important;
    height: 86vh !important;
    max-width: 90% !important;
    width: 90% !important;
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);

    button{
        position: absolute;
        top: -1px;
        right: 35px;
        padding: 10px 20px;
        background: black;
        color: white;
        border: none;
        &:hover{
            cursor: pointer;
        }
    }

    box{
        display: flex;
        justify-content: center;
        gap: 40px;

        p{
            padding: 10px 20px;
            border: 1px solid white;

            &:hover{
                cursor: pointer;
            }
        }
    }
`