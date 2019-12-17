import React, { useCallback, useState } from 'react';
import { Card, Tabs, Page, FooterHelp, Link } from '@shopify/polaris';

import './App.css';

import Setting from './components/Setting';
import Template from './components/Template';
import History from './components/History';

import Abandan from './components/Abandan';
import Dashboard from './components/Dashboard';

export default function TabsExample() {
	const [ selected, setSelected ] = useState(0);

	const handleTabChange = useCallback((selectedTabIndex) => setSelected(selectedTabIndex), []);

	const tabs = [
		{
			id: 'accepts-marketing',
			content: 'Edit Template',
			panelID: 'accepts-marketing-content'
		},
		{
			id: 'all-customers',
			content: 'Settings',
			accessibilityLabel: 'All customers',
			panelID: 'all-customers-content'
		},
		{
			id: 'abandon-checkout',
			content: 'Abandon Checkout',
			panelID: 'abandon-checkout-content'
		},
		{
			id: 'dashboard',
			content: 'Dashboard',
			panelID: 'dashboard'
		},
		{
			id: 'repeat-customers',
			content: 'SMS History',
			panelID: 'repeat-customers-content'
		}
	];

	const tabChangeHandler = (params) => {
		switch (tabs[selected].content) {
			case 'Settings':
				return <Setting />;

			case 'Edit Template':
				return <Template />;

			case 'SMS History':
				return <History />;
			case 'Abandon Checkout':
				return <Abandan />;
			case 'Dashboard':
				return <Dashboard />;

			default:
				break;
		}
	};

	return (
		<Page>
			<Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
				<Card.Section>{tabChangeHandler()}</Card.Section>
			</Tabs>
			<FooterHelp>
				Learn more about
				<Link url='https://mojitolabs.com' external>
					{' '}
					Mojitolabs
				</Link>
			</FooterHelp>
		</Page>
	);
}
