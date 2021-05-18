import React from 'react';
import { useHistory } from 'react-router-dom';

import { Title, SearchItemContainer, TrackInfo } from './searchItem-styles';

const SearchItem = ({ track }) => {
	const { artist, title, albumUrl, uri } = track;
	const history = useHistory();

	const handleClick = () => {
		history.push(`/${uri}&${artist}&${title}`);
	};

	return (
		<SearchItemContainer onClick={handleClick}>
			<img src={albumUrl} alt="img" />
			<TrackInfo>
				<Title>{title}</Title>
				<span style={{ color: 'whitesmoke' }}>{artist}</span>
			</TrackInfo>
		</SearchItemContainer>
	);
};

export default SearchItem;
