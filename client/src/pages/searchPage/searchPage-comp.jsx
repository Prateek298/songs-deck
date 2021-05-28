import React, { useState } from 'react';

import { SearchPageContainer, SearchResContainer, ModalPlaylistName } from './searchPage-styles';

import useSearch from '../../customHooks/useSearch';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';
import useAddToPlaylist from '../../customHooks/useAddToPlaylist';

import SearchBox from '../../components/searchBox/searchBox-comp';
import SongTrack from '../../components/songTrack/songTrack-comp';
import PlaylistItem from '../../components/playlistItem/playlistItem-comp';
import Modal from '../../components/modal/modal-comp';
import SegmentedSelect from '../../components/segmentedSelect/segmentedSelect-comp';

const SearchPage = ({ accessToken, userId }) => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ filter, setFilter ] = useState('track');

	const searchResults = useSearch(accessToken, searchTerm, filter);
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
