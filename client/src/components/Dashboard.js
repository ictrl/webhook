import React, { useCallback, useState } from 'react';
import { TextField, Layout, Select, Card } from '@shopify/polaris';

import Design from './analytics/Design';
import LineGraph from './analytics/LineGraph';
import Pie from './analytics/Pie';

function Dashboard() {
	return (
		<Layout>
			<Layout.AnnotatedSection
				title="First Follow Up"
				description="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link."
			>
				<Card sectioned>
					<div>
						<Pie />
					</div>
				</Card>
			</Layout.AnnotatedSection>
			<Layout.AnnotatedSection
				title="First Follow Up"
				description="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link."
			>
				<Card sectioned>
					<LineGraph />
				</Card>
			</Layout.AnnotatedSection>
			<Layout.AnnotatedSection
				title="First Follow Up"
				description="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link."
			>
				<Card sectioned>
					<Design />
				</Card>
			</Layout.AnnotatedSection>
		</Layout>
	);
}

export default Dashboard;

// <div style={{ width: 500 }}>
// 	<div style={{ width: 500 }}>
// 		<Pie />
// 	</div>
// 	<div style={{ width: 500 }}>
// 		<Design />

// 		<div style={{ width: 500 }}>
// 			<LineGraph />
// 		</div>
// 	</div>
// </div>
