import React, { Fragment, useContext } from 'react';

import { TemplateContext } from '../App';

let second = '';
let third = '';
export default function Templete(props) {
	const { temp, setTemp } = useContext(TemplateContext);

	console.log(temp);

	const convertDat = () => {
		console.log(document.getElementById('inputTextArea'));
		third = document.getElementById('inputTextArea').value;
		console.log(third);

		for (let i = 0; i < third.length; i++) {
			third = third.replace(' ', '%20');
			third = third.replace('(', '${');
			third = third.replace(')', '}');
		}
		showOutput(third);
	};

	const showOutput = (parameter) => {
		let outputTextArea = document.getElementById('outputTextArea');
		outputTextArea.value = `"${parameter}"`;
		console.log(parameter);
	};

	return (
		<Fragment>
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-sm-6">
						<div className="card text-center mt-5 shadow">
							<div className="card-body">
								<h5 className="card-title">Url</h5>

								<textarea
									className="form-control"
									id="inputTextArea"
									placeholder="Enter excel data here"
									rows={5}
									required
									autoFocus
									defaultValue={''}
								/>
								<div className="invalid-feedback">Please enter Data in the textarea.</div>
								<button className="btn btn-primary my-3" onClick={convertDat}>
									Convert me!
								</button>
								<textarea className="form-control" id="outputTextArea" rows={5} defaultValue={''} />
							</div>
						</div>
					</div>
				</div>
			</div>;
		</Fragment>
	);
}
