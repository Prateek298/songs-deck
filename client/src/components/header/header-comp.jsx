import React, { useContext } from 'react';

import { HeaderContainer, LogoContainer, ProfileImgContainer, PremiumLink } from './header-styles';
import { ReactComponent as Logo } from '../../assets/logo.svg';

import { SpotifyUserContext } from '../../contexts';

import SideNav from '../sideNav/sideNav-comp';

const Header = () => {
	const { currentUserId, profileImg } = useContext(SpotifyUserContext);
	return (
		<HeaderContainer>
			<SideNav userId={currentUserId} />
			<LogoContainer to="/">
				<Logo />
			</LogoContainer>
			{profileImg ? (
				<ProfileImgContainer to={`/users/${currentUserId}`}>
					<img src={profileImg} className="profile-img" alt="User Img" />
				</ProfileImgContainer>
			) : (
				<PremiumLink href="https://www.spotify.com/in-en/premium/">PREMIUM</PremiumLink>
			)}
		</HeaderContainer>
	);
};

export default Header;
