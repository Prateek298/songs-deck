import React from 'react';

import { HeaderContainer, LogoContainer, NavLink } from './header-styles';
import { ReactComponent as Logo } from '../../assets/logo.svg';

const Header = () => {
	return (
		<HeaderContainer>
			<LogoContainer to="/">
				<Logo />
			</LogoContainer>
			<NavLink to="/search">SEARCH</NavLink>
		</HeaderContainer>
	);
};

export default Header;
