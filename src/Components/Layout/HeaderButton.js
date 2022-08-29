import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/Cart-context";

import CartIcon from "./CartIcon";
import styles from "./HeaderButton.module.css";

const HeaderButton = (props) => {
  const [btnHighlight, setBtnHighlight] = useState(false);
  const cartctx = useContext(CartContext);

  const numberOfCartItems = cartctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${styles.button} ${btnHighlight ? styles.bump : ""}`;

  const { items } = cartctx;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnHighlight(true);

    const timer = setTimeout(() => {
      setBtnHighlight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems} </span>
    </button>
  );
};

export default HeaderButton;
