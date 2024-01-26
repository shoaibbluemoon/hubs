import React from 'react';
import styles from './Spaces.scss';
import { SpaceItem } from '../SpaceItem/SpaceItem';
import { DOMAIN, iframeURL } from '../../../../utils/api';
import configs from '../../../../utils/configs';

export function Spaces({ spaces, isSpacesWrapperOpen, setIsSpacesWrapperOpen }) {
  const qs = new URLSearchParams(location.search);

  const entry = qs.get('entry');
  const myWalletId = qs.get('walletId');

  return (
    <div className={styles.spacesContainer}>
      <div className={styles.listOfItemsText}>
        <span>Metaverse Spaces</span>
        {spaces.length > 2 && <button onClick={() => setIsSpacesWrapperOpen(!isSpacesWrapperOpen)}>See All</button>}
      </div>
      <div className={isSpacesWrapperOpen ? styles.openedListOfSpaces : styles.listOfSpaces}>
        {spaces &&
          spaces.map((space, idx) => {
            const link = space?.ROOM_ID ? `${DOMAIN}${space.ROOM_ID}?entry=${entry}&walletId=${myWalletId}` : '#';
            const img = space?.IMAGEURL.startsWith('/') ? `${iframeURL}${space.IMAGEURL}` : space.IMAGEURL;

            return <SpaceItem key={idx} nameOfSpace={space.ROOM_NAME} img={img} link={link} />;
          })}
      </div>
    </div>
  );
}
