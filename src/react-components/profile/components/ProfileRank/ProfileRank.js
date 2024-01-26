import React from 'react';
import DiamondRank from '../../../../assets/images/Diamond.png';
import LegendaryRank from '../../../../assets/images/Legend.png';
import PlatinumRank from '../../../../assets/images/Platinum.png';
import GoldenRank from '../../../../assets/images/Gold.png';
import SilverRank from '../../../../assets/images/Silver.png';
import styles from './ProfileRank.scss';

export function ProfileRank({ rank }) {
  const renderRank = (className, rankIcon) => {
    return (
      <div className={`${styles.rankContainer} ${className}`}>
        <img className={styles.rankIcon} src={rankIcon} alt="profile rank" />
        <div className={styles.rankTextWrapper}>
          <span className={styles.rankTitle}>Staking Rank</span>
          <span className={styles.rankText}>{rank}</span>
        </div>
      </div>
    );
  };

  const showRank = () => {
    switch (rank) {
      case 'Silver':
        return renderRank(styles.silverRank, SilverRank);

      case 'Gold':
        return renderRank(styles.goldenRank, GoldenRank);

      case 'Platinum':
        return renderRank(styles.platinumRank, PlatinumRank);

      case 'Legend':
        return renderRank(styles.legendaryRank, LegendaryRank);

      case 'Diamond':
        return renderRank(styles.diamondRank, DiamondRank);

      default:
        break;
    }
  };

  return showRank();
}
