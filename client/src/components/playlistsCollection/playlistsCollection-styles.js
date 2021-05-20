import styled from 'styled-components';

export const PlaylistsCollectionContainer = styled.main`
	display: flex;
	flex-direction: column;
	height: calc(100% - 60px - 20px);
	width: clamp(300px, 92%, 900px);
	margin: 0 auto;
`;

export const PageTitle = styled.h1`
	color: orangered;
	margin-bottom: 15px;
`;
