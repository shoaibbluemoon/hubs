import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { CloseButton } from '../input/CloseButton';
import { Column } from '../layout/Column';
import { Sidebar } from '../sidebar/Sidebar';
import { Button } from '../input/Button';
import { RadioInputOption } from '../input/RadioInput';
import { RadioInputField } from '../input/RadioInputField';
import styles from './RoomPermissionsSidebar.scss';

const permissions = [
  {
    label: 'Open',
    value: 'open',
  },
  {
    label: 'Access Pass',
    value: 'access',
  },
  {
    label: 'Gold Pass',
    value: 'gold',
  },
  {
    label: 'NFT Lock',
    value: 'nft',
  },
  {
    label: 'Token Lock',
    value: 'token',
  },
];

const chains = ['ETH', 'BSC', 'BTC'];

const CustomInputField = ({ label, inputValue, setInputValue }) => {
  return (
    <label className={styles.roomPermissionsChildToken}>
      <span className={styles.roomPermissionsChildTokenLabel}>{label}</span>
      <input
        type="text"
        className={styles.roomPermissionsChildTokenInput}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </label>
  );
};

const CustomRadioInput = ({ subInputs, children, ...rest }) => {
  return (
    <>
      {subInputs ? (
        <>
          <RadioInputOption {...rest} />
          {children}
        </>
      ) : (
        <RadioInputOption {...rest} />
      )}
    </>
  );
};

export function RoomPermissionsSidebar({ onClose }) {
  const [permission, setPermission] = useState(permissions[0].value);
  const [selectedChain, setSelectedChain] = useState(chains[0]);
  const [inputValue, setInputValue] = useState('');
  const [projectName, setProjectName] = useState('');
  const [collectionLink, setCollectionLink] = useState('');

  const handleAcceptClick = () => {
    console.log(permission);
    if (permission === 'nft' || permission === 'token') {
      console.log(selectedChain, inputValue, projectName, collectionLink);
    }
    onClose();
  };

  useEffect(
    () => {
      setSelectedChain(chains[0]);
      setInputValue('');
      setProjectName('');
      setCollectionLink('');
    },
    [permission]
  );

  return (
    <Sidebar
      title={<FormattedMessage id="room-permissions-page.title" defaultMessage="Room Permissions" />}
      beforeTitle={<CloseButton onClick={onClose} />}
    >
      <Column padding as="form">
        <RadioInputField>
          {permissions.map((item) => (
            <CustomRadioInput
              key={item.value}
              subInputs={item.value === permission && (permission === 'nft' || permission === 'token')}
              value={item.value}
              label={item.label}
              checked={permission === item.value}
              onChange={() => setPermission(item.value)}
            >
              <div className={styles.roomPermissionsChildInputsContainer}>
                {chains.map((chain) => (
                  <RadioInputOption
                    key={chain}
                    className={styles.roomPermissionsChildRadioInputs}
                    value={chain}
                    label={chain}
                    checked={selectedChain === chain}
                    onChange={() => setSelectedChain(chain)}
                  />
                ))}
                <CustomInputField label={'Token Address'} inputValue={inputValue} setInputValue={setInputValue} />
                <CustomInputField label={'Project Name'} inputValue={projectName} setInputValue={setProjectName} />
                <CustomInputField label={'Collection Link'} inputValue={collectionLink} setInputValue={setCollectionLink} />
              </div>
            </CustomRadioInput>
          ))}
        </RadioInputField>
        <Button preset="accept" onClick={handleAcceptClick}>
          Accept
        </Button>
      </Column>
    </Sidebar>
  );
}
