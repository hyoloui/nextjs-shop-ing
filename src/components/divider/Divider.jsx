import React from "react";

import styles from "./Divider.module.scss";

const Divider = ({ space = 22, color = "#ccc", ...restProps }) => {
  const style = {
    marginTop: space,
    marginBottom: space,
    background: color,
  };
  return <div role="presentation" style={style} className={styles.line} />;
};

export default Divider;
