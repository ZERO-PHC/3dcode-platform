import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styled from "styled-components"

const EducationalDynamicBox = ({step, codeSnippet}) => {
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
            {codeSnippet &&
            <SyntaxHighlighter language="javascript" style={dracula} wrapLongLines={true}>
                {codeSnippet}
            </SyntaxHighlighter>
            }
            <div className='footerDiv'>
            {step.footer && 
                <div><p>{step.footer}</p></div>}
            {step.footer2 && <p>{step.footer2}</p>}
            </div>
        </Wrapper>
    )
}

export default EducationalDynamicBox

const Wrapper = styled.main`
    background: transparent !important;
    color: white;
    height: unset;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .subtitleDiv{
        margin: 0;
        padding: 30px 100px;
        color: #d79b31;
        font-weight: 700;
    }

    .contentDiv{
        padding: 30px;
        padding-bottom: 0;
        margin: 0;
        font-weight: 400;
        text-align: center;
    }

    .footerDiv{
        font-size: 1.3rem;
        font-weight: 900;
        color: #00bf00;
    }

    h1{
        font-family: 'Fascinate', cursive;
        font-size: 4rem;
        position: absolute;
        top: 36px;
        left: 200px;
        color: #d79b31;
    }

    h2{
        font-size: 1.2rem;
        text-align: left;
    }

    h3{
        font-size: 1rem;
        font-weight: 400;
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
        margin: 0;
        span{
            background-color: white;
            color: black;
            padding: 3px 10px;
            border-radius: 4px;
        }
    }

`