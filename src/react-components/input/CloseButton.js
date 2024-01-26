import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { IconButton } from "./IconButton";
import { ReactComponent as CloseIcon } from "../icons/ArrowBack.svg";
import styles from "./CloseButton.scss";

export function CloseButton({ lg, className, ...rest }) {
  return (
    <IconButton className={classNames({ [styles.lg]: lg }, className)} {...rest}>
      <CloseIcon width={30} height={30} />
      <p>Back</p>
    </IconButton>
  );
}

CloseButton.propTypes = {
  className: PropTypes.string,
  lg: PropTypes.bool
};
