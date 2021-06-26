import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';

import { ArtistPageContainer } from './artistPage-styles';
import { Loader } from '../../common-styles';

import { SpotifyUserContext } from '../../contexts';
import useModifyPlaylist from '../../customHooks/useModifyPlaylist';
import { getArtistAlbums, getArtistTopTracks } from '../../spotify-utils/artists';

import AddTrackModal from '../../components/addTrackModal/addTrackModal-comp';
import BrowseList from '../../components/browseList/browseList-comp';
import SongTrack from '../../components/songTrack/songTrack-comp';

const ArtistPage = () => {
	const [ albums, setAlbums ] = useState([]);
	const [ topTracks, setTopTracks ] = useState([]);
	const [ requestsCompleted, setRequestsCompleted ] = useState(0);
	const { artistId } = useParams();
	const { accessToken, country } = useContext(SpotifyUserContext);

	const { longPress, ...passToModalProps } = useModifyPlaylist();

	useEffect(
		() => {
			if (!accessToken) return;

			getArtistAlbums(artistId).then(res => {
				setAlbums(res);
				setRequestsCompleted(val => val + 1);
			});
			getArtistTopTracks(artistId, country).then(res => {
				setTopTracks(res);
				setRequestsCompleted(val => val + 1);
			});
		},
		[ accessToken, artistId, country ]
	);

	return requestsCompleted !== 2 ? (
		<Loader type="bars" color="#06c77a" />
	) : (
		<ArtistPageContainer>
			<AddTrackModal {...passToModalProps} />

			<h1>{albums.length ? albums[0].owner.display_name : ''}</h1>
			<div className="top-tracks">
				<h2>Top Tracks</h2>
				{topTracks.slice(0, 5).map((track, idx) => (
					<div className="ranked-track" key={idx}>
						<span>{idx + 1}.</span>
						<SongTrack key={track.uri} track={track} {...longPress} />
					</div>
				))}
			</div>
			<BrowseList by="alb" items={albums} showTitle lateral />
		</ArtistPageContainer>
	);
};

export default ArtistPage;
