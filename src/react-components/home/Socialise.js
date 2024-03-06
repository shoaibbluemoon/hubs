import React from "react";
import {FormattedMessage} from "react-intl";
import socialiseImage from "../../assets/images/socialise.png";
import socialiseDecor from "../../assets/images/socialise-decor.png";
import styles from "./Socialise.scss";

export function Socialise() {
  return (
    <section className={styles.socialise}>
      <div className={styles.decors}>
        <img src={socialiseDecor} className={styles.socialiseDecor} />
      </div>
      <div className={styles.container}>
        <h3 className={styles.socialiseText}><FormattedMessage id="socialise.text" defaultMessage="Socialise" /></h3>
        <h2 className={styles.socialiseHeading}><FormattedMessage id="socialise.title" defaultMessage="Track friends and invite users to your unique spaces" /></h2>
        <div
          className={styles.socialiseImageContainer}
        >
          <img src={socialiseImage} />
        </div>
      </div>
    </section>
  )
}
