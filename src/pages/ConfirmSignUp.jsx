import { useDispatch, useSelector } from 'react-redux';
import { setSignUp, setSignUpConfirm } from '../state';
import { Link, useNavigate } from 'react-router-dom';
import signUpImage from '../assets/images/signup-image.jpg';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import DialogSuccess from '../components/Alerts/DialogSuccess';
import DialogError from '../components/Alerts/DialogError';

import { FaSpinner } from 'react-icons/fa';

const validationSchema = yup.object().shape({
	code: yup
		.string()
		.matches(/^$|\s?/i, 'Input cannot be blank')
		.required('Code is a required field'),
	signupEmail: yup
		.string()
		.matches(
			/^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/i,
			'Invalid Email '
		)
		.required('Email is a required field'),
});

const ConfirmSignUp = ({ verifyAndUpdateUserEmail }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isFormSubmitting = useSelector((state) => state.auth.isFormSubmitting);
	const isSignupSuccess = useSelector((state) => state.auth.signupSuccess);
	const signupSuccessFeedback = useSelector(
		(state) => state.auth.signupSuccessFeedback
	);
	const isSignupConfirmError = useSelector(
		(state) => state.auth.signupConfirmError
	);
	const signupConfirmErrorFeedback = useSelector(
		(state) => state.auth.signupConfirmErrorFeedback
	);
	const isSignupConfirmSuccess = useSelector(
		(state) => state.auth.signupConfirmSuccess
	);

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema),
	});

	const code = watch('code');
	const signupEmail = watch('signupEmail');

	const onSubmit = async ({ signupEmail, code }) => {
		try {
			dispatch(
				setSignUpConfirm({
					isFormSubmitting: true,
				})
			);
			const submitResult = await verifyAndUpdateUserEmail(signupEmail, code);

			console.log('CONFIRM SIGNUP: submitResult', submitResult);

			if (submitResult.error) {
				dispatch(
					setSignUpConfirm({
						signupConfirmError: true,
						signupConfirmErrorFeedback: submitResult.error,
						isFormSubmitting: false,
					})
				);
				dispatch(
					setSignUp({
						signupSuccess: null,
						signupSuccessFeedback: null,
					})
				);
				return;
			}

			dispatch(
				setSignUp({
					signupSuccess: null,
					signupSuccessFeedback: null,
				})
			);

			dispatch(
				setSignUpConfirm({
					signupConfirmError: null,
					signupConfirmErrorFeedback: null,
					signupConfirmSuccess: true,
					signupConfirmSuccessFeedback: submitResult.data,
					isFormSubmitting: false,
				})
			);

			if (isSignupConfirmSuccess && !isFormSubmitting) {
				navigate('/auth/signin');
				// return;
			}
		} catch (error) {
			dispatch(
				setSignUp({
					signupSuccess: null,
					signupSuccessFeedback: null,
				})
			);
			dispatch(
				setSignUpConfirm({
					signupConfirmError: true,
					signupConfirmErrorFeedback: error.message,
					isFormSubmitting: false,
				})
			);
			return;
		}
	};

	const disabledBtnClasses =
		!code || !signupEmail || errors?.signupEmail?.message || isFormSubmitting
			? 'w-full my-5 py-2 bg-custom-green shadow-md shadow-custom-gray text-white font-light rounded-lg hover:shadow-md hover:shadow-custom-white hover:bg-custom-green-500 cursor-not-allowed'
			: 'w-full my-5 py-2 bg-custom-green shadow-md shadow-custom-gray text-white font-light rounded-lg hover:shadow-md hover:shadow-custom-white hover:bg-custom-green-500';

	return (
		<div className="bg-custom-green grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 h-screen w-full">
			<div className="flex flex-col justify-center content-center items-center form-padding image-bg-mobile-only dark-layer">
				<h2 className="text-4xl text-custom-white font-bold text-center my-5  mobile-z-index">
					BookWorks.io
				</h2>
				<form className="max-w-[400px] w-full mx-auto rounded-lg shadow-lg shadow-custom-black bg-gray-900 p-8 px-8 mobile-z-index">
					<h2 className="text-3xl text-custom-white font-bold text-center">
						CONFIRM SIGN UP
					</h2>

					{isSignupSuccess && (
						<DialogSuccess
							feedbackHeading={'Success'}
							feedbackMessage={signupSuccessFeedback}
						/>
					)}

					{isSignupConfirmError && (
						<DialogError
							feedbackHeading={'Error'}
							feedbackMessage={signupConfirmErrorFeedback}
						/>
					)}

					<div className="flex flex-col text-custom-white py-2">
						<label>Email</label>
						<input
							className="rounded-lg bg-custom-white mt-2 p-2 focus:border-blue-900 focus:outline-none focus:ring focus:ring-custom-gray text-custom-black"
							type="email"
							name="signupEmail"
							placeholder="Your sign up email"
							{...register('signupEmail')}
						/>
						<p className="text-custom-danger">{errors?.signupEmail?.message}</p>
					</div>

					<div className="flex flex-col text-custom-white py-2">
						<label>Code</label>
						<input
							className="rounded-lg bg-custom-white mt-2 p-2 focus:border-blue-900 focus:outline-none focus:ring focus:ring-custom-gray text-custom-black"
							type="text"
							name="code"
							placeholder="Enter the code sent to your email"
							{...register('code')}
						/>
						<p className="text-custom-danger">{errors?.code?.message}</p>
					</div>
					<button
						className={disabledBtnClasses}
						disabled={
							!code ||
							!signupEmail ||
							errors?.signupEmail?.message ||
							isFormSubmitting
						}
						title={
							!code ||
							!signupEmail ||
							errors?.signupEmail?.message ||
							isFormSubmitting
								? 'Please complete the required fields to enable'
								: 'Submit'
						}
						onClick={handleSubmit(onSubmit)}
					>
						{isFormSubmitting ? (
							<div className="w-full flex justify-center my-1">
								<FaSpinner className="animate-spin mr-2" />
							</div>
						) : (
							'SUBMIT'
						)}
					</button>
				</form>
				<div className="max-w-[333px] flex flex-wrap mt-1 mb-3 relative w-2/3 mobile-width-reset text-custom-white font-semibold">
					<div className="w-1/2">
						<Link to="/auth/signup">
							<small>Back</small>
						</Link>
					</div>
				</div>
			</div>
			<div className="hidden lg:block shadow-lg inset-0 rounded-l-lg shadow-lg shadow-custom-gray">
				<img
					className="rounded-l-sm w-full h-screen object-cover"
					src={signUpImage}
					alt=""
				/>
			</div>
		</div>
	);
};

export default ConfirmSignUp;
