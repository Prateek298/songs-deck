import React from 'react';

import { SearchInput } from './searchBox-styles';

const SearchBox = ({ searchTerm, handleChange, ...otherProps }) => {
	return (
		<SearchInput
			type="search"
			placeholder="&#128270; Search songs or artists"
			value={searchTerm}
			onChange={handleChange}
			{...otherProps}
		/>
	);
};

export default SearchBox;
