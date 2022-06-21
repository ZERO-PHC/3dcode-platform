import SyntaxHighlighter from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import styled from "styled-components"

const EducationalBox = ({title, subtitle, content, codeSnippet, footer}) => {
    return (
        <Wrapper>
            <h2>{title}</h2>
            {subtitle && <h3>{subtitle}</h3>}
            {content && <p>{content}</p>}
            <SyntaxHighlighter language="javascript" style={dracula} wrapLongLines={true}>
                {codeSnippet}
            </SyntaxHighlighter>
            {footer && <p>{footer}</p>}
        </Wrapper>
    )
}

export default EducationalBox;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    margin: 30px;
    padding: 20px;
    text-align: center;
    border: 1px solid white;

    h2{
        font-size: 17px;
        padding: 0 100px;
    }

    h3{
        font-size: 12px;
        padding: 0 100px;
    }

    p{
        font-size: 10px;
        margin: 20px 30px;
        padding: 0 100px;
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

`