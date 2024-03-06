import React from "react";
import siteImage from "../../assets/images/site.png";
import dashboardImage from "../../assets/images/dashboard.png";
import bubbleImage from "../../assets/images/big-bubble.png";
import smallBubbleImage from "../../assets/images/small-bubble.png";
import decorationImage from "../../assets/images/decoration-image.png";
import lightImage from "../../assets/images/image-light-decor.png";
import styles from "./ImageComponent.scss";

export function ImageComponent() {
  return (
    <section className={styles.imageComponent}>
      <div className={styles.decorations}>
        <img src={decorationImage} className={styles.decorationImage} />
        <img src={smallBubbleImage} className={styles.smallBubbleImage} />
        <img src={lightImage} className={styles.lightImage} />
      </div>
      <div className={styles.container}>
        <div>
          <img src={bubbleImage} className={styles.bubbleBig} />
        </div>

        <div className={styles.imageComponentInner}>
          <img src={dashboardImage} className={styles.lastImage} />
          <img src={siteImage} className={styles.firstTopImage} />
          <img src={siteImage} className={styles.firstBottomImage} />
        </div>
      </div>
    </section>
  )
}
