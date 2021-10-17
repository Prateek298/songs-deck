import React from 'react';

import { LandingPageContainer, Header, Overview, Connect, ContentHeading } from './landingPage-styles';

import CustomButton from '../../components/customButton/customButton-comp';

const AUTH_URL =
	'https://accounts.spotify.com/authorize?client_id=2e8fb2e6ac3f4263a0723091d84e3f8a&response_type=code&redirect_uri=http://localhost:3000/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-top-read%20user-library-modify%20user-read-playback-state%20playlist-modify-public%20playlist-modify-private%20ugc-image-upload%20user-modify-playback-state%20user-read-recently-played';

const LandingPage = () => {
	return (
		<LandingPageContainer>
			<Header>
				<div className="header-content">
					<h1>Songs Deck</h1>
					<h4>
						A Spotify based music application which tries to introduce alternative to existing features and
						adds further to the user experience
					</h4>
					<CustomButton as="a" href={AUTH_URL} padding="20px 25px" display="inline-block">
						SIGN IN
					</CustomButton>
				</div>
			</Header>
			<Overview>
				<div className="overview-content">
					<ContentHeading>More to enjoy</ContentHeading>
					<h4>
						Enhanced features of Spotify with various other utilities to give you a better wholesome music
						app experience, right on the web.
					</h4>
				</div>
			</Overview>
			<Connect>
				<div className="connect-content">
					<div className="about-chat">
						<ContentHeading>Talk & Share</ContentHeading>
						<h4>
							With an in-built chat, talk to your friends about the music share love for, or make new
							song-buddies with the other users.
						</h4>
					</div>
					<div className="about-profile">
						<ContentHeading>Express Yourself!</ContentHeading>
						<h4>
							Create your own customised profile, to let others know about your interest. Discover people
							who have similar taste.
						</h4>
					</div>
				</div>
			</Connect>
		</LandingPageContainer>
	);
};

export default LandingPage;
// Immerse in the music you love and let those beats stay with you a little longer
