import React from "react";

import styles from "./Checkout.module.css";

import useInput from "../Hooks/use-Input";

const Checkout = (props) => {
  const {
    value: enteredName,
    hasError: nameError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    blurValueChangeHandler: nameBlurHandler,
    reset: nameReseter,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredAddress,
    hasError: addressError,
    isValid: addressIsValid,
    valueChangeHandler: addressChangeHandler,
    blurValueChangeHandler: addressBlurHandler,
    reset: addressReseter,
  } = useInput((value) => value.trim().length !== 10);

  const {
    value: enteredNumber,
    hasError: numberError,
    isValid: numberIsValid,
    valueChangeHandler: numberChangeHandler,
    blurValueChangeHandler: numberBlurHandler,
    reset: numberReseter,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (nameIsValid && addressIsValid && numberIsValid) {
    formIsValid = true;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    nameReseter();
    addressReseter();
    numberReseter();

    props.onConfirm({
      name: enteredName,
      address: enteredAddress,
      number: enteredNumber,
    });
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <div className={styles.control}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameError && <p className={styles.text}>Name cannot be empty!</p>}
      </div>

      <div className={styles.control}>
        <label htmlFor="address">Your Address</label>
        <input
          type="text"
          id="address"
          value={enteredAddress}
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
        />
        {addressError && (
          <p className={styles.text}>Address cannot be empty!</p>
        )}
      </div>
      <div className={styles.control}>
        <label htmlFor="number">Your Phone Number</label>
        <input
          type="number"
          id="number"
          value={enteredNumber}
          onChange={numberChangeHandler}
          onBlur={numberBlurHandler}
        />
        {numberError && <p className={styles.text}>Number cannot be empty!</p>}
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={props.onCancel}
          className={styles.submit}
        >
          Cancel
        </button>
        <button className={styles.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
