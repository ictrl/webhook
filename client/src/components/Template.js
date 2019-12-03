import React, { useCallback, useState, useEffect, Fragment } from 'react';
import { TextField, Layout, Card } from '@shopify/polaris';
import axios from 'axios';

export default function Template() {
	let defaultTopic = {
		topic: 'orders/create',
		topicVariables: 'name  price order_id title'
	};

	const [ topics, setTopics ] = useState(defaultTopic);
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

	const sendTemplate = async (tempObj) => {
		console.log(tempObj, 'before send post');

		if (tempObj.topic && tempObj.template) {
			console.log(tempObj);
			try {
				const res = await axios.post('/api/template', tempObj);
				console.log(res);
			} catch (error) {
				console.log('nahi hua post');
			}
		} else {
			console.log(" couldn't know what happened");
		}
	};

	let tempObj = {
		topic: '',
		template: '',
		audience: ''
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
		tempObj.template = parameter;
		sendTemplate(tempObj);
	};

	/////////////////////////////////
	function myFunction1() {
		tempObj.topic = topics.topic;
		tempObj.audience = 'customer';

		if (tempObj.topic) {
			convertData({
				text: template1
			});
		}
		var x = document.getElementById('snackbar');
		x.className = 'show';
		setTimeout(function() {
			x.className = x.className.replace('show', '');
		}, 2000);
	}
	const [ template1, setTemplate1 ] = useState('');

	const handleTemplate1 = useCallback((newValue) => setTemplate1(newValue), []);

	/////////////////////////22
	function myFunction2() {
		tempObj.topic = topics.topic;
		tempObj.audience = 'admin';

		if (tempObj.topic) {
			convertData({
				text: template2
			});
		}
		var x = document.getElementById('snackbar');
		x.className = 'show';
		setTimeout(function() {
			x.className = x.className.replace('show', '');
		}, 2000);
	}

	const [ template2, setTemplate2 ] = useState('');

	const handleTemplate2 = useCallback((newValue) => setTemplate2(newValue), []);

	const getOption = () => {
		axios.get('/api/template/').then((res) => {
			console.log(res.data);
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
				<Layout.AnnotatedSection title="Customer Template" description="some content">
					<Card>
						<div style={{ padding: '1.311rem' }}>
							<TextField
								label="Template"
								value={template1}
								onChange={handleTemplate1}
								multiline
								helpText={'Available VAriables :-' + ' ' + topics.topicVariables}
							/>
							<br />

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
					</Card>
				</Layout.AnnotatedSection>

				<Layout.AnnotatedSection
					title="Admin Template"
					description="Admin will be notify on this no. by selecting Notify Admin."
				>
					<Card>
						<div style={{ padding: '1.311rem' }}>
							<TextField
								label="Template"
								value={template2}
								onChange={handleTemplate2}
								multiline
								helpText="Available Variables: name"
							/>
							<br />

							<button
								onClick={() => {
									myFunction2();
								}}
								style={{ height: '34px' }}
								className="button-shopify"
							>
								Save
							</button>
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
