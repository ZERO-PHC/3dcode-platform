import { useState, useEffect, useContext } from "react";
import Link from "next/link";

import { SamplersContract } from '../codeSnippets/SamplersContract';
import { FlowJson } from '../codeSnippets/FlowJson';

import { CadencePageData } from "../../texts-data/cadencePageDate";

import EducationalDynamicBox from "../components/EducationalDynamicBox";
import styled from "styled-components";


const Cadence = () => {
    const [step, setStep] = useState(0)

     const oneMore = () => {
        if(step != 8) setStep(step + 1)
    }

    const lessOne = () => {
        if(step != 0) setStep(step - 1)
    }

    return (
        <>
            <Nav>
                <div>
                    <Link href="/">
                        <img src="/Logo.png" />
                    </Link>
                    <h2>SAMPLERS</h2>
                </div>
                <div>
                    <h2>Done</h2>
                </div>
            </Nav>
            <Wrapper>
                <section>
                    {step == 0 &&
                    <div className='textExplainDiv'>
                        <h1>Welcome to the Samplers Contract deployment guide!</h1>
                        <p>Our goal is not to teach you all the details of building this smart contract, 
                            it is very simple and beginner level. On this page we will show you how to deploy it for the next FCL teachings.</p>
                        <p>If you want to learn about Cadence and Smart Contracts, we recommend that you join the next <a>Emerald Academy Bootcamp</a>.</p>
                    </div>
                    }
                    {step == 1 &&
                    <EducationalDynamicBox
                    step={CadencePageData.step1}
                    codeSnippet="flow init"
                    />
                    }
                    {step == 2 &&
                    <EducationalDynamicBox
                    step={CadencePageData.step2}
                    codeSnippet={SamplersContract}
                    />
                    }
                    {step == 3 &&
                    <EducationalDynamicBox
                    step={CadencePageData.step3}
                    codeSnippet="flow keys generate"
                    />
                    }
                    {step == 4 &&
                    <EducationalDynamicBox
                    step={CadencePageData.step4}
                    />
                    }
                    {step == 5 &&
                    <EducationalDynamicBox
                    step={CadencePageData.step5}
                    codeSnippet={FlowJson.testNetAccout}
                    />
                    }
                    {step == 6 &&
                    <EducationalDynamicBox
                    step={CadencePageData.step6}
                    codeSnippet={`"contracts": { "Samplers": "./samplersContract/Samplers.cdc" }`}
                    />
                    }
                    {step == 7 &&
                    <EducationalDynamicBox
                    step={CadencePageData.step7}
                    codeSnippet={FlowJson.deployments}
                    />
                    }
                    {step == 8 &&
                    <EducationalDynamicBox
                    step={CadencePageData.step8}
                    codeSnippet="flow project deploy --network=testnet"
                    />
                    }
                    <box>
                        <p onClick={() => lessOne()}> Previous </p>
                        <p onClick={() => oneMore()}> Next </p>
                    </box>
                    <img src="/magicSchool/magic.png" alt="" />
                    <img src="/magicSchool/letter.png" alt="" className="letterImg" />
                </section>
            </Wrapper>
        </>
    )
}

export default Cadence;

const Wrapper = styled.main`
    display: flex;
    align-items: center;
    background-image: url('/magicSchool/educationBg.jpg');
    background-blend-mode: hard-light;
    background-color: #2a2d55;
    background-size: cover;
    background-repeat: no-repeat;
    width: 80%;
    height: 80vh;
    padding: 30px;
    border-radius: 30px;
    margin: auto;

    div{
        width: 100%;
        margin: auto;
        text-align: center;
    }
    a{
        color: #4aff46;
        text-decoration: underline;

        &:hover{
            cursor: pointer;
        }
    }
    section{
        width: 100% !important;
        height: 90%;
        background: #000000f2;
        padding: 14px 90px;
        border-radius: 30px;
        display: flex;
        flex-direction: row;
        /* justify-content: center; */
        justify-content: space-around;
        flex-wrap: wrap;
        text-align: center;
        overflow-y: overlay;
        
        > div {
            display: flex;
            flex-direction: row;
            justify-content: center;
            flex-wrap: wrap;
            height: 60vh;
            margin: 30px;
            padding: 20px;
            text-align: center;
            overflow-y: overlay;
        }
        img{
            position: absolute;
            right: 80px;
            width: 173px;
            top: 75px;
            filter: drop-shadow(10px 12px 11px black);
        }

        .letterImg{
            left: 70px;
            width: 110px;
            bottom: 45px !important;
            top: inherit;
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

    .textExplainDiv{
        /* background-color: #141414; */
        width: 90%;
        padding: 20px;
        color: white;
        font-size: 14px;
        border-radius: 20px;
    }

    box{
        display: flex;
        justify-content: center;
        align-self: flex-end;
        margin: 0px auto;
        gap: 40px;
        font-family: 'Fascinate', cursive;
        color: #d79b31;
        font-size: 3rem;
        position: absolute;
        bottom: 105px;

        p{
            padding: 10px 20px;
            margin: 0;

            &:hover{
                cursor: pointer;
            }
        }
    }

`

const Nav = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 10%;
    width: 100%;
    color: white;
    z-index: 20;
    padding-left: 3rem;
    padding-right: 3rem; 
    margin-bottom: 20px;

    div{
        display: flex;
        align-items: center;
    }
`