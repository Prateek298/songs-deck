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
			createdAt: firebase.firestore.FieldValue.serverTimestamp()
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
