import styled from 'styled-components';

export const PlaylistItemContainer = styled.div`
	display: flex;
	flex-direction: ${props => (props.vertical ? 'column' : 'row')};
	padding: 10px 5px;
	margin: 5px 0;
	width: fit-content;
	cursor: pointer;
`;

export const PlaylistInfo = styled.div`
	display: flex;
	flex-direction: column;
	padding: 4px 0;
	margin-left: ${props => (props.vertical ? '0' : '10px')};

	& .playlist-name {
		color: #45a29e;
		font-size: ${props => (props.vertical ? '1.13rem' : '1.2rem')};
		letter-spacing: 1px;
		margin-bottom: 3px;

		& span {
			color: whitesmoke;
			font-size: ${props => (props.vertical ? '1rem' : '1.2rem')};
		}
	}
`;
