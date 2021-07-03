import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

import { GraphContainer } from './chart-styles';

const PopularityGraph = ({ items }) => {
	const graph = useRef();
	const chartInstanceRef = useRef();

	useEffect(
		() => {
			const dataForGraph = items.sort((a, b) => b.popularity - a.popularity).slice(0, 10);

			const dataForConfig = {
				labels: dataForGraph.map(item => `${item.title.slice(0, 8)}...`),
				datasets: [
					{
						label: 'Tracks Popularity',
						data: dataForGraph.map(item => item.popularity),
						backgroundColor: [
							'rgba(255, 99, 132, 0.2)',
							'rgba(255, 159, 64, 0.2)',
							'rgba(255, 205, 86, 0.2)',
							'rgba(75, 192, 192, 0.2)',
							'rgba(54, 162, 235, 0.2)',
							'rgba(153, 102, 255, 0.2)',
							'rgba(201, 203, 207, 0.2)'
						],
						borderColor: [
							'rgb(255, 99, 132)',
							'rgb(255, 159, 64)',
							'rgb(255, 205, 86)',
							'rgb(75, 192, 192)',
							'rgb(54, 162, 235)',
							'rgb(153, 102, 255)',
							'rgb(201, 203, 207)'
						],
						borderWidth: 1
					}
				]
			};

			// plugin to change canvas background
			const plugin = {
				id: 'custom_canvas_background_color',
				beforeDraw: chart => {
					const ctx = chart.canvas.getContext('2d');
					ctx.save();
					ctx.globalCompositeOperation = 'destination-over';
					ctx.fillStyle = 'lightGreen';
					ctx.fillRect(0, 0, chart.width, chart.height);
					ctx.restore();
				}
			};

			const config = {
				type: 'bar',
				data: dataForConfig,
				plugins: [ plugin ],
				options: {
					indexAxis: 'y',
					aspectRatio: window.innerWidth < 420 ? 1 : 2,
					scales: {
						y: {
							beginAtZero: true
						},
						x: {
							suggestedMax: 100
						}
					},
					plugins: {
						legend: {
							display: false
						},
						title: {
							display: true,
							text: 'Tracks Popularity',
							color: 'black',
							font: {
								size: '18'
							}
						}
					}
				}
			};

			if (!chartInstanceRef.current) {
				chartInstanceRef.current = new Chart(graph.current, config);
			}
			else {
				chartInstanceRef.current.update();
			}
		},
		[ items ]
	);

	return (
		<GraphContainer>
			<canvas ref={graph} className="graph" />
			<p className="text">** Top 10 most popular tracks in the playlist according to Spotify **</p>
		</GraphContainer>
	);
};

export default PopularityGraph;
