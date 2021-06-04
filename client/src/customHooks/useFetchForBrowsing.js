import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../contexts';
import { getNewReleases, getFeaturedPlaylists, getRecommendations } from '../spotify-utils/browse';

const useFetchForBrowsing = () => {
	const [ newReleases, setNewReleases ] = useState([]);
	const [ recommendations, setRecommendations ] = useState([]);
	const [ featPlaylists, setFeatPlaylists ] = useState([]);
	const { accessToken } = useContext(UserContext);

	useEffect(
		() => {
			if (!accessToken) return;

			getNewReleases().then(res => setNewReleases(res));
			getRecommendations().then(res => setRecommendations(res));
			getFeaturedPlaylists().then(res => setFeatPlaylists(res));
			// getCategories().then(res => console.log(res));
		},
		[ accessToken ]
	);

	return {
		newReleases,
		recommendations,
		featPlaylists
	};
};

export default useFetchForBrowsing;
