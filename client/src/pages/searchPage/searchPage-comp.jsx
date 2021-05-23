import React, { useState, useEffect } from 'react';

import { SearchPageContainer, SongsList, ModalPlaylistName } from './searchPage-styles';

import { spotifyApi } from '../../App';

import useFetchPlaylists from '../../customHooks/useFetchPlaylists';
import useAddToPlaylist from '../../customHooks/useAddToPlaylist';

import SearchBox from '../../components/searchBox/searchBox-comp';
import SongTrack from '../../components/songTrack/songTrack-comp';
import Modal from '../../components/modal/modal-comp';

const SearchPage = ({ accessToken, userId }) => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ searchResults, setSearchResults ] = useState();

	useEffect(
		() => {
			if (!accessToken) return;
			if (!searchTerm) return setSearchResults([]);

            let cancelRequest = false;
            const getSearchResults = async () => {
                try {
                    if(cancelRequest) return;
					const res = await spotifyApi.searchTracks(searchTerm);
					const reqInfo = res.body.tracks.items;
                    setSearchResults(reqInfo.map(item => {
						const { artists, name, album, uri } = item;
						return {
							artists: artists.map(artist => artist.name),
							title: name,
							albumImageUrl: album.images[2].url,
							albumName: album.album_type !== 'single' ? album.name : album.album_type,
							uri
						}
                    }))
				} catch (err) {
					console.error('Error while searching \n', err);
				}
			};
			getSearchResults();
            return () => (cancelRequest = true)
		},
		[ searchTerm, accessToken ]
	);

	const handleChange = e => setSearchTerm(e.target.value);

	const playlists = useFetchPlaylists(userId);

	const { openModal, setOpenModal, uriToAdd, addToPlaylist, longPress } = useAddToPlaylist();

	return (
		<SearchPageContainer>
			<Modal open={openModal} setOpen={setOpenModal}>
				<h3>Add to Playlist</h3>
				<hr style={{ margin: '10px 0' }} />
				{playlists.map(playlist => (
					<ModalPlaylistName key={playlist.id} onClick={() => addToPlaylist(playlist.id, [ uriToAdd ])}>
						{playlist.name}
					</ModalPlaylistName>
				))}
			</Modal>

			<SearchBox searchTerm={searchTerm} handleChange={handleChange} />
			{searchResults?.length ? (
				<SongsList>
					{
						searchResults.map(track => <SongTrack key={track.uri} track={track} {...longPress} />)
					}
				</SongsList>
			) : <p>No results found</p>}
		</SearchPageContainer>
	);
};

export default SearchPage;
