import firebase from 'firebase/app';
import 'firebase/firestore';

firebase.initializeApp({
	apiKey: 'AIzaSyDT9poQ53vDxsKMkcecpptl6XsLs-ulThI',
	authDomain: 'songs-deck.firebaseapp.com',
	projectId: 'songs-deck',
	storageBucket: 'songs-deck.appspot.com',
	messagingSenderId: '818621520263',
	appId: '1:818621520263:web:0a036239441ba22ab81b22',
	measurementId: 'G-X9FX7J1D33'
});

export const firestore = firebase.firestore();

export const createUserDocument = async userData => {
	try {
		const userRef = firestore.doc(`users/${userData.currentUserId}`);
		const userSnap = await userRef.get();

		const userInfo = {
			email: userData.email,
			displayName: userData.displayName,
			profileImg: userData.profileImg,
			country: userData.country,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			recentChats: []
		};

		if (!userSnap.exists) {
			await userRef.set(userInfo);
		}

		return userRef;
	} catch (err) {
		console.error('Error while creating user', err);
	}
};

export const getSearchResultsByUsers = async searchTerm => {
	try {
		const usersSnap = await firestore.collection('users').where('email', '==', searchTerm).get();
		const searchedUsers = usersSnap.docs.length ? usersSnap.docs.map(doc => doc) : [];
		return searchedUsers;
	} catch (err) {
		console.error('Error while searching for user', err);
	}
};

export const createMessage = async msg => {
	try {
		const { text, by, to } = msg;

		const messageRef = firestore.collection('messages');
		await messageRef.add({
			text,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			by,
			to
		});
	} catch (err) {
		console.error('Error while adding message to firestore', err);
	}
};

export const addToRecent = async (senderId, receiverId, lastMsg) => {
	try {
		const senderRef = firestore.doc(`users/${senderId}`);
		const senderSnap = await senderRef.get();
		const { recentChats: senderRecent } = senderSnap.data();

		const receiverRef = firestore.doc(`users/${receiverId}`);
		const receiverSnap = await receiverRef.get();
		const { recentChats: receiverRecent } = receiverSnap.data();

		await senderRef.update({ recentChats: updateRecentChats(senderRecent, { userId: receiverId, lastMsg }) });
		await receiverRef.update({ recentChats: updateRecentChats(receiverRecent, { userId: senderId, lastMsg }) });
	} catch (err) {
		console.error('Add to recent failed', err);
	}
};

function updateRecentChats(recent, newData) {
	return [ ...recent.filter(data => newData.userId !== data.userId), newData ];
}

export const populateRecentChats = async recent => {
	try {
		let populatedData = [];
		for (const data of recent) {
			const recentUserSnap = await firestore.doc(`users/${data.userId}`).get();
			populatedData.push({ ...recentUserSnap.data(), ...data });
		}
		return populatedData;
	} catch (err) {
		console.error('Populate recent failed', err);
	}
};
