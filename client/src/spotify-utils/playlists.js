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
			playlistImg: images[2],
			totalTracks: tracks.total
		};
	});
}

export const getPlaylistTracks = async playlistId => {
	try {
		const { body } = await spotifyApi.getPlaylist(playlistId);
		return {
			name: body.name,
			tracks: mapOverTracks(body.tracks.items, 'playlistPage')
		};
	} catch (err) {
		console.log('Could not retrieve playlist info ', err);
	}
};

export const getSearchResultsByTracks = async (searchTerm, cancelRequest) => {
	try {
		if (cancelRequest) return;

		const res = await spotifyApi.searchTracks(searchTerm);
		return mapOverTracks(res.body.tracks.items, 'searchPage');
	} catch (err) {
		console.error('Error while searching \n', err);
	}
};

export const getTracksByIds = async trackIds => {
	try {
		const { body } = await spotifyApi.getTracks(trackIds);
		return mapOverTracks(body.tracks, 'favourites');
	} catch (err) {
		console.log('Error fetching tracks', err);
	}
};

function mapOverTracks(items, calledFrom) {
	return items.map(item => {
		const { artists, name, album, uri } = [ 'searchPage', 'favourites' ].includes(calledFrom) ? item : item.track;
		return {
			artists: artists.map(artist => artist.name),
			title: name,
			albumImageUrl: album.images[2].url,
			albumName: album.album_type !== 'single' ? album.name : album.album_type,
			uri
		};
	});
}

export const addTracksToPlaylist = async (playlistId, trackUris) => {
	try {
		await spotifyApi.addTracksToPlaylist(playlistId, trackUris);
	} catch (err) {
		console.error('Error removing tracks from playlist', err);
	}
};

export const removeTracksFromPlaylist = async (playlistId, trackUris) => {
	try {
		const reqFormatUris = [ { uri: trackUris[0] } ];
		await spotifyApi.removeTracksFromPlaylist(playlistId, reqFormatUris);
	} catch (err) {
		console.error('Error removing tracks from playlist', err);
	}
};

export const getPlaylistsForCategory = async category => {
	try {
		const res = await spotifyApi.getPlaylistsForCategory(category, { limit: 5 });
		console.log(res);
	} catch (err) {
		console.error('Error fetching new releases', err);
	}
};
