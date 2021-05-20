import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import PlaylistsCollection from '../playlistsCollection/playlistsCollection-comp';

const PlaylistPage = () => {
	const match = useRouteMatch('/:userId/playlists');
	return (
		<div>
			<Route exact path={`${match.path}`} component={PlaylistsCollection} />
		</div>
	);
};

export default PlaylistPage;
