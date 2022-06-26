import styled from "styled-components"

import { Icon } from "@iconify/react";

const AlertPrivateKeyComp = ({setAlert}) => {
    return (
        <Wrapper>
            <div className="alertDiv">
                <button className="closeBtn" onClick={() => setAlert(false)}><Icon icon="fa:close" height={"1.7em"} /></button>
                <img src="/magicSchool/badHackerWizard.png" alt="" />
                <h2>Never save your private key somewhere that might expose it to other people!</h2>
                <p>We are creating our application on the testnet, so we add it to our flow.json file directly.</p>
                <p>However, in production and mainnet environments we must take security measures! Our customers and users depend on it!</p>
                <button onClick={() => setAlert(false)} className="btn">Got it!</button>
            </div>
        </Wrapper>
    )
}

export default AlertPrivateKeyComp;

const Wrapper = styled.div`

    .alertDiv{
    position: fixed;
    width: 100% !important;
    height: 100vh !important;
    margin: 0 !important;
    top: 0 !important;
    padding: 100px;
    left: 0;
    background-color: #5e0707;
    color: white;
    display: flex !important;
    flex-direction: column !important;
    align-items: center;
    
    img{
        position: initial !important;
        width: 23% !important;
    }

    button{
        border: none;
        background-color: transparent;
        width: 100px;

        &:hover{
            cursor: pointer;
        }
    }
    .closeBtn{
        position: absolute;
        top: 50px;
        right: 50px;

        path{
            color: white;
        }
    }
    .btn{
        background-color: white;
        padding: 20px 30px;
        width: 150px;
        border-radius: 40px;
        color: black;
        font-weight: 900;
    }
    }
`