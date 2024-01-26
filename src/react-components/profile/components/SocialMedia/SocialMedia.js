import React from 'react';
import { ReactComponent as InstagramIcon } from '../../../icons/instagram.svg';
import { ReactComponent as TwitterIcon } from '../../../icons/twitter.svg';
import { ReactComponent as DiscordIcon } from '../../../icons/discord_minimalistic.svg';
import { ReactComponent as TelegramIcon } from '../../../icons/telegram.svg';
import { ReactComponent as FacebookIcon } from '../../../icons/facebook.svg';
import styles from './SocialMedia.scss';

export function SocialMedia({ userInfo }) {
  const links = [
    {
      icon: DiscordIcon,
      link: userInfo?.discordLink
    },
    {
      icon: InstagramIcon,
      link: userInfo?.instagramLink,
    },
    // {
    //   icon: FaMedium,
    //   link: userInfo.meduimLink
    // },
    // {
    //   icon: FaReddit,
    //   link: userInfo.redditLink
    // },
    {
      icon: TelegramIcon,
      link: userInfo?.telegramLink
    },
    {
      icon: TwitterIcon,
      link: userInfo?.twitterUserName
    }
  ]

  return (
    <div className={styles.socialMedia}>
      {links.map((linkItem, index) => {
        if (!linkItem.link || linkItem.link === "undefined") return null;
        const Icon = linkItem.icon;

        return (
          <a key={index} href={linkItem.link} target="_blank"><Icon /></a>
        )
      })}
    </div>
  );
}
