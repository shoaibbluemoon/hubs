import React, { useEffect, useRef, forwardRef, useCallback } from 'react';
import { ToolbarButton } from '../input/ToolbarButton';
import { ReactComponent as ObjectIcon } from '../icons/Object.svg';
import { ReactComponent as UploadNewIcon } from '../icons/Upload-new.svg';
import { FormattedMessage } from 'react-intl';
import { useState } from 'react';
import styles from './NftToolbarContainer.scss';
import { createPortal } from 'react-dom';
import configs from '../../utils/configs';
import { ReactComponent as CloseIcon } from '../icons/Close.svg';
import classNames from 'classnames';
import { Spinner } from '../misc/Spinner';
import { iframeURL } from '../../utils/api';
import { TextInputField } from '../input/TextInputField';
import { CloseButton } from '../input/CloseButton';
import { IconButton } from '../input/IconButton';
import { ReactComponent as AttachIcon } from '../icons/Attach.svg';
import { Button } from '../input/Button';
import { Column } from '../layout/Column';
import { useForm } from 'react-hook-form';
import ducky from '../../assets/models/DuckyMesh.glb';

const tabs = ['NFT', 'Upload from device'];

export function SelectNftTab({ tabName, isSelected, handleSelectTabClick }) {
  const active = isSelected ? styles.activeTab : '';

  // if (tabName === tabs[1]) {
  //   return <li className={classNames([styles.selectTabsItem, styles.disabled])}>{tabName}</li>;
  // }

  return (
    <li className={classNames([styles.selectTabsItem, active])} onClick={handleSelectTabClick}>
      {tabName}
    </li>
  );
}

const NftListIframe = forwardRef(({ isLoading }, ref) => {
  return (
    <>
      {isLoading ? (
        <div className={styles.loader}>
          <Spinner />
        </div>
      ) : null}
      <iframe
        ref={ref}
        src={`${iframeURL}/nft-container`}
        width="100%"
        height={isLoading ? '0' : '100%'}
        title="Nft list"
        style={{ border: 0, backgroundColor: '#fff' }}
      />
    </>
  );
});

const UploadFile = ({ showModelCollectionLink, modelCollectionUrl, onSubmit }) => {
  const { handleSubmit, register, watch, setValue } = useForm();

  useEffect(
    () => {
      register('url');
    },
    [register]
  );

  const file = watch('file');
  const hasFile = file && file.length > 0;
  const fileName = hasFile ? file[0].name : undefined;

  const onClear = useCallback(
    () => {
      if (hasFile) {
        setValue('file', undefined);
      } else {
        setValue('url', '');
      }
    },
    [hasFile, setValue]
  );

  const onChange = useCallback(
    (e) => {
      if (hasFile) {
        return;
      }

      setValue('url', e.target.value);
    },
    [hasFile, setValue]
  );

  const url = watch('url', '');

  const showCloseButton = hasFile || url.length > 0;

  return (
    <Column as="form" padding center onSubmit={handleSubmit(onSubmit)}>
      <p>
        {showModelCollectionLink ? (
          <FormattedMessage
            id="upload-file.message-with-collection"
            defaultMessage="Upload or paste a URL to an image, video, model, or scene. Models can be found on <sketchfablink>Sketchfab</sketchfablink> and <polylink>Google Poly</polylink>, or our <collectionlink>collection</collectionlink>."
            values={{
              // eslint-disable-next-line react/display-name
              sketchfablink: (chunks) => (
                <a
                  href="https://sketchfab.com/search?features=downloadable&type=models"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              ),
              // eslint-disable-next-line react/display-name
              polylink: (chunks) => (
                <a href="http://poly.google.com/" target="_blank" rel="noopener noreferrer">
                  {chunks}
                </a>
              ),
              // eslint-disable-next-line react/display-name
              collectionlink: (chunks) => (
                <a href={modelCollectionUrl} target="_blank" rel="noopener noreferrer">
                  {chunks}
                </a>
              ),
            }}
          />
        ) : (
          <FormattedMessage
            id="upload-file.message"
            defaultMessage="Upload or paste a URL to an image, video, model, or scene. Models can be found on <sketchfablink>Sketchfab</sketchfablink> and <polylink>Google Poly</polylink>."
            values={{
              // eslint-disable-next-line react/display-name
              sketchfablink: (chunks) => (
                <a
                  href="https://sketchfab.com/search?features=downloadable&type=models"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              ),
              // eslint-disable-next-line react/display-name
              polylink: (chunks) => (
                <a href="http://poly.google.com/" target="_blank" rel="noopener noreferrer">
                  {chunks}
                </a>
              ),
            }}
          />
        )}
      </p>
      <TextInputField
        name="url"
        label={<FormattedMessage id="upload-file.url-field-label" defaultMessage="Object URL or File" />}
        placeholder="https://example.com/avatar.glb"
        type={hasFile ? 'text' : 'url'}
        value={fileName || url || ''}
        onChange={onChange}
        afterInput={
          <>
            {showCloseButton && <CloseIcon width={15} height={15} onClick={onClear} />}
            <IconButton as="label" className={classNames({ [styles.hidden]: showCloseButton })} htmlFor="file">
              <AttachIcon />
              <input id="file" className={styles.hidden} name="file" type="file" ref={register} />
            </IconButton>
          </>
        }
        description={
          <FormattedMessage
            id="upload-file.url-field-description"
            defaultMessage="Accepts glb, png, jpg, gif, mp4, and mp3 files"
          />
        }
      />
      <Button type="submit" preset="accept">
        <FormattedMessage id="upload-file.create-object-button" defaultMessage="Create Object" />
      </Button>
    </Column>
  );
};

