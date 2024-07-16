import { useState } from "react";
import './Form2.css'
import Input from "../input";
import AnswerList2 from "../answerList2";
import useInput from "../useInput/useInput";

let nameContent = <p style={{color: "red", fontSize: "13px"}}>A Descrição do Banco não pode ser vazio</p>;

const checkDeskBank = (value) => {
  if (value.trim() === "") {
    nameContent = <p style={{color: "red", fontSize: "13px"}}>A Descrição do Banco não pode ser vazio</p>;
  } else if (value.length < 12) {
    nameContent = (
			<p style={{color: "red", fontSize: "13px"}}>o nome não pode ter menos de 12 caracteres</p>
    );
  } else {
    return value;
  }
};

export default function Form2(valid) {

		const [accountBank, setAccountBank] 		= useState(null);
		const [typeAccount, setTypeAccount] 		= useState("");
		const [docType, setDocType] 						= useState("");
		const [doc, setDoc] 										= useState("");

		const [isError, setIsError] 						= useState(false);
		const [isSend, setIsSend] 							= useState(false);
		const [isEditAnswers, setIsEditAnswers] = useState(false);
		const [EditAnswerId, setEditAnswerId] 	= useState(0);
		const [answers, setAnswers] 						= useState([]);

		const [loading, setLoading] 					= useState(false);

		const {
			value: enteredDeskBank,
			isValid: enteredDeskBankIsValid,
			hasError: deskBankInputHasError,
			valueChangeHandler: deskBankChangeHandler,
			inputBlurHandler: deskBankBlurHandler,
			inputReset: resetDeskBankInput,
			editName: inputEditName,
		} = useInput(checkDeskBank);
	
		let formIsValid = false;
	
		if (enteredDeskBankIsValid) {
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
		setIsSend( true )

		if (isEditAnswers) {
			const editedAnswer = answers.filter(answers => answers.id === EditAnswerId)
			editedAnswer[0].descBank = enteredDeskBank
			editedAnswer[0].accountBank = accountBank
			editedAnswer[0].typeAccount = typeAccount
			editedAnswer[0].docType = docType
			editedAnswer[0].doc = doc

			setLoading(false)
			
			const newAnswers = answers.map((item) => ({...item, editedAnswer: item.id === EditAnswerId}))
			setAnswers(newAnswers)
			setIsEditAnswers(false)

			setAccountBank("")
			setTypeAccount("")
			setDoc("")

			resetDeskBankInput();
			document.getElementById("myForm").reset()
			return
		}

		const newObj = { id: answers.length + 1, 
									   descBank: enteredDeskBank,
										 accountBank: accountBank,
										 typeAccount: typeAccount,
										 docType: docType,
										 doc: doc}
		const newArray = [...answers, newObj]

		setAnswers(newArray);

		console.log(answers)

		setAccountBank("")
		setTypeAccount("")
		setDoc("")

		setTimeout(() => {
			setLoading(false)
 		}, 4000)

		 resetDeskBankInput()

		document.getElementById("myForm3").reset()
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

	const deleteAnswers = (value) => {
		const newAnswers = answers.filter(answers => answers.id !== value)
		setAnswers([...newAnswers])
	}

	const editAnswers = (value) => {
		setIsEditAnswers(true)

		const editedAnswer = answers.filter(answers => answers.id === value)

		inputEditName(editedAnswer[0].descBank)
		setAccountBank(editedAnswer[0].accountBank)
		setTypeAccount(editedAnswer[0].typeAccount)
		setDocType(editedAnswer[0].docType)
		setDoc(editedAnswer[0].doc)
		setEditAnswerId(value)
	}

	const deskBankInput = deskBankInputHasError ? !valid : valid;

		return (
			<>
			<div className="app3">
				<form id="myForm3" onSubmit={handleSubmit}>
					<Input label={"Descricao Banco"}
									type={"text"}
									id={"descBank"}
									value={enteredDeskBank}
									onChange={deskBankChangeHandler}
									onBlur={deskBankBlurHandler}
									valid={deskBankInput}
					/>
					{deskBankInputHasError && nameContent }
					{!deskBankInputHasError && <> <br></br><br></br> </> }

					<Input label={"Código Conta Corrente"}
									type={"text"}
									id={"accountBank"}
									value={accountBank}
									onChange={(event) => setAccountBank(event.target.value)}
					/>
					<br/><br/>
					<label for="typeAccount">Tipo de Conta</label>
						<select name="typeAccount" 
										id="typeAccount"
										onChange={(event) => setTypeAccount(event.target.value)}
										value={typeAccount}
										//required
										>
							<option selected value="">Selecione uma opção</option>
							<option value="Solteiro">Pessoa Física</option>
							<option value="Casado">Pessoa Jurídica</option>
					</select>
					<br/><br/>

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

			
			<AnswerList2	answers={answers}
										deleteAnswers={deleteAnswers}
										editAnswers={editAnswers}
			/>
			<button className="sortEarliest2" onClick={sortByLatest}> ⬆ </button>
			<button className="sortLatest2" onClick={sortByEarliest}> ⬇ </button>

			</>
		)
}