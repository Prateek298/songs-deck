import styled from 'styled-components';

export const SongTrackContainer = styled.div`
	display: flex;
	flex-direction: ${props => (props.vertical ? 'column' : 'row')};
	width: fit-content;
	padding: 10px 5px;
	margin-bottom: 5px;
	cursor: pointer;
`;

export const TrackInfo = styled.div`
	display: flex;
	flex-direction: column;
	padding: 3px 7px;

	& .title {
		margin-bottom: 3px;
		color: orangered;
	}

	& .album {
		color: #45a29e;
	}

	& .artist {
		color: whitesmoke;
	}
`;
