import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setTimeRecord } from '../../redux/actions';
require("./timer.css");

function Timer() {
    const [timePast, setTime] = useState(0);
    const min = Math.trunc(timePast / 600);
    const sec = ((timePast % 600) / 10).toFixed(1);
    const gameStarted = useSelector(state => state.started);
    const dispatch = useDispatch();

    useEffect(() => {
        let counter;
        if (gameStarted) {
            counter = setInterval(() => {
                setTime(s => (s + 1));
            }, 100);

            return () => { clearInterval(counter); };
        } else {
            clearInterval(counter);
            dispatch(setTimeRecord(timePast));
            setTime(0);
        };
    }, [gameStarted])

    return (
        <div className="timer">
            <p>{min}</p>
            <p>:</p>
            <p>{sec}</p>
        </div>
    );
};

export default Timer;