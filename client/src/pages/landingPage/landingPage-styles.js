import styled from 'styled-components';

export const LandingPageContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100% - 60px - 20px);
	padding: 10px;
`;

export const LandingHeading = styled.h1`
	letter-spacing: 1px;
	color: #63cfdb;
	margin: -20px 0 20px;
`;

export const LandingText = styled.p`
	font-size: 1.5rem;
	font-weight: bold;
	letter-spacing: 1.5px;
	line-height: 2rem;
	color: whitesmoke;
	text-align: center;
	margin-bottom: 1.5rem;
`;
