import React from 'react';
import { useHistory } from 'react-router-dom';

import { Title, SongTrackContainer, TrackInfo } from './songTrack-styles';

const SongTrack = ({ track }) => {
	const { artists, title, albumImageUrl, uri } = track;
	const history = useHistory();

	const handleClick = () => {
		history.push(`/${uri}&${artists[0]}&${title}`);
	};

	const artistsString =
		artists.length === 1 ? artists[0] : artists.reduce((acc, artist) => acc + artist + ' , ', '').slice(0, -3);

	return (
		<SongTrackContainer onClick={handleClick}>
			<img src={albumImageUrl} alt="img" />
			<TrackInfo>
				<Title>{title}</Title>
				<span style={{ color: 'whitesmoke' }}>{artistsString}</span>
			</TrackInfo>
		</SongTrackContainer>
	);
};

export default SongTrack;
