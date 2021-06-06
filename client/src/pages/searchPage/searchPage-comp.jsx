import React, { useState, useContext } from 'react';

import { SearchPageContainer, ModalPlaylistName } from './searchPage-styles';

import { UserContext } from '../../contexts';
import useSearch from '../../customHooks/useSearch';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';
import useModifyPlaylist from '../../customHooks/useModifyPlaylist';

import SearchBox from '../../components/searchBox/searchBox-comp';
import SongTrack from '../../components/songTrack/songTrack-comp';
import PlaylistItem from '../../components/playlistItem/playlistItem-comp';
import ArtistItem from '../../components/artistItem/artistItem-comp';
import Modal from '../../components/modal/modal-comp';
import SegmentedSelect from '../../components/segmentedSelect/segmentedSelect-comp';

const SearchPage = () => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ filter, setFilter ] = useState('track');
	const { currentUserId } = useContext(UserContext);

	const searchResults = useSearch(searchTerm, filter);
	const userPlaylists = useFetchPlaylists(currentUserId);
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
				<div className="result-container">
					{
						filter === 'track' && searchResults.map(track => <SongTrack key={track.uri} track={track} showImg {...longPress} />)
					}
					{
						filter === 'playlist' && searchResults.map(playlist => <PlaylistItem key={playlist.id} {...playlist} />)
					}
					{
						filter === 'artist' && searchResults.map(artist => <ArtistItem key={artist.id} {...artist} />)
					}
				</div>
			) : (
				<SegmentedSelect category="Search By:" inputName="filter" valueList={[ 'track', 'playlist', 'artist' ]} categoryState={filter} handleChange={e => setFilter(e.target.value)} margin="20px auto 0" />
			)}
		</SearchPageContainer>
	);
};

export default SearchPage;
