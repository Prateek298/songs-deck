import { spotifyApi } from '../App';

// Get current logged-in user
export const getAuthenticatedUser = async () => {
	try {
		const res = await spotifyApi.getMe();
		return extractUserInfo(res);
	} catch (err) {
		console.error('Error while fetching user data', err);
	}
};

export const getUserById = async userId => {
	try {
		const res = await spotifyApi.getUser(userId);
		return extractUserInfo(res);
	} catch (err) {
		console.error('Error while fetching user data', err);
	}
};

function extractUserInfo(res) {
	const { id, email, display_name, images, country, followers } = res.body;
	return {
		currentUserId: id,
		email,
		displayName: display_name,
		profileImg: images[0].url,
		followersCount: followers.total,
		country
	};
}

export const getUserTopTracks = async () => {
	try {
		const { body } = await spotifyApi.getMyTopTracks({ time_range: 'long_term', limit: 10 });
		return mapOverTracks(body.items);
	} catch (err) {
		console.error('Error fetching user top tracks');
	}
};

function mapOverTracks(items) {
	return items.map(item => {
		const { artists, name, album, uri } = item;
		return {
			artists: artists.map(artist => artist.name),
			title: name,
			albumImageUrl: album.images[2].url,
			albumName: album.album_type !== 'single' ? album.name : album.album_type,
			uri
		};
	});
}
