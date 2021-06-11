import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';

import { ConversationContainer, MsgContainer, SendMsgContainer, MsgInput, SendBtn } from './converse-styles';

import { firestore } from '../../firebase';

import { ReactComponent as MsgSend } from '../../assets/sendMsg.svg';
import UserItem from '../userItem/userItem-comp';

const Converse = () => {
	const { chatToId } = useParams();
	const [ user ] = useDocumentDataOnce(firestore.doc(`users/${chatToId}`));

	return (
		<ConversationContainer>
			<div className="user-container">
				<UserItem id={chatToId} {...user} smallImg toProfile />
			</div>
			<MsgContainer>
				<div className="msg-send">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, inventore?
				</div>
				<div className="msg-receive">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nostrum ab repudiandae? Ipsam,
					sequi corrupti?
				</div>
				<div className="msg-receive">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nostrum ab repudiandae? Ipsam,
					sequi corrupti?
				</div>
				<div className="msg-receive">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nostrum ab repudiandae? Ipsam,
					sequi corrupti?
				</div>
				<div className="msg-send">
					Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi nostrum ab repudiandae? Ipsam,
					sequi corrupti?
				</div>
			</MsgContainer>
			<SendMsgContainer>
				<MsgInput role="textbox" contentEditable />
				<SendBtn>
					<MsgSend />
				</SendBtn>
			</SendMsgContainer>
		</ConversationContainer>
	);
};

export default Converse;
