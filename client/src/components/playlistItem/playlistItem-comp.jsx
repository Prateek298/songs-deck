import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { PlaylistItemContainer, PlaylistInfo, PlaylistName } from './playlistItem-styles';

const PlaylistItem = ({ id, name, playlistImgSmall, playlistUri, totalTracks }) => {
	const history = useHistory();
	const match = useRouteMatch('/:userId/playlists');

	const openPlaylist = () => history.push(`${match.url}/${id}`);

	return (
		<PlaylistItemContainer onClick={openPlaylist}>
			<img src={playlistImgSmall.url} alt="img" />
			<PlaylistInfo>
				<PlaylistName>{name}</PlaylistName>
				<p style={{ color: '#f1f1f1d8' }}>{totalTracks} tracks</p>
			</PlaylistInfo>
		</PlaylistItemContainer>
	);
};

export default PlaylistItem;
