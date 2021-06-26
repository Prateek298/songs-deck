import React, { useRef, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ConversationContainer, MsgContainer, SendMsgContainer, MsgInput, SendBtn } from './converse-styles';

import { createMessage, addToRecent } from '../../firebase';
import { SpotifyUserContext } from '../../contexts';
import useModifyMessage from '../../customHooks/useModifyMessage';
import useFetchChatRoom from '../../customHooks/useFetchChatRoom';

import { ReactComponent as MsgSend } from '../../assets/sendMsg.svg';
import Modal from '../modal/modal-comp';
import CustomButton from '../customButton/customButton-comp';
import UserItem from '../userItem/userItem-comp';
import ChatMsg from '../chatMsg/chatMsg-comp';

const Converse = () => {
	const inputEl = useRef();
	const msgContainer = useRef();
	const editor = useRef();
	const { currentUserId } = useContext(SpotifyUserContext);

	const { chatToId } = useParams();
	const { receiver, messages, lastMsgId } = useFetchChatRoom(currentUserId, chatToId);

	// for scrolling
	useEffect(() => {
		if (msgContainer) {
			msgContainer.current.addEventListener('DOMNodeInserted', event => {
				const { currentTarget: target } = event;
				target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
			});
		}
	}, []);

	const sendMessage = async () => {
		createMessage({
			text: inputEl.current.innerText,
			by: currentUserId,
			to: chatToId
		});
		addToRecent(currentUserId, chatToId, inputEl.current.innerText);
		inputEl.current.innerText = '';
	};

	const handleKeyPress = e => {
		if (e.key === 'Enter') {
			e.preventDefault();
			sendMessage();
		}
	};

	const { openModal, setOpenModal, longPress, msg, modifyMessage } = useModifyMessage();

	return (
		<ConversationContainer>
			<Modal open={openModal} setOpen={setOpenModal} addClose>
				<textarea ref={editor} className="msg-editor" cols="20" rows="7" defaultValue={msg.text} />
				<br />
				<CustomButton
					isSolid
					bg_color="yellow"
					onClick={() =>
						modifyMessage(
							'update',
							{ id: msg.id, text: editor.current.value },
							msg.id === lastMsgId,
							currentUserId,
							chatToId
						)}
				>
					UPDATE
				</CustomButton>
				<CustomButton
					isSolid
					bg_color="red"
					onClick={() =>
						modifyMessage('delete', { id: msg.id }, msg.id === lastMsgId, currentUserId, chatToId)}
				>
					DELETE
				</CustomButton>
			</Modal>

			<div className="user-container">
				<UserItem id={chatToId} {...receiver} smallImg toProfile />
			</div>
			<MsgContainer ref={msgContainer}>
				{messages &&
					messages.map(msg => (
						<ChatMsg key={msg.id} msg={msg} fromSender={currentUserId === msg.by} longPress={longPress} />
					))}
			</MsgContainer>
			<SendMsgContainer>
				<MsgInput ref={inputEl} role="textbox" contentEditable onKeyPress={handleKeyPress} />
				<SendBtn onClick={sendMessage}>
					<MsgSend />
				</SendBtn>
			</SendMsgContainer>
		</ConversationContainer>
	);
};

export default Converse;
