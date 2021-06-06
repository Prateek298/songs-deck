import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { SongTrackContainer, TrackInfo } from './songTrack-styles';

const SongTrack = ({ track, vertical, showImg, ...longPress }) => {
	const [ redirect, setRedirect ] = useState(false);

	const { artists, title, albumImageUrl, albumName, uri } = track;
	const artistsString = artists
		? artists.length === 1 ? artists[0] : artists.reduce((acc, artist) => acc + artist + ' , ', '').slice(0, -3)
		: '';

	if (redirect) return <Redirect to={`/${uri}&${artists[0]}&${title}`} />;
	return (
		<SongTrackContainer
			data-uri={track.uri}
			onClick={() => setRedirect(true)}
			vertical={vertical}
			{...(longPress ? { ...longPress } : null)}
		>
			{showImg ? <img src={albumImageUrl} alt="img" width={vertical ? '120' : '90'} /> : null}
			<TrackInfo>
				<h3 className="title">{vertical ? title.length > 18 ? `${title.slice(0, 18)}...` : title : title}</h3>
				<span className="album">{albumName}</span>
				{artists ? (
					<span className="artist">
						{vertical ? artistsString.length > 18 ? (
							`${artistsString.slice(0, 18)}...`
						) : (
							artistsString
						) : (
							artistsString
						)}
					</span>
				) : null}
			</TrackInfo>
		</SongTrackContainer>
	);
};

export default SongTrack;
