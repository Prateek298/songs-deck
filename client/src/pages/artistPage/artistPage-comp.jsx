import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ArtistPageContainer, ModalPlaylistName } from './artistPage-styles';

import { UserContext } from '../../contexts';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';
import useModifyPlaylist from '../../customHooks/useModifyPlaylist';
import { getArtistAlbums, getArtistTopTracks } from '../../spotify-utils/artists';

import Modal from '../../components/modal/modal-comp';
import BrowseList from '../../components/browseList/browseList-comp';
import SongTrack from '../../components/songTrack/songTrack-comp';

const ArtistPage = () => {
	const [ albums, setAlbums ] = useState([]);
	const [ topTracks, setTopTracks ] = useState([]);
	const { artistId } = useParams();
	const { accessToken, currentUserId } = useContext(UserContext);

	const playlists = useFetchPlaylists(currentUserId);
	const { openModal, setOpenModal, trackUri, modifyPlaylist, longPress } = useModifyPlaylist();

	useEffect(
		() => {
			if (!accessToken) return;

			getArtistAlbums(artistId).then(res => setAlbums(res));
			getArtistTopTracks(artistId, 'IN').then(res => setTopTracks(res));
		},
		[ accessToken, artistId ]
	);

	return (
		<ArtistPageContainer>
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

			<h1>{albums.length ? albums[0].owner.display_name : ''}</h1>
			<div className="top-tracks">
				<h2>Top Tracks</h2>
				{topTracks.slice(0, 5).map((track, idx) => (
					<div className="ranked-track" key={idx}>
						<span>{idx + 1}.</span>
						<SongTrack key={track.uri} track={track} {...longPress} />
					</div>
				))}
			</div>
			<BrowseList by="alb" items={albums} />
		</ArtistPageContainer>
	);
};

export default ArtistPage;
