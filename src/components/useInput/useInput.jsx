import { useState } from 'react';

function useInput(validateValue) {
	const [enteredValue, setEnteredValue] = useState("");
	const [isBlur, setIsBlur] = useState(false);
	const valueIsValid = validateValue(enteredValue);
	const hasError = !valueIsValid && isBlur;

	const valueChangeHandler = (event) => {
		setEnteredValue(event.target.value);
	};

	const inputBlurHandler = (event) => {
		setIsBlur(true);
	};

	const inputReset = () => {
		setEnteredValue("");
		setIsBlur(false);
	};

	const editName = (value) => {
		setEnteredValue(value)
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		inputReset,
		editName
	};
}

export default useInput;