import React, { useState } from 'react';
import styles from './ResizeRotate.scss';
import rotateImg from '../../assets/rotate-action.png';
import scaleImg from '../../assets/scale-action.png';
import { useEffect, useRef } from 'react';
import { ReactComponent as CloseIcon } from '../icons/Close.svg';
import { ReactComponent as ScaleIcon } from '../icons/Scale-new.svg';
import { ReactComponent as RotateIcon } from '../icons/Rotate-new.svg';
import { ReactComponent as PinIcon } from '../icons/Pin.svg';
import { ReactComponent as DeleteIcon } from '../icons/Delete.svg';
import { useObjectList } from './useObjectList';
import { getObjectUrl, usePinObject, useRemoveObject } from './object-hooks';
import { placeNonNFTAsset } from '../../utils/api';
import configs from '../../utils/configs';

export function ResizeRotate({ object, hubChannel, scene, isSidebarOpen }) {
  const { isPinned, togglePinned, unpinObject } = usePinObject(hubChannel, scene, object);
  const { removeObject } = useRemoveObject(hubChannel, scene, object);
  const { deselectObject } = useObjectList();
  const [showResizeRotate, setShowResizeRotate] = useState(true);
  const [rightPosition, setRightPosition] = useState(0);
  const assetUrl = getObjectUrl(object);
  const el = object.el;
  const intervalRef = useRef(null);
  const canvasIntervalRef = useRef(null);
  const canvas = document.querySelector('.a-canvas');

  const qs = new URLSearchParams(location.search);
  const defaultRoomId = configs.feature('default_room_id');
  const hubId =
    qs.get('hub_id') ||
    (document.location.pathname === '/' && defaultRoomId
      ? defaultRoomId
      : document.location.pathname.substring(1).split('/')[0]);

  const assetInfo = {
    roomId: hubId,
    modelUrl: assetUrl,
  };

  const handleRotate = () => {
    el.object3D.rotateY((45 * Math.PI) / 180);
  };

  const startScalingDown = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      el.object3D.scale.addScalar(-0.2);
    }, 10);
  };

  const startScalingUp = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      el.object3D.scale.addScalar(0.2);
    }, 10);
  };

  const stopScaling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // checking if canvas size changed
  const onResize = (canvas, callback) => {
    let canvasLeft = canvas.style.left;

    canvasIntervalRef.current = setInterval(() => {
      if (canvas.style.left !== canvasLeft) {
        canvasLeft = canvas.style.left;
        callback();
      }
    }, 300);
  };

  const handleDeleteClick = () => {
    placeNonNFTAsset(assetInfo).then((isPlaced) => {
      if (!isPlaced) {
        unpinObject();
        window.APP.entryManager._unpinElement(el);
        deselectObject();
        removeObject();
      }
    });
  };

  const handlePinClick = () => {
    togglePinned();
    placeNonNFTAsset(assetInfo).then((isPlaced) => {
      if (!isPlaced) {
        window.APP.entryManager._pinElement(el);
      } else {
        window.APP.entryManager._unpinElement(el);
      }
    });

    // if (!isPinned) {
    //   window.APP.entryManager._pinElement(el);
    // } else {
    //   window.APP.entryManager._unpinElement(el);
    // }
  };

  useEffect(() => {
    onResize(canvas, () => {
      const canvasLeft = canvas.style.left.replace(/px/g, '');
      const isSidebarShowning = Number(canvasLeft) !== 0;
      isSidebarShowning ? setRightPosition(420) : setRightPosition(0);
    });

    return () => {
      stopScaling();
      clearInterval(canvasIntervalRef.current);
    };
  }, []);

  return (
    <>
      {showResizeRotate ? (
        <>
          {!isSidebarOpen &&
            !isPinned && (
              <div className={styles.infoPinObject}>
                <p>Please pin the object to keep it in the room</p>
              </div>
            )}

          <div className={styles.resizeRotate} style={{ right: `${rightPosition + 40}px` }}>
            <div>
              <button className={styles.resizeRotateCloseBtn} onClick={() => setShowResizeRotate(false)}>
                <CloseIcon width={16} height={16} />
              </button>
              <div className={styles.resizeRotateOptions}>
                <p>Options</p>
              </div>
              <ul className={styles.resizeRotateList}>
                {!isSidebarOpen && (
                  <>
                    <li className={styles.resizeRotateListItems}>
                      <button className={styles.resizeRotatePinBtns} onClick={handlePinClick}>
                        <PinIcon width={15} height={15} />
                        <span>{isPinned ? 'Unpin' : 'Pin'}</span>
                      </button>
                    </li>
                    <li className={styles.resizeRotateListItems}>
                      <button className={styles.resizeRotateDeleteBtns} onClick={handleDeleteClick}>
                        <DeleteIcon width={15} height={15} />
                        <span>Delete</span>
                      </button>
                    </li>
                  </>
                )}

                <li className={styles.resizeRotateListItems}>
                  <button className={styles.resizeRotateActionBtns} onClick={handleRotate}>
                    <RotateIcon width={15} height={15} />
                    <span>Rotate</span>
                  </button>
                </li>
                <li className={styles.resizeRotateListItems}>
                  <ScaleIcon width={15} height={15} />
                  <span>Scale</span>
                  <div>
                    <button
                      className={styles.resizeRotateScaleBtns}
                      onMouseDown={startScalingDown}
                      onMouseUp={stopScaling}
                      onMouseLeave={stopScaling}
                    >
                      -
                    </button>
                    <button
                      className={styles.resizeRotateScaleBtns}
                      onMouseDown={startScalingUp}
                      onMouseUp={stopScaling}
                      onMouseLeave={stopScaling}
                    >
                      +
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
