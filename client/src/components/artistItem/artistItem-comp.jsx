import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import { ArtistItemContainer, ArtistInfo } from './artistItem-styles';

const ArtistItem = ({ id, name, artistImg, genres }) => {
	const [ redirect, setRedirect ] = useState(false);

	const placeholderImg =
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM4OAk-MLppYkLsLq61kJlFyTcEUBYRFUHaw&usqp=CAU';

	const artistInfo = { name, artistImg, genres };

	if (redirect) return <Redirect to={{ pathname: `/artists/${id}`, artistInfo }} />;
	return (
		<ArtistItemContainer onClick={() => setRedirect(true)}>
			<img src={artistImg?.url || placeholderImg} alt="artist-img" />
			<ArtistInfo>
				<h3 className="name">{name}</h3>
				<span className="genre-list">
					{genres.map(genre => (
						<span className="genre" key={genre}>
							{genre}
						</span>
					))}
				</span>
			</ArtistInfo>
		</ArtistItemContainer>
	);
};

export default ArtistItem;
