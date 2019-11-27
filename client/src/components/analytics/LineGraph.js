import React from 'react';
import { Line } from 'react-chartjs-2';

const state = {
	labels: [ 'Follow Up 1', 'Follow Up 2', 'Follow Up 3', 'Follow Up 4' ],
	datasets: [
		{
			label: 'Click',
			fill: true,
			lineTension: 0.5,
			// lineColor: '#3A5BD6',
			backgroundColor: '#5C6AC4',
			// borderColor: '#3A5BD6',
			// borderWidth: 1,
			data: [ 65, 59, 80, 81, 56 ]
		}
	]
};

export default function LineGraph() {
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
					}
				}}
			/>
		</div>
	);
}
