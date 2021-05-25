import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PlaylistContainer, PageTitle, SongsList, ModalPlaylistName } from './playlist-styles';

import { spotifyApi } from '../../App';

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
			const getPlaylistInfo = async () => {
				try {
					const { body } = await spotifyApi.getPlaylist(playlistId);
					setPlaylistName(body.name);
					setPlaylistTracks(
						body.tracks.items.map(item => {
							const { album, artists, name, uri } = item.track;
							return {
								title: name,
								artists: artists.map(artist => artist.name),
								albumName: album.album_type !== 'single' ? album.name : album.album_type,
								albumImageUrl: album.images[2].url,
								uri
							};
						})
					);
				} catch (err) {
					console.log('Could not retrieve playlist info ', err);
				}
			};
			getPlaylistInfo();

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
