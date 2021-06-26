import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { PlaylistContainer, PageTitle } from './playlist-styles';
import { Loader } from '../../common-styles';

import { SpotifyUserContext } from '../../contexts';
import { getPlaylistTracks } from '../../spotify-utils/playlists';
import useModifyPlaylist from '../../customHooks/useModifyPlaylist';

import AddTrackModal from '../addTrackModal/addTrackModal-comp';
import BrowseList from '../browseList/browseList-comp';

const Playlist = ({ location: { visitedUser } }) => {
	const { playlistId, userId } = useParams();
	const [ playlistTracks, setPlaylistTracks ] = useState([]);
	const [ playlistName, setPlaylistName ] = useState('');
	const { currentUserId, accessToken } = useContext(SpotifyUserContext);

	useEffect(
		() => {
			if (!accessToken) return;

			getPlaylistTracks(playlistId).then(({ name, tracks }) => {
				setPlaylistName(name);
				setPlaylistTracks(tracks);
			});

			return () => setPlaylistTracks([]);
		},
		[ accessToken, playlistId ]
	);

	const { longPress, ...passToModalProps } = useModifyPlaylist();

	return !playlistTracks.length ? (
		<Loader type="bars" color="#06c77a" />
	) : (
		<PlaylistContainer>
			<AddTrackModal {...passToModalProps} playlistId={playlistId} removeBtn />

			<PageTitle>
				{playlistName}
				{currentUserId !== userId ? (
					<Link to={{ pathname: `/${userId}/playlists`, visitedUser }}> (By {visitedUser.display_name})</Link>
				) : (
					''
				)}
			</PageTitle>
			<BrowseList by="pt" items={playlistTracks} longPress={longPress} />
		</PlaylistContainer>
	);
};

export default Playlist;
