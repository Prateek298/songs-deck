import styled from 'styled-components';

import { user_img_styles } from '../../common-styles';

export const ProfileContainer = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: auto;
	max-height: 300px;
	align-items: center;
	margin-bottom: 10px;

	& > .img-container {
		${user_img_styles};
		width: 70px;
		height: 70px;
		margin-bottom: 5px;
	}

	& > .info {
		display: flex;
		flex-direction: column;
		align-items: center;

		& .follows {
			color: rgba(255, 255, 255, 0.6);
			margin-bottom: 3px;
		}

		& .addDesc {
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;

export const DescInput = styled.textarea`
	width: 90%;
	height: 150px;
	padding: 10px 15px;
	font-size: 1.1rem;
`;
