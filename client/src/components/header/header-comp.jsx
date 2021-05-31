import React, { useContext } from 'react';

import { HeaderContainer, LogoContainer, ProfileImgContainer, PremiumLink } from './header-styles';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import { UserContext } from '../../contexts';

import SideNav from '../sideNav/sideNav-comp';

const Header = () => {
	const { currentUserId, profileImg } = useContext(UserContext);
	return (
		<HeaderContainer>
			<SideNav userId={currentUserId} />
			<LogoContainer to="/">
				<Logo />
			</LogoContainer>
			{profileImg ? (
				<ProfileImgContainer>
					<img src={profileImg} className="profile-img" alt="User Img" />
				</ProfileImgContainer>
			) : (
				<PremiumLink href="https://www.spotify.com/in-en/premium/">PREMIUM</PremiumLink>
			)}
		</HeaderContainer>
	);
};

export default Header;
