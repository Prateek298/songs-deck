import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AlbumContainer, PageTitle } from './album-styles';

import { UserContext } from '../../contexts';
import useModifyPlaylist from '../../customHooks/useModifyPlaylist';
import { getAlbumById } from '../../spotify-utils/artists';

import AddTrackModal from '../addTrackModal/addTrackModal-comp';
import BrowseList from '../browseList/browseList-comp';

const Album = () => {
	const [ albumInfo, setAlbumInfo ] = useState({
		albumName: '',
		artists: [],
		albumImg: {},
		tracks: []
	});
	const { accessToken } = useContext(UserContext);
	const { albumId } = useParams();

	useEffect(
		() => {
			if (!accessToken) return;

			getAlbumById(albumId).then(res => setAlbumInfo(res));
		},
		[ accessToken, albumId ]
	);

	const { albumName, artists, tracks } = albumInfo;
	const { longPress, ...passToModalProps } = useModifyPlaylist();

	return (
		<AlbumContainer>
			<AddTrackModal {...passToModalProps} />

			<PageTitle>{albumName}</PageTitle>
			<BrowseList by="albt" items={tracks} artists={artists} longPress={longPress} />
		</AlbumContainer>
	);
};

export default Album;
