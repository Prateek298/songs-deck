import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { AlbumContainer, PageTitle, ModalPlaylistName } from './album-styles';

import { UserContext } from '../../contexts';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';
import useModifyPlaylist from '../../customHooks/useModifyPlaylist';
import { getAlbumById } from '../../spotify-utils/artists';

import Modal from '../modal/modal-comp';
import SongTrack from '../../components/songTrack/songTrack-comp';

const Album = () => {
	const [ albumInfo, setAlbumInfo ] = useState({
		albumName: '',
		artists: [],
		albumImg: {},
		tracks: []
	});
	const { accessToken, currentUserId } = useContext(UserContext);
	const { albumId } = useParams();

	useEffect(
		() => {
			if (!accessToken) return;

			getAlbumById(albumId).then(res => setAlbumInfo(res));
		},
		[ accessToken, albumId ]
	);

	const { albumName, artists, albumImg, tracks } = albumInfo;
	const playlists = useFetchPlaylists(currentUserId);
	const { openModal, setOpenModal, trackUri, modifyPlaylist, longPress } = useModifyPlaylist();

	return (
		<AlbumContainer>
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
			</Modal>

			<PageTitle>{albumName}</PageTitle>
			<div className="songs-list">
				{tracks.map(track => <SongTrack key={track.uri} track={{ ...track, artists }} {...longPress} />)}
			</div>
		</AlbumContainer>
	);
};

export default Album;
