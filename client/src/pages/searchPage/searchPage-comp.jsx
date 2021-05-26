import React, { useState, useEffect } from 'react';

import { SearchPageContainer, SearchResContainer, ModalPlaylistName } from './searchPage-styles';

import { spotifyApi } from '../../App';

import useFetchPlaylists from '../../customHooks/useFetchPlaylists';
import useAddToPlaylist from '../../customHooks/useAddToPlaylist';

import SearchBox from '../../components/searchBox/searchBox-comp';
import SongTrack from '../../components/songTrack/songTrack-comp';
import PlaylistItem from '../../components/playlistItem/playlistItem-comp';
import Modal from '../../components/modal/modal-comp';
import SegmentedSelect from '../../components/segmentedSelect/segmentedSelect-comp';

const SearchPage = ({ accessToken, userId }) => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ searchResults, setSearchResults ] = useState();
	const [ filter, setFilter ] = useState('track');

	useEffect(
		() => {
			if (!accessToken) return;
			if (!searchTerm) return setSearchResults([]);

            let cancelRequest = false;
            const getSearchResultsByTracks = async () => {
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
			const getSearchResultsByPlaylists = async () => {
				try {
					const res = await spotifyApi.searchPlaylists(searchTerm);
					const reqInfo = res.body.playlists.items;
					setSearchResults(
						reqInfo.map(playlist => {
							const { id, name, owner, images, uri, tracks } = playlist;
							return {
								id,
								name,
								owner,
								playlistUri: uri,
								playlistImgMedium: images[1],
								playlistImgSmall: images[2],
								totalTracks: tracks.total
							};
						})
					)
				} catch (err) {
					console.error('Error while searching for playlists', err);
				}
			}
			if (filter === 'track') getSearchResultsByTracks();
			else if(filter === 'playlist') getSearchResultsByPlaylists();

            return () => (cancelRequest = true)
		},
		[ searchTerm, accessToken, filter ]
	);

	const playlists = useFetchPlaylists(userId);

	const { openModal, setOpenModal, uriToAdd, addToPlaylist, longPress } = useAddToPlaylist();

	return (
		<SearchPageContainer>
			<Modal open={openModal} setOpen={setOpenModal} addClose>
				<h3>Add to Playlist</h3>
				<hr style={{ margin: '10px 0' }} />
				{playlists.map(playlist => (
					<ModalPlaylistName key={playlist.id} onClick={() => addToPlaylist(playlist.id, [ uriToAdd ])}>
						{playlist.name}
					</ModalPlaylistName>
				))}
			</Modal>

			<SearchBox searchTerm={searchTerm} handleChange={e => setSearchTerm(e.target.value)} />
			{searchResults?.length ? (
				<SearchResContainer>
					{
						filter === 'track' && searchResults.map(track => <SongTrack key={track.uri} track={track} {...longPress} />)
					}
					{
						filter === 'playlist' && searchResults.map(playlist => <PlaylistItem key={playlist.id} path="search" {...playlist} />)
					}	
				</SearchResContainer>
			) : (
				<SegmentedSelect category="Search By:" inputName="filter" valueList={[ 'track', 'playlist' ]} categoryState={filter} setCategoryState={setFilter} />
			)}
		</SearchPageContainer>
	);
};

export default SearchPage;
