import React from 'react';
import styles from './Badges.scss';

export function Badges({ data, onClickHandler, isBadgesWrapperOpen }) {
  return (
    <div className={styles.badgesContainer}>
      <div className={styles.listOfItemsText}>
        <span>Recent Earned Badges</span>
        {data.length > 4 && <button onClick={() => onClickHandler(!isBadgesWrapperOpen)}>See All</button>}
      </div>
      <div className={isBadgesWrapperOpen ? styles.openedBadges : styles.badges}>
        {data.map((badge, idx) => {
          return (
            <div className={styles.badgeWrapper}>
              <img
                key={idx}
                className={styles.badge}
                src={badge.image}
                alt="profile badge"
              />
              {badge.BadgeTracks.length > 1 &&
                <div className={styles.badgesQuantity}>
                  <span className={styles.badgesQuantityText}>{badge.BadgeTracks.length}</span>
                </div>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
