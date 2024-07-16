import React, { useState } from "react";
import FormAnswer2 from "../formAnswer2";
import './AnswerList2.css';
import { createPortal } from "react-dom";
import AnswerModal2 from "../answerModal2/AnswerModal2";

const AnswerList2 = (props) => {
	const [showModal, setShowModal] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState(0);

	return(
		<div className="app5">

			{props.answers.map((answer) => (
				<>
				<FormAnswer2 key={answer.id} {...answer} />
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
					<AnswerModal2 onClose={() => setShowModal(false)}
											 answer={props.answers.find(answerSelected => answerSelected.id === selectedAnswer) }
											 />
				,document.body
			)}
			
		</div>
	)
}

export default AnswerList2