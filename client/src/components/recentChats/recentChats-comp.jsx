import React, { useState } from 'react';

import { RecentChatContainer } from './recentChats-styles';

import useSearch from '../../customHooks/useSearch';

import SearchBox from '../searchBox/searchBox-comp';
import BrowseList from '../browseList/browseList-comp';

const RecentChats = () => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const searchResults = useSearch(searchTerm, 'user');

	return (
		<RecentChatContainer>
			<SearchBox searchTerm={searchTerm} handleChange={e => setSearchTerm(e.target.value)} />
			{searchTerm.length ? <BrowseList by="user" items={searchResults} /> : <h3>Recent chats</h3>}
		</RecentChatContainer>
	);
};

export default RecentChats;
