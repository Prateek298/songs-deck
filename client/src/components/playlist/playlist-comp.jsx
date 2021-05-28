import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PlaylistContainer, PageTitle, SongsList, ModalPlaylistName } from './playlist-styles';

import { getPlaylistTracks } from '../../spotify-utils/playlists';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';
import useAddToPlaylist from '../../customHooks/useAddToPlaylist';

import SongTrack from '../songTrack/songTrack-comp';
import Modal from '../modal/modal-comp';

const Playlist = () => {
	const { playlistId, userId } = useParams();
	const [ playlistTracks, setPlaylistTracks ] = useState([]);
	const [ playlistName, setPlaylistName ] = useState('');

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

	const playlists = useFetchPlaylists(userId);
	const { openModal, setOpenModal, uriToAdd, addToPlaylist, longPress } = useAddToPlaylist();

	return (
		<PlaylistContainer>
			<Modal open={openModal} setOpen={setOpenModal} addClose>
				<h3>Add to Playlist</h3>
				<hr style={{ margin: '10px 0' }} />
				{playlists.map(playlist => (
					<ModalPlaylistName key={playlist.id} onClick={() => addToPlaylist(playlist.id, [ uriToAdd ])}>
						{playlist.name}
					</ModalPlaylistName>
				))}
			</Modal>

			<PageTitle>{playlistName}</PageTitle>
			<SongsList>
				{playlistTracks.map(track => <SongTrack key={track.uri} track={track} {...longPress} />)}
			</SongsList>
		</PlaylistContainer>
	);
};

export default Playlist;
