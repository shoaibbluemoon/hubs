import styles from './SidebarBuy.scss';
import React, { useContext, useEffect, useRef, useState } from 'react';
// import certificate from '../../assets/images/certificate.png';
// import close from '../../assets/images/close.svg';
// import closeDark from '../../assets/images/closeDark.svg';
import infoIconWhite from '../../assets/images/info_white_24dp.png';
// import infoIconBlack from '../../assets/images/info_black_24dp.svg';
import { useObjectList } from '../room/useObjectList';
// import useObjectsInfo from '../../hooks/useObjectsInfo';
import { getObjectUrl, usePinObject } from '../room/object-hooks';
import { ThemeContext } from 'styled-components';
import { removeNetworkedObject } from '../../utils/removeNetworkedObject';
import { vision } from '../../vision/visionUtils';
import configs from '../../utils/configs';
import { iframeURL, placeAsset } from '../../utils/api';
import { Spinner } from '../misc/Spinner';
import { ReactComponent as CloseIcon } from '../icons/Close.svg';
import { ReactComponent as HideIcon } from '../icons/Minus.svg';
import { useCssBreakpoints } from 'react-use-css-breakpoints';

const overrideSpinner = `
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
`;

export function SidebarBuy({ object, handleSale, saledNFTS, scene, hubChannel, timer, onDelete, timerId, deletedObject }) {
  const breakpoint = useCssBreakpoints();
  const el = object.el;
  const isPinned = !!el.getAttribute('pinnable');

  const iframeRef = useRef(null);

  const [showSideBar, setShowSideBar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setDeleted] = useState(false);
  const { deselectObject } = useObjectList();
  const canvas = document.querySelector('.a-canvas');
  canvas.style.left = showSideBar && breakpoint !== 'sm' ? '-210px' : '0';
  const theme = useContext(ThemeContext);
  const assetName = getObjectUrl(object);

  const qs = new URLSearchParams(location.search);
  const defaultRoomId = configs.feature('default_room_id');
  const hubId =
    qs.get('hub_id') ||
    (document.location.pathname === '/' && defaultRoomId
      ? defaultRoomId
      : document.location.pathname.substring(1).split('/')[0]);

  const token = window.localStorage.getItem('token');

  const isThemeLight = theme.backgroundColor === '#fff';

  const handleSendIframe = () => {
    if (!iframeRef.current) return;

    const data = {
      theme: isThemeLight,
      isVision: vision.api.isAdmin,
      assetName: assetName,
      saledNFTS: saledNFTS,
      isDeleted: isDeleted,
      token,
      roomid: hubId,
      isPinned,
      ownerWalletId: window.APP.ownerWalletId,
    };

    iframeRef.current.contentWindow.postMessage({ type: 'bluemoon', data }, '*');
  };

  const handleMessageIframe = (e) => {
    if (!e.data) return;

    switch (e.data.type) {
      case 'bluemoon-delete':
        placeAsset({ modelurl: assetName, roomid: hubId }).then((isPlaced) => {
          if (!isPlaced) {
            onDelete(el);
            setDeleted(true);
          }
        });
        return;
      case 'bluemoon-sale':
        handleSale(assetName);
        return;
      case 'bluemoon-offer':
        deselectObject();
        removeNetworkedObject(scene, el);
        window.APP.entryManager._unpinElement(el);
        return;
      default:
        return;
    }
  };

  const handleIframeLoad = () => {
    handleSendIframe();
    setIsLoading(false);
  };

  const handleMinimizeClick = () => {
    setShowSideBar(false);
    setIsLoading(true);
    iframeRef.current = null;
  };

  useEffect(
    () => {
      if (deletedObject?.id === el.id && timer === 1) {
        deselectObject();
        removeNetworkedObject(scene, el);
        window.APP.entryManager._unpinElement(el);
      }

      if (timer === 0) {
        setDeleted(false);
      }
    },
    [timer]
  );

  useEffect(
    () => {
      if (breakpoint && breakpoint !== 'sm') {
        setTimeout(() => {
          setShowSideBar(true);
        }, 1);
      }
    },
    [breakpoint]
  );

  useEffect(() => {
    if (timerId) {
      setDeleted(true);
    }
  }, []);

  useEffect(
    () => {
      return () => (canvas.style.left = '0');
    },
    [object]
  );

  useEffect(
    () => {
      if (!iframeRef.current) return;

      window.addEventListener('message', handleMessageIframe);

      return () => {
        window.removeEventListener('message', handleMessageIframe);
        iframeRef.current = null;
      };
    },
    [iframeRef.current]
  );

  return (
    <>
      {showSideBar ? (
        <div className={styles.container}>
          {isLoading ? (
            <div className={styles.loader}>
              <Spinner />
            </div>
          ) : null}
          <iframe
            ref={iframeRef}
            src={`${iframeURL}/newsidebar`}
            onLoad={handleIframeLoad}
            height={isLoading ? '0' : '100%'}
            width="100%"
            title="Sidebar"
            style={{ border: 0, backgroundColor: '#fff' }}
          />
          <div className={styles.actionsButtonContainer}>
            <button
              onClick={() => {
                deselectObject();
                if (saledNFTS.includes(assetName)) {
                  removeNetworkedObject(scene, el);
                }
              }}
              className={styles.closeButton}
            >
              <CloseIcon width={18} height={18} />
            </button>
            {breakpoint === 'sm' ? (
              <button onClick={handleMinimizeClick} className={styles.hideButton}>
                <HideIcon width={18} height={18} />
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <img className={styles.infoImage} onClick={() => setShowSideBar(true)} src={infoIconWhite} />
      )}
    </>
  );
}
