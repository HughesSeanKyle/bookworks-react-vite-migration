import { initializeApp } from 'firebase/app';
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	sendPasswordResetEmail,
} from 'firebase/auth';

import {
	getFirestore,
	doc,
	setDoc,
	collection,
	getDocs,
	getDoc,
	query,
	where,
	updateDoc,
} from 'firebase/firestore';

import { sendVerificationCode, verifyEmailCode } from '../api/emailService.js';

const isDevMode = import.meta.env.MODE === 'development' ? true : false;
const API_KEY = import.meta.env.VITE_API_KEY;
const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMAIN;
const PROJECT_ID = import.meta.env.VITE_PROJECT_ID;
const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET;
const MESSAGING_SENDER_ID = import.meta.env.VITE_MESSAGING_SENDER_ID;
const APP_ID = import.meta.env.VITE_APP_ID;

export const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ***Logic here***
// Sign Up

export const signUpEmailAndPassword = async ({ email, password, username }) => {
	try {
		// Create a user with email and password
		const response = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		const user = response.user;

		await setDoc(doc(db, 'users', user.uid), {
			email: user.email,
			username: username,
			userID: user.uid,
			emailVerified: false,
		});

		const signUpMessage =
			"Thank you for Signing up with BookWorks. You're one step away from enjoying our app. Please enter the code provided to verify your email.";

		const sendResult = await sendVerificationCode(email, signUpMessage);

		if (sendResult.error) {
			return {
				data: null,
				error: sendResult.error,
			};
		}

		console.log(
			'Sign up successful! Verification email sent. Please enter the code below to verify your email'
		);
		return {
			data: 'Sign up successful! Verification email sent. Please enter the code below to verify your email',
			error: null,
		};
	} catch (error) {
		console.error('Error creating user: ', error);
		return {
			data: null,
			error: error.message,
		};
	}
};

async function updateUserEmail(email) {
	try {
		const userQuerySnapshot = await getDocs(
			query(collection(db, 'users'), where('email', '==', email))
		);
		if (userQuerySnapshot.empty) {
			return {
				data: null,
				error: `No such user with email: ${email}`,
			};
		} else {
			const userDoc = userQuerySnapshot.docs[0];
			const userRef = doc(db, 'users', userDoc.id);
			await updateDoc(userRef, { emailVerified: true });
			const userSnap = await getDoc(userRef);
			return { data: userSnap.data(), error: null };
		}
	} catch (error) {
		return {
			data: null,
			error: error.message,
		};
	}
}

export async function verifyAndUpdateUserEmail(email, code) {
	try {
		const verificationResult = await verifyEmailCode(email, code);

		if (verificationResult.error) {
			return { data: null, error: verificationResult.error };
		}

		const updateUserEmailResult = await updateUserEmail(email);

		if (updateUserEmailResult.error) {
			return { data: null, error: updateUserEmailResult.error };
		}

		return { data: 'Email verification success', error: null };
	} catch (error) {
		return {
			data: null,
			error: error.message,
		};
	}
}

// Get user by email
async function fetchUserProfileByEmail(email) {
	try {
		const docRef = query(collection(db, 'users'), where('email', '==', email));
		const querySnapshot = await getDocs(docRef);

		if (querySnapshot.empty) {
			console.log('No such user with email:', email);
			return {
				data: null,
				error: `No such user with email: ${email}`,
			};
		} else {
			const userDoc = querySnapshot.docs[0];
			const userRef = doc(db, 'users', userDoc.id);
			const userSnap = await getDoc(userRef);
			console.log('User data:', userSnap.data());

			return { data: userSnap.data(), error: null };
		}
	} catch (error) {
		console.log('err', error);
		return {
			data: null,
			error: error.message,
		};
	}
}

// fetchUserProfileByEmail('khughessean@yahoo.com');

// Signin (Confirm email verified in Authstate => useEffect)

async function signInEmailAndPassword({ email, password }) {
	try {
		const user = await fetchUserProfileByEmail(email);

		console.log('user', user);

		if (!user.data) {
			return {
				data: null,
				error: user.error,
			};
		}

		const encryptedPasswordFromDb = user.data.password;

		bcrypt.compare(
			password,
			encryptedPasswordFromDb,
			async (error, isMatch) => {
				if (isMatch) {
					console.log('Password match');
					const response = await signInWithEmailAndPassword(
						auth,
						email,
						encryptedPasswordFromDb
					);

					console.log('response', response);

					const authenticatedUser = response.user;

					console.log('authenticatedUser', authenticatedUser);

					return {
						data: 'Sign in succesful',
						error: null,
					};
				} else {
					console.log("Password doesn't match");
					if (error) {
						return {
							data: null,
							error: error,
						};
					}

					return {
						data: null,
						error: 'Invalid credentials. Please check your email or password',
					};
				}
			}
		);
	} catch (error) {
		console.error('Error signing in: ', error);
		return {
			data: null,
			error: error.message,
		};
	}
}

// const userData = {
// 	email: 'khughessean@yahoo.com',
// 	password: '@Test1234',
// };

// (async () => {
// 	await signInEmailAndPassword(userData);
// })();

// **Forgot Password logic and flow => Customize with email service. Standard Firebase forgot password does not have functionality for an auth code

async function sendPasswordReset(email) {
	try {
		await sendPasswordResetEmail(auth, email);
		console.log(
			'Password reset email sent successfully. Please note the code will expire within 1 Hour'
		);

		return {
			data: 'Password reset email sent successfully. Please note the code will expire within 1 Hour',
			error: null,
		};
	} catch (error) {
		console.error('Error sending password reset email:', error);
		return {
			data: null,
			error: error,
		};
	}
}

// **SignOut
async function signUserOut() {
	const returnObj = {
		data: null,
		error: null,
	};

	return signOut(auth)
		.then(() => {
			// Sign-out successful.
			console.log('Signed Out');
			// Run redirect from signOut comp, make sure to clear localstorage and session storage on SignOut.
			// Refactor to use data error
			returnObj.data = 'Signed Out';
			console.log('RO', returnObj);
			return returnObj;
		})
		.catch((error) => {
			// An error happened.
			console.log('OOOOOh no, something happened');
			returnObj.error = error;
			console.log('RO', returnObj);
			return returnObj;
		});
}

// (async () => {
// 	let result = await signUserOut();
// 	console.log('result', result);
// })();

// **check authstate logic

// export default app;
