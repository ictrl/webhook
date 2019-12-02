import React, { useCallback, useState, useEffect } from 'react';
import { TextField, Layout, Card } from '@shopify/polaris';
import axios from 'axios';

export default function Template() {
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
		template: ''
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
		tempObj.topic = 1;

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
		tempObj.topic = 2;

		if (tempObj.time && tempObj.status) {
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
		<Layout>
			<Layout.AnnotatedSection
				title="Customer Template"
				description="Available Variables:- customer_name store_name abandoned_checkout_url amount."
			>
				<Card>
					<div style={{ padding: '1.311rem' }}>
						<TextField
							label="Template"
							value={template1}
							onChange={handleTemplate1}
							multiline
							helpText="Available Variables:- customer_name store_name abandoned_checkout_url amount"
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
							helpText="Available Variables:- customer_name store_name abandoned_checkout_url amount"
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
	);
}
