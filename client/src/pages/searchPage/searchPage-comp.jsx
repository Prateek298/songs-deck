import React, { useState, useEffect } from 'react';

import { SearchPageContainer, SongsList } from './searchPage-styles';

import { spotifyApi } from '../../App';

import SearchBox from '../../components/searchBox/searchBox-comp';
import SearchItem from '../../components/searchItem/searchItem-comp';

const SearchPage = ({ accessToken }) => {
	const [ searchTerm, setSearchTerm ] = useState('');
	const [ searchResults, setSearchResults ] = useState();

	useEffect(
		() => {
			if (!accessToken) return;
			if (!searchTerm) return setSearchResults([]);

            let cancelRequest = false;
            const getSearchResults = async () => {
                try {
                    if(cancelRequest) return;
					const res = await spotifyApi.searchTracks(searchTerm);
					const reqInfo = res.body.tracks.items;
                    setSearchResults(reqInfo.map(item => {
                        const smallestAlbumImage = item.album.images.reduce(
                            (smallest, image) => {
                              if (image.height < smallest.height) return image
                              return smallest
                            },
                            item.album.images[0]
                          )
                
                          return {
                            artist: item.artists[0].name,
                            title: item.name,
                            uri: item.uri,
                            albumUrl: smallestAlbumImage.url,
                          }
                    }))
				} catch (err) {
					console.error('Error while searching \n', err);
				}
			};
			getSearchResults();
            return () => (cancelRequest = true)
		},
		[ searchTerm, accessToken ]
	);

	const handleChange = e => setSearchTerm(e.target.value);

	return (
		<SearchPageContainer>
			<SearchBox searchTerm={searchTerm} handleChange={handleChange} />
			{searchResults?.length ? (
				<SongsList>
					{
						searchResults.map(track => <SearchItem key={track.uri} track={track} />)
					}
				</SongsList>
			) : <p>No results found</p>}
		</SearchPageContainer>
	);
};

export default SearchPage;
