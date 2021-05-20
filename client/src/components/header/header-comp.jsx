import React from 'react';

import { HeaderContainer, LogoContainer, ImgContainer, ProfileImage, PremiumLink } from './header-styles';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import SideNav from '../sideNav/sideNav-comp';

const Header = ({ id, profileImg }) => {
	return (
		<HeaderContainer>
			<SideNav userId={id} />
			<LogoContainer to="/">
				<Logo />
			</LogoContainer>
			{profileImg ? (
				<ImgContainer>
					<ProfileImage src={profileImg} alt="User Img" />
				</ImgContainer>
			) : (
				<PremiumLink href="https://www.spotify.com/in-en/premium/">PREMIUM</PremiumLink>
			)}
		</HeaderContainer>
	);
};

export default Header;
