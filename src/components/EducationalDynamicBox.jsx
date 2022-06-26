import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Icon } from "@iconify/react";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import styled from "styled-components"

const EducationalDynamicBox = ({step}) => {
    return (
        <Wrapper>
            <h1>{step.title}</h1>
            <ul className="subtitleDiv">
                <li><h2>{step.subtitle}</h2></li>
                {step.subtitle2 && <li><h2>{step.subtitle2}</h2></li>}
                {step.subtitle3 && <li><h2>{step.subtitle3}</h2></li>}
            </ul>
            {(step.content || step.content2 || step.content3) &&
            <div className="contentDiv">
                {step.content && <h3>{step.content}</h3>}
                {step.content2 && <h3>{step.content2}</h3>}
                {step.content3 && <h3>{step.content3}</h3>}
            </div>
            }

            {step.span && <div className='spanDiv'><span>{step.span}</span></div>}
            {step.path && <div className='pathDiv'><span>{step.path}</span></div>}
            {step.codeSnippet &&
            <>
                <CopyToClipboard text={step.codeSnippet}>
                    <button className='copyBtn'><Icon icon="uil:copy" height={"1.7em"} /></button>
                </CopyToClipboard>
                <SyntaxHighlighter language="javascript" style={dracula} wrapLongLines={true}>
                    {step.codeSnippet}
                </SyntaxHighlighter>
            </>
            }
            {(step.footer || step.footer2) &&
            <div className='footerDiv'>
            {step.footer && 
                <div><p>{step.footer}</p></div>}
            {step.footer2 && <p>{step.footer2}</p>}
            </div>
            }
        </Wrapper>
    )
}

export default EducationalDynamicBox

const Wrapper = styled.main`
    background: transparent !important;
    color: white;
    width: 100%;
    height: unset;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .subtitleDiv{
        margin: 0;
        padding: 30px 100px;
        color: #5a85ff !important;
        font-weight: 700 !important;
    }

    .contentDiv{
        flex-direction: column;
        padding: 30px;
        padding-bottom: 0;
        margin: 0;
        font-weight: 400;
        text-align: center;
    }

    .footerDiv{
        font-size: 1.1rem;
        font-weight: 400;
        color: #00bf00;
    }

    h1{
        font-family: Poppins !important;
        font-weight: 900 !important;
        font-size: 4rem !important;
        position: absolute;
        top: -121px;
        left: 99px;
        color: #d79b31 !important;
    }

    h2{
        font-size: 1.2rem !important;
        text-align: left !important;
        font-family: Poppins !important;
        color: #5a85ff !important;
        font-weight: 700 !important;
    }

    h3{
        font-size: 1rem !important;
        font-weight: 400 !important;
    }

    .copyBtn{
        width: 90%;
        background: transparent;
        color: white;
        border-radius: 6px;
        border: none;
        text-align: right;

        &:hover{
            cursor: pointer;
        }
    }

    .spanDiv{
        width: 88%;
        padding: 5px 10px;
        margin: 10px 20px;
        border-radius: 15px;
        font-size: .8rem;
        background: #d79b31;
    }

    .pathDiv{
        margin: 20px;
        span{
            background-color: white;
            color: black;
            padding: 3px 10px;
            border-radius: 4px;
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
    /* margin: auto !important; */
    font-size: 14px !important;
    } 

`