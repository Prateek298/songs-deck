import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { PlaylistContainer, PageTitle, SongsList, ModalPlaylistName, RemoveTrack } from './playlist-styles';

import { UserContext } from '../../contexts';
import { getPlaylistTracks } from '../../spotify-utils/playlists';
import { getUserById } from '../../spotify-utils/users';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';
import useModifyPlaylist from '../../customHooks/useModifyPlaylist';

import SongTrack from '../songTrack/songTrack-comp';
import Modal from '../modal/modal-comp';

const Playlist = () => {
	const { playlistId, userId } = useParams();
	const [ playlistTracks, setPlaylistTracks ] = useState([]);
	const [ playlistName, setPlaylistName ] = useState('');
	const [ visitedUser, setVisitedUser ] = useState({});
	const currentUser = useContext(UserContext);

	useEffect(
		() => {
			getPlaylistTracks(playlistId).then(({ name, tracks }) => {
				setPlaylistName(name);
				setPlaylistTracks(tracks);
			});

			return () => setPlaylistTracks([]);
		},
		[ playlistId ]
	);

	useEffect(
		() => {
			if (currentUser.id !== userId) {
				getUserById(userId).then(user => setVisitedUser(user));
			}

			return () => setVisitedUser({});
		},
		[ userId, currentUser ]
	);

	const playlists = useFetchPlaylists(currentUser.id);
	const { openModal, setOpenModal, trackUri, modifyPlaylist, longPress } = useModifyPlaylist();

	return (
		<PlaylistContainer>
			<Modal open={openModal} setOpen={setOpenModal} addClose>
				<h3>Add to Playlist</h3>
				<hr style={{ margin: '10px 0' }} />
				{playlists.map(playlist => (
					<ModalPlaylistName
						key={playlist.id}
						onClick={() => modifyPlaylist('add', playlist.id, [ trackUri ])}
					>
						{playlist.name}
					</ModalPlaylistName>
				))}
				<hr style={{ margin: '10px 0' }} />
				<RemoveTrack onClick={() => modifyPlaylist('remove', playlistId, [ trackUri ])}>
					Remove from Playlist
				</RemoveTrack>
			</Modal>

			<PageTitle>
				{playlistName}
				{currentUser.id !== userId ? (
					<Link to={{ pathname: `/${userId}/playlists`, visitedUser }}> (By {visitedUser.displayName})</Link>
				) : (
					''
				)}
			</PageTitle>
			<SongsList>
				{playlistTracks.map(track => <SongTrack key={track.uri} track={track} {...longPress} />)}
			</SongsList>
		</PlaylistContainer>
	);
};

export default Playlist;
