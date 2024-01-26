import React from 'react';
import { ReactComponent as FollowIcon } from '../../../icons/user-add.svg';
import styles from './FollowButton.scss';

export function FollowButton({ title, onClickHandler }) {

  return(
    <button onClick={onClickHandler} className={styles.followButton}>
      <FollowIcon className={styles.followIcon} />
      <span className={styles.followButtonText}>{title}</span>
    </button>
  );
}
