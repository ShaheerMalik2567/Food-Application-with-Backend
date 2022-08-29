import React from "react";

import styles from "./Header.module.css";
import HeaderButton from "./HeaderButton";

import image from "./meals.jpg";

const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Ideo Meals</h1>
        <HeaderButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={image} alt="Food" />
      </div>
    </React.Fragment>
  );
};

export default Header;
