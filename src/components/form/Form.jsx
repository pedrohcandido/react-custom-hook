import { useEffect, useState } from "react";
import './Form.css'
import Input from "../input";
import { cpf, cnpj } from 'cpf-cnpj-validator'
import AnswerList from "../answerList";
import useInput from "../useInput/useInput";

let nameContent = <p style={{color: "red", fontSize: "13px"}}>o nome não pode ser vazio</p>;

const checkName = (value) => {
  if (value.trim() === "") {
    nameContent = <p style={{color: "red", fontSize: "13px"}}>o nome não pode ser vazio</p>;
  } else if (value.length < 10) {
    nameContent = (
			<p style={{color: "red", fontSize: "13px"}}>o nome não pode ter menos de 10 caracteres</p>
    );
  } else {
    return value;
  }
};

export default function Form(valid) {

		const [name, setName] 								= useState("");
		const [age, setAge] 									= useState(null);
		const [gender, setGender] 						= useState("");
		const [civilStatus, setCivilStatus] 	= useState("");
		const [docType, setDocType] 					= useState("");
		const [doc, setDoc] 									= useState("");

		const [isError, setIsError] 					= useState(false);
		const [isSend, setIsSend] 						= useState(false);
		const [answers, setAnswers] 					= useState([]);

		const [loading, setLoading] 					= useState(false);

	const {
		value: enteredName,
		isValid: enteredNameIsValid,
		hasError: nameInputHasError,
		valueChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		inputReset: resetNameInput,
	} = useInput(checkName);

	let formIsValid = false;

	if (enteredNameIsValid) {
		formIsValid = true;
	}

	const handleChange = (event) => {
			setIsError(false)
			setIsSend(false)
			setDoc(event.target.value)
	}

	const handleSubmit = (event) => {
		setLoading(true)
		event.preventDefault();

		if (!formIsValid) {
      return;
    }
		setIsSend( true )
		
		const newObj = { id: answers.length + 1, 
									   name: enteredName,
										 age: age,
										 gender: gender,
										 civilStatus: civilStatus,
										 docType: docType,
										 doc: doc}
		const newArray = [...answers, newObj]

		setAnswers(newArray);

		console.log(answers)

		setName("")
		setAge("")
		setGender("")
		setCivilStatus("")

		setTimeout(() => {
			setLoading(false)
 		}, 4000)

		resetNameInput();

		document.getElementById("myForm").reset()
	}

	const sortByLatest = () => {
		const sortedAnswers = answers.sort( (a, b) => {
			return b.id - a.id;
		});
		setAnswers([...sortedAnswers])
	}

	const sortByEarliest = () => {
		const sortedAnswers = answers.sort( (a, b) => {
			return  a.id - b.id;
		});
		setAnswers([...sortedAnswers])
	};

	const nameInput = nameInputHasError ? !valid : valid;

		return (
			<>
			<div className="app">
				<form id="myForm" onSubmit={handleSubmit}>
						<Input 	
										label={"Nome"}
										type={"text"}
										id={"name"}
										value={enteredName}
										onChange={nameChangeHandler}
										onBlur={nameBlurHandler}
										valid={nameInput}
						/>
						{nameInputHasError && nameContent }
						{!nameInputHasError && <> <br></br><br></br> </> }

					<label for="civilStatus">Estado Civil</label>
						<select name="civilStatus" 
										id="civilStatus"
										onChange={(event) => setCivilStatus(event.target.value)}
										//required
										>
							<option selected value="">Selecione uma opção</option>
							<option value="Solteiro">Solteiro</option>
							<option value="Casado">Casado</option>
							<option value="Divorciado">Divorciado</option>
							<option value="Divorciado">Viúvo</option>
					</select>
					<br/>

					<p>Tipo de Documento:</p>
					<Input label={"CPF"}
									type={"radio"}
									id={"radioDoc1"}
									value={"cpf"}
									name="docType"
									for="radioDoc1"
									onChange={(event) => setDocType("CPF")}
					/>

					<Input label={"CNPJ"}
									type={"radio"}
									id={"radioDoc2"}
									value={"cnpj"}
									name="docType"
									for="radioDoc2"
									onChange={(event) => setDocType("CNPJ")}
					/>
					<br/><br/>

					<Input label={"CPF/CNPJ"}
									type={"text"}
									id={"doc"}
									value={doc}
									onChange={handleChange}
					/>
					{isSend && (
						<>
						{ isError && <p>O CPF/CNPJ Digitado é Inválido!</p> }
						{ !isError && <p>Formulário Enviado com Sucesso!</p>}
						</>
					)}
					{!isSend && <> <br></br><br></br></>}
					<button type="submit" disabled={!formIsValid}> Enviar Formulário </button>
						

				</form>
				{loading && <div class="loading"></div>
				}
			</div>

			
			<AnswerList answers={answers}/>
			<button className="sortEarliest" onClick={sortByLatest}> ⬆ </button>
			<button className="sortLatest" onClick={sortByEarliest}> ⬇ </button>

			</>
		)
}