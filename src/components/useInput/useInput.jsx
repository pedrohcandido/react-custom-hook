import { cpf, cnpj } from 'cpf-cnpj-validator'
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

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		inputReset
	};
}

export default useInput;