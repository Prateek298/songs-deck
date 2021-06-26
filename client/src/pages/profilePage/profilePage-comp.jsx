import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ProfilePageContainer } from './profilePage-styles';

import { SpotifyUserContext } from '../../contexts';

import Profile from '../../components/profile/profile-comp';
import FavouriteTracks from '../../components/favouriteTracks/favouriteTracks-comp';
import PersonalizedData from '../../components/personalizedData/personalizedData-comp';

const ProfilePage = () => {
	const { currentUserId } = useContext(SpotifyUserContext);
	const { userId } = useParams();

	return (
		<ProfilePageContainer>
			<Profile userId={userId} />
			<FavouriteTracks userId={userId} />
			{currentUserId === userId ? <PersonalizedData /> : null}
		</ProfilePageContainer>
	);
};

export default ProfilePage;
