import styled, { css } from 'styled-components';

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
