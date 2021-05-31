import styled from 'styled-components';

import { Link } from 'react-router-dom';

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

export const ProfileImgContainer = styled.div`
	height: 40px;
	width: 40px;
	border-radius: 50%;
	overflow: hidden;

	& .profile-img {
		object-fit: contain;
		height: 100%;
		width: 100%;
	}
`;

export const PremiumLink = styled.a`
	color: green;

	&:focus {
		color: green;
	}
`;
