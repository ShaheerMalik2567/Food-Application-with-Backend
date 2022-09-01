import { useState } from "react";

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [touchedValue, settouchedValue] = useState(false);

  const validValue = validateValue(enteredValue);
  const hasError = !validValue && touchedValue;

  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const blurValueChangeHandler = (event) => {
    settouchedValue(true);
  };
  const reset = () => {
    setEnteredValue("");
    settouchedValue(false);
  };

  return {
    value: enteredValue,
    hasError,
    isValid: validValue,
    valueChangeHandler,
    blurValueChangeHandler,
    reset,
  };
};
export default useInput;
