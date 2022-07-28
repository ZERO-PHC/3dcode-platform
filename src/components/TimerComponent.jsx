import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Iconify from './Iconify';
import CountdownTimer from './CountdownTimer';


// const THREE_DAYS_IN_MS = 3 * 24 * 60 * 60 * 1000;
// const DAY_IN_MS = 1 * 24 * 60 * 60 * 1000;
// console.log("DAY_IN_MS", DAY_IN_MS);
// const NOW_IN_MS = new Date().getTime();

// const dateTimeAfterOneDay = NOW_IN_MS + DAY_IN_MS;


export default function TimerComponent({nextDay}) {
    return (
        <TimerWrapper>
            <CountdownTimer targetDate={nextDay} />
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
