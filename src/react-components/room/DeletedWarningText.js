import styles from "./DeletedWarningText.scss";
import React from "react";

function numberToStringSeconds(number) {
    return number === 1 ? `${number} second` : `${number} seconds`;
}

export function DeletedWarningText({timer, timerId}) {

    return (
        <>
            {!!timerId && <div className={styles.deletedWarningText}><p>Item will be deleted after {numberToStringSeconds(timer)}</p></div>}
        </>        
    )
}