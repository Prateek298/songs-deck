import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { SongTrackContainer, TrackInfo } from './songTrack-styles';

const SongTrack = ({ track, vertical, ...longPress }) => {
	const [ redirect, setRedirect ] = useState(false);

	const { artists, title, albumImageUrl, uri } = track;
	const artistsString =
		artists.length === 1 ? artists[0] : artists.reduce((acc, artist) => acc + artist + ' , ', '').slice(0, -3);

	if (redirect) return <Redirect to={`/${uri}&${artists[0]}&${title}`} />;
	return (
		<SongTrackContainer
			data-uri={track.uri}
			onClick={() => setRedirect(true)}
			vertical={vertical}
			{...(longPress ? { ...longPress } : null)}
		>
			<img src={albumImageUrl} alt="img" width={vertical ? '120' : '60'} />
			<TrackInfo>
				<h4 className="title">{title.length > 18 ? `${title.slice(0, 18)}...` : title}</h4>
				<span>{artistsString.length > 18 ? `${artistsString.slice(0, 18)}...` : artistsString}</span>
			</TrackInfo>
		</SongTrackContainer>
	);
};

export default SongTrack;
