import React from "react";
import {discordLink, instagramLink, twitterLink} from "../../utils/default-values";
import { ReactComponent as DiscordIcon } from "../icons/DiscordNew.svg";
import { ReactComponent as TwitterIcon } from "../icons/TwitterFooter.svg";
import { ReactComponent as InstagramIcon } from "../icons/InstagramNew.svg";
import styles from "./SocialRightBar.scss";

const socialList = [
  {
    name: 'discord',
    link: discordLink,
    icon: DiscordIcon
  },
  {
    name: 'twitter',
    link: twitterLink,
    icon: TwitterIcon
  },
  {
    name: 'instagram',
    link: instagramLink,
    icon: InstagramIcon
  }
]

export function SocialRightBar() {
  return (
    <nav className={styles.socialRightBar}>
      <ul className={styles.socialRightBarList}>
        {socialList.map(socialItem => {
          const Icon = socialItem.icon;

          return (
            <li key={socialItem.name}>
              <a href={socialItem.link} target="_blank" rel="noreferrer" className={styles.socialRightBarItemLink}>
                <Icon />
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
