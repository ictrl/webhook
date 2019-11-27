import React, { useCallback, useState, useEffect } from 'react';
import { Layout, Card } from '@shopify/polaris';

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
					<Design />
				</Card>
			</Layout.AnnotatedSection>
			<Layout.AnnotatedSection
				title="Converted Through FollowUp message"
				description="We sent them followUp message Until they purchased product. Here we categorized number of converted converted as followup message."
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
		</Layout>
	);
}

export default Dashboard;
