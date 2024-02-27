import React, { useContext, useEffect, useState, useRef } from "react";
import { ThemeContext } from "styled-components";
import styles from "./CountDownTimer.scss";
import TimerIcon from "../../assets/NewDesignPics/timer.png";

const getReturnValues = (countDown) => {
    // calculate time left
    const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
    const daysString = days < 10 ? `0${days}`: days;

    const hours = Math.floor(
      (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const hoursString = hours < 10 ? `0${hours}` : hours;

    const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
    const minutesString = minutes < 10 ? `0${minutes}` : minutes;

    const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
    const secondsString = seconds < 10 ? `0${seconds}` : seconds;

    return `${daysString}d :${hoursString}h :${minutesString}m :${secondsString}s`;
};

export function CountDownTimer({scene}) {
    const intervalRef = useRef(null);
    const theme = useContext(ThemeContext);
    const [countDownValue, setCountDownValue] = useState(0);

    const initializeDate = () => {
        const roomCreatedDate = new Date(window.APP.roomCreatedDate);
        // const roomCreatedDate = new Date("2022-08-07T12:57:46.000Z");
        roomCreatedDate.setDate(roomCreatedDate.getDate() + 3);

        const today = new Date();

        if (today.getTime() - roomCreatedDate.getTime() >= 0) {
            scene.emit("hub_closed");
            clearInterval(intervalRef.current);
            return 0;
        }

        return roomCreatedDate.getTime() - today.getTime();
    }

    useEffect(() => {
        if (!window.APP.isUnlimitedDate) {
            intervalRef.current = setInterval(() => {
                setCountDownValue(initializeDate());
            }, 1000);

            return () => clearInterval(intervalRef.current);
        }
    }, [countDownValue]);

    if (window.APP.isUnlimitedDate) {
        return null;
    }

    return (
        <div className={styles.timer}>
            <div>
                <img src={TimerIcon} className={styles.timerIcon} alt="Timer icon" />
            </div>
            <div>
                <p className={styles.timerText}>Time till room closes</p>
                <p className={styles.timerText}>{getReturnValues(countDownValue)}</p>
            </div>
        </div>
    )
}
