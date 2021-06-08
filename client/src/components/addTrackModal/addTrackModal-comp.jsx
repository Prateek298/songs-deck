import React, { useContext } from 'react';

import { ModalPlaylistName, RemoveTrack } from './addTrackModal-styles';

import { UserContext } from '../../contexts';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';

import Modal from '../modal/modal-comp';

const AddTrackModal = ({ openModal, setOpenModal, trackUri, modifyPlaylist, playlistId, removeBtn }) => {
	const { currentUserId } = useContext(UserContext);

	const playlists = useFetchPlaylists(currentUserId);

	return (
		<Modal open={openModal} setOpen={setOpenModal} addClose>
			<h3>Add to Playlist</h3>
			<hr style={{ margin: '10px 0' }} />
			{playlists.map(playlist => (
				<ModalPlaylistName key={playlist.id} onClick={() => modifyPlaylist('add', playlist.id, [ trackUri ])}>
					{playlist.name}
				</ModalPlaylistName>
			))}
			{removeBtn ? (
				<div>
					<hr style={{ margin: '10px 0' }} />
					<RemoveTrack onClick={() => modifyPlaylist('remove', playlistId, [ trackUri ])}>
						Remove from Playlist
					</RemoveTrack>
				</div>
			) : null}
		</Modal>
	);
};

export default AddTrackModal;
