import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./Footer.scss";
import logoFooter from "../../assets/images/app-logo-footer.png";
import decoration from "../../assets/images/footer-decoration.png";
import { ReactComponent as TwitterIcon } from "../icons/TwitterFooter.svg";
import { ReactComponent as DiscordIcon } from "../icons/DiscordNew.svg";
import { ReactComponent as InstagramIcon } from "../icons/InstagramNew.svg";
import classNames from "classnames";
import {
  deckLink,
  discordLink,
  instagramLink,
  joinTheWaitListLink,
  learnMoreLink,
  twitterLink
} from "../../utils/default-values";

const footerNav = [
  {
    head: "Information",
    list: [
      {
        title: "Learn More",
        link: learnMoreLink
      },
      {
        title: "Bluemoon Waitlist",
        link: joinTheWaitListLink
      },
      {
        title: "Bluemoon Deck",
        link: deckLink
      }
    ]
  }
];

const footerSocial = [
  {
    name: "discord",
    icon: DiscordIcon,
    link: discordLink
  },
  {
    name: "twitter",
    icon: TwitterIcon,
    link: twitterLink
  },
  {
    name: "instagram",
    icon: InstagramIcon,
    link: instagramLink
  }
];

export function FooterList({ footerList }) {
  return footerList.map(footerItem => {
    return (
      <ul key={footerItem.head}>
        <li className={styles.footerNavHeader}>{footerItem.head}</li>
        {footerItem.list.map(item => (
          <li key={item.title}>
            <a href={item.link} target="_blank" rel="noreferrer" className={styles.footerNavLink}>
              {item.title}
            </a>
          </li>
        ))}
        <li className={styles.mail}>
          <a href="mailto:partnerships@bluemoon.io" className={styles.footerNavLink}>
            partnerships@bluemoon.io
          </a>
        </li>
      </ul>
    );
  });
}

export function Footer() {
  const copyright = "© Bluemoon - All Right Reserved " + new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* <div className={styles.footerDecoration}>
        <img className={styles.decoration} src={decoration} />
      </div> */}
      <div className={styles.container}>
        <div className={styles.topContent}>
          <div className={styles.column}>
            <div className={styles.footerLogo}>
              <img src={logoFooter} />
            </div>
            <address className={styles.footerAddress}>
              <p>
                <FormattedMessage id="footer.address-ltd" defaultMessage="Bluemoon Ltd" />
              </p>
              <p>
                <FormattedMessage id="footer.address" defaultMessage="160 Robinson Road, 14-04" />
              </p>
              <p>
                <FormattedMessage id="footer.address-centre" defaultMessage="Singapore Business Federation Centre" />
              </p>
            </address>
          </div>
          <nav className={classNames(styles.column, styles.footerNav)}>
            <FooterList footerList={footerNav} />
          </nav>
          <div className={styles.column}>
            <ul className={styles.footerSocial}>
              {footerSocial.map(socialItem => {
                const Icon = socialItem.icon;

                return (
                  <li key={socialItem.name}>
                    <a href={socialItem.link} target="_blank" rel="noreferrer" className={styles.footerSocialLink}>
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={styles.bottomContent}>
          <p className={styles.copyrightText}>
            <FormattedMessage id="footer.copyright" defaultMessage="{copyright}" values={{ copyright }} />
          </p>
        </div>
      </div>
    </footer>
  );
}
