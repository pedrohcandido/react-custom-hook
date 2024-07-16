import React, { useState } from "react";
import FormAnswer from "../formAnswer";
import './AnswerList.css';
import { createPortal } from "react-dom";
import AnswerModal from "../answerModal/AnswerModal";

const AnswerList = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState(0);

	return(
		<div className="app2">

			{props.answers.map((answer) => (
				<>
				<FormAnswer key={answer.id} {...answer} />
				<button onClick={() => {
					setShowModal(true)
					setSelectedAnswer(answer.id)
				} 
				}>Visualizar</button>
				<button onClick={() => { props.deleteAnswers(answer.id) } }>Excluir</button>
				<button onClick={() => { props.editAnswers(answer.id) } }>Editar</button>
				</>
			))}
			{showModal && createPortal(
					<AnswerModal onClose={() => setShowModal(false)}
											 answer={props.answers.find(answerSelected => answerSelected.id === selectedAnswer) }
											 />
				,document.body
			)}
			
		</div>
	)
}

export default AnswerList