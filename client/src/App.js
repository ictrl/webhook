import React, { useCallback, useState, useEffect } from 'react';
import { Card, Tabs, Page, FooterHelp, Link } from '@shopify/polaris';
import axios from 'axios';

import './App.css';

import Setting from './components/Setting';
import Template from './components/Template';
import History from './components/History';
import BuyMoreSMS from './components/BuyMoreSMS';
import Abandan from './components/Abandan';

export default function TabsExample() {
	const [ selected, setSelected ] = useState(0);
	const [ smsLeft, setSmsLeft ] = useState(0);

	const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), []);

	const smsCount = () => {
		axios.get('/api/smsCount/').then((res) => {
			setSmsLeft(res.data);
		});
	};
	const tabs = [
		{
			id: 'accepts-marketing',
			content: 'Edit Template',
			panelID: 'accepts-marketing-content'
		},
		{
			id: 'abandan-checkout',
			content: 'Abandan Checkout',
			panelID: 'abandan-checkout'
		},

		{
			id: 'all-customers',
			content: 'Settings',
			accessibilityLabel: 'All customers',
			panelID: 'all-customers-content'
		},
		{
			id: 'repeat-customers',
			content: 'SMS History',
			panelID: 'repeat-customers-content'
		},
		{
			id: 'buy-more-sms',
			content: 'Sms Left: ' + smsLeft,
			panelID: 'buy-more-sms-content'
		}
	];

	const tabChangeHandler = (params) => {
		switch (tabs[selected].content) {
			case 'Settings':
				return <Setting />;

			case 'Edit Template':
				return <Template />;

			// case 'Buy More SMS':
			// 	return <BuyMoreSMS />;
			case 'SMS History':
				return <History />;
			case 'Abandan Checkout':
				return <Abandan />;

			default:
				break;
		}
	};

	useEffect(() => {
		smsCount();
	}, []);

	return (
		<Page>
			<Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
				<Card.Section>
					{tabChangeHandler()}

					{/* <Settings /> */}
				</Card.Section>
			</Tabs>
			<FooterHelp>
				Learn more about{' '}
				<Link url="https://adijha.com" external>
					Mojitolabs
				</Link>
			</FooterHelp>
		</Page>
	);
}
