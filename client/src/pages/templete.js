import React, { Fragment, useContext } from 'react';

import { TemplateContext } from '../App';

export default function Templete(props) {
	const { temp, setTemp } = useContext(TemplateContext);

	// var inputTextArea = document.getElementById('inputTextArea');

	const convertData = (param) => {
		// console.log(param);
		let inputTextArea = document.getElementById(param.textareaId);
		let btn = document.getElementById(param.btnId);
		// console.log(inputTextArea);
		// console.log(btn);
		let strLength = 0;
		let luna = document.getElementById(param.textareaId).className;
		// console.log(luna);
		var inputData = document.getElementById(param.textareaId).value;
		if (inputData != '' && inputData != null) {
			// start and end spaces
			inputData = inputData.replace(/(^\s*)|(\s*$)/gi, '');
			//multiple spaces to a single space
			inputData = inputData.replace(/[ ]{2,}/gi, ' ');
			// exclude a new line with a start spacing
			inputData = inputData.replace(/\n /, '\n');

			for (let i = 0; i < inputData.length; i++) {
				inputData = inputData.replace(' ', '%20');
				inputData = inputData.replace('(', '${');
				inputData = inputData.replace(')', '}');
				inputData = inputData.replace('\n', '%0A');
			}

			if (luna.indexOf('is-invalid') > -1) {
				strLength = luna.split(' ').length;
				// console.log(strLength);
				for (let i = 0; i < strLength; i++) {
					luna = luna.replace('is-invalid', '');
					// console.log('for under', luna);
				}

				// luna = luna.replace('is-invalid', '');
				// inputTextArea = document.getElementById('inputTextArea');
				inputTextArea.className = luna;
			}
		} else {
			luna = document.getElementById(param.textareaId).className;
			luna = luna.concat(' ');
			luna = luna.concat('is-invalid');
			// console.log('3', luna);
			document.getElementById(param.textareaId).className = luna;
			// document.getElementById('outputTextArea').value = '';
		}
		showOutput(inputData);
	};

	const showOutput = (parameter) => {
		parameter = `\`${parameter}\``;
		console.log('converted Value', parameter);
	};
	return (
		<Fragment>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-sm-6">
						<div className="card text-center mt-5 shadow">
							<div className="card-body">
								<div className="invalid-feedback">Please enter Data in the textarea.</div>
								<h5 className="card-title">for customer</h5>

								<textarea
									className="form-control"
									id="inputTextArea-customer"
									placeholder="Enter customer message here"
									rows={5}
									required
									autoFocus
									defaultValue={''}
								/>
								{/* <div className="invalid-feedback">Please enter Data in the textarea.</div> */}
								<button
									id="customer-btn"
									className="btn btn-primary my-3"
									onClick={convertData.bind(this, {
										audience: 'customer',
										textareaId: 'inputTextArea-customer',
										btnId: 'customer-btn'
									})}
								>
									done for customer
								</button>
								{/* <textarea className="form-control" id="outputTextArea" rows={5} defaultValue={''} /> */}
								<hr />
								<h5 className="card-title">for client</h5>

								<textarea
									className="form-control"
									id="inputTextArea-admin"
									placeholder="Enter admin message here"
									rows={5}
									required
									autoFocus
									defaultValue={''}
								/>
								{/* <div className="invalid-feedback">Please enter Data in the textarea.</div> */}
								<button
									id="admin-btn"
									className="btn btn-primary my-3"
									onClick={convertData.bind(this, {
										audience: 'admin',
										textareaId: 'inputTextArea-admin',
										btnId: 'admin-btn'
									})}
								>
									done for admin
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>;
		</Fragment>
	);
}
