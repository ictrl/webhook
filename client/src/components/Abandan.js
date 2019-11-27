import React, { useCallback, useState } from 'react';
import { TextField, Layout, Select, Card } from '@shopify/polaris';
import axios from 'axios';
// import { clickFooterButton } from '@shopify/app-bridge/actions/Modal';

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

	let tempObj = {
		topic: '',
		template: '',
		time: '',
		status: new Boolean()

		//add status to post,,status must be is Boolean type
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
		tempObj.time = selected1;
		tempObj.status = status1;

		if (tempObj.time && tempObj.status) {
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
	const [ template1, setTemplate1 ] = useState(
		'Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link		Available Variables customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link'
	);

	const handleTemplate1 = useCallback((newValue) => setTemplate1(newValue), []);

	//cheboX

	// const [ checkedCustomer1, setCheckedCustomer1 ] = useState(0);
	// const [ checkedAdmin1, setCheckedAdmin1 ] = useState(0);
	// const handleCustomerCheck1 = useCallback((newChecked) => setCheckedCustomer1(newChecked), []);
	// const handleAdminCheck1 = useCallback((newChecked) => setCheckedAdmin1(newChecked), []);
	//select enable
	const [ selected1, setSelected1 ] = useState('30');
	const [ status1, setStatus1 ] = useState(0);

	const handleSelectChange1 = useCallback((value) => setSelected1(value), []);
	const handleStatus1 = useCallback((value) => setStatus1(value), []);

	const option1 = [
		{ label: '30 minutes later', value: '30' },
		{ label: '60 minutes later', value: '60' },
		{ label: '6 hours later', value: '360' },
		{ label: '12 hours later', value: '720' }
	];
	const statusOption1 = [ { label: 'Enabled', value: 1 }, { label: 'Disabled', value: 0 } ];

	/////////////////////////22
	function myFunction2() {
		tempObj.topic = 2;

		tempObj.time = selected2;
		console.log(selected2);
		tempObj.status = status2;

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

	const [ template2, setTemplate2 ] = useState(
		'Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link		Available Variables customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link'
	);

	const handleTemplate2 = useCallback((newValue) => setTemplate2(newValue), []);

	const [ selected2, setSelected2 ] = useState('60');
	const [ status2, setStatus2 ] = useState(0);

	const handleSelectChange2 = useCallback((value) => setSelected2(value), []);
	const handleStatus2 = useCallback((value) => setStatus2(value), []);

	const option2 = [
		{ label: '30 minutes later', value: '30' },
		{ label: '60 minutes later', value: '60' },
		{ label: '6 hours later', value: '360' },
		{ label: '22 hours later', value: '700' }
	];
	const statusOption2 = [ { label: 'Enabled', value: 1 }, { label: 'Disabled', value: 0 } ];
	////////////////////////////////33333333333333333333
	function myFunction3() {
		tempObj.topic = 3;

		tempObj.time = selected3;
		console.log(selected3);
		tempObj.status = status3;

		if (tempObj.time && tempObj.status) {
			convertData({
				text: template3
			});
		}
		var x = document.getElementById('snackbar');
		x.className = 'show';
		setTimeout(function() {
			x.className = x.className.replace('show', '');
		}, 3000);
	}

	const [ template3, setTemplate3 ] = useState(
		'Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link		Available Variables customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link'
	);

	const handleTemplate3 = useCallback((newValue) => setTemplate3(newValue), []);

	const [ selected3, setSelected3 ] = useState('60');
	const [ status3, setStatus3 ] = useState(0);

	const handleSelectChange3 = useCallback((value) => setSelected3(value), []);
	const handleStatus3 = useCallback((value) => setStatus3(value), []);

	const option3 = [
		{ label: '30 minutes later', value: '30' },
		{ label: '60 minutes later', value: '60' },
		{ label: '6 hours later', value: '360' },
		{ label: '33 hours later', value: '700' }
	];
	const statusOption3 = [ { label: 'Enabled', value: 1 }, { label: 'Disabled', value: 0 } ];

	/////////////////////////////////////444444444444444444
	function myFunction4() {
		tempObj.topic = 4;

		tempObj.time = selected4;
		console.log(selected4);
		tempObj.status = status4;

		if (tempObj.time && tempObj.status) {
			convertData({
				text: template4
			});
		}
		var x = document.getElementById('snackbar');
		x.className = 'show';
		setTimeout(function() {
			x.className = x.className.replace('show', '');
		}, 4000);
	}

	const [ template4, setTemplate4 ] = useState(
		'Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link		Available Variables customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link'
	);

	const handleTemplate4 = useCallback((newValue) => setTemplate4(newValue), []);

	//cheboX 4
	// const [ checkedCustomer4, setCheckedCustomer4 ] = useState(0);
	// const [ checkedAdmin4, setCheckedAdmin4 ] = useState(0);
	// const handleCustomerCheck4 = useCallback((newChecked) => setCheckedCustomer4(newChecked), []);
	// const handleAdminCheck4 = useCallback((newChecked) => setCheckedAdmin4(newChecked), []);
	//select enable
	const [ selected4, setSelected4 ] = useState('60');
	const [ status4, setStatus4 ] = useState(0);

	const handleSelectChange4 = useCallback((value) => setSelected4(value), []);
	const handleStatus4 = useCallback((value) => setStatus4(value), []);

	const option4 = [
		{ label: '40 minutes later', value: '40' },
		{ label: '60 minutes later', value: '60' },
		{ label: '6 hours later', value: '460' },
		{ label: '44 hours later', value: '700' }
	];
	const statusOption4 = [ { label: 'Enabled', value: 1 }, { label: 'Disabled', value: 0 } ];
	////////////////////////////end 4/////////////
	return (
		<Layout>
			<Layout.AnnotatedSection
				title="First Follow Up"
				description="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link."
			>
				<Card sectioned>
					<TextField
						label="Template"
						value={template1}
						onChange={handleTemplate1}
						multiline
						helpText="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link"
					/>
					<br />
					{/* <div className="a-card">
						<div className="mr-4 a-card-1">
							<Checkbox label="Notify Customer" checked={checkedCustomer1} onChange={handleCustomerCheck1} />
						</div>
						<div>
							<Checkbox label="Notify Admin" checked={checkedAdmin1} onChange={handleAdminCheck1} />
						</div>
					</div> */}
					<div className="mt-2 a-card-contents">
						<Select label="Time After" options={option1} onChange={handleSelectChange1} value={selected1} />

						<Select label="Status" options={statusOption1} onChange={handleStatus1} value={status1} />

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

			<Layout.AnnotatedSection
				title="Second Follow Up"
				description="Admin will be notify on this no. by selecting Notify Admin."
			>
				<Card sectioned>
					<TextField
						label="Template"
						value={template2}
						onChange={handleTemplate2}
						multiline
						helpText="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link"
					/>
					<br />
					{/* <div className="a-card">
						<div className="mr-4 a-card-2">
							<Checkbox label="Notify Customer" checked={checkedCustomer2} onChange={handleCustomerCheck2} />
						</div>
						<div>
							<Checkbox label="Notify Admin" checked={checkedAdmin2} onChange={handleAdminCheck2} />
						</div>
					</div> */}
					<div className="mt-2 a-card-contents">
						<Select label="Time After" options={option2} onChange={handleSelectChange2} value={selected2} />

						<Select label="Status" options={statusOption2} onChange={handleStatus2} value={status2} />

						<div className="mt-5">
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
					</div>
				</Card>
			</Layout.AnnotatedSection>
			<Layout.AnnotatedSection
				title="Third Follow Up"
				description="Admin will be notify on this no. by selecting Notify Admin."
			>
				<Card sectioned>
					<TextField
						label="Template"
						value={template3}
						onChange={handleTemplate3}
						multiline
						helpText="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link"
					/>
					<br />
					{/* <div className="a-card">
						<div className="mr-4 a-card-3">
							<Checkbox label="Notify Customer" checked={checkedCustomer3} onChange={handleCustomerCheck3} />
						</div>
						<div>
							<Checkbox label="Notify Admin" checked={checkedAdmin3} onChange={handleAdminCheck3} />
						</div>
					</div> */}
					<div className="mt-3 a-card-contents">
						<Select label="Time After" options={option3} onChange={handleSelectChange3} value={selected3} />

						<Select label="Status" options={statusOption3} onChange={handleStatus3} value={status3} />

						<div className="mt-5">
							<button
								onClick={() => {
									myFunction3();
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
			<Layout.AnnotatedSection
				title="Fourth Follow Up"
				description="Admin will be notify on this no. by selecting Notify Admin."
			>
				<Card sectioned>
					<TextField
						label="Template"
						value={template4}
						onChange={handleTemplate4}
						multiline
						helpText="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link"
					/>
					<br />
					{/* <div className="a-card">
						<div className="mr-4 a-card-4">
							<Checkbox label="Notify Customer" checked={checkedCustomer4} onChange={handleCustomerCheck4} />
						</div>
						<div>
							<Checkbox label="Notify Admin" checked={checkedAdmin4} onChange={handleAdminCheck4} />
						</div>
					</div> */}
					<div className="mt-4 a-card-contents">
						<Select label="Time After" options={option4} onChange={handleSelectChange4} value={selected4} />

						<Select label="Status" options={statusOption4} onChange={handleStatus4} value={status4} />

						<div className="mt-5">
							<button
								onClick={() => {
									myFunction4();
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
	);
}
