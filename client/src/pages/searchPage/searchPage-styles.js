import styled from 'styled-components';

export const SearchPageContainer = styled.div`
	height: calc(100% - 60px - 20px);
	display: flex;
	flex-direction: column;
`;

export const SongsList = styled.div`
	flex-grow: 1;
	margin-top: 10px;
	overflow-y: auto;
`;

export const ModalPlaylistName = styled.p`
	padding: 10px 5px;
	letter-spacing: 1.2px;
	cursor: pointer;

	&:hover,
	&:active {
		background-color: rgba(0, 0, 0, 0.5);
	}
`;
