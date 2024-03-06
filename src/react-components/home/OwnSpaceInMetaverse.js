import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./OwnSpaceInMetaverse.scss";
import metabillionaireLoungeImage from "../../assets/images/metabillionaire-lounge.png";
import spacePodImage from "../../assets/images/space-pod.png";
import mbNftMansionImage from "../../assets/images/mb-nft-mansion.png";
import drivenCinemaImage from "../../assets/images/driven-cinema.png";
import natureGalleryImage from "../../assets/images/nature-gallery.png";
import metamansionImage from "../../assets/images/metamansion.png";

const roomsList = [
  {
    image: metabillionaireLoungeImage,
    name: "Metabillionaire Lounge",
    link: ""
  },
  {
    image: spacePodImage,
    name: "Space Pod",
    link: ""
  },
  {
    image: mbNftMansionImage,
    name: "MB NFT Mansion",
    link: ""
  },
  {
    image: drivenCinemaImage,
    name: "Driven Cinema",
    link: ""
  },
  {
    image: natureGalleryImage,
    name: "Nature Gallery",
    link: ""
  },
  {
    image: metamansionImage,
    name: "MetaMansion",
    link: ""
  }
];

export function MetaverseRoomList({ rooms }) {
  return (
    <ul className={styles.metaverseRoomList}>
      {rooms.map(room => {
        return (
          <li key={room.name} className={styles.metaverseRoomItem}>
            {/*<a href={room.link}>*/}
            <div className={styles.metaverseRoomImgWrapper}>
              <img src={room.image} />
            </div>
            <h3 className={styles.metaverseRoomName}>{room.name}</h3>
            {/*</a>*/}
          </li>
        );
      })}
    </ul>
  );
}

export function OwnSpaceInMetaverse() {
  return (
    <section className={styles.ownSpaceInMetaverse}>
      <div className={styles.container}>
        <h2 className={styles.ownSpaceInMetaverseHeading}>
          <FormattedMessage id="own-space-in-metaverse.title" defaultMessage="Own a space in the Metaverse" />
        </h2>
        <MetaverseRoomList rooms={roomsList} />
      </div>
    </section>
  );
}
