import React, { useState, useEffect, useContext } from 'react';

import { FavTracksContainer, IdInput } from './favouriteTracks-styles';

import { FirebaseUserContext, SpotifyUserContext } from '../../contexts';
import { firestore, addToFavourites } from '../../firebase';
import { getTracksByIds } from '../../spotify-utils/playlists';

import Modal from '../modal/modal-comp';
import CustomButton from '../customButton/customButton-comp';
import SongTrack from '../songTrack/songTrack-comp';

const FavouriteTracks = ({ userId }) => {
	const { favTracks } = useContext(FirebaseUserContext);
	const { currentUserId, accessToken } = useContext(SpotifyUserContext);
	const [ openModal, setOpenModal ] = useState(false);
	const [ trackIdInput, setTrackIdInput ] = useState({ pos1: '', pos2: '', pos3: '' });
	const [ userFav, setUserFav ] = useState([]);

	useEffect(
		() => {
			if (!accessToken) return;

			const getFavouriteTracksOfCurrentUser = async () => {
				try {
					if (!favTracks.length) return setUserFav([]);

					const filteredFavTracks = favTracks.filter(trackId => trackId);
					const res = await getTracksByIds(filteredFavTracks);
					const [ pos1, pos2, pos3 ] = favTracks;
					setTrackIdInput({ pos1, pos2, pos3 });
					setUserFav(res);
				} catch (err) {
					console.error('Error getting tracks of current user', err);
				}
			};

			const getFavouriteTracksOfOtherUser = async () => {
				try {
					const otherUserSnap = await firestore.doc(`users/${userId}`).get();
					const { favTracks } = otherUserSnap.data();
					if (!favTracks.length) return setUserFav([]);

					const filteredFavTracks = favTracks.filter(trackId => trackId);
					const res = await getTracksByIds(filteredFavTracks);
					setUserFav(res);
				} catch (err) {
					console.error('Error getting tracks of other user', err);
				}
			};

			if (currentUserId === userId) getFavouriteTracksOfCurrentUser();
			else getFavouriteTracksOfOtherUser();
		},
		[ accessToken, favTracks, currentUserId, userId ]
	);

	const handleChange = e => {
		const { name, value } = e.target;
		setTrackIdInput({ ...trackIdInput, [name]: value });
	};

	const handleSubmit = e => {
		e.preventDefault();

		const { pos1, pos2, pos3 } = trackIdInput;
		addToFavourites(currentUserId, [ pos1, pos2, pos3 ]);
		setOpenModal(false);
		setTrackIdInput({ pos1: '', pos2: '', pos3: '' });
	};

	return (
		<FavTracksContainer>
			<Modal open={openModal} setOpen={setOpenModal} addClose>
				<form onSubmit={handleSubmit}>
					<IdInput name="pos1" type="text" onChange={handleChange} value={trackIdInput.pos1} />
					<IdInput name="pos2" type="text" onChange={handleChange} value={trackIdInput.pos2} />
					<IdInput name="pos3" type="text" onChange={handleChange} value={trackIdInput.pos3} />
					<CustomButton isSolid type="submit">
						Submit
					</CustomButton>
				</form>
			</Modal>

			<div className="title">
				<p>Favourite Tracks</p>
				{currentUserId === userId ? <span onClick={() => setOpenModal(true)}>Edit</span> : null}
			</div>
			{!userFav?.length ? currentUserId === userId ? 
				userFav === undefined ? <p>Atleast one wrong track ID provided. Please check.</p> : (
				<CustomButton isSolid onClick={() => setOpenModal(true)} padding="5px">
					Add Favourites
				</CustomButton>
			) : (
				<p className="no-fav-msg">No favourites added yet</p>
			) : (
				<div className="fav-tracks">
					{userFav.map((track, idx) => (
						<div className="ranked-track" key={idx}>
							<span>{idx + 1}.</span>
							<SongTrack key={track.uri} track={track} />
						</div>
					))}
				</div>
			)}
		</FavTracksContainer>
	);
};

export default FavouriteTracks;
