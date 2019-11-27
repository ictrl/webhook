import React from 'react';
import { Pie, Doughnut } from 'react-chartjs-2';

const state = {
	labels: [ 'Followup 1', 'Followup 2', 'Followup 3', 'Followup 4', 'Not Converted' ],
	datasets: [
		{
			label: 'Rainfall',
			backgroundColor: [ '#5C6AC4', '#47C1BF', '#F49342', '#50B83C', '#9C6ADE' ],
			hoverBackgroundColor: [ '#47C1BF', '#F49342', '#50B83C', '#9C6ADE', '#5C6AC4' ],
			data: [ 65, 78, 30, 70, 12 ],
			// borderColor: [ '#5C6AC4', '#47C1BF', '#F49342', '#50B83C', '#9C6ADE' ],
			borderAlign: 'inner',
			borderWidth: 0
		}
	]
};

export default function Piee() {
	return (
		<div>
			<Pie
				data={state}
				options={{
					title: {
						display: true,
						text: 'Average Rainfall per month',
						fontSize: 20
					},
					legend: {
						display: true,
						position: 'right'
					}
				}}
			/>

			{/* <Doughnut
				data={state}
				options={{
					title: {
						display: true,
						text: 'Average Rainfall per month',
						fontSize: 20
					},
					legend: {
						display: true,
						position: 'right'
					}
				}}
			/> */}
		</div>
	);
}
