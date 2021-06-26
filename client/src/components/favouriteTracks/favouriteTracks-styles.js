import styled from 'styled-components';

export const FavTracksContainer = styled.section`
	width: clamp(250px, 85%, 900px);
	height: auto;
	max-height: 350px;
	margin: 0 auto 10px;

	& > .title {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;

		& > p {
			font-size: 1.2rem;
			font-weight: 800;
			color: #06c77a;
		}

		& > span {
			cursor: pointer;
			font-size: 1rem;
		}
	}

	& .no-fav-msg {
		text-align: center;
		margin-top: 13px;
	}

	& .fav-tracks {
		align-self: flex-start;
		padding-left: 15px;
		height: calc(100% - 1.2rem - 10px);

		& .ranked-track {
			display: flex;
			align-items: center;
		}
	}
`;

export const IdInput = styled.input`
	border: none;
	border-bottom: 2px solid rgba(0, 0, 0, 0.5);
	background-color: transparent;
	color: black;
	width: 90%;
	padding: 5px;
	margin-bottom: 10px;
	font-size: 1rem;

	&:focus {
		outline: none;
		border-bottom-color: rgba(0, 0, 0, 0.9);
	}
`;
