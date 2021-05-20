import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import './App.css';

import useAuth from './customHooks/useAuth';

import Header from './components/header/header-comp';

import LandingPage from './pages/landingPage/landingPage-comp';
import UserDashboard from './pages/userDashboard/userDashboard-comp';
import SearchPage from './pages/searchPage/searchPage-comp';
import PlayingPage from './pages/playingPage/playingPage-comp';
import PlaylistPage from './pages/playlistPage/playlistPage-comp';

export const spotifyApi = new SpotifyWebApi({
	clientId: '2e8fb2e6ac3f4263a0723091d84e3f8a'
});

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
	const accessToken = useAuth(code);

	const [ userInfo, setUserInfo ] = useState({
		id: '',
		displayName: '',
		profileImg: ''
	});

	useEffect(
		() => {
			if (!accessToken) return;

			spotifyApi.setAccessToken(accessToken);

			const getUserData = async () => {
				const res = await spotifyApi.getMe();
				const { id, display_name, images } = res.body;
				setUserInfo({
					id,
					displayName: display_name,
					profileImg: images[0].url
				});
			};
			getUserData();
		},
		[ accessToken ]
	);

	return (
		<div className="app-container">
			<Header {...userInfo} />
			<Switch>
				<Route
					exact
					path="/"
					render={() =>
						code === null || code === undefined ? (
							<LandingPage />
						) : (
							<UserDashboard accessToken={accessToken} />
						)}
				/>
				<Route
					exact
					path="/search"
					render={() => (accessToken ? <SearchPage accessToken={accessToken} /> : <Redirect to="/" />)}
				/>
				<Route
					path="/:trackId&:artist&:title"
					render={() => (accessToken ? <PlayingPage accessToken={accessToken} /> : <Redirect to="/" />)}
				/>
				<Route
					path="/:userId/playlists"
					render={() => (accessToken ? <PlaylistPage /> : <Redirect to="/" />)}
				/>
			</Switch>
		</div>
	);
};

export default App;
