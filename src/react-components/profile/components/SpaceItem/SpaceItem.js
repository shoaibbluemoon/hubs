import React from 'react';
import styles from './SpaceItem.scss';
import MetaMansionSpace from '../../../../assets/images/meta_mansion_space.png';

export function SpaceItem({ nameOfSpace, img, link }) {
  return (
    <div className={styles.itemContainer}>
      <img className={styles.spaceImage} src={img || MetaMansionSpace} alt="room image" />
      <div className={styles.itemDetails}>
        <div className={styles.itemDetailsColumn}>
          {/* <p className={styles.space}>Space</p> */}
          <p className={styles.itemName}>{nameOfSpace}</p>
        </div>

        <div className={styles.itemDetailsColumn}>
          <a href={link} className={styles.joinRoomLink} target="_blank">
            Join
          </a>
        </div>
      </div>
    </div>
  );
}
