import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
	apiKey: "apiKey",
	authDomain: "authDomain",
	projectId: "projectId",
	storageBucket: "storageBucket",
	messagingSenderId: "messagingSenderId",
	appId: "appId",
	measurementId: "measurementId"
};


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);