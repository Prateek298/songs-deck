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
