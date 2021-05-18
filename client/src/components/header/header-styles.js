import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
	display: flex;
	justify-content: space-between;
	height: 60px;
	width: 100%;
	padding: 10px;
	margin-bottom: 15px;
`;

export const LogoContainer = styled(Link)`
    height: 100%;
    width: 50px;
`;

export const NavLink = styled(Link)`
	color:white;
	padding: 5px 0;
`;
