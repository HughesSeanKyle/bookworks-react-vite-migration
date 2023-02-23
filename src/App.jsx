import { useSelector } from 'react-redux';
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
	const isSignupSuccess = useSelector((state) => state.auth.signupSuccess);
	const isSignupConfirmError = useSelector(
		(state) => state.auth.signupConfirmError
	);
	const isFormSubmitting = useSelector((state) => state.auth.isFormSubmitting);

	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/auth/signin'} element={<SignIn />} />
				<Route
					path={'/auth/signup'}
					element={<SignUp signUpEmailAndPassword={signUpEmailAndPassword} />}
				/>
				<Route
					path={'/auth/signup-confirm'}
					element={
						isSignupSuccess || isSignupConfirmError || isFormSubmitting ? (
							<ConfirmSignUp
								verifyAndUpdateUserEmail={verifyAndUpdateUserEmail}
							/>
						) : (
							<Navigate to="/auth/signin" />
							// <ConfirmSignUp
							// 	readAuthState={readAuthState}
							// 	writeAuthState={writeAuthState}
							// 	verifyAndUpdateUserEmail={verifyAndUpdateUserEmail}
							// />
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
