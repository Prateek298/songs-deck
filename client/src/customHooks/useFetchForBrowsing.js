import { useState, useEffect, useContext } from 'react';

import { SpotifyUserContext } from '../contexts';
import { getNewReleases, getFeaturedPlaylists, getRecommendations } from '../spotify-utils/browse';

const useFetchForBrowsing = () => {
	const [ newReleases, setNewReleases ] = useState([]);
	const [ recommendations, setRecommendations ] = useState([]);
	const [ featPlaylists, setFeatPlaylists ] = useState([]);
	const [ completedRequests, setCompletedRequests ] = useState(0);
	const { accessToken } = useContext(SpotifyUserContext);

	useEffect(
		() => {
			if (!accessToken) return;

			getNewReleases().then(res => {
				setNewReleases(res);
				setCompletedRequests(val => val + 1);
			});
			getRecommendations().then(res => {
				setRecommendations(res);
				setCompletedRequests(val => val + 1);
			});
			getFeaturedPlaylists().then(res => {
				setFeatPlaylists(res);
				setCompletedRequests(val => val + 1);
			});
		},
		[ accessToken ]
	);

	return {
		newReleases,
		recommendations,
		featPlaylists,
		isLoading: completedRequests !== 3
	};
};

export default useFetchForBrowsing;
