import React, {useEffect, useState} from 'react';
import { createPortal } from "react-dom";
import styles from "./LiveStreamContainer.scss";
import closeIcon from "../../assets/images/close.png";
import { BASE_URL } from "../../utils/api";

export function LiveStreamContainer({isVisible, handleClose, onChangeVisible}) {
    const [_visible, _setVisible] = useState(false);
    const visible = isVisible === undefined ? _visible : isVisible;
    const setVisible = onChangeVisible || _setVisible;
    const [link, setLink] = useState('');

    const getStreamLink = async () => {
        const token = window.localStorage.getItem("token");

        const response = await fetch(`${BASE_URL}/getstreamlink`, {
            method: "GET",
            headers: {
            "Content-type": "application/json",
            'Authorization': `Bearer ${token}`
            }
        })

        return response.json();
    }

    useEffect(() => {
        getStreamLink().then((data) => setLink(data.streamUrl))
    }, [visible])

    return (
        <>
            { visible &&
                createPortal(
                    <div className={styles.liveStreamContainer}>
                        <div className={styles.liveStreamInner}>
                            <button type="button" onClick={handleClose} className={styles.liveStreamCloseBtn}><img src={closeIcon} /></button>
                        {/* <iframe src="https://player.twitch.tv/?channel=ceh9&parent=localhost" frameborder="0" allowfullscreen="true" scrolling="no" height="378" width="620"></iframe> */}
                        <iframe className={styles.iframe} src="https://www.youtube.com/embed/9Auq9mYxFEE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                            {/* <iframe className={styles.iframe} src="https://www.youtube.com/embed/4ISdDjVoTtA" title="Cyberpunk 2077 Radio 24/7 by NightmareOwl (Cyberpunk Music/Midtempo/Electro)" frameborder="0" allowFullScreen></iframe> */}
                        </div>
                    </div>,
                    document.body
                )
            }
        </>
    );
}
