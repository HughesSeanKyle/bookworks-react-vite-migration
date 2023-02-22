import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
	// SignUp
	signUpFormState: null,
	signupError: null,
	signupErrorFeedback: null,
	signupSuccess: null,
	signupSuccessFeedback: null,
	// SignUp Confirm
	signUpConfirmFormState: null,
	signupConfirmError: null,
	signupConfirmErrorFeedback: null,
	signupConfirmSuccess: null,
	signupConfirmSuccessFeedback: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setSignUp: (state, action) => {
			state.signUpFormState = action.payload.signUpFormState;
			state.signupError = action.payload.signupError;
			state.signupErrorFeedback = action.payload.signupErrorFeedback;
			state.signupSuccess = action.payload.signupSuccess;
			state.signupSuccessFeedback = action.payload.signupSuccessFeedback;
		},
		setSignUpConfirm: (state, action) => {
			state.signUpConfirmFormState = action.payload.signUpConfirmFormState;
			state.signupConfirmError = action.payload.signupConfirmError;
			state.signupConfirmErrorFeedback =
				action.payload.signupConfirmErrorFeedback;
			state.signupConfirmSuccess = action.payload.signupConfirmSuccess;
			state.signupConfirmSuccessFeedback =
				action.payload.signupConfirmSuccessFeedback;
		},
		// setLogout: (state) => {
		// 	state.user = null;
		// 	state.token = null;
		// },
	},
});

export const { setSignUp, setSignUpConfirm } = authSlice.actions;
export default authSlice.reducer;
