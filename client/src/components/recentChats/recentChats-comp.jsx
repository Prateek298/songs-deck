import React, { useState, useContext, useEffect } from 'react';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { RecentChatContainer } from './recentChats-styles';

import { firestore, populateRecentChats } from '../../firebase';
import useSearch from '../../customHooks/useSearch';
import { UserContext } from '../../contexts';

import SearchBox from '../searchBox/searchBox-comp';
import BrowseList from '../browseList/browseList-comp';

const RecentChats = () => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ recent, setRecent ] = useState([]);
	const { currentUserId } = useContext(UserContext);

	const searchResults = useSearch(searchTerm, 'user');
	const [ userData, userLoading ] = useDocumentData(firestore.doc(`users/${currentUserId}`));

	useEffect(
		() => {
			if (!userLoading) {
				// populate recent chat user's id with there corresponding data
				populateRecentChats(userData.recentChats.reverse()).then(res => setRecent(res));
			}

			return () => setRecent([]);
		},
		[ userData, userLoading ]
	);

	return (
		<RecentChatContainer>
			<SearchBox searchTerm={searchTerm} handleChange={e => setSearchTerm(e.target.value)} margin="0 auto 10px" />
			{searchTerm.length ? (
				<BrowseList by="user" items={searchResults} />
			) : (
				<BrowseList by="rc" items={recent} showTitle />
			)}
		</RecentChatContainer>
	);
};

export default RecentChats;
