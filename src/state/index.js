import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
	isFormSubmitting: false,
	// SignUp
	signupError: null,
	signupErrorFeedback: null,
	signupSuccess: null,
	signupSuccessFeedback: null,
	// SignUp Confirm
	signupConfirmError: null,
	signupConfirmErrorFeedback: null,
	signupConfirmSuccess: null,
	signupConfirmSuccessFeedback: null,
	// Init forgot password
	forgotPasswordError: null,
	forgotPasswordErrorFeedback: null,
	forgotPasswordSuccess: null,
	forgotPasswordSuccessFeedback: null,
	// Forgot password Confirm
	forgotPasswordConfimrError: null,
	forgotPasswordConfimrErrorFeedback: null,
	forgotPasswordConfimrSuccess: null,
	forgotPasswordConfimrSuccessFeedback: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState: initialAuthState,
	reducers: {
		setSignUp: (state, action) => {
			state.isFormSubmitting = action.payload.isFormSubmitting;
			state.signupError = action.payload.signupError;
			state.signupErrorFeedback = action.payload.signupErrorFeedback;
			state.signupSuccess = action.payload.signupSuccess;
			state.signupSuccessFeedback = action.payload.signupSuccessFeedback;
		},
		setSignUpConfirm: (state, action) => {
			state.isFormSubmitting = action.payload.isFormSubmitting;
			state.signupConfirmError = action.payload.signupConfirmError;
			state.signupConfirmErrorFeedback =
				action.payload.signupConfirmErrorFeedback;
			state.signupConfirmSuccess = action.payload.signupConfirmSuccess;
			state.signupConfirmSuccessFeedback =
				action.payload.signupConfirmSuccessFeedback;
		},
		setForgotPassword: (state, action) => {
			state.isFormSubmitting = action.payload.isFormSubmitting;
			state.forgotPasswordError = action.payload.forgotPasswordError;
			state.forgotPasswordErrorFeedback =
				action.payload.forgotPasswordErrorFeedback;
			state.forgotPasswordSuccess = action.payload.forgotPasswordSuccess;
			state.forgotPasswordSuccessFeedback =
				action.payload.forgotPasswordSuccessFeedback;
		},
		// setLogout: (state) => {
		// 	state.user = null;
		// 	state.token = null;
		// },
	},
});

export const { setSignUp, setSignUpConfirm, setForgotPassword } =
	authSlice.actions;
export default authSlice.reducer;
