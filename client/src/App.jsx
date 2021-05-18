import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import SpotifyWebApi from 'spotify-web-api-node';

import './App.css';

import useAuth from './customHooks/useAuth';

import Header from './components/header/header-comp';

import LandingPage from './pages/landingPage/landingPage-comp';
import UserDashboard from './pages/userDashboard/userDashboard-comp';
import SearchPage from './pages/searchPage/searchPage-comp';
import PlayingPage from './pages/playingPage/playingPage-comp';

export const spotifyApi = new SpotifyWebApi({
	clientId: '2e8fb2e6ac3f4263a0723091d84e3f8a'
});

const code = new URLSearchParams(window.location.search).get('code');

const App = () => {
	const accessToken = useAuth(code);

	useEffect(
		() => {
			if (!accessToken) return;
			spotifyApi.setAccessToken(accessToken);
		},
		[ accessToken ]
	);

	return (
		<div className="app-container">
			<Header />
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
			</Switch>
		</div>
	);
};

export default App;
