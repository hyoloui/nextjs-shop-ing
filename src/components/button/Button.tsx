import classNames from "classnames";
import React from "react";

import styles from "./Button.module.scss";

interface IButtonProps {
  type?: "button" | "submit" | "reset";
  secondary?: boolean;
  bgColor?: string;
  fgColor?: string;
  width?: string;
  [x: string]: any;
}
const Button = ({
  type = "button",
  secondary = false,
  bgColor,
  fgColor,
  width,
  ...restProps
}: IButtonProps) => {
  const composeClasses = classNames(
    styles.button,
    secondary ? styles.secondary : styles.primary
  );

  const style = {
    backgroundColor: bgColor || "",
    color: fgColor || "",
    width: width || "",
  };

  return (
    <button
      className={composeClasses}
      type={type as "button" | "submit" | "reset"} // Cast type to union type
      style={style}
      {...restProps}
    />
  );
};

export default Button;
