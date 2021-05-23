import { useState, useCallback } from 'react';

import { spotifyApi } from '../App';

import useLongPress from './useLongPress';

const useAddToPlaylist = () => {
	const [ openModal, setOpenModal ] = useState(false);
	const [ uriToAdd, setUriToAdd ] = useState();

	const handleLongPress = content => {
		setOpenModal(true);
		const trackUri =
			content.parentNode.getAttribute('data-uri') || content.parentNode.parentNode.getAttribute('data-uri');
		setUriToAdd(trackUri);
	};
	const memoizedHandleLongPress = useCallback(handleLongPress, []);
	const longPress = useLongPress(memoizedHandleLongPress);

	const addToPlaylist = async (playlistId, trackUris) => {
		try {
			await spotifyApi.addTracksToPlaylist(playlistId, trackUris);
			setUriToAdd(undefined);
			setOpenModal(false);
		} catch (err) {
			console.log('Could not add to playlist ', err);
		}
	};

	return {
		openModal,
		setOpenModal,
		longPress,
		uriToAdd,
		addToPlaylist
	};
};

export default useAddToPlaylist;
