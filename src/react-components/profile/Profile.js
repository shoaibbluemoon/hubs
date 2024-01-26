import React, { useEffect, useState } from 'react';
import { Badges } from './components/Badges/Badges';
import { Spaces } from './components/Spaces/Spaces';
import { SocialMedia } from './components/SocialMedia/SocialMedia';
import { FollowInfo } from './components/FollowInfo/FollowInfo';
import { FollowButton } from './components/FollowButton/FollowButton';
import { ProfileHeader } from './components/ProfileHeader/ProfileHeader';
import { followUser, getUserRooms, getUserWallet, unfollowUser, getUser } from '../../utils/api';
import configs from '../../utils/configs';
import { Spinner } from '../misc/Spinner';
import { ProfileRank } from './components/ProfileRank/ProfileRank';
import styles from './Profile.scss';

export function Profile({ name, isMe }) {
  const qs = new URLSearchParams(location.search);
  const defaultRoomId = configs.feature('default_room_id');
  const hubId =
    qs.get('hub_id') ||
    (document.location.pathname === '/' && defaultRoomId
      ? defaultRoomId
      : document.location.pathname.substring(1).split('/')[0]);

  const myWalletId = qs.get('walletId');

  const [isFollow, setIsFollow] = useState(false);
  const [profileWalletId, setProfileWalletId] = useState(null);
  const [profileSpaces, setProfileSpaces] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [isSpacesWrapperOpen, setIsSpacesWrapperOpen] = useState(false);
  const [isBadgesWrapperOpen, setIsBadgesWrapperOpen] = useState(false);

  const handleFollow = async () => {
    const res = await followUser(myWalletId, profileWalletId);

    if (!res?.error) {
      setIsFollow(true);

      const info = await getUser(profileWalletId);
      setProfileData(info?.resultData);
    }
  };

  const handleUnfollow = async () => {
    const res = await unfollowUser(myWalletId, profileWalletId);

    if (!res?.error) {
      setIsFollow(false);

      const info = await getUser(profileWalletId);
      setProfileData(info?.resultData);
    }
  };

  const showFollowButton = isFollow ? (
    <FollowButton title="Unfollow" onClickHandler={handleUnfollow} />
  ) : (
    <FollowButton title="Follow" onClickHandler={handleFollow} />
  );

  const makeWalletIdShorter = () => {
    if (profileWalletId) {
      return `${profileWalletId.substring(0, 12)}....${profileWalletId.substring(
        profileWalletId.length - 4,
        profileWalletId.length
      )}`.toUpperCase();
    }
  };

  useEffect(
    () => {
      (async () => {
        await getUserWallet(hubId, name).then((data) => {
          setProfileWalletId(data.data.WALLETID);
        });

        if (profileWalletId) {
          await getUser(profileWalletId).then((data) => {
            const thisUserInFollowers = data?.resultData?.followers.find(
              (follower) => follower.address === myWalletId.toLowerCase()
            );
            setIsFollow(!!thisUserInFollowers);
            setProfileData(data?.resultData);
          });

          await getUserRooms(profileWalletId).then((data) => {
            setProfileSpaces(data);
            // setProfileSpaces([
            //   {
            //     "ROOM_ID": "GPnLmSZ",
            //     "WALLETID": "0x75f5c035d5d9a47700e69d9d5db55523fce0db7a",
            //     "UID": "6eaa6f9ca61f99858f37723a985ca01a",
            //     "ROOM_NAME": "test32",
            //     "ROOM_DESCRIPTION": "test",
            //     "SCENEID": "jHPuoAK",
            //     "CREATED_DATE": "2023-02-07T12:20:10.000Z",
            //     "IMAGEURL": "/static/media/theatre.c983a4cd0d116fb33491.webp"
            //   },
            //   {
            //     "ROOM_ID": "Gy5cN7x",
            //     "WALLETID": "0x378e1ebdc3f1721de8405797198f80342252c12a",
            //     "UID": "9e8afc3f366cecf8ef693f129f6bf6ef",
            //     "ROOM_NAME": "test1",
            //     "ROOM_DESCRIPTION": "test",
            //     "SCENEID": "jHPuoAK",
            //     "CREATED_DATE": "2023-02-06T09:35:49.000Z",
            //     "IMAGEURL": "/static/media/theatre.c983a4cd0d116fb33491.webp"
            //   }
            // ])
          });
        }
      })();
    },
    [profileWalletId]
  );

  return (
    <div className={styles.container}>
      {!profileData ? (
        <div className={styles.spinnerWrapper}>
          <Spinner />
        </div>
      ) : (
        <>
          <ProfileHeader
            name={name}
            registrationDate={profileData.createdAt}
            status={profileData.bio}
            shortWalletAddress={makeWalletIdShorter()}
            isVerified={profileData.verified}
            avatar={profileData.picture}
          />
          <SocialMedia userInfo={profileData} />
          {profileData.rank && <ProfileRank rank={profileData.rank} />}
          <FollowInfo followersNumber={profileData.followersCount} followingNumber={profileData.followingCount} />
          {!isMe && showFollowButton}
          {profileData.badges && (
            <Badges
              data={profileData.badges}
              onClickHandler={setIsBadgesWrapperOpen}
              isBadgesWrapperOpen={isBadgesWrapperOpen}
            />
          )}
          {profileSpaces &&
            profileSpaces.length > 0 && (
              <Spaces
                spaces={profileSpaces}
                isSpacesWrapperOpen={isSpacesWrapperOpen}
                setIsSpacesWrapperOpen={setIsSpacesWrapperOpen}
              />
            )}
          <div className={styles.lineWrapper}>
            <span className={styles.line} />
          </div>
        </>
      )}
    </div>
  );
}
