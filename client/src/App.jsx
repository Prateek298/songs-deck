import React, { useEffect, useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import './App.css';

import useAuth from './customHooks/useAuth';
import { getAuthenticatedUser } from './spotify-utils/users';
import { UserContext } from './contexts';

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
		profileImg: '',
		accessToken: ''
	});

	useEffect(
		() => {
			if (!accessToken) return;

			spotifyApi.setAccessToken(accessToken);
			getAuthenticatedUser().then(userData => setUserInfo({ ...userData, accessToken }));
		},
		[ accessToken ]
	);

	return (
		<div className="app-container">
			<UserContext.Provider value={userInfo}>
				<Header />
				<Switch>
					<Route exact path="/" render={() => (code ? <UserDashboard /> : <LandingPage />)} />
					<Route exact path="/search" render={() => (accessToken ? <SearchPage /> : <Redirect to="/" />)} />
					<Route
						path="/:trackId&:artist&:title"
						render={() => (accessToken ? <PlayingPage /> : <Redirect to="/" />)}
					/>
					<Route
						path="/:userId/playlists"
						render={() => (accessToken ? <PlaylistPage /> : <Redirect to="/" />)}
					/>
				</Switch>
			</UserContext.Provider>
		</div>
	);
};

export default App;
