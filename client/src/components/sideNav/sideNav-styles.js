import styled, { css } from 'styled-components';

import { NavLink } from 'react-router-dom';

export const NavHamburger = styled.span`
	color: #fff;
	font-size: 1.2em;
	cursor: pointer;
`;

export const NavClose = styled.span`
	color: #f5f5f5;
	font-size: 1.3em;
	cursor: pointer;
	position: absolute;
	top: 35px;
	right: 30px;
`;

const commonNavStyles = css`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	transform: ${props => (props.show ? 'translateX(0)' : 'translateX(-100%)')};
	transition: transform 0.3s ease-in-out;
	z-index: 100;
`;

export const OuterNav = styled.nav`
	${commonNavStyles};
	background-color: #1f7316;
	width: 60%;
	max-width: 300px;
	min-width: 150px;
	transition-delay: ${props => (props.show ? '0s' : '0.4s')};
`;

export const MidNav = styled.nav`
	${commonNavStyles};
	background-color: #23cf73;
	width: 95%;
	transition-delay: ${props => (props.show ? '0.3s' : '0.2s')};
`;

export const InnerNav = styled.nav`
	${commonNavStyles};
	background-color: #1f2833;
	width: 95%;
	padding: 30px;
	position: relative;
	transition-delay: ${props => (props.show ? '0.2s' : '0s')};
`;

export const WordLogo = styled.img`
	width: 95%;
	margin-left: -15px;
	min-height: 60px;
`;

export const NavList = styled.ul`
	list-style-type: none;
	padding: 0;
`;

export const NavItem = styled.li`margin: 10px 0;`;

export const NavItemLink = styled(NavLink)`
	font-size: 1.3rem;
	color: #4ad970;
`;
