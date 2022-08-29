import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../Store/Cart-context";

import styles from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartctx = useContext(CartContext);

  const totalAmount = `${cartctx.totalAmount.toFixed(2)}`;
  const hasItems = cartctx.items.length > 0;

  const addItemToTheListHandler = (item) => {
    cartctx.addItem({ ...item, amount: 1 });
  };
  const removeItemFromTheListHandler = (id) => {
    cartctx.removeItem(id);
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={addItemToTheListHandler.bind(null, item)}
          onRemove={removeItemFromTheListHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onClose} className={styles["button--alt"]}>
          Close
        </button>
        {hasItems && <button className={styles.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
