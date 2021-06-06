import React from 'react';

import { BrowseListContainer, ListContainer } from './browseList-styles';

import SongTrack from '../songTrack/songTrack-comp';
import PlaylistItem from '../playlistItem/playlistItem-comp';

const BrowseList = ({ by, items }) => {
	const codeToCriteria = {
		nw: 'New Releases',
		fp: 'Featured Playlists',
		recc: 'You may Like',
		alb: 'Albums'
	};

	return (
		<BrowseListContainer>
			<div className="head">
				<h2>{codeToCriteria[by]}</h2>
				<p>&gt;&gt;View More</p>
			</div>
			<ListContainer>
				{(by === 'nw' || by === 'recc') &&
					items.map(item => <SongTrack key={item.uri} track={item} vertical showImg />)}
				{by === 'fp' && items.map(item => <PlaylistItem key={item.id} {...item} vertical />)}
				{by === 'alb' && items.map(item => <PlaylistItem key={item.id} {...item} vertical album />)}
			</ListContainer>
		</BrowseListContainer>
	);
};

export default BrowseList;
