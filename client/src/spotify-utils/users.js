import { spotifyApi } from '../App';

// Get current logged-in user
export const getAuthenticatedUser = async () => {
	try {
		const res = await spotifyApi.getMe();
		const { id, display_name, images } = res.body;
		return {
			id,
			displayName: display_name,
			profileImg: images[0].url
		};
	} catch (err) {
		console.error('Error while fetching user data', err);
	}
};
