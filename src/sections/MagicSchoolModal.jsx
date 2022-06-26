import { useState } from "react"

import styled from "styled-components"
import ChangeStepsComp from "../components/ChangeStepsComp"
import EducationalDynamicBox from "../components/EducationalDynamicBox"
import AlertPrivateKeyComp from "../components/AlertPrivateKeyComp";

const MagicSchoolModal = ({data, nextApp, pathFn, path, externalPath, setLearnComp}) => {
    const [step, setStep] = useState(0)
    const [alert, setAlert] = useState(false)

     const oneMore = () => {
        if(data[step].alert) setAlert(true)
        if(step != (data.length -1)) setStep(step + 1)
    }

    const lessOne = () => {
        if(step != 0) setStep(step - 1)
    }

    return (
        <Wrapper>
            <section className="educationalSection">
                <EducationalDynamicBox
                step={data[step]}
                />
                <ChangeStepsComp step={step} oneMore={oneMore} lessOne={lessOne} 
                finalStep={data.length - 1} nextApp={nextApp} pathFn={pathFn}
                path={path}
                externalPath={externalPath}
                />
                <img src="/magicSchool/wizardFlow.png" alt="" />
                {alert && <AlertPrivateKeyComp setAlert={setAlert}/>}
                <button className="closeBtn" onClick={() => setLearnComp(false)}>x</button>
            </section>
        </Wrapper>
    )
}

export default MagicSchoolModal

const Wrapper = styled.section`
    display: flex;
    align-items: center;
    background-image: url('/magicSchool/bg.png') !important;
    background-blend-mode: hard-light !important;; 
    background-color: #2a2d55 !important;;
    background-size: cover !important;;
    background-repeat: no-repeat !important;;
    max-width: 1200px;
    width: 80%;
    height: 80vh;
    padding: 30px;
    border-radius: 30px;
    margin: auto;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    top: 15%;
    font-family: Poppins;
    
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
    .educationalSection{
        width: 100% !important;
        height: 90%;
        background: #000000f2;
        padding: 14px 90px;
        border-radius: 30px;
        display: flex;
        flex-direction: row;
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
            right: -111px;
            width: 240px;
            top: 395px;
            filter: drop-shadow(10px 12px 11px black);
        }

        .closeBtn{
            position: absolute;
            top: -3px;
            right: 16px;
            background: none;
            color: #d79b31;
            border: none;
            font-size: 30px;
            font-family: 'Poppins';

            &:hover{
                cursor: pointer;
            }
        }
    }

`