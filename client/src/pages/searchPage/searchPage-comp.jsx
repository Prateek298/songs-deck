import React, { useState } from 'react';

import { SearchPageContainer } from './searchPage-styles';

import useSearch from '../../customHooks/useSearch';
import useModifyPlaylist from '../../customHooks/useModifyPlaylist';

import SearchBox from '../../components/searchBox/searchBox-comp';
import BrowseList from '../../components/browseList/browseList-comp';
import AddTrackModal from '../../components/addTrackModal/addTrackModal-comp';
import SegmentedSelect from '../../components/segmentedSelect/segmentedSelect-comp';

const SearchPage = () => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ filter, setFilter ] = useState('track');

	const searchResults = useSearch(searchTerm, filter);
	const { longPress, ...passToModalProps } = useModifyPlaylist();

	return (
		<SearchPageContainer>
			<AddTrackModal {...passToModalProps} />

			<SearchBox searchTerm={searchTerm} handleChange={e => setSearchTerm(e.target.value)} />
			{searchResults?.length ? (
				<div className="search-container">
					{
						filter === 'track' && <BrowseList by="st" items={searchResults} longPress={longPress} />
					}
					{
						filter === 'playlist' && <BrowseList by="sp" items={searchResults} />
					}
					{
						filter === 'artist' && <BrowseList by="sa" items={searchResults} />
					}
				</div>
			) : (
				<SegmentedSelect category="Search By:" inputName="filter" valueList={[ 'track', 'playlist', 'artist' ]} categoryState={filter} handleChange={e => setFilter(e.target.value)} margin="20px auto 0" />
			)}
		</SearchPageContainer>
	);
};

export default SearchPage;
