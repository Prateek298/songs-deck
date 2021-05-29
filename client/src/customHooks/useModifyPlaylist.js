import { useState, useCallback } from 'react';

import { addTracksToPlaylist, removeTracksFromPlaylist } from '../spotify-utils/playlists';

import useLongPress from './useLongPress';

const useModifyPlaylist = () => {
	const [ openModal, setOpenModal ] = useState(false);
	const [ trackUri, setTrackUri ] = useState();

	const handleLongPress = content => {
		setOpenModal(true);
		const uriOfTrack =
			content.parentNode.getAttribute('data-uri') || content.parentNode.parentNode.getAttribute('data-uri');
		setTrackUri(uriOfTrack);
	};
	const memoizedHandleLongPress = useCallback(handleLongPress, []);
	const longPress = useLongPress(memoizedHandleLongPress);

	const modifyPlaylist = (modification, playlistId, trackUris) => {
		if (modification === 'add') {
			addTracksToPlaylist(playlistId, trackUris).then(() => {
				setTrackUri(undefined);
				setOpenModal(false);
			});
		}
		else if (modification === 'remove') {
			removeTracksFromPlaylist(playlistId, trackUris).then(() => {
				setTrackUri(undefined);
				setOpenModal(false);
			});
		}
	};

	return {
		openModal,
		setOpenModal,
		longPress,
		trackUri,
		modifyPlaylist
	};
};

export default useModifyPlaylist;
