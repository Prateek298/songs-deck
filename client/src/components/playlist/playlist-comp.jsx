import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { PlaylistContainer, PageTitle, SongsList } from './playlist-styles';

import { spotifyApi } from '../../App';

import SongTrack from '../../components/songTrack/songTrack-comp';

const Playlist = () => {
	const { playlistId } = useParams();
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
		},
		[ playlistId ]
	);

	return (
		<PlaylistContainer>
			<PageTitle>{playlistName}</PageTitle>
			<SongsList>{playlistTracks.map(track => <SongTrack key={track.uri} track={track} />)}</SongsList>
		</PlaylistContainer>
	);
};

export default Playlist;
