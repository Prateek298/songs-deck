import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import PlaylistsCollection from '../../components/playlistsCollection/playlistsCollection-comp';
import Playlist from '../../components/playlist/playlist-comp';

const PlaylistPage = () => {
	const match = useRouteMatch('/:userId/playlists');
	return (
		<div style={{ height: 'calc(100% - 60px - 20px)' }}>
			<Route exact path={`${match.path}`} component={PlaylistsCollection} />
			<Route path={`${match.path}/:playlistId`} component={Playlist} />
		</div>
	);
};

export default PlaylistPage;
