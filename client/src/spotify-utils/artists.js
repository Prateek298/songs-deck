import { spotifyApi } from '../App';

export const getSearchResultsByArtists = async (searchTerm, cancelRequest) => {
	try {
		if (cancelRequest) return;

		const { body } = await spotifyApi.searchArtists(searchTerm, { limit: 10 });
		return body.artists.items.map(item => {
			const { id, name, images, genres } = item;
			return {
				id,
				name,
				artistImg: images[2],
				genres: genres.length > 3 ? genres.slice(0, 3) : genres
			};
		});
	} catch (err) {
		console.error('Error searching for artists', err);
	}
};

export const getArtistAlbums = async artistId => {
	try {
		const { body } = await spotifyApi.getArtistAlbums(artistId);
		return body.items.map(item => {
			const { artists, id, name, images, total_tracks, uri } = item;
			return {
				id,
				name,
				owner: { id: artists[0].id, display_name: artists[0].name },
				playlistImg: images[2],
				playlistUri: uri,
				totalTracks: total_tracks
			};
		});
	} catch (err) {
		console.error('Error fetching artist info', err);
	}
};

export const getArtistTopTracks = async (artistId, country) => {
	try {
		const { body } = await spotifyApi.getArtistTopTracks(artistId, country);
		return body.tracks.map(track => {
			const { name, album, uri } = track;
			return {
				title: name,
				albumName: album.name,
				uri
			};
		});
	} catch (err) {
		console.error('Error in fetching top tracks', err);
	}
};

export const getAlbumById = async albumId => {
	try {
		const { body } = await spotifyApi.getAlbum(albumId);
		const { name, artists, label, images, copyrights, tracks } = body;
		return {
			albumName: name,
			artists: artists.map(artist => artist.name),
			label,
			albumImg: images[2],
			copyrights,
			tracks: mapOverTracks(tracks.items)
		};
	} catch (err) {
		console.error('Error fetching the album', err);
	}
};

function mapOverTracks(items) {
	return items.map(item => {
		const { name, uri } = item;
		return {
			title: name,
			uri
		};
	});
}
