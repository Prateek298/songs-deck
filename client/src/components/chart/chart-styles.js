import styled from 'styled-components';

export const GraphContainer = styled.section`
	width: 98%;
	height: 80%;
	margin: 0 auto;
	overflow-y: auto;

	& > .graph {
		width: 100% !important;
		height: 100% !important;
	}

	& > .text {
		margin-top: 10px;
		color: cyan;
		text-align: center;
	}
`;
