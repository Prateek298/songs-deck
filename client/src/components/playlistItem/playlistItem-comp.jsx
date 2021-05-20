import React from 'react';

import { PlaylistItemContainer, PlaylistInfo, PlaylistName } from './playlistItem-styles';

const PlaylistItem = ({ id, name, playlistImgSmall, playlistUri, totalTracks }) => {
	return (
		<PlaylistItemContainer>
			<img src={playlistImgSmall.url} alt="img" />
			<PlaylistInfo>
				<PlaylistName>{name}</PlaylistName>
				<p style={{ color: '#f1f1f1d8' }}>{totalTracks} tracks</p>
			</PlaylistInfo>
		</PlaylistItemContainer>
	);
};

export default PlaylistItem;
