import { useState, useEffect, useContext } from 'react';

import { UserContext } from '../contexts';
import { getSearchResultsByTracks, getSearchResultsByPlaylists } from '../spotify-utils/playlists';
import { getSearchResultsByArtists } from '../spotify-utils/artists';
import { getSearchResultsByUsers } from '../firebase';

const useSearch = (searchTerm, filter) => {
	const [ searchResults, setSearchResults ] = useState([]);
	const { accessToken } = useContext(UserContext);

	useEffect(
		() => {
			if (!accessToken) return;
			if (!searchTerm) return;

			let cancelRequest = false;

			if (filter === 'track')
				getSearchResultsByTracks(searchTerm, cancelRequest).then(res => setSearchResults(res));
			else if (filter === 'playlist')
				getSearchResultsByPlaylists(searchTerm, cancelRequest).then(res => setSearchResults(res));
			else if (filter === 'artist')
				getSearchResultsByArtists(searchTerm, cancelRequest).then(res => setSearchResults(res));
			else if (filter === 'user') getSearchResultsByUsers(searchTerm).then(res => setSearchResults(res));

			return () => (cancelRequest = true);
		},
		[ searchTerm, accessToken, filter ]
	);

	return searchResults;
};

export default useSearch;
