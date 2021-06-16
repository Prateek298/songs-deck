import { useState, useCallback } from 'react';

import useLongPress from './useLongPress';
import { firestore, addToRecent } from '../firebase';

const useModifyMessage = () => {
	const [ openModal, setOpenModal ] = useState(false);
	const [ msg, setMsg ] = useState({
		id: '',
		text: ''
	});

	const handleLongPress = content => {
		setOpenModal(true);
		setMsg({ id: content.id, text: content.firstElementChild.innerText });
	};
	const memoizedHandleLongPress = useCallback(handleLongPress, []);
	const longPress = useLongPress(memoizedHandleLongPress, 350);

	const modifyMessage = async (modification, msg, isLastMsg, userId1, userId2) => {
		try {
			if (modification === 'update') {
				await firestore.doc(`messages/${msg.id}`).update({ text: msg.text });
				if (isLastMsg) await addToRecent(userId1, userId2, msg.text);
			}
			else if (modification === 'delete') {
				await firestore.doc(`messages/${msg.id}`).delete();
				if (isLastMsg) await addToRecent(userId1, userId2, 'Deleted message');
			}
			setOpenModal(false);
		} catch (err) {
			console.error('Error modifying message', err);
		}
	};

	return {
		openModal,
		setOpenModal,
		longPress,
		msg,
		modifyMessage
	};
};

export default useModifyMessage;
