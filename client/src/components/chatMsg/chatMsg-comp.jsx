import React from 'react';
import moment from 'moment';

import { Message } from './chatMsg-styles';

const ChatMsg = ({ msg, fromSender, longPress }) => {
	const { id, text, createdAt } = msg;
	return (
		<Message id={id} fromSender={fromSender} {...(fromSender ? longPress : {})}>
			<p className="msg-text">{text}</p>
			<span className="time">{createdAt ? moment(createdAt.toDate()).format('h:mm a') : ''}</span>
		</Message>
	);
};

export default ChatMsg;
