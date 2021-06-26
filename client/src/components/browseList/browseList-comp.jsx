import React from 'react';

import { BrowseListContainer, ListContainer } from './browseList-styles';

import SongTrack from '../songTrack/songTrack-comp';
import PlaylistItem from '../playlistItem/playlistItem-comp';
import ArtistItem from '../artistItem/artistItem-comp';
import UserItem from '../userItem/userItem-comp';

const BrowseList = ({ by, items, lateral, showTitle, ...otherProps }) => {
	const codeToCriteria = {
		nw: 'New Releases',
		fp: 'Featured Playlists',
		recc: 'You may Like',
		alb: 'Albums',
		st: 'Searched Tracks',
		sp: 'Searched Playlists',
		sa: 'Searched Artists',
		usrp: 'User Playlists',
		pt: 'Playlist Tracks',
		albt: 'Album Tracks',
		user: 'Users',
		rc: 'Recent Chats',
		tt: 'Top Tracks'
	};

	return (
		<BrowseListContainer lateral={lateral} by={by}>
			{showTitle ? (
				<div className="head">
					<h2>{codeToCriteria[by]}</h2>
					<p>&gt;&gt;View More</p>
				</div>
			) : null}
			<ListContainer lateral={lateral} by={by}>
				{(by === 'nw' || by === 'recc' || by === 'tt') &&
					items.map(item => <SongTrack key={item.uri} track={item} vertical showImg hideAlbumName />)}
				{(by === 'st' || by === 'pt') &&
					items.map(item => <SongTrack key={item.uri} track={item} showImg {...otherProps.longPress} />)}
				{by === 'albt' &&
					items.map(item => (
						<SongTrack
							key={item.uri}
							track={{ ...item, artists: otherProps.artists }}
							{...otherProps.longPress}
						/>
					))}

				{by === 'fp' && items.map(item => <PlaylistItem key={item.id} {...item} vertical />)}
				{by === 'alb' && items.map(item => <PlaylistItem key={item.id} {...item} vertical album />)}
				{(by === 'sp' || by === 'usrp') && items.map(item => <PlaylistItem key={item.id} {...item} />)}

				{by === 'sa' && items.map(item => <ArtistItem key={item.id} {...item} />)}

				{by === 'user' && items.map(item => <UserItem key={item.id} id={item.id} {...item.data()} />)}
				{by === 'rc' && items.map(item => <UserItem key={item.userId} id={item.userId} {...item} />)}
			</ListContainer>
		</BrowseListContainer>
	);
};

export default BrowseList;
