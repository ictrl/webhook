import React, { Fragment, useEffect, useCallback, useState } from 'react';
import { DescriptionList, Page, Card, Layout, Heading, Button, Checkbox, Form, TextField } from '@shopify/polaris';
import axios from 'axios';

export default function History(props) {
	const [ history, setHistory ] = useState([]);

	const smsHistory = () => {
		axios.get('/api/history').then((res) => {
			setHistory(res.data);
		});
	};

	useEffect(() => {
		smsHistory();
	}, []);

	return (
		<Page>
			<h1>Sms left</h1>

			<DescriptionList items={history} />
		</Page>
	);
}
