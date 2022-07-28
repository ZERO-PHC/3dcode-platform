import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { animated, useSpring, config } from 'react-spring';
import Iconify from '../components/Iconify';

export default function PromptTextSection() {
    const [Hovered, setHovered] = useState(false);
    const [SelectedIdx, setSelectedIdx] = useState(0);
    const [TooltipText, setTooltipText] = useState("Click to copy");


    const tooltipAnimation = useSpring({
        opacity: Hovered ? 1 : 0,
        transform: Hovered ? 'translateY(0px)' : 'translateY(10px)',
        config: config.stiff,
    });


    const handleSelection = (idx, action) => {
        setSelectedIdx(idx);
        setHovered(action)
    }

    const handleClick = (data) => {
        navigator.clipboard.writeText(data);
        setTooltipText('Copied!');
    }



    return (<TextWrapper>
        <IconWrapper>
            <Iconify icon="bx:text" />
        </IconWrapper>
        <LinksContainer onClick={() => handleClick("data")} onPointerEnter={() => handleSelection(0, true)} onPointerLeave={() => handleSelection(0, false)}  >
            <TooltipWrapper style={tooltipAnimation} >
                {TooltipText}
            </TooltipWrapper>                  lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </LinksContainer>
    </TextWrapper>
    )
}

const TextWrapper = styled.div`
  display: flex;
    position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 0.5rem 0rem;
  width: 100%;
`;

const IconWrapper = styled.div`
position: relative;
 height: 1.6rem;
 width: 1.6rem;
 display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #b6b6b6;
  border-radius: 6px;
`;
const TooltipWrapper = styled(animated.div)`
  height: 1.5rem;
  width: 6rem;
  position: absolute;
  top: 1rem;
  left: 1rem;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5rem;
  color: black;
  z-index: 2;
  text-transform: uppercase;

  
`;



const LinksContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0.6rem 0.6rem;
  
`;