const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const lyricsFinder = require('lyrics-finder');

const app = express();

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
	const { code } = req.body;

	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET
	});

	spotifyApi
		.authorizationCodeGrant(code)
		.then(data => {
			const { access_token, refresh_token, expires_in } = data.body;
			res.json({
				accessToken: access_token,
				refreshToken: refresh_token,
				expiresIn: expires_in
			});
		})
		.catch(err => {
			console.log('Post request failed \n', err);
			res.sendStatus(400);
		});
});

app.post('/refresh', (req, res) => {
	const { refreshToken } = req.body;

	const spotifyApi = new SpotifyWebApi({
		redirectUri: process.env.REDIRECT_URI,
		clientId: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		refreshToken
	});

	spotifyApi
		.refreshAccessToken()
		.then(data => {
			const { access_token, expires_in } = data.body;
			res.json({
				accessToken: access_token,
				expiresIn: expires_in
			});
		})
		.catch(err => {
			console.log('Refresh token post request failed \n', err);
			res.sendStatus(400);
		});
});

app.get('/lyrics', async (req, res) => {
	try {
		const { artist, title } = req.query;
		const lyrics = (await lyricsFinder(artist, title)) || 'Lyrics Unavailable';
		res.json({ lyrics });
	} catch (err) {
		console.log('Lyrics fetching failed \n', err);
		res.sendStatus(400);
	}
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port: ${port}`));
