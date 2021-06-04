import React from 'react';

import { DashboardContainer } from './userDashboard-styles';

import useFetchForBrowsing from '../../customHooks/useFetchForBrowsing';

import BrowseList from '../../components/browseList/browseList-comp';

const UserDashboard = () => {
	const { newReleases, recommendations, featPlaylists } = useFetchForBrowsing();

	return (
		<DashboardContainer>
			<BrowseList key="nw" by="nw" items={newReleases} />
			<BrowseList key="recc" by="recc" items={recommendations} />
			<BrowseList key="fp" by="fp" items={featPlaylists} />
		</DashboardContainer>
	);
};

export default UserDashboard;
