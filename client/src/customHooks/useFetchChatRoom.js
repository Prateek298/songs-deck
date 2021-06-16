import { useDocumentDataOnce, useCollectionData } from 'react-firebase-hooks/firestore';

import { firestore } from '../firebase';

const useFetchChatRoom = (senderId, receiverId) => {
	const [ receiver ] = useDocumentDataOnce(firestore.doc(`users/${receiverId}`));

	const senderMsgQuery = firestore
		.collection('messages')
		.where('by', '==', senderId)
		.where('to', '==', receiverId)
		.orderBy('createdAt')
		.limit(25);

	const receiverMsgQuery = firestore
		.collection('messages')
		.where('to', '==', senderId)
		.where('by', '==', receiverId)
		.orderBy('createdAt')
		.limit(25);

	const [ senderMessages, senderLoading ] = useCollectionData(senderMsgQuery, { idField: 'id' });
	const [ receiverMessages, receiverLoading ] = useCollectionData(receiverMsgQuery, { idField: 'id' });
	let messages, lastMsgId;
	if (!senderLoading && !receiverLoading) {
		messages = senderMessages.concat(receiverMessages).sort((a, b) => a.createdAt - b.createdAt);
		lastMsgId = messages[messages.length - 1].id;
	}

	return {
		receiver,
		messages,
		lastMsgId
	};
};

export default useFetchChatRoom;
