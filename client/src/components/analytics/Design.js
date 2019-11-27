import React, { useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const state = {
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

const fetch = (params) => {
	axios
		.get('/api/dashboard/')
		.then((res) => {
			state.datasets[0].data = res.data.follow;
		})
		.catch((err) => console.error(err));
};

export default function Design() {
	useEffect(() => {
		fetch();
	}, []);
	return (
		<div>
			{/* {console.log(state.datasets[0].data)} */}

			<Bar
				data={state}
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
		</div>
	);
}
