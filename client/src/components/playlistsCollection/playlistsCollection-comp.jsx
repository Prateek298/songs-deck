import React, { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { PlaylistsCollectionContainer, AddNew } from './playlistsCollection-styles';
import { Loader } from '../../common-styles';

import { spotifyApi } from '../../App';
import { SpotifyUserContext } from '../../contexts';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';

import BrowseList from '../browseList/browseList-comp';
import Modal from '../modal/modal-comp';
import SegmentedSelect from '../segmentedSelect/segmentedSelect-comp';
import CustomButton from '../customButton/customButton-comp';
import FormInput from '../formInput/formInput-comp';

const PlaylistsCollection = ({ location: { visitedUser } }) => {
	const [ openModal, setOpenModal ] = useState(false);
	const { userId } = useParams();
	const [ formData, setFormData ] = useState({
		name: '',
		description: '',
		access: 'public',
		coverImgUrl: ''
	});
	const { displayName, currentUserId } = useContext(SpotifyUserContext);

	const playlists = useFetchPlaylists(userId);

	// const encodeImgFileAsUrl = imgFile => {
	// 	const file = imgFile.files[0];
	// 	const reader = new FileReader();
	// 	reader.onloadend = function() {
	// 		setFormData({ ...formData, coverImgUrl: reader.result });
	// 	};
	// 	reader.readAsDataURL(file);
	// };

	const handleChange = e => {
		const { name, value } = e.target;
		// if (name === 'coverImgUrl') {
		// 	return encodeImgFileAsUrl(e.target);
		// }
		setFormData({ ...formData, [name]: value });
	};

	const createNewPlaylist = async data => {
		try {
			const { name, description, access } = data;
			await spotifyApi.createPlaylist(name, { description, public: access === 'public' });
			// await spotifyApi.uploadCustomPlaylistCoverImage(newPlaylist.body.id, data.coverImgUrl);
		} catch (err) {
			console.error('Could not create new playlist', err);
		}
	};

	const handleSubmit = e => {
		e.preventDefault();
		createNewPlaylist(formData);
		setOpenModal(false);
		setFormData({
			name: '',
			description: '',
			access: '',
			coverImgUrl: ''
		});
	};

	return !playlists.length ? <Loader type="bars" color="#06c77a" /> : (
		<PlaylistsCollectionContainer>
			<Modal open={openModal} setOpen={setOpenModal}>
				<form onSubmit={handleSubmit}>
					<FormInput
						type="text"
						name="name"
						placeholder="Playlist Name"
						handleChange={handleChange}
						height="50px"
					/>
					<FormInput
						type="text"
						name="description"
						placeholder="Description"
						handleChange={handleChange}
						height="50px"
					/>
					{/* <FormInput
						type="file"
						name="coverImgUrl"
						label="Image URL (optional)"
						handleChange={handleChange}
						height="50px"
					/> */}
					<SegmentedSelect category="Access to:" inputName="access" valueList={['public', 'private']} categoryState={formData.access} handleChange={handleChange} forLightBg margin="10px auto"  />
					<CustomButton type="submit" isSolid bg_color="#068c1f" color="#fff">
						CREATE
					</CustomButton>
				</form>
			</Modal>

			<h1 className="title">Playlists by {visitedUser?.id ? visitedUser.display_name : displayName}</h1>
			{currentUserId === userId ? (
				<AddNew onClick={() => setOpenModal(true)}>
					<span className="plus">+</span>
					<span>New Playlist</span>
				</AddNew>
			) : null}
			<BrowseList by="usrp" items={playlists} />
		</PlaylistsCollectionContainer>
	);
};

export default PlaylistsCollection;
