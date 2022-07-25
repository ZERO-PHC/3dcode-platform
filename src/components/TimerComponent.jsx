import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Iconify from './Iconify';

export default function TimerComponent() {
    return (
        <TimerWrapper>
            <div style={{fontSize:"1.6rem"}}>0:00</div>
            <Iconify size={"2rem"} icon="mdi:timer-sand" />
        </TimerWrapper>
    )
}

// create a styled component called TimerWrapper that has a position of absolute it´s aligned at the middle of the screen and has a width of 100% and a height of 100%
const TimerWrapper = styled.div`
    position: absolute;
    top: 2.3rem;
    left: 50%;

    transform: translate(-50%, -50%);
    width: 10rem;
    height: 3rem;
    border: 2px solid lightgrey;
    border-radius: 0.5rem;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
   `;
