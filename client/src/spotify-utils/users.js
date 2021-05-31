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
	const { id, display_name, images } = res.body;
	return {
		currentUserId: id,
		displayName: display_name,
		profileImg: images[0].url
	};
}
