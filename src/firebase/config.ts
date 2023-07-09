import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyD1rlTwjc1LVUsx0t2zerWCUECvJU9Iaxo',
	authDomain: 'mabonza-rn.firebaseapp.com',
	projectId: 'mabonza-rn',
	storageBucket: 'mabonza-rn.appspot.com',
	messagingSenderId: '549364732649',
	appId: '1:549364732649:web:90a7b9c60c27af9854d678',
	measurementId: 'G-5SR496FFZL',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;
