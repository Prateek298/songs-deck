import React, { useState, useContext } from 'react';

import { SearchPageContainer, SearchResContainer, ModalPlaylistName } from './searchPage-styles';

import { UserContext } from '../../contexts';
import useSearch from '../../customHooks/useSearch';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';
import useModifyPlaylist from '../../customHooks/useModifyPlaylist';

import SearchBox from '../../components/searchBox/searchBox-comp';
import SongTrack from '../../components/songTrack/songTrack-comp';
import PlaylistItem from '../../components/playlistItem/playlistItem-comp';
import Modal from '../../components/modal/modal-comp';
import SegmentedSelect from '../../components/segmentedSelect/segmentedSelect-comp';

const SearchPage = ({ accessToken }) => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ filter, setFilter ] = useState('track');
	const currentUser = useContext(UserContext);

	const searchResults = useSearch(accessToken, searchTerm, filter);
	const userPlaylists = useFetchPlaylists(currentUser.id);
	const { openModal, setOpenModal, trackUri, modifyPlaylist, longPress } = useModifyPlaylist();

	return (
		<SearchPageContainer>
			<Modal open={openModal} setOpen={setOpenModal} addClose>
				<h3>Add to Playlist</h3>
				<hr style={{ margin: '10px 0' }} />
				{userPlaylists.map(playlist => (
					<ModalPlaylistName key={playlist.id} onClick={() => modifyPlaylist('add', playlist.id, [ trackUri ])}>
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
						filter === 'playlist' && searchResults.map(playlist => <PlaylistItem key={playlist.id} {...playlist} />)
					}	
				</SearchResContainer>
			) : (
				<SegmentedSelect category="Search By:" inputName="filter" valueList={[ 'track', 'playlist' ]} categoryState={filter} setCategoryState={setFilter} />
			)}
		</SearchPageContainer>
	);
};

export default SearchPage;
