import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

import { Layout, Card } from '@shopify/polaris';

import { Bar, Line, Pie } from 'react-chartjs-2';

const state1 = {
	labels: [ 'First', 'Second', 'Third', 'Fourth' ],
	datasets: [
		{
			label: 'Sales in Number',
			data: '',
			backgroundColor: '#5462C1',
			barPercentage: 1,
			barThickness: 35,
			maxBarThickness: 38,
			minBarLength: 2,
			borderWidth: 0,
			hoverBackgroundColor: '#5C3AC4'
		}
	]
};
const state2 = {
	labels: [ 'First', 'Second', 'Third', 'Fourth' ],
	datasets: [
		{
			label: 'CTR',
			data: '',
			fill: true,
			lineTension: 0.5,
			lineColor: '#3A5BD6',
			backgroundColor: '#5C6AC4',
			borderColor: '#3A5BD6',
			borderWidth: 1
		}
	]
};
const state3 = {
	labels: [ 'First', 'Second', 'Third', 'Fourth' ],
	datasets: [
		{
			label: 'Amount of Sales',
			data: '',
			backgroundColor: [ '#5C6AC4', '#50B83C', '#006FBB', '#F49342' ],
			hoverBackgroundColor: [ '#5C3AC4', '#24930e', '#005289', '#e07721' ],

			borderAlign: 'inner',
			borderWidth: 0.1
		}
	]
};

const fetch1 = () => {
	axios
		.get('/api/dashboard/')
		.then((res) => {
			state1.datasets[0].data = res.data.follow;
			state2.datasets[0].data = res.data.inc;
			state3.datasets[0].data = res.data.price;
			console.log(res.data);
		})
		.catch((err) => console.error(err));
};

function Dashboard() {
	useEffect(
		() => {
			fetch1();
		},
		[ state1, state2, state3 ]
	);
	return (
		<Layout>
			<Layout.AnnotatedSection
				title="Converted FollowUp"
				description="All the converted sales from followUp message will appear here, according to their order."
			>
				<Card sectioned>
					<Bar
						data={state1}
						options={{
							title: {
								display: true,
								text: 'Number Of Sales',
								fontSize: 15
							},
							legend: {
								display: true,
								position: 'right'
							},
							scales: {
								yAxes: [
									{
										ticks: {
											beginAtZero: true
										}
									}
								],
								xAxes: [
									{
										gridLines: {
											display: false
										}
									}
								]
							}
						}}
					/>
				</Card>
			</Layout.AnnotatedSection>
			<Layout.AnnotatedSection
				title="Click Through Rate"
				description="Number of clicked abandan links from followUp message will appear here, according to their order."
			>
				<Card sectioned>
					{' '}
					<Line
						data={state2}
						options={{
							title: {
								display: true,
								text: 'Number of Click on followUp message',
								fontSize: 15
							},
							legend: {
								display: true,
								position: 'right'
							},
							scales: {
								yAxes: [
									{
										ticks: {
											beginAtZero: true
										}
									}
								],
								xAxes: [
									{
										gridLines: {
											display: false
										}
									}
								]
							}
						}}
					/>
				</Card>
			</Layout.AnnotatedSection>
			<Layout.AnnotatedSection
				title="Converted Sales"
				description="Total amount of converted sales from followUp message will appear here, according to their order. Price in Rupees."
			>
				<Card sectioned>
					<Pie
						data={state3}
						options={{
							title: {
								display: true,
								text: 'Converted Earnings',
								fontSize: 15
							},
							legend: {
								display: true,
								position: 'right'
							}
						}}
					/>
				</Card>
			</Layout.AnnotatedSection>
		</Layout>
	);
}

export default Dashboard;
