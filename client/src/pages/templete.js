import React, {  Fragment } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// let first = '';
let second = '';
export default function templete(props) {
	console.log(props)
	// document.getElementById('outputTextArea').value = 'JSON.stringify(props);'
	
	const convertData = (e) => {
		second = e.target.value;
		console.log(second);

		var i = 0,
			strLength = second.length;
		for (i; i < strLength; i++) {
			second = second.replace(' ', '%20');
		}

		showOutput(second);
	};

	const showOutput = (parameter) => {
		let outputTextArea = document.getElementById('outputTextArea');
		// params = params.replace(" ", "%20")
		outputTextArea.value = parameter;
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
