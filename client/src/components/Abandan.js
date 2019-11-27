import React, { Fragment, useCallback, useState } from 'react';
import { TextField, Layout, Select, Card } from '@shopify/polaris';
import axios from 'axios';

export default function Abandan() {
	const sendTemplate = async (tempObj) => {
		console.log(tempObj, 'before send post');

		if (tempObj.topic && tempObj.template && tempObj.time) {
			console.log(tempObj);
			try {
				const res = await axios.post('/api/abandanTemplate', tempObj);
				console.log(res);
			} catch (error) {
				console.log('nahi hua post');
			}
		} else {
			console.log(" couldn't know what happened");
		}
	};

	const convertData = (param) => {
		var inputData = param.text;
		if (inputData !== '' && inputData !== null) {
			inputData = inputData.replace(/(^\s*)|(\s*$)/gi, '');
			inputData = inputData.replace(/[ ]{2,}/gi, ' ');
			inputData = inputData.replace(/\n /, '\n');

			for (let i = 0; i < inputData.length; i++) {
				inputData = inputData.replace(' ', '%20');
				inputData = inputData.replace('(', '${');
				inputData = inputData.replace(')', '}');
				inputData = inputData.replace('\n', '%0A');
			}
		}
		showOutput(inputData);
	};

	const showOutput = (parameter) => {
		parameter = `\`${parameter}\``;
		abandanData.template = parameter;
		sendTemplate(abandanData);
	};

	///////////////////////////////
	function myFunction1() {
		if (abandanData.time) {
			convertData({
				text: abandanData.template
			});
		}
		var x = document.getElementById('snackbar');
		x.className = 'show';
		setTimeout(function() {
			x.className = x.className.replace('show', '');
		}, 2000);
	}
	let initialState = {
		topic: 1,
		template: 'Enter Here',
		time: 30,
		status: 0
	};

	const [ abandanData, setabandanData ] = useState(initialState);

	const handleTemplate1 = (newValue) => setabandanData({ ...abandanData, template: newValue });

	const handleSelectChange1 = (newValue) => setabandanData({ ...abandanData, time: newValue });
	const handleStatus1 = (newValue) => setabandanData({ ...abandanData, status: newValue });

	const option1 = [
		{ label: '30 minutes later', value: '30' },
		{ label: '1 hour later', value: '60' },
		{ label: '6 hours later', value: '360' },
		{ label: '10 hours later', value: '600' },
		{ label: '24 hours later', value: '1440' },
		{ label: '48 hours later', value: '2880' },
		{ label: '72 hours later', value: '4320' }
	];
	const statusOption1 = [ { label: 'Enabled', value: 1 }, { label: 'Disabled', value: 0 } ];

	////////////////////////////end 4/////////////
	let defaultTopic = {
		topic: 'first',
		topicVariables: 'name  price order_id title'
	};

	const topicHandler = (params) => {
		const selectedElement = params.target;
		const selectedValue = selectedElement.title;
		console.log(selectedValue);
		switch (selectedValue) {
			case 'first':
				setabandanData({ ...abandanData, topic: 1 });
				break;
			case 'second':
				setabandanData({ ...abandanData, topic: 2 });
				break;
			case 'third':
				setabandanData({ ...abandanData, topic: 3 });
				break;
			case 'fourth':
				setabandanData({ ...abandanData, topic: 4 });
				break;

			default:
				break;
		}

		let selectedElementClass = selectedElement.className;

		if (selectedElementClass.includes('butti')) {
			return;
		} else {
			let firstElement = document.getElementsByClassName('butti');
			if (firstElement) {
				let first = firstElement[0];
				first.className = 'butt ';
			}

			if (selectedElementClass.includes('butt ')) {
				selectedElementClass = selectedElementClass.replace('butt', 'butti ');
				params.target.className = selectedElementClass;
			}
		}
	};

	////////////////////////////end 4/////////////
	return (
		<Fragment>
			<div className="bog col-md-12 mb-5">
				<div className="butti " title="first" onClick={topicHandler}>
					FollowUp 1
				</div>

				<div className="butt " title="second" onClick={topicHandler}>
					FollowUp 2
				</div>
				<div className="butt " title="third" onClick={topicHandler}>
					FollowUp 3
				</div>
				<div className="butt " title="fourth" onClick={topicHandler}>
					FollowUp 4
				</div>
			</div>

			<Layout>
				<Layout.AnnotatedSection
					title="First Follow Up"
					description="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link."
				>
					<Card sectioned>
						<TextField
							label="Template"
							value={'Enter Template Here Here'}
							onChange={handleTemplate1}
							multiline
							helpText="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link"
						/>
						<br />

						<div className="mt-2 a-card-contents">
							<Select label="Time After" options={option1} onChange={handleSelectChange1} value={abandanData.time} />

							<Select label="Status" options={statusOption1} onChange={handleStatus1} value={abandanData.status} />

							<div className="mt-5">
								<button
									onClick={() => {
										myFunction1();
									}}
									style={{ height: '34px' }}
									className="button-shopify"
								>
									Save
								</button>
							</div>
						</div>
					</Card>
				</Layout.AnnotatedSection>

				<div id="snackbar" style={{ zIndex: '999' }}>
					Abandan Updated{' '}
				</div>
			</Layout>
		</Fragment>
	);
}
