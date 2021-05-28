import { spotifyApi } from '../App';

export const getSearchResultsByPlaylists = async (searchTerm, cancelRequest) => {
	try {
		if (cancelRequest) return;

		const res = await spotifyApi.searchPlaylists(searchTerm);
		return mapOverPlaylists(res.body.playlists.items);
	} catch (err) {
		console.error('Error while searching for playlists', err);
	}
};

export const getUserPlaylists = async userId => {
	try {
		const { body: { items } } = await spotifyApi.getUserPlaylists(userId);
		// console.log(items);
		return mapOverPlaylists(items);
	} catch (err) {
		console.log('Error fetching user playlists ', err);
	}
};

function mapOverPlaylists(items) {
	return items.map(playlist => {
		const { id, name, images, uri, tracks, owner } = playlist;
		return {
			id,
			name,
			owner,
			playlistUri: uri,
			playlistImgMedium: images[1],
			playlistImgSmall: images[2],
			totalTracks: tracks.total
		};
	});
}

export const getPlaylistTracks = async playlistId => {
	try {
		const { body } = await spotifyApi.getPlaylist(playlistId);
		return {
			name: body.name,
			tracks: mapOverTracks(body.tracks.items)
		};
	} catch (err) {
		console.log('Could not retrieve playlist info ', err);
	}
};

export const getSearchResultsByTracks = async (searchTerm, cancelRequest) => {
	try {
		if (cancelRequest) return;

		const res = await spotifyApi.searchTracks(searchTerm);
		return mapOverTracks(res.body.tracks.items);
	} catch (err) {
		console.error('Error while searching \n', err);
	}
};

function mapOverTracks(items) {
	return items.map(item => {
		const { artists, name, album, uri } = item.track;
		return {
			artists: artists.map(artist => artist.name),
			title: name,
			albumImageUrl: album.images[2].url,
			albumName: album.album_type !== 'single' ? album.name : album.album_type,
			uri
		};
	});
}
