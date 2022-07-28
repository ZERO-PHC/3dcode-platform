import React from 'react';
import { useCountdown } from '../hooks/useCountdown';



export default function CountdownTimer({ targetDate }) {
    console.log("targetDate", targetDate);
    const [days, hours, minutes, seconds] = useCountdown(targetDate);


    const DateTimeDisplay = ({ value, type, isDanger }) => {
        return <div >
            <p>{value}</p>
            {/* <span>{type}</span> */}
        </div>
    }

    if (days + hours + minutes + seconds <= 0) {
        return <div>0</div>;
    } else {
        return (
            <div style={{ display: "flex" }}>

                <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
            </div>
        );
    }
};
