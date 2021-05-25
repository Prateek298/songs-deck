import styled from 'styled-components';

export const PlaylistsCollectionContainer = styled.main`
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

export const AddNew = styled.div`
	display: flex;
	color: white;
	width: 50%;
	height: 40px;
	align-items: center;
	margin-bottom: 10px;
	cursor: pointer;

	&:hover {
		background-color: rgba(0, 0, 0, 0.4);
	}
`;

export const Plus = styled.span`
	background-color: #03400e;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 40px;
	height: 100%;
	font-size: 1.3rem;
	padding: 10px 0;
	margin-right: 8px;
`;

export const RadioOptions = styled.div`
	display: flex;
	justify-content: space-around;
	height: 32px;
	margin-bottom: 8px;
`;
