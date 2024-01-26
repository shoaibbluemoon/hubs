import React from 'react';
import styles from './FollowInfo.scss';

export function FollowInfo({ followersNumber, followingNumber }) {

  return (
    <div className={styles.followingContainer}>
      <ul className={styles.followingContent}>
        {followersNumber && <li className={styles.followingNumber}>{followersNumber}</li>}
        <li className={styles.followingText}> Followers</li>
      </ul>
      <ul className={styles.followingContent}>
        {followingNumber && <li className={styles.followingNumber}>{followingNumber}</li>}
        <li className={styles.followingText}> Following</li>
      </ul>
    </div>
  );
}
