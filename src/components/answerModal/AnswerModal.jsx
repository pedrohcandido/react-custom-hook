import React from "react";
import './AnswerModal.css';

const AnswerModal = (props) => {
	console.log(props)
  return (
    <div className="modal">
				<h4>{props.answer.id}</h4>
				<h4>{props.answer.name}</h4>
				<h4>{props.answer.age}</h4>
				<h4>{props.answer.gender}</h4>
				<h4>{props.answer.civilStatus}</h4>
				<h4>{props.answer.docType}</h4>
				<h4>{props.answer.doc}</h4>
      <button onClick={props.onClose}>Voltar</button>
    </div>
  );
}

export default AnswerModal;