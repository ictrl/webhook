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
		<Layout>
			<Layout.AnnotatedSection
				title="Total SMS Left"
				description="Admin will be notify on this no. by selecting Notify Admin."
			>
				<Card sectioned>
					<div style={{ padding: '3rem' }} />
				</Card>
			</Layout.AnnotatedSection>

			<DescriptionList items={history} />
		</Layout>
	);
}
