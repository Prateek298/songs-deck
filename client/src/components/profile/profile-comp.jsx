import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { ProfileContainer, DescInput } from './profile-styles';

import { SpotifyUserContext } from '../../contexts';
import { firestore, addUserDescription } from '../../firebase';
import { getUserById } from '../../spotify-utils/users';

import CustomButton from '../customButton/customButton-comp';
import Modal from '../modal/modal-comp';

const Profile = ({ userId }) => {
	const { currentUserId, accessToken, ...currentUserData } = useContext(SpotifyUserContext);
	const [ userData, setUserData ] = useState({});
	const [ openModal, setOpenModal ] = useState(false);
	const inputDesc = useRef();

	const [ user, userLoading ] = useDocumentData(firestore.doc(`users/${userId}`));
	const { description } = !userLoading ? user : { description: '' };

	useEffect(
		() => {
			if (!accessToken) return;
			if (currentUserId === userId) {
				setUserData({
					displayName: currentUserData.displayName,
					profileImg: currentUserData.profileImg,
					followersCount: currentUserData.followersCount
				});
			}

			getUserById(userId).then(({ displayName, profileImg, followersCount }) =>
				setUserData({ displayName, profileImg, followersCount })
			);

			return () => setUserData({});
		},
		// eslint-disable-next-line
		[ accessToken, currentUserId, userId ]
	);

	const setDescription = () => {
		addUserDescription(currentUserId, inputDesc.current.value);
		setOpenModal(false);
	};

	return (
		<ProfileContainer>
			<Modal open={openModal} setOpen={setOpenModal} addClose>
				<DescInput ref={inputDesc} defaultValue={description} maxLength="130" />
				<CustomButton isSolid onClick={setDescription} bg_color="green" color="white" padding="10px 20px">
					SET
				</CustomButton>
			</Modal>

			<div className="img-container">
				<img src={userData.profileImg} className="profile-img" alt="user-img" />
			</div>
			<div className="info">
				<h3 className="username">{userData.displayName}</h3>
				<p className="follows">{userData.followersCount} followers</p>
				{description.length ? (
					<p className="desc">{description}</p>
				) : currentUserId === userId ? (
					<CustomButton
						isSolid
						onClick={() => setOpenModal(true)}
						bg_color="green"
						color="white"
						padding="5px"
					>
						Add a description
					</CustomButton>
				) : (
					<p>No description</p>
				)}
				{currentUserId === userId ? (
					<CustomButton isSolid rounded onClick={() => setOpenModal(true)} padding="3px">
						&#9998; Description
					</CustomButton>
				) : (
					<CustomButton rounded isSolid>
						<Link to={`/chat/${userId}`}>Chat</Link>
					</CustomButton>
				)}
			</div>
		</ProfileContainer>
	);
};

export default Profile;
