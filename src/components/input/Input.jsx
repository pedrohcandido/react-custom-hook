import React from "react";
import './Input.css'

const Input = (props) => {
	return(
		<>
			{
				props.type !== "radio" ?
				(
				<>
				<label>{props.label}</label>
						<input type={props.type}
									id={props.id}
									value={props.value}
									onChange={props.onChange}
									onBlur={props.onBlur}
									valid={props.valid}
									required
									>
						</input>
				</>
				) :
				(
				<>
					<input type={props.type}
								 id={props.id}
								 value={props.value}
								 onChange={props.onChange}
								 name={props.name}
								 required
								 >
					</input>
					<label for={props.for}>{props.label}</label>
				</>
				)
			}
		</>
	)
}

export default Input;