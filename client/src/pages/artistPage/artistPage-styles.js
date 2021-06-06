import styled from 'styled-components';

export const ArtistPageContainer = styled.main`
	height: calc(100% - 60px - 20px);
	display: flex;
	flex-direction: column;
	align-items: center;
	color: white;
	overflow-y: auto;

	& .top-tracks {
		height: auto;
		align-self: flex-start;
		padding-left: 20px;
		margin-bottom: 15px;

		& .ranked-track {
			display: flex;
			align-items: center;
		}
	}
`;

export const ModalPlaylistName = styled.p`
	padding: 10px 5px;
	letter-spacing: 1.2px;
	cursor: pointer;

	&:hover,
	&:active {
		background-color: rgba(0, 0, 0, 0.3);
	}
`;
