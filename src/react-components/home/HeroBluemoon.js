import React from "react";
import { FormattedMessage } from "react-intl";
import { ReactComponent as DiscordIcon } from "../icons/DiscordNew.svg";
import bluemoonPlanetImage from "../../assets/images/bluemoon-planet.png";
import decorLight from "../../assets/images/decor-hero.png";
import styles from "./HeroBluemoon.scss";
import classNames from "classnames";
import { discordLink, joinTheWaitListLink } from "../../utils/default-values";

export function HeroBluemoon() {
  return (
    <section className={styles.heroBluemoon}>
      <div>
        <img src={decorLight} className={styles.decorLight} />
      </div>
      <div className={styles.container}>
        <div className={styles.heroBluemoonContent}>
          <p className={styles.heroBluemoonTopContent}>
            <FormattedMessage
              id="hero-blueemon.top-content"
              defaultMessage="⭐ Huge benefits and perks for early adopters + 🏕 Land Giveaway"
            />
          </p>
          <h2 className={styles.heroBluemoonHeading}>
            <span>
              <FormattedMessage id="hero-blueemon.heading" defaultMessage="Bluemoon Metaverse" />
            </span>
          </h2>
          <p className={styles.heroBluemoonLaunching}>
            <FormattedMessage id="hero-blueemon.launching-soon" defaultMessage="Launching Soon!" />
          </p>
          <div className={styles.heroBluemoonActions}>
            <a
              href={joinTheWaitListLink}
              target="_blank"
              rel="noreferrer"
              className={classNames(styles.btn, styles.heroBluemoonJoinBtn)}
            >
              <FormattedMessage id="hero-blueemon.join-button" defaultMessage="Join The waitlist" />
            </a>
            <a
              href={discordLink}
              target="_blank"
              rel="noreferrer"
              className={classNames(styles.btn, styles.heroBluemoonDiscordBtn)}
            >
              <span className={styles.heroBluemoonBtnIcon}>
                <DiscordIcon />
              </span>
              <span>
                <FormattedMessage id="hero-blueemon.discord" defaultMessage="Join Discord" />
              </span>
            </a>
          </div>
        </div>
        <div className={styles.heroBluemoonImageContainer}>
          <img src={bluemoonPlanetImage} />
        </div>
      </div>
    </section>
  );
}
