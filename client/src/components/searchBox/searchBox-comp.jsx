import React from 'react';

import { SearchInput } from './searchBox-styles';

const SearchBox = ({ searchTerm, handleChange }) => {
	return (
		<SearchInput
			type="search"
			placeholder="&#128270; Search songs or artists"
			value={searchTerm}
			onChange={handleChange}
		/>
	);
};

export default SearchBox;
