import styled from 'styled-components';

export const PlayingPageContainer = styled.main`
	display: flex;
	flex-direction: column;
	height: calc(100% - 60px - 20px);
	justify-content: space-around;
	width: clamp(300px, 92%, 900px);
	margin: 0 auto;

	& .title {
		color: orangered;
	}
`;

export const LyricsContainer = styled.div`
	background-color: #3cd6ad;
	font-size: 1.3em;
	flex-grow: 1;
	margin: 10px auto;
	border-radius: 5px;
	color: #fff;
	overflow-y: scroll;
	width: clamp(300px, 100%, 900px);
	max-height: calc(100% - 42px - 50px - 30px - 45px);
	white-space: break-spaces;
	text-align: center;
`;
