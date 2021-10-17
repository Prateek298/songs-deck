import styled, { css } from 'styled-components';

import landingImgOne from '../../assets/landingImg1.jpg';
import landingImgTwo from '../../assets/landingImg2.jpg';

const bgImgStyles = css`
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
`;

const darkBgCover = css`
	content: '';
	position: absolute;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const LandingPageContainer = styled.main`
	display: flex;
	flex-direction: column;
	/* height: 100%; */
	width: 100%;
	overflow-y: auto;
	@import url('https://fonts.googleapis.com/css2?family=Concert+One&display=swap');
`;

export const Header = styled.header`
	background-image: url(${landingImgTwo});
	${bgImgStyles};
	position: relative;
	height: 300px;
	display: flex;
	justify-content: center;
	align-items: center;

	&::before {
		${darkBgCover};
		background-color: rgba(0, 0, 0, 0.2);
	}

	& > .header-content {
		width: 90%;
		z-index: 100;
		color: #fff;
		text-align: center;
		@import url('https://fonts.googleapis.com/css2?family=IM+Fell+English+SC&display=swap');

		& > h1 {
			font-family: 'IM Fell English SC', serif;
			font-size: 2.5rem;
			letter-spacing: 1px;
			/* color: #63cfdb; */
			color: #10df06;
			margin: 10px 0;
		}

		& > h4 {
			font-family: 'Concert One', cursive;
			font-weight: normal;
			width: clamp(280px, 95%, 500px);
			margin: auto;
			margin-bottom: 20px;
			letter-spacing: 1.1px;
		}
	}
`;

export const Overview = styled.section`
	background-image: url(${landingImgOne});
	${bgImgStyles};
	position: relative;
	height: 200px;
	display: flex;
	justify-content: center;
	align-items: center;

	&::before {
		${darkBgCover};
	}

	& > .overview-content {
		color: white;
		width: 80%;
		z-index: 100;

		& > h4 {
			font-family: 'Concert One', cursive;
			font-weight: normal;
			letter-spacing: 1.1px;
		}
	}
`;

export const Connect = styled.section`
	background-image: url('https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y29ubmVjdGluZyUyMHBlb3BsZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
	${bgImgStyles};
	position: relative;
	height: 310px;

	@media screen and (min-width: 420px) {
		height: 222px;
	}

	&::before {
		${darkBgCover};
	}

	& > .connect-content {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 85%;
		height: 100%;
		margin: 0 auto;
		color: white;

		@media screen and (min-width: 420px) {
			flex-direction: row;
			align-items: center;
		}

		& > .about-chat,
		& > .about-profile {
			z-index: 100;

			& > h4 {
				font-family: 'Concert One', cursive;
				font-weight: normal;
				letter-spacing: 1.1px;
			}

			@media screen and (min-width: 420px) {
				padding: 0 20px;
			}
		}
	}
`;

export const ContentHeading = styled.h2`
	text-align: center;
	margin-bottom: 5px;
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

// body {
// 	background: linear-gradient(-45deg, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%);
// 	background-size:  400% 400%;
// 	animation: gradient 20s ease infinite;
// 	height: 100vh;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
//   }

//   @keyframes gradient {
// 	0% {
// 	  background-position: 0%;
// 	}
// 	50% {
// 	  background-position: 100%;
// 	}
// 	100% {
// 	  background-position: 0%;
// 	}
//   }
