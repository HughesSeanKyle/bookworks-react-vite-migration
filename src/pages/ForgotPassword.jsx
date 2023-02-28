import { useDispatch, useSelector } from 'react-redux';
import { setForgotPassword } from '../state';
import { Link, useNavigate } from 'react-router-dom';
import signUpImage from '../assets/images/signup-image.jpg';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import DialogError from '../components/Alerts/DialogError';

import { FaSpinner } from 'react-icons/fa';

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.matches(
			/^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/i,
			'Invalid Email '
		)
		.required(),
});

const ForgotPassword = ({ sendVerificationCode }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const isFormSubmitting = useSelector((state) => state.auth.isFormSubmitting);
	const isInitForgotPasswordError = useSelector(
		(state) => state.auth.forgotPasswordError
	);
	const forgotPasswordErrorFeedback = useSelector(
		(state) => state.auth.forgotPasswordErrorFeedback
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

	const email = watch('email');

	const onSubmit = async ({ email }) => {
		try {
			dispatch(
				setForgotPassword({
					isFormSubmitting: true,
				})
			);

			const submitResult = await sendVerificationCode(
				email,
				'Forgot Password initiated. Please enter the code and your new password on the confirmation screen'
			);

			if (submitResult.error) {
				dispatch(
					setForgotPassword({
						forgotPasswordError: true,
						forgotPasswordErrorFeedback: submitResult.error,
						forgotPasswordSuccess: null,
						forgotPasswordSuccessFeedback: null,
						isFormSubmitting: false,
					})
				);
				return;
			}

			// REDUX
			console.log('Submission success');

			// dispatch(
			// 	setSignUp({
			// 		signupError: null,
			// 		signupErrorFeedback: null,
			// 		signupSuccess: true,
			// 		signupSuccessFeedback: submitResult.data,
			// 		isFormSubmitting: false,
			// 	})
			// );

			// navigate('/auth/signup-confirm');
			// return;
		} catch (error) {
			dispatch(
				setForgotPassword({
					forgotPasswordError: true,
					forgotPasswordErrorFeedback: error.message,
					forgotPasswordSuccess: null,
					forgotPasswordSuccessFeedback: null,
					isFormSubmitting: false,
				})
			);
			return;
		}
	};

	const disabledBtnClasses =
		!email || isFormSubmitting
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
						RESET PASSWORD
					</h2>

					{isInitForgotPasswordError && (
						<DialogError
							feedbackHeading={'Error'}
							feedbackMessage={forgotPasswordErrorFeedback}
						/>
					)}

					<div className="flex flex-col text-custom-white py-2">
						<label>Email</label>
						<input
							className="rounded-lg bg-custom-white mt-2 p-2 focus:border-blue-900 focus:outline-none focus:ring focus:ring-custom-gray text-custom-black"
							type="email"
							name="email"
							placeholder="Your email"
							{...register('email')}
						/>
						<p className="text-custom-danger">{errors?.email?.message}</p>
					</div>
					<button
						className={disabledBtnClasses}
						disabled={!email || isFormSubmitting}
						title={
							!email || isFormSubmitting
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
						<Link to="/auth/signin">
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

export default ForgotPassword;
