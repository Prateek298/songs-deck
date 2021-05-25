import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { PlaylistsCollectionContainer, PageTitle, AddNew, Plus, RadioOptions } from './playlistsCollection-styles';

import { spotifyApi } from '../../App';
import useFetchPlaylists from '../../customHooks/useFetchPlaylists';

import PlaylistItem from '../../components/playlistItem/playlistItem-comp';
import Modal from '../modal/modal-comp';
import CustomButton from '../customButton/customButton-comp';
import FormInput from '../formInput/formInput-comp';

const PlaylistsCollection = () => {
	const [ openModal, setOpenModal ] = useState(false);
	const { userId } = useParams();
	const playlists = useFetchPlaylists(userId);
	const [ formData, setFormData ] = useState({
		name: '',
		description: '',
		access: '',
		coverImgUrl: ''
	});

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

	return (
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
					<RadioOptions>
						<FormInput
							type="radio"
							name="access"
							value="public"
							handleChange={handleChange}
							label="public"
						/>
						<FormInput
							type="radio"
							name="access"
							value="private"
							handleChange={handleChange}
							label="private"
						/>
					</RadioOptions>
					<CustomButton type="submit" isSolid bg_color="#068c1f" color="#fff">
						CREATE
					</CustomButton>
				</form>
			</Modal>

			<PageTitle>PlayList Page</PageTitle>
			<AddNew onClick={() => setOpenModal(true)}>
				<Plus>+</Plus>
				<span style={{ fontWeight: 'bold', letterSpacing: '1.1px' }}>New Playlist</span>
			</AddNew>
			{playlists.map(playlist => <PlaylistItem key={playlist.id} {...playlist} />)}
		</PlaylistsCollectionContainer>
	);
};

export default PlaylistsCollection;
