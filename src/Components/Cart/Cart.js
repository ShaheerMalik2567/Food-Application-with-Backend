import React, { useContext, useState } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../Store/Cart-context";

import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "../UI/Checkout";

const Cart = (props) => {
  const cartctx = useContext(CartContext);
  const [isCheckout, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalAmount = `${cartctx.totalAmount.toFixed(2)}`;
  const hasItems = cartctx.items.length > 0;

  const addItemToTheListHandler = (item) => {
    cartctx.addItem({ ...item, amount: 1 });
  };
  const removeItemFromTheListHandler = (id) => {
    cartctx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    setSubmitted(false);
    await fetch(
      "https://react-http-b804f-default-rtdb.firebaseio.com/Orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartctx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setSubmitted(true);
    cartctx.clearCart();
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
  const modalAction = (
    <div className={styles.actions}>
      <button onClick={props.onClose} className={styles["button--alt"]}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const CartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalAction}
    </React.Fragment>
  );

  const isSubmittingOrder = <p>Sending Order Data...</p>;
  const didSubmit = (
    <React.Fragment>
      <p>The Order is Recieved</p>
      <div className={styles.actions}>
        <button onClick={props.onClose} className={styles.button}>
          Close
        </button>
      </div>
    </React.Fragment>
  );
  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !submitted && CartModalContent}
      {isSubmitting && isSubmittingOrder}
      {!isSubmitting && submitted && didSubmit}
    </Modal>
  );
};

export default Cart;
