import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

import { Layout, Card } from '@shopify/polaris';

import { Bar, Line, Pie } from 'react-chartjs-2';

const state1 = {
	labels: [ 'First', 'Second', 'Third', 'Fourth' ],
	datasets: [
		{
			label: 'No. of Sales of Votes',
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
			label: 'Click Through',
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
			label: 'Rainfall',
			data: '',
			backgroundColor: [ '#5C6AC4', '#47C1BF', '#F49342', '#9C6ADE' ],
			hoverBackgroundColor: [ '#50B83C', '#9C6ADE', '#5C6AC4', '#F49342' ],
			// borderColor: [ '#5C6AC4', '#47C1BF', '#F49342', '#50B83C', '#9C6ADE' ],
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
				title="First Follow Up"
				description="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link."
			>
				<Card sectioned>
					<Bar
						data={state1}
						options={{
							title: {
								display: true,
								text: 'Average Rainfall per month',
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
				title="First Follow Up"
				description="Available Variables:- customer_name store_name abandoned_checkout_url amount first_name last_name unsubscribe_link."
			>
				<Card sectioned>
					{' '}
					<Line
						data={state2}
						options={{
							title: {
								display: true,
								text: 'Average Click per month',
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
				title="Converted Through FollowUp message"
				description="We sent them followUp message Until they purchased product. Here we categorized number of converted converted as followup message."
			>
				<Card sectioned>
					<Pie
						data={state3}
						options={{
							title: {
								display: true,
								text: 'Average Rainfall per month',
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
