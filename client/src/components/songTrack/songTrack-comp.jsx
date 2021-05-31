import React from 'react';
import { useHistory } from 'react-router-dom';

import { SongTrackContainer, TrackInfo } from './songTrack-styles';

const SongTrack = ({ track, ...longPress }) => {
	const history = useHistory();

	const { artists, title, albumImageUrl, uri } = track;
	const artistsString =
		artists.length === 1 ? artists[0] : artists.reduce((acc, artist) => acc + artist + ' , ', '').slice(0, -3);

	const handleClick = () => history.push(`/${uri}&${artists[0]}&${title}`);

	return (
		<SongTrackContainer data-uri={track.uri} onClick={handleClick} {...longPress}>
			<img src={albumImageUrl} alt="img" />
			<TrackInfo>
				<h4 className="title">{title}</h4>
				<span>{artistsString}</span>
			</TrackInfo>
		</SongTrackContainer>
	);
};

export default SongTrack;
