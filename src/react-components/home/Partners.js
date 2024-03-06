import React from "react";
import {FormattedMessage} from "react-intl";
import partnersImage from "../../assets/images/partners.png";
import lightImage from "../../assets/images/image-light-decor.png";
import styles from "./Partners.scss";


export function Partners() {
  return (
    <section className={styles.partners}>
      <div className={styles.decors}>
        <img src={lightImage} className={styles.lightImage} />
      </div>

      <div className={styles.container}>
        <h2 className={styles.partnersHeading}><FormattedMessage id="partners.title" defaultMessage="Partners & Backers" /></h2>
        <div
          className={styles.partnersImageContainer}
        >
          <img src={partnersImage} />
        </div>
      </div>
    </section>
  )
}
