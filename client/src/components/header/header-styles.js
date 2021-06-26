import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { user_img_styles } from '../../common-styles';

export const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 60px;
	width: 100%;
	padding: 10px;
	margin-bottom: 15px;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 40px;
`;

export const ProfileImgContainer = styled(Link)`
	${user_img_styles}
`;

export const PremiumLink = styled.a`
	color: green;

	&:focus {
		color: green;
	}
`;
