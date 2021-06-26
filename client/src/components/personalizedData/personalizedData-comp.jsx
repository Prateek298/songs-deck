import React, { useState, useEffect, useContext } from 'react';

import { PersonalizedDataContainer } from './personalizedData-styles';

import { SpotifyUserContext } from '../../contexts';
import { getUserTopTracks } from '../../spotify-utils/users';

import BrowseList from '../browseList/browseList-comp';

const PersonalizedData = () => {
	const [ topTracks, setTopTracks ] = useState([]);
	const { accessToken } = useContext(SpotifyUserContext);

	useEffect(
		() => {
			if (!accessToken) return;

			getUserTopTracks().then(res => setTopTracks(res));
		},
		[ accessToken ]
	);

	return (
		<PersonalizedDataContainer>
			<BrowseList by="tt" items={topTracks} lateral showTitle />
		</PersonalizedDataContainer>
	);
};

export default PersonalizedData;
