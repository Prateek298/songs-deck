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
`;

export const SongsList = styled.div`
	flex-grow: 1;
	overflow-y: auto;
`;