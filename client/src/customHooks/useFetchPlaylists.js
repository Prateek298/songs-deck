import { useState, useEffect } from 'react';

import { getUserPlaylists } from '../spotify-utils/playlists';

const useFetchPlaylists = userId => {
	const [ playlists, setPlaylists ] = useState([]);

	useEffect(
		() => {
			getUserPlaylists(userId).then(res => setPlaylists(res));
			return () => setPlaylists([]);
		},
		[ userId ]
	);

	return playlists;
};

export default useFetchPlaylists;
