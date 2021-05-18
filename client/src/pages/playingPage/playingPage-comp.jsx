import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { PlayingPageContainer, PageTitle, LyricsContainer } from './playingPage-styles';

import Player from '../../components/player/player-comp';

const PlayingPage = ({ accessToken }) => {
	const [ lyrics, setLyrics ] = useState('');
	const { trackId: trackUri, artist, title } = useParams();

	useEffect(() => {
		if(!trackUri) return;

		const getLyrics = async () => {
			try {
				const res = await axios.get('http://localhost:5000/lyrics', { params: { artist, title }});
				setLyrics(res.data.lyrics);
			} catch {
				setLyrics('Lyrics could not fetched');
			}
		}
		getLyrics();
	}, [ artist, title, trackUri ]);

	return (
		<PlayingPageContainer>
			<PageTitle>Playing Now</PageTitle>
			<LyricsContainer>
				{lyrics}
			</LyricsContainer>
			<Player accessToken={accessToken} trackUri={trackUri} />
		</PlayingPageContainer>
	);
};

export default PlayingPage;
