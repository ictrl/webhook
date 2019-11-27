import React from 'react';
import { Bar } from 'react-chartjs-2';

const state = {
	labels: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'jun' ],
	datasets: [
		{
			label: 'No. of Sales of Votes',
			data: [ 20, 10, 27, 20, 10, 5 ],
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

export default function Design() {
	return (
		<div>
			{console.log(state.datasets[0].data)}

			<Bar
				data={state}
				options={{
					title: {
						display: true,
						text: 'Average Rainfall per month',
						fontSize: 16
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
