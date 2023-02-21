import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ForgotPasswordConfirm from './pages/ForgotPasswordConfirm.jsx';
import ConfirmSignUp from './pages/ConfirmSignUp.jsx';

// Import all auth functions here and pass down as prop instead
import {
	signUpEmailAndPassword,
	verifyAndUpdateUserEmail,
} from './auth/authHelpers.js';

function App() {
	const [signupError, setSignupError] = useState(null);
	const [signupErrorFeedback, setSignupErrorFeedback] = useState(null);
	const [signupSuccess, setSignupSuccess] = useState(null);
	const [signupSuccessFeedback, setSignupSuccessFeedback] = useState(null);
	const [signupEmail, setSignupEmail] = useState(null);

	const [signupConfirmError, setSignupConfirmError] = useState(null);
	const [signupConfirmErrorFeedback, setSignupConfirmErrorFeedback] =
		useState(null);
	const [signupConfirmSuccess, setSignupConfirmSuccess] = useState(null);
	const [signupConfirmSuccessFeedback, setSignupConfirmSuccessFeedback] =
		useState(null);

	const readAuthState = {
		signupError,
		signupSuccess,
		signupErrorFeedback,
		signupSuccessFeedback,
		signupConfirmError,
		signupConfirmErrorFeedback,
		signupConfirmSuccess,
		signupConfirmSuccessFeedback,
		signupEmail,
	};

	const writeAuthState = {
		setSignupError,
		setSignupSuccess,
		setSignupErrorFeedback,
		setSignupSuccessFeedback,
		setSignupConfirmError,
		setSignupConfirmErrorFeedback,
		setSignupConfirmSuccess,
		setSignupConfirmSuccessFeedback,
		setSignupEmail,
	};

	console.log('readAuthState', readAuthState);

	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/auth/signin'} element={<SignIn />} />
				<Route
					path={'/auth/signup'}
					element={
						<SignUp
							signUpEmailAndPassword={signUpEmailAndPassword}
							readAuthState={readAuthState}
							writeAuthState={writeAuthState}
						/>
					}
				/>
				<Route
					path={'/auth/signup-confirm'}
					element={
						signupSuccess ? (
							<ConfirmSignUp
								readAuthState={readAuthState}
								writeAuthState={writeAuthState}
								verifyAndUpdateUserEmail={verifyAndUpdateUserEmail}
							/>
						) : (
							<ConfirmSignUp
								readAuthState={readAuthState}
								writeAuthState={writeAuthState}
								verifyAndUpdateUserEmail={verifyAndUpdateUserEmail}
							/>
							// <Navigate to="/auth/signin" />
						)
					}
				/>
				<Route path={'/auth/forgot-password'} element={<ForgotPassword />} />
				<Route
					path={'/auth/forgot-password-confirm'}
					element={<ForgotPasswordConfirm />}
				/>

				<Route path={'/'} element={<SignIn />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
