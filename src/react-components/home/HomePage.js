import React, { useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";
import configs from "../../utils/configs";
import { CreateRoomButton } from "./CreateRoomButton";
import { PWAButton } from "./PWAButton";
import { useFavoriteRooms } from "./useFavoriteRooms";
import { usePublicRooms } from "./usePublicRooms";
import styles from "./HomePage.scss";
import { AuthContext } from "../auth/AuthContext";
import { createAndRedirectToNewHub } from "../../utils/phoenix-utils";
import { PageContainer } from "../layout/PageContainer";
import { SocialRightBar } from "./SocialRightBar";
import { HeroBluemoon } from "./HeroBluemoon";
import { OwnSpaceInMetaverse } from "./OwnSpaceInMetaverse";
import { ImageComponent } from "./ImageComponent";
import { Features } from "./Features";
import { Socialise } from "./Socialise";
import { Partners } from "./Partners";

export function HomePage() {
  const auth = useContext(AuthContext);
  const intl = useIntl();

  const { results: favoriteRooms } = useFavoriteRooms();
  const { results: publicRooms } = usePublicRooms();

  const sortedFavoriteRooms = Array.from(favoriteRooms).sort((a, b) => b.member_count - a.member_count);
  const sortedPublicRooms = Array.from(publicRooms).sort((a, b) => b.member_count - a.member_count);

  useEffect(() => {
    const qs = new URLSearchParams(location.search);

    // Support legacy sign in urls.
    if (qs.has("sign_in")) {
      const redirectUrl = new URL("/signin", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    } else if (qs.has("auth_topic")) {
      const redirectUrl = new URL("/verify", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    }

    if (qs.has("new")) {
      createAndRedirectToNewHub(null, null, true);
    }
  }, []);

  const canCreateRooms = !configs.feature("disable_room_creation") || auth.isAdmin;

  return (
    <PageContainer className={styles.homePage}>
      <SocialRightBar />
      <HeroBluemoon />
      <OwnSpaceInMetaverse />
      <ImageComponent />
      <Features />
      <Socialise />
      <Partners />
    </PageContainer>
  );
}
