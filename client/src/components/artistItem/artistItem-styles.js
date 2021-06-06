import styled from 'styled-components';

export const ArtistItemContainer = styled.div`
	display: flex;
	width: fit-content;
	padding: 10px 5px;
	margin-bottom: 5px;
	cursor: pointer;

	& > img {
		width: 90px;
		height: 90px;
		border-radius: 50%;
	}
`;

export const ArtistInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 3px 7px;

	& .name {
		color: #db1634;
		margin-bottom: 3px;
	}

	& .genre-list {
		display: flex;
		width: 100%;

		& .genre {
			background-color: #06c77a;
			color: #c93412;
			height: fit-content;
			padding: 3px 10px;
			border-radius: 10px;
			margin-right: 4px;
		}
	}
`;
