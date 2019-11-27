import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const state = {
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

const fetchh = (params) => {
	axios
		.get('/api/dashboard/')
		.then((res) => {
			state.datasets[0].data = res.data.inc;
			console.log(res.data.inc);
			console.log(state.datasets[0].data);
		})
		.catch((err) => console.error(err));
};

export default function LineGraph() {
	useEffect(() => {
		fetchh();
	}, []);
	return (
		<div>
			<Line
				data={state}
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
		</div>
	);
}
