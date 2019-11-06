import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

let first = '';
let second = '';
export default function templete() {
	const convertData = (e) => {
		second = e.target.value;
		console.log(second);
		// second =second.trim();
		// second.replace(" ", "%20")

		var i = 0,
			strLength = second.length;
		for (i; i < strLength; i++) {
			second = second.replace(' ', '%20');
		}

		showOutput(second);
	};

	const showOutput = (params) => {
		let outputTextArea = document.getElementById('outputTextArea');
		// params = params.replace(" ", "%20")
		outputTextArea.value = params;
	};

	// const convertData =(e)  =>{
	// 	var inputTextArea = document.getElementById('inputTextArea');
	// 	var outputTextArea = document.getElementById('outputTextArea');
	// 	var removeLineEndings = document.getElementById('removeLineEndings');
	// 	// second =
	// 	var inputData = e.target.value;
	// 	if (inputData != '' && inputData != null) {
	// 		if (inputTextArea.classList.contains('is-invalid')) {
	// 			inputTextArea.classList.remove('is-invalid');
	// 		}
	// 		inputData = inputData.trim();
	// 		inputData = inputData.replace(" ", "%20");
	// if (inputData.includes("\n'',")) {
	//   inputData = inputData.replace(/ \n'',/g, "");
	// }
	// if (removeLineEndings.checked) {
	//   inputData = inputData.replace(/\n/g, "");
	//   }
	// inputData = "('" + inputData + "')";
	// 		outputTextArea.hidden = false;
	// 		outputTextArea.value = inputData;
	// 	} else {
	// 		inputTextArea.classList.add('is-invalid');
	// 		outputTextArea.value = '';
	// 		outputTextArea.hidden = true;
	// 	}
	// }

	return (
		<Fragment>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-sm-6">
						<div className="card text-center mt-5 shadow">
							<div className="card-body">
								<h5 className="card-title">Url</h5>
								{/* <div className="form-check mb-3"> */}
								{/* <input className="form-check-input" type="checkbox" defaultValue id="removeLineEndings" /> */}
								{/* <label className="form-check-label" htmlFor="defaultCheck1">
										Remove lines?
									</label> */}
								{/* </div> */}
								<textarea
									className="form-control"
									id="inputTextArea"
									placeholder="Enter excel data here"
									rows={5}
									required
									autofocus
									defaultValue={''}
									onChange={convertData}
								/>
								<div className="invalid-feedback">Please enter Data in the textarea.</div>
								{/* <button
            type="submit"
            className="btn btn-primary my-3"
            onclick=""
          >
            Convert me!
          </button> */}
								<textarea className="form-control" id="outputTextArea" rows={5} defaultValue={''} />
							</div>
						</div>
					</div>
				</div>
			</div>;
		</Fragment>
	);
}
