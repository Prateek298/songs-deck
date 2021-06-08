import React from 'react';

import { Loader, PageContainer } from '../../common-styles';

import useFetchForBrowsing from '../../customHooks/useFetchForBrowsing';

import BrowseList from '../../components/browseList/browseList-comp';

const UserDashboard = () => {
	const { newReleases, recommendations, featPlaylists, isLoading } = useFetchForBrowsing();

	return isLoading ? (
		<Loader type="bars" color="#06c77a" />
	) : (
		<PageContainer>
			<BrowseList key="nw" by="nw" items={newReleases} showTitle lateral />
			<BrowseList key="recc" by="recc" items={recommendations} showTitle lateral />
			<BrowseList key="fp" by="fp" items={featPlaylists} showTitle lateral />
		</PageContainer>
	);
};

export default UserDashboard;
