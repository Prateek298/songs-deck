import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';

const Player = ({ accessToken, trackUri }) => {
	if (!accessToken) return null;
	const styles = {
		bgColor: '#faecff',
		sliderColor: '#66fcf1',
		sliderHandleColor: '#e06a25',
		trackNameColor: '#11da8d',
		trackArtistColor: '#e61b58',
		activeColor: '#eb4d57',
		color: '#0a52da'
	};
	return (
		<SpotifyPlayer
			token={accessToken}
			autoPlay
			persistDeviceSelection
			showSaveIcon
			magnifySliderOnHover
			uris={trackUri ? [ trackUri ] : []}
			styles={styles}
		/>
	);
};

export default Player;
