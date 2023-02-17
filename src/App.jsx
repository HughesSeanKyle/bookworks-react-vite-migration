import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ForgotPasswordConfirm from './pages/ForgotPasswordConfirm.jsx';
import ConfirmSignUp from './pages/ConfirmSignUp.jsx';

// Import all auth functions here and pass down as prop instead
import { checkDevEnvVars } from './auth/authHelpers.js';

function App() {
	checkDevEnvVars();

	return (
		<BrowserRouter>
			<Routes>
				<Route path={'/auth/signin'} element={<SignIn />} />
				<Route path={'/auth/signup'} element={<SignUp />} />
				<Route path={'/auth/confirm-signup'} element={<ConfirmSignUp />} />
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
