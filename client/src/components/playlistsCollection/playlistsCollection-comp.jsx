import React from 'react';
import { useParams } from 'react-router-dom';

import { PlaylistsCollectionContainer, PageTitle } from './playlistsCollection-styles';

import useFetchPlaylists from '../../customHooks/useFetchPlaylists';

import PlaylistItem from '../../components/playlistItem/playlistItem-comp';

const PlaylistsCollection = () => {
	const { userId } = useParams();
	const playlists = useFetchPlaylists(userId);

	return (
		<PlaylistsCollectionContainer>
			<PageTitle>PlayList Page</PageTitle>
			{playlists.map(playlist => <PlaylistItem key={playlist.id} {...playlist} />)}
		</PlaylistsCollectionContainer>
	);
};

export default PlaylistsCollection;
