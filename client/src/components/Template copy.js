import React, { useState, Fragment, useEffect, useCallback } from 'react';
import { Layout, Card, Button } from '@shopify/polaris';

import axios from 'axios';

export default function Template() {
	const [ template1, setTemplate1 ] = useState('');

	const handleTemplate1 = useCallback((newValue) => setTemplate1(newValue), []);
	const [ template2, setTemplate2 ] = useState('');

	const handleTemplate2 = useCallback((newValue) => setTemplate2(newValue), []);
	let defaultTopic = {
		topic: 'orders/create',
		topicVariables: 'name  price order_id title'
	};

	const [ topics, setTopics ] = useState(defaultTopic);

	const sendTemplate = (tempObj) => {
		console.log(tempObj.customer, tempObj.admin, tempObj.topic);

		if (tempObj.customer !== '``' && tempObj.admin !== '``' && tempObj.topic) {
			console.log(tempObj);
			axios.post('/api/template/', tempObj).then((res) => console.log(res)).catch((err) => console.error(err));
		} else {
			console.log(" couldn't know what happened");
		}
	};

	let tempObj = {
		topic: topics.topic,
		customer: template1,
		admin: template2
	};

	const saveTemplete = async () => {
		convertData({
			textareaId: 'inputTextArea-customer',
			audience: 'customer'
		});
		convertData({
			textareaId: 'inputTextArea-admin',
			audience: 'admin'
		});

		dummy();
	};

	const dummy = () => {
		sendTemplate(tempObj);
	};

	const convertData = (param) => {
		let first = param.textareaId;

		let inputTextArea = document.getElementById(first);

		let strLength = 0;
		let luna = document.getElementById(first).className;
		var inputData = document.getElementById(first).value;
		if (inputData !== '' && inputData !== null) {
			myFunction();
			inputData = inputData.replace(/(^\s*)|(\s*$)/gi, '');
			inputData = inputData.replace(/[ ]{2,}/gi, ' ');
			inputData = inputData.replace(/\n /, '\n');

			for (let i = 0; i < inputData.length; i++) {
				inputData = inputData.replace(' ', '%20');
				inputData = inputData.replace('(', '${');
				inputData = inputData.replace(')', '}');
				inputData = inputData.replace('\n', '%0A');
			}

			if (luna.indexOf('is-invalid') > -1) {
				strLength = luna.split(' ').length;
				for (let i = 0; i < strLength; i++) {
					luna = luna.replace('is-invalid', '');
				}

				inputTextArea.className = luna;
				return;
			}
		} else {
			luna = document.getElementById(first).className;
			luna = luna.concat(' ');
			luna = luna.concat('is-invalid');
			document.getElementById(first).className = luna;
		}
		showOutput(inputData, param.audience);
	};

	const showOutput = (parameter, audience) => {
		parameter = `\`${parameter}\``;

		if (audience === 'customer') {
			tempObj.customer = parameter;
		} else if (audience === 'admin') {
			tempObj.admin = parameter;
		} else {
			console.log('something went wrong ');
		}
		// sendTemplate(tempObj);
	};

	const topicHandler = (params) => {
		const selectedElement = params.target;
		const selectedValue = selectedElement.title;
		console.log(selectedValue);
		switch (selectedValue) {
			case 'orders/create':
				axios.get('/api/template').then((res) => {
					try {
						let inputData = res.data[0].customer;
						for (let i = 0; i < inputData.length; i++) {
							inputData = inputData.replace('%20', ' ');
							inputData = inputData.replace('${', '(');
							inputData = inputData.replace('}', ')');
							inputData = inputData.replace('`', '');
						}
						let inputAdmin = res.data[0].admin;
						for (let i = 0; i < inputAdmin.length; i++) {
							inputAdmin = inputAdmin.replace('%20', ' ');
							inputAdmin = inputAdmin.replace('${', '(');
							inputAdmin = inputAdmin.replace('}', ')');
							inputAdmin = inputAdmin.replace('`', '');
						}

						setTemplate1(inputData);
						setTemplate2(inputAdmin);
					} catch (error) {
						console.error(error);
					}
				});
				setTopics({
					...topics,
					topic: selectedValue,
					topicVariables: 'name price order_id title '
				});
				break;
			case 'orders/cancelled':
				axios.get('/api/template').then((res) => {
					try {
						let inputData = res.data[1].customer;
						for (let i = 0; i < inputData.length; i++) {
							inputData = inputData.replace('%20', ' ');
							inputData = inputData.replace('${', '(');
							inputData = inputData.replace('}', ')');
							inputData = inputData.replace('`', '');
						}
						let inputAdmin = res.data[1].admin;
						for (let i = 0; i < inputAdmin.length; i++) {
							inputAdmin = inputAdmin.replace('%20', ' ');
							inputAdmin = inputAdmin.replace('${', '(');
							inputAdmin = inputAdmin.replace('}', ')');
							inputAdmin = inputAdmin.replace('`', '');
						}

						setTemplate1(inputData);
						setTemplate2(inputAdmin);
					} catch (error) {
						console.error(error);
					}
				});
				setTopics({
					...topics,
					topic: selectedValue,
					topicVariables: 'name price order_id title cancel_reason'
				});
				break;
			case 'orders/fulfilled':
				axios.get('/api/template').then((res) => {
					try {
						let inputData = res.data[2].customer;
						for (let i = 0; i < inputData.length; i++) {
							inputData = inputData.replace('%20', ' ');
							inputData = inputData.replace('${', '(');
							inputData = inputData.replace('}', ')');
							inputData = inputData.replace('`', '');
						}
						let inputAdmin = res.data[2].admin;
						for (let i = 0; i < inputAdmin.length; i++) {
							inputAdmin = inputAdmin.replace('%20', ' ');
							inputAdmin = inputAdmin.replace('${', '(');
							inputAdmin = inputAdmin.replace('}', ')');
							inputAdmin = inputAdmin.replace('`', '');
						}

						setTemplate1(inputData);
						setTemplate2(inputAdmin);
					} catch (error) {
						console.error(error);
					}
				});
				setTopics({
					...topics,
					topic: selectedValue,
					topicVariables: 'name price order_id title fulfillment_status order_status_url'
				});
				break;
			case 'orders/partially_fulfilled':
				setTopics({
					...topics,
					topic: selectedValue,
					topicVariables: 'name price order_id title fulfillment_status order_status_url'
				});
				getOption();
				break;
			case 'customers/create':
				setTopics({
					...topics,
					topic: selectedValue,
					topicVariables: 'name email phone'
				});
				getOption();
				break;
			case 'refunds/create':
				setTopics({
					...topics,
					topic: selectedValue,
					topicVariables: 'price order_id title'
				});
				getOption();
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
	function myFunction() {
		var x = document.getElementById('snackbar');
		x.className = 'show';
		setTimeout(function() {
			x.className = x.className.replace('show', '');
		}, 2000);
	}

	const getOption = () => {
		axios.get('/api/template').then((res) => {
			console.log('optn', res.data);
			console.log('111111', res.data[1]);

			// try {
			if (topics.topic == 'orders/create') {
				console.log('creaye to aaya');
				try {
					let inputData = res.data[0].customer;
					for (let i = 0; i < inputData.length; i++) {
						inputData = inputData.replace('%20', ' ');
						inputData = inputData.replace('${', '(');
						inputData = inputData.replace('}', ')');
						inputData = inputData.replace('`', '');
					}

					let inputAdmin = res.data[0].admin;
					for (let i = 0; i < inputAdmin.length; i++) {
						inputAdmin = inputAdmin.replace('%20', ' ');
						inputAdmin = inputAdmin.replace('${', '(');
						inputAdmin = inputAdmin.replace('}', ')');
						inputAdmin = inputAdmin.replace('`', '');
					}

					setTemplate1(inputData);
					setTemplate2(inputAdmin);
				} catch (error) {
					console.error(error);
				}
			} else {
				console.log('gjkbsubdfudbduws');
			}
		});
	};

	useEffect(() => {
		getOption();
	}, []);

	return (
		<Fragment>
			<div id="snackbar">Template Updated for {topics.topic} </div>

			<div className="bog col-md-12 mb-5">
				<div className="butti " title="orders/create" onClick={topicHandler}>
					Orders/create
				</div>

				<div className="butt " title="orders/cancelled" onClick={topicHandler}>
					Orders/cancelled
				</div>
				<div className="butt " title="orders/fulfilled" onClick={topicHandler}>
					Orders/fulfilled
				</div>
			</div>
			<Layout>
				{/* <div className="mt-3 mb-2 " style={{ textAlign: 'left' }}>
				<h2>Select Topic</h2>
			</div> */}

				<Layout.AnnotatedSection
					title="SMS Template Rules"
					description={`All the variables enclosed in "( )" 
					will be replaced by actual values.
				SMS length limit is 70 characters.  
				Enclose every variables with "( )".  
				Available Variables for ${topics.topic} are :- 
				 ${topics.topicVariables}`}
				>
					<Card sectioned>
						<div style={{ padding: '2rem' }}>
							<h5 className="card-title">Customer Message templete</h5>

							<textarea
								className="form-control"
								id="inputTextArea-customer"
								placeholder="Enter customer message here"
								rows={5}
								required
								value={template1}
								onChange={handleTemplate1}
								autoFocus
								defaultValue={''}
								style={{ fontSize: '14px' }}
							/>

							<br />
							<h5 className="card-title">Admin Message Templete</h5>

							<textarea
								className="form-control"
								id="inputTextArea-admin"
								placeholder="Enter admin message here"
								rows={5}
								value={template2}
								onChange={handleTemplate2}
								required
								autoFocus
								defaultValue={''}
								style={{ fontSize: '14px' }}
							/>
							<div className="invalid-feedback">Please enter Data in the textarea.</div>

							<br />

							<div style={{ textAlign: 'center' }} onClick={saveTemplete}>
								<Button primary>Save Template</Button>
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
