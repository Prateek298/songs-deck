import { useState, useEffect } from 'react';

import { getSearchResultsByTracks, getSearchResultsByPlaylists } from '../spotify-utils/playlists';

const useSearch = (accessToken, searchTerm, filter) => {
	const [ searchResults, setSearchResults ] = useState([]);

	useEffect(
		() => {
			if (!accessToken) return;
			if (!searchTerm) return;

			let cancelRequest = false;

			if (filter === 'track')
				getSearchResultsByTracks(searchTerm, cancelRequest).then(res => setSearchResults(res));
			else if (filter === 'playlist')
				getSearchResultsByPlaylists(searchTerm, cancelRequest).then(res => setSearchResults(res));

			return () => (cancelRequest = true);
		},
		[ searchTerm, accessToken, filter ]
	);

	return searchResults;
};

export default useSearch;
