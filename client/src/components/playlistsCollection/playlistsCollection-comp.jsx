import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PlaylistsCollectionContainer, PageTitle } from './playlistsCollection-styles';

import { spotifyApi } from '../../App';

import PlaylistItem from '../../components/playlistItem/playlistItem-comp';

const PlaylistsCollection = () => {
	const [ playlists, setPlaylists ] = useState([]);
	const { userId } = useParams();

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
		},
		[ userId ]
	);

	return (
		<PlaylistsCollectionContainer>
			<PageTitle>PlayList Page</PageTitle>
			{playlists.map(playlist => <PlaylistItem key={playlist.id} {...playlist} />)}
		</PlaylistsCollectionContainer>
	);
};

export default PlaylistsCollection;
