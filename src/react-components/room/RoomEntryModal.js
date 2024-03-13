import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Modal } from "../modal/Modal";
import { Button } from "../input/Button";
import { ReactComponent as VRIcon } from "../icons/VR.svg";
import { ReactComponent as ShowIcon } from "../icons/Show.svg";
import styles from "./RoomEntryModal.scss";
import { useCssBreakpoints } from "react-use-css-breakpoints";
import { Column } from "../layout/Column";
import { FormattedMessage } from "react-intl";
import logoBluemoon from "../../assets/NewDesignPics/bluemoon-logo-white.png";
import { useFormik } from "formik";
import { ReCAPTCHA } from "react-google-recaptcha";
import { CAPTCHA_API_KEY, postRoomUsername, postUsername } from "../../utils/api";
import configs from "../../utils/configs";

export function RoomEntryModal({
  appName,
  logoSrc,
  className,
  roomName,
  showJoinRoom,
  onJoinRoom,
  showEnterOnDevice,
  onEnterOnDevice,
  showSpectate,
  onSpectate,
  showOptions,
  onOptions,
  store,
  ...rest
}) {
  const recaptchaRef = React.createRef();
  const breakpoint = useCssBreakpoints();
  const [newName, setNewName] = useState("");
  const [isCaptcha, setIsCaptcha] = useState(false);
  const token = localStorage.getItem("token");
  const changeName = name => {
    store.update({
      profile: {
        displayName: name,
        avatarId: store.state.profile.avatarId
      }
    });
  };

  const qs = new URLSearchParams(location.search);
  const defaultRoomId = configs.feature("default_room_id");
  const hubId =
    qs.get("hub_id") ||
    (document.location.pathname === "/" && defaultRoomId
      ? defaultRoomId
      : document.location.pathname.substring(1).split("/")[0]);

  const formik = useFormik({
    initialValues: {
      name: ""
    },
    onSubmit: async (values, { setFieldError }) => {
      if (token) {
        const success = await postRoomUsername(hubId, values.name);

        if (success) {
          localStorage.setItem("userName", values.name);
          onJoinRoom();
        } else {
          setFieldError("name", "Error!");
        }
      } else {
        localStorage.setItem("userName", values.name);
        onJoinRoom();
      }
      // changeName(values.name);
    },

    validateOnMount: true
  });

  useEffect(() => {
    if (token) {
      setIsCaptcha(true);
    }
  }, []);

  const walletId = qs.get("walletId");

  const isOwnerOfTheRoom =
    window.APP?.ownerWalletId?.toLowerCase() === window.APP?.walletId?.toLocaleLowerCase() ||
    window.APP?.ownerWalletId?.toLowerCase() === window.APP?.userEmail?.toLowerCase();
  const isFreeTrailRank = typeof window.APP?.rank === "undefined" || Number(window.APP?.rank) <= 1;
  const showEnterButton = isOwnerOfTheRoom || (showJoinRoom && !isFreeTrailRank);
  const showSpectateButton = !isOwnerOfTheRoom && showSpectate && isFreeTrailRank;

  return (
    <Modal className={classNames(styles.roomEntryModal, className)} disableFullscreen {...rest}>
      <Column center className={styles.content}>
        {breakpoint !== "sm" && breakpoint !== "md" && (
          <div className={styles.logoContainer}>
            <img src={logoBluemoon} alt={appName} />
          </div>
        )}
        <div className={styles.roomName}>
          <h5>
            <FormattedMessage id="room-entry-modal.room-name-label" defaultMessage="Room Name" />
          </h5>
          <p>{roomName}</p>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className={styles.userName}>
            {isOwnerOfTheRoom || !isFreeTrailRank ? (
              <>
                {/* <label htmlFor="name">Enter Name</label> */}
                <input
                  value={formik.values.name}
                  type="text"
                  id="name"
                  placeholder="Enter name"
                  onChange={formik.handleChange}
                  autoComplete="off"
                />
                <small style={{ opacity: formik.errors.name ? 1 : 0 }}>{formik.errors.name}</small>
              </>
            ) : null}
          </div>

          {!window.APP.isAuthorized && (
            <ReCAPTCHA
              className={styles.recaptcha}
              ref={recaptchaRef}
              grecaptcha={window.grecaptcha}
              sitekey={CAPTCHA_API_KEY}
              onChange={() => setIsCaptcha(true)}
            />
          )}
          <Column center className={styles.buttons}>
            {showEnterButton && (
              <Button disabled={!formik.isValid || !isCaptcha} preset="accent6" type="submit">
                {/*<Button disabled={!formik.isValid} preset="accent6" type="submit">*/}
                <span>
                  <FormattedMessage id="room-entry-modal.join-room-button" defaultMessage="Enter Metaverse" />
                </span>
              </Button>
            )}
            {showEnterOnDevice && false && (
              <Button preset="accent5" onClick={onEnterOnDevice}>
                <VRIcon />
                <span>
                  <FormattedMessage
                    id="room-entry-modal.enter-on-device-button"
                    defaultMessage="Enter With Device Headset"
                  />
                </span>
              </Button>
            )}
            {showSpectateButton && (
              <Button preset="accent2" onClick={onSpectate}>
                <ShowIcon />
                <span>
                  <FormattedMessage id="room-entry-modal.spectate-button" defaultMessage="Spectate" />
                </span>
              </Button>
            )}
          </Column>
        </form>
      </Column>
    </Modal>
  );
}

RoomEntryModal.propTypes = {
  appName: PropTypes.string,
  logoSrc: PropTypes.string,
  className: PropTypes.string,
  roomName: PropTypes.string.isRequired,
  showJoinRoom: PropTypes.bool,
  onJoinRoom: PropTypes.func,
  showEnterOnDevice: PropTypes.bool,
  onEnterOnDevice: PropTypes.func,
  showSpectate: PropTypes.bool,
  onSpectate: PropTypes.func,
  showOptions: PropTypes.bool,
  onOptions: PropTypes.func
};

RoomEntryModal.defaultProps = {
  showJoinRoom: true,
  showEnterOnDevice: true,
  showSpectate: true,
  showOptions: true
};
