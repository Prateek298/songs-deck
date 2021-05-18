import React from 'react';

import { LandingPageContainer, LandingHeading, LandingText } from './landingPage-styles';

import CustomButton from '../../components/customButton/customButton-comp';

const AUTH_URL =
	'https://accounts.spotify.com/authorize?client_id=2e8fb2e6ac3f4263a0723091d84e3f8a&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state';

const LandingPage = () => {
	return (
		<LandingPageContainer>
			<LandingHeading>SongsDeck</LandingHeading>
			<LandingText>Immerse in the music you love and let those beats stay with you a little longer</LandingText>
			<CustomButton as="a" href={AUTH_URL}>
				SIGN IN
			</CustomButton>
		</LandingPageContainer>
	);
};

export default LandingPage;
