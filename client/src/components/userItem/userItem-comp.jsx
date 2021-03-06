import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { UserItemContainer, UserInfo } from './userItem-styles';

const UserItem = ({ id, displayName, profileImg, lastMsg, smallImg, toProfile }) => {
	const [ redirect, setRedirect ] = useState(false);

	const placeholderImg =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4OAk-MLppYkLsLq61kJlFyTcEUBYRFUHaw&usqp=CAU';

	if (redirect && toProfile) return <Redirect to={`/users/${id}`} />;
	if (redirect && !toProfile) return <Redirect to={`/chat/${id}`} />;
	return (
		<UserItemContainer smallImg={smallImg} onClick={() => setRedirect(true)}>
			<img src={profileImg || placeholderImg} alt="user-img" />
			<UserInfo>
				<h3 className="name">{displayName}</h3>
				{lastMsg ? <span>{lastMsg}</span> : null}
			</UserInfo>
		</UserItemContainer>
	);
};

export default UserItem;
