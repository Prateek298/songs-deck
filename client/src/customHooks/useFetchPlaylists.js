import { useState, useEffect } from 'react';

import { spotifyApi } from '../App';

const useFetchPlaylists = userId => {
	const [ playlists, setPlaylists ] = useState([]);

	useEffect(
		() => {
			const getUserPlaylists = async () => {
				try {
					const { body: { items } } = await spotifyApi.getUserPlaylists(userId);
					// console.log(items);
					setPlaylists(
						items.map(playlist => {
							const { id, name, images, uri, tracks } = playlist;
							return {
								id,
								name,
								playlistUri: uri,
								playlistImgMedium: images[1],
								playlistImgSmall: images[2],
								totalTracks: tracks.total
							};
						})
					);
				} catch (err) {
					console.log('Error fetching playlists ', err);
				}
			};
			getUserPlaylists();

			return () => setPlaylists([]);
		},
		[ userId ]
	);

	return playlists;
};

export default useFetchPlaylists;