export function NftContainer({ handleClickClose, scene }) {
  const iframeRef = useRef(null);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [isLoading, setIsLoading] = useState(true);

  const qs = new URLSearchParams(location.search);
  const defaultRoomId = configs.feature('default_room_id');

  const hubId =
    qs.get('hub_id') ||
    (document.location.pathname === '/' && defaultRoomId
      ? defaultRoomId
      : document.location.pathname.substring(1).split('/')[0]);

  const handleMessageIframe = (e) => {
    if (!e.data) return;

    switch (e.data.type) {
      case 'bluemoon-nft-add':
        window.APP.store.asset = { ...e.data.data, roomid: hubId, isNft: true };
        scene.emit('add_media', { file: e.data.data.modelurl });
        handleClickClose();
        return;
      default:
        return;
    }
  };

  const handleSendIframe = (e) => {
    setIsLoading(false);
    if (!iframeRef.current) return;

    const token = window.localStorage.getItem('token');

    const data = {
      roomId: hubId,
      token,
    };

    iframeRef.current.contentWindow.postMessage({ type: 'bluemoon-room', data }, '*');
  };

  useEffect(
    () => {
      if (selectedTab === tabs[0]) {
        setIsLoading(true);
        iframeRef.current.addEventListener('load', handleSendIframe);

        window.addEventListener('message', handleMessageIframe);

        return () => window.removeEventListener('message', handleMessageIframe);
      }
    },
    [selectedTab]
  );

  const onSubmit = useCallback(
    ({ file, url }) => {
      window.APP.store.asset = { modelurl: url, roomid: hubId, isNft: false };
      console.log('app', window.APP.store.asset)
      scene.emit('add_media', { file: (file && file.length > 0 && file[0]) || url || ducky });
      handleClickClose();
    },
    [scene, handleClickClose]
  );

  const renderContent = (selectedTab) => {
    switch (selectedTab) {
      case tabs[0]:
        return <NftListIframe isLoading={isLoading} ref={iframeRef} />;
      case tabs[1]:
        return (
          <UploadFile
            showModelCollectionLink={configs.feature('show_model_collection_link')}
            modelCollectionUrl={configs.link('model_collection', 'https://sketchfab.com/mozillareality')}
            onSubmit={onSubmit}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div className={styles.nftContainer}>
      <button className={styles.nftBtnClose} onClick={() => handleClickClose()}>
        <CloseIcon width={18} height={18} />
      </button>
      <div className={styles.nftContent}>
        <h1 className={styles.nftHeading}>Upload Media</h1>
        <ul className={styles.nftTabs}>
          {tabs.map((tab) => {
            return (
              <SelectNftTab
                key={tab}
                tabName={tab}
                isSelected={selectedTab === tab}
                handleSelectTabClick={() => setSelectedTab(tab)}
              />
            );
          })}
        </ul>
        {renderContent(selectedTab)}
      </div>
    </div>
  );
}

export function NftPopoverButton({ handleClickOpen }) {
  return (
    <ToolbarButton
      icon={<UploadNewIcon />}
      onClick={() => handleClickOpen()}
      label={<FormattedMessage id="nft-toolbar-button" defaultMessage="NFT" />}
      preset="accent6"
    />
  );
}

export function NftToolbarContainer({ scene }) {
  const [visible, setVisible] = useState(false);

  const handleClickOpen = () => {
    setVisible(true);
  };

  const handleClickClose = () => {
    setVisible(false);
  };

  return (
    <>
      <NftPopoverButton handleClickOpen={handleClickOpen} />
      {visible && createPortal(<NftContainer handleClickClose={handleClickClose} scene={scene} />, document.body)}
    </>
  );
}
