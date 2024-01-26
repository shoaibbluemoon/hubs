import React from 'react';
import { ReactComponent as VerifyIcon } from '../../../icons/verify.svg';
import styles from './ProfileHeader.scss';

export function ProfileHeader({
                                avatar,
                                name,
                                isVerified,
                                shortWalletAddress,
                                registrationDate,
                                status
                              }) {
  const dateOptions = {month:'long', year:'numeric', day:'numeric'};
  const membershipDate = new Date(registrationDate).toLocaleString('en-us',dateOptions);

  return (
    <>
      <div className={styles.bio}>
        <div className={styles.avatarContainer}>
          {avatar && <img className={styles.avatar} src={avatar} alt='profile avatar' />}
          {isVerified && <VerifyIcon className={styles.verifyIcon} />}
        </div>
        <div className={styles.bioContent}>
          <h2 className={styles.name}>{name}</h2>
          <p className={styles.walletAddress}>{shortWalletAddress}</p>
          {registrationDate && <p className={styles.registrationDate}>{`MEMBER SINCE: ${membershipDate}`}</p>}
        </div>
      </div>
      {status &&
        <div className={styles.statusContainer}>
          <p className={styles.status}>{status}</p>
        </div>
      }
    </>
  );
}
