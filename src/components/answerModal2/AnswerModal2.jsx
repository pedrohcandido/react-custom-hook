import React from "react";
import './AnswerModal2.css';

const AnswerModal2 = (props) => {
	console.log(props)
  return (
    <div className="modal2">
				<h4>{props.answer.id}</h4>
				<h4>{props.answer.descBank}</h4>
				<h4>{props.answer.accountBank}</h4>
				<h4>{props.answer.typeAccount}</h4>
				<h4>{props.answer.docType}</h4>
				<h4>{props.answer.doc}</h4>
      <button onClick={props.onClose}>Voltar</button>
    </div>
  );
}

export default AnswerModal2;