import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { UserItemContainer, UserInfo } from './userItem-styles';

const UserItem = ({ id, displayName, profileImg, smallImg, toProfile, showLastMsg }) => {
	const [ redirect, setRedirect ] = useState(false);

	const placeholderImg =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4OAk-MLppYkLsLq61kJlFyTcEUBYRFUHaw&usqp=CAU';

	const decideRedirect = () => {
		if (toProfile) return;
		setRedirect(true);
	};

	if (redirect) return <Redirect to={`/chat/${id}`} />;
	return (
		<UserItemContainer smallImg={smallImg} onClick={decideRedirect}>
			<img src={profileImg || placeholderImg} alt="user-img" />
			<UserInfo>
				<h3 className="name">{displayName}</h3>
				{showLastMsg ? <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, porro.</span> : null}
			</UserInfo>
		</UserItemContainer>
	);
};

export default UserItem;
