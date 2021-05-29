import styled, { css } from 'styled-components';

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

	& > a {
		color: #45a29e;
		&:hover {
			color: #2b706d;
		}
	}
`;

export const SongsList = styled.div`
	flex-grow: 1;
	overflow-y: auto;
`;

const highlightStyles = css`
	cursor: pointer;

	&:hover,
	&:active {
		background-color: rgba(0, 0, 0, 0.3);
	}
`;

export const ModalPlaylistName = styled.p`
	padding: 10px 5px;
	letter-spacing: 1.2px;
	${highlightStyles};
`;

export const RemoveTrack = styled.h4`
	color: red;
	padding: 10px 5px;
	${highlightStyles};
`;
