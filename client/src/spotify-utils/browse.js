import { spotifyApi } from '../App';

export const getNewReleases = async () => {
	try {
		const { body } = await spotifyApi.getNewReleases({ limit: 10 });
		return mapOverTracks(body.albums.items);
	} catch (err) {
		console.error('Error fetching new releases', err);
	}
};

export const getCategories = async () => {
	try {
		const res = await spotifyApi.getCategories();
		console.log(res.body);
	} catch (err) {
		console.error('Error fetching categories', err);
	}
};

const getSeedsForRecommendations = async () => {
	try {
		const { body } = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 });
		const artistIds = [];
		const trackIds = [];
		body.items.forEach(item => {
			const { artists, id } = item.track;
			artistIds.push(artists[0].id);
			trackIds.push(id);
		});
		return {
			genres: [ 'anime', 'alternative', 'metal', 'pop', 'rock' ],
			artistIds,
			trackIds
		};
	} catch (err) {
		console.error('Error fetching recently played', err);
	}
};

export const getRecommendations = async () => {
	try {
		const { genres, artistIds, trackIds } = await getSeedsForRecommendations();
		const { body } = await spotifyApi.getRecommendations({
			seed_genres: genres[Math.floor(Math.random() * 5)],
			seed_artists: artistIds[Math.floor(Math.random() * 5)],
			seed_tracks: trackIds[Math.floor(Math.random() * 5)],
			limit: 10
		});
		return mapOverTracks(body.tracks);
	} catch (err) {
		console.error('Error fetching recommendations', err);
	}
};

export const getFeaturedPlaylists = async () => {
	try {
		const { body } = await spotifyApi.getFeaturedPlaylists();
		return body.playlists.items.map(item => {
			const { id, images, name, owner, tracks, uri } = item;
			return {
				id,
				name,
				owner,
				playlistImg: images[0],
				totalTracks: tracks.total,
				playlistUri: uri
			};
		});
	} catch (err) {
		console.error('Error fetching featured playlists', err);
	}
};

function mapOverTracks(items) {
	return items.map(item => {
		const { id, artists, name, images, album, uri } = item;
		return {
			id,
			artists: artists.map(artist => artist.name),
			title: name,
			albumImageUrl: images ? images[1].url : album.images[1].url,
			uri
		};
	});
}
