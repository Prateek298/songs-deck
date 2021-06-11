import React, { useState } from 'react';

import {
	NavHamburger,
	NavClose,
	OuterNav,
	MidNav,
	InnerNav,
	NavList,
	NavItemLink,
	NavItem,
	WordLogo
} from './sideNav-styles';
import logo2 from '../../assets/word-logo.png';

const SideNav = ({ userId }) => {
	const [ show, setShow ] = useState(false);

	const openNav = () => setShow(true);
	const closeNav = () => setShow(false);

	return (
		<div>
			<NavHamburger onClick={openNav}>&#9776;</NavHamburger>
			<OuterNav show={show}>
				<MidNav show={show}>
					<InnerNav show={show}>
						<WordLogo src={logo2} />
						<NavClose onClick={closeNav}>&times;</NavClose>
						<NavList>
							<NavItem onClick={closeNav}>
								<NavItemLink to="/">HOME</NavItemLink>
							</NavItem>
							<NavItem onClick={closeNav}>
								<NavItemLink to="/search">SEARCH</NavItemLink>
							</NavItem>
							<NavItem onClick={closeNav}>
								<NavItemLink to={`/${userId}/playlists`}>PLAYLISTS</NavItemLink>
							</NavItem>
							<NavItem onClick={closeNav}>
								<NavItemLink to="/chat">CHAT</NavItemLink>
							</NavItem>
						</NavList>
					</InnerNav>
				</MidNav>
			</OuterNav>
		</div>
	);
};

export default SideNav;
