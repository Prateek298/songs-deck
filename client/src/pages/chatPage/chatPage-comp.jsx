import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import RecentChats from '../../components/recentChats/recentChats-comp';
import Converse from '../../components/converse/converse-comp';

const ChatPage = () => {
	const match = useRouteMatch('/chat');

	return (
		<div style={{ height: 'calc(100% - 60px - 20px)' }}>
			<Route exact path={match.path} component={RecentChats} />
			<Route path={`${match.path}/:chatToId`} component={Converse} />
		</div>
	);
};

export default ChatPage;
