import styled from 'styled-components';

export const PlaylistContainer = styled.main`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: clamp(300px, 92%, 900px);
	margin: 0 auto;
`;

export const PageTitle = styled.h1`
	color: orangered;
	margin-bottom: 15px;
	display: flex;
	justify-content: space-between;

	& > a {
		color: #45a29e;
		&:hover {
			color: #2b706d;
		}
	}

	& > .toggle-chart {
		background-color: #4c4d4f;
		padding: 3px 5px;
		border-radius: 4px;
		cursor: pointer;
		max-width: 50px;
		max-height: 50px;

		&:active {
			transform: scale(0.96);
		}

		& > img {
			object-fit: contain;
			width: 30px;
			height: 30px;
		}
	}
`;
