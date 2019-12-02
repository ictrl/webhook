import React, { useEffect, useState } from 'react';
import { DescriptionList, Stack, Layout, Card, Page, Button, ButtonGroup } from '@shopify/polaris';
import axios from 'axios';

export default function History() {
	const [ history, setHistory ] = useState([]);

	const smsHistory = () => {
		axios.get('/api/history').then((res) => {
			setHistory(res.data);
		});
	};

	useEffect(() => {
		smsHistory();
		smsCount();
	}, []);
	const [ smsLeft, setSmsLeft ] = useState(0);
	const smsCount = () => {
		axios.get('/api/smsCount/').then((res) => {
			setSmsLeft(res.data);
		});
	};

	const buySms = () => {
		alert('Please contact Us: +917827537259');
	};

	return (
		<Layout>
			<div style={{ marginTop: '18px' }}>
				<Card title="Remaining SMS">
					<Card.Section>
						<Stack spacing="loose" vertical>
							<h1 style={{ fontSize: '14px' }}>
								You have only {' '}
								{smsLeft > 100 ? (
									<span style={{ color: 'green', fontWeight: '600' }}> {smsLeft}</span>
								) : (
									<span style={{ color: 'red', fontWeight: '600' }}> {smsLeft}</span>
								)}{' '}
								SMS left.
							</h1>
							<p>
								Character Counts and SMS units are based on current content and may vary after filling actual variables
								value. You can recharge your SMS manually also.
							</p>

							<Button primary>Buy More SMS</Button>
						</Stack>
					</Card.Section>
				</Card>

				<Card title="	SMS HISTORY">
					<Card.Section>
						<DescriptionList items={history} />
					</Card.Section>
				</Card>
			</div>
		</Layout>
	);
}
