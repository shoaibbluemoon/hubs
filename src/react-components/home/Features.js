import React from "react";
import styles from "./Features.scss";
import { FormattedMessage } from "react-intl";
import { ReactComponent as BluemoonIcon } from "../icons/BluemoonIcon.svg";
import featuresDecor from "../../assets/images/features-decor.png";

const featuresData = [
  {
    title: "Easy Access",
    text: "One click access to the Metaverse"
  },
  {
    title: "VR Compatible",
    text: "Compatible with all browsers and devices"
  },
  {
    title: "Deep Analytics",
    text: "Track crucial data such as traffic source, heat maps sales and audience insights"
  },
  {
    title: "Transactions",
    text: "Buy and Sell inside the Metaverse"
  },
  {
    title: "3D Assets",
    text: "Customise your space by adding your own assets to your room"
  },
  {
    title: "Events & Meetups",
    text: "Hold meeting, AMAs and  community meetups "
  },
  {
    title: "Space Builder",
    text: "Build and upgrade your space with our Pro Builder tools"
  },
  {
    title: "Social & Gamification",
    text: "Follow and social with other users in the Metaverse, earn and unlock badges"
  },
  {
    title: "Custom Avatars",
    text: "Use your 3D avatars to show your digital identity in the Metaverse"
  }
];

export function FeaturesList({ featuresList }) {
  return (
    <ul className={styles.featuresList}>
      {featuresList.map((featuresItem, index) => {
        return (
          <li key={index} className={styles.featuresItem}>
            <div className={styles.featuresItemSvgContainer}>
              <BluemoonIcon />
            </div>
            <h3 className={styles.featuresItemTitle}>{featuresItem.title}</h3>
            <p className={styles.featuresItemText}>{featuresItem.text}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.decors}>
        <img src={featuresDecor} className={styles.featuresDecor} />
      </div>
      <div className={styles.container}>
        <h3 className={styles.featuresText}>
          <FormattedMessage id="features.text" defaultMessage="Bluemoon Metaverse" />
        </h3>
        <h2 className={styles.featuresHeading}>
          <FormattedMessage id="features.title" defaultMessage="Bluemoon Unique Features" />
        </h2>
        <FeaturesList featuresList={featuresData} />
      </div>
    </section>
  );
}
