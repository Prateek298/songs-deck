import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';

import { PlaylistItemContainer, PlaylistInfo, PlaylistName } from './playlistItem-styles';

const PlaylistItem = ({ id, name, playlistImgSmall, playlistUri, totalTracks, owner, path }) => {
	const history = useHistory();
	const match = useRouteMatch('/:userId/playlists');

	const openPlaylist = () => path === 'search' ? history.push(`/${owner.id}/playlists/${id}`) : history.push(`${match.url}/${id}`);

	const placeholderImg = 'data:image/jpeg;base64,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';

	return (
		<PlaylistItemContainer onClick={openPlaylist}>
			<img src={playlistImgSmall?.url || placeholderImg} width="60" alt="img" />
			<PlaylistInfo>
				<PlaylistName>{name}</PlaylistName>
				<p style={{ color: '#f1f1f1d8' }}>{totalTracks} tracks</p>
			</PlaylistInfo>
		</PlaylistItemContainer>
	);
};

export default PlaylistItem;
