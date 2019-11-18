import React, { useCallback, useState } from 'react';
import { TextField, Layout, AnnotatedSection, Select, Card, Button } from '@shopify/polaris';

import Checkbox from './Checkbox';

export default function Abandan() {
	const [ value, setValue ] = useState('');

	const handleChange = useCallback((newValue) => setValue(newValue), []);

	const [ selected, setSelected ] = useState('30');
	const [ status, setStatus ] = useState('enable');

	const handleSelectChange = useCallback((value) => setSelected(value), []);
	const handleStatusChange = useCallback((value) => setStatus(value), []);

	function myFunction() {
		var x = document.getElementById('snackbar');
		x.className = 'show';
		setTimeout(function() {
			x.className = x.className.replace('show', '');
		}, 2000);
	}

	const options = [
		{ label: '30 minutes later', value: '30' },
		{ label: '60 minutes later', value: '60' },
		{ label: '6 hours later', value: '360' },
		{ label: '12 hours later', value: '720' }
	];
	const statuss = [ { label: 'Enable', value: 'enable' }, { label: 'Disable', value: 'disable' } ];

	return (
		<Layout>
			<Layout.AnnotatedSection
				title="First Follow Up"
				description="Admin will be notify on this no. by selecting Notify Admin."
			>
				<Card sectioned>
					<TextField
						label="Template"
						value={value}
						onChange={handleChange}
						multiline
						// helpText="We’ll use this address if we need to contact you about your account."
					/>
					<br />
					<div className="a-card">
						<div className="mr-4 a-card-1">
							<Checkbox name="orders/create customer" label="Notify Customer" hell="orders/create" value="" />
						</div>
						<div>
							<Checkbox label="Notify Admin" name="orders/create admin" value="" />
						</div>
					</div>

					<div className="mt-2 a-card-contents">
						<Select label="Date range" options={options} onChange={handleSelectChange} value={selected} />

						<Select label="Status" options={statuss} onChange={handleStatusChange} value={status} />

						<div className="mt-5">
							<button
								onClick={() => {
									myFunction();
								}}
								style={{ height: '34px' }}
								className="button-shopify"
								type="submit"
							>
								Save
							</button>
						</div>
					</div>
				</Card>
			</Layout.AnnotatedSection>
			<Layout.AnnotatedSection
				title="Second Follow Up"
				description="Sender ID is the name or number which appears on the mobile phone as the sender of a SMS. Sender ID will be maximum of 6 Characters."
			>
				<Card sectioned>
					<TextField
						label="Template"
						value={value}
						onChange={handleChange}
						multiline
						// helpText="We’ll use this address if we need to contact you about your account."
					/>
					<br />
					<div className="a-card">
						<div className="mr-4 a-card-1">
							<Checkbox name="orders/create customer" label="Notify Customer" hell="orders/create" value="" />
						</div>
						<div>
							<Checkbox label="Notify Admin" name="orders/create admin" value="" />
						</div>
					</div>

					<div className="mt-2 a-card-contents">
						<Select label="Date range" options={options} onChange={handleSelectChange} value={selected} />

						<Select label="Status" options={statuss} onChange={handleStatusChange} value={status} />

						<div className="mt-5">
							<button
								onClick={() => {
									myFunction();
								}}
								style={{ height: '34px' }}
								className="button-shopify"
								type="submit"
							>
								Save
							</button>
						</div>
					</div>
				</Card>
			</Layout.AnnotatedSection>
			<Layout.AnnotatedSection
				title="Third Follow Up"
				description="Admin and Customer will be notified according to by selecting Notify Admin."
			>
				<Card sectioned>
					<TextField
						label="Template"
						value={value}
						onChange={handleChange}
						multiline
						// helpText="We’ll use this address if we need to contact you about your account."
					/>
					<br />
					<div className="a-card">
						<div className="mr-4 a-card-1">
							<Checkbox name="orders/create customer" label="Notify Customer" hell="orders/create" value="" />
						</div>
						<div>
							<Checkbox label="Notify Admin" name="orders/create admin" value="" />
						</div>
					</div>

					<div className="mt-2 a-card-contents">
						<Select label="Date range" options={options} onChange={handleSelectChange} value={selected} />

						<Select label="Status" options={statuss} onChange={handleStatusChange} value={status} />

						<div className="mt-5">
							<button
								onClick={() => {
									myFunction();
								}}
								style={{ height: '34px' }}
								className="button-shopify"
								type="submit"
							>
								Save
							</button>
						</div>
					</div>
				</Card>
			</Layout.AnnotatedSection>
			<Layout.AnnotatedSection
				title="Fourth Follow Up"
				description="Admin and Customer will be notified according to by selecting Notify Admin."
			>
				<Card sectioned>
					<TextField
						label="Template"
						value={value}
						onChange={handleChange}
						multiline
						// helpText="We’ll use this address if we need to contact you about your account."
					/>
					<br />
					<div className="a-card">
						<div className="mr-4 a-card-1">
							<Checkbox name="orders/create customer" label="Notify Customer" hell="orders/create" value="" />
						</div>
						<div>
							<Checkbox label="Notify Admin" name="orders/create admin" value="" />
						</div>
					</div>

					<div className="mt-2 a-card-contents">
						<Select label="Date range" options={options} onChange={handleSelectChange} value={selected} />

						<Select label="Status" options={statuss} onChange={handleStatusChange} value={status} />

						<div className="mt-5">
							<button
								onClick={() => {
									myFunction();
								}}
								style={{ height: '34px' }}
								className="button-shopify"
								type="submit"
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
