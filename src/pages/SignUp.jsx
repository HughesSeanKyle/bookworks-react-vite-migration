import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import signUpImage from '../assets/images/signup-image.jpg';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import DialogError from '../components/Alerts/DialogError';

import { FaSpinner } from 'react-icons/fa';

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.matches(/^.{7,}$/i, 'Username must be 7 characters or more')
		.required('Username is a required field'),
	email: yup
		.string()
		.matches(
			/^(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6}$/i,
			'Invalid Email '
		)
		.required('Email is a required field'),
	password: yup
		.string()
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]?)[A-Za-z\d\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]{8,}$/i,
			'Password must contain minimum 8 characters, atleast one lowercase letter, uppercase letter, number'
		)
		.required('Password is a required field'),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password')], 'Passwords must and should match')
		.required('Confirm Password is required'),
});

const SignUp = ({ signUpEmailAndPassword, readAuthState, writeAuthState }) => {
	const navigate = useNavigate();

	const { signupError, signupErrorFeedback } = readAuthState;

	const {
		setSignupError,
		setSignupSuccess,
		setSignupErrorFeedback,
		setSignupSuccessFeedback,
	} = writeAuthState;

	const [isFormSubmitting, setIsFormSubmitting] = useState(null);

	// Import RHF useForm
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema),
	});

	const username = watch('username');
	const email = watch('email');
	const password = watch('password');
	const passwordConfirm = watch('passwordConfirm');

	const onSubmit = async ({ username, email, password }) => {
		try {
			setIsFormSubmitting(true);
			const submitResult = await signUpEmailAndPassword({
				username,
				email,
				password,
			});

			if (submitResult.error) {
				setSignupError(true);
				setSignupErrorFeedback(submitResult.error);
				setSignupSuccess(null);
				setSignupSuccessFeedback(null);
				setIsFormSubmitting(false);
				return;
			}

			setSignupSuccess(true);
			setSignupSuccessFeedback(submitResult.data);
			setSignupError(null);
			setSignupErrorFeedback(null);
			setIsFormSubmitting(false);

			navigate('/auth/signup-confirm');
			return;
		} catch (error) {
			setSignupError(true);
			setSignupErrorFeedback(error.message);
			setIsFormSubmitting(false);
			return;
		}
	};

	const disabledBtnClasses =
		!username ||
		!email ||
		!password ||
		!passwordConfirm ||
		errors?.username?.message ||
		errors?.email?.message ||
		errors?.password?.message ||
		errors?.passwordConfirm?.message ||
		isFormSubmitting
			? 'w-full my-5 py-2 bg-custom-green shadow-md shadow-custom-gray text-white font-light rounded-lg hover:shadow-md hover:shadow-custom-white hover:bg-custom-green-500 cursor-not-allowed'
			: 'w-full my-5 py-2 bg-custom-green shadow-md shadow-custom-gray text-white font-light rounded-lg hover:shadow-md hover:shadow-custom-white hover:bg-custom-green-500';

	useEffect(() => {
		return () => {
			setSignupSuccess(null);
			setSignupSuccessFeedback(null);
		};
	}, []);

	return (
		<div className="bg-custom-green grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 h-screen w-full">
			<div className="bg-custom-green overflow-auto flex flex-col justify-center content-center items-center form-padding image-bg-mobile-only dark-layer">
				<h2 className="xl:mt-5 xl:mb-5 sm:mt-0 sm:mb-0 text-4xl text-custom-white font-bold text-center mobile-z-index signup-heading">
					BookWorks.io
				</h2>
				<form className="max-w-[400px] w-full mx-auto rounded-lg shadow-lg shadow-custom-black bg-gray-900 p-8 px-8 mobile-z-index signup-form">
					<h2 className="text-4xl text-custom-white font-bold text-center">
						SIGN UP
					</h2>
					{/* Alert */}
					{signupError && (
						<DialogError
							feedbackHeading={'Error'}
							feedbackMessage={signupErrorFeedback}
						/>
					)}

					{/* Alert */}
					<div className="flex flex-col text-custom-white py-2">
						<label>Username</label>
						<input
							className="rounded-lg bg-custom-white mt-2 p-2 focus:border-blue-900 focus:outline-none focus:ring focus:ring-custom-gray text-custom-black"
							type="text"
							name="username"
							placeholder="Your username"
							{...register('username')}
						/>
						<p className="text-custom-danger">{errors?.username?.message}</p>
					</div>
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
					<div className="flex flex-col text-custom-white py-2">
						<label>Password</label>
						<input
							className="p-2 rounded-lg bg-custom-white mt-2 focus:border-blue-900 focus:outline-none focus:ring focus:ring-custom-gray text-custom-black"
							type="password"
							name="password"
							placeholder="Your password"
							{...register('password')}
						/>
						<p className="text-custom-danger">{errors?.password?.message}</p>
					</div>
					<div className="flex flex-col text-custom-white py-2">
						<label>Confirm Password</label>
						<input
							className="p-2 rounded-lg bg-custom-white mt-2 focus:border-blue-900 focus:outline-none focus:ring focus:ring-custom-gray text-custom-black"
							type="password"
							name="passwordConfirm"
							placeholder="Confirm password"
							{...register('passwordConfirm')}
						/>
						<p className="text-custom-danger">
							{errors?.passwordConfirm?.message}
						</p>
					</div>
					<button
						className={disabledBtnClasses}
						disabled={
							!username ||
							!email ||
							!password ||
							!passwordConfirm ||
							errors?.username?.message ||
							errors?.email?.message ||
							errors?.password?.message ||
							errors?.passwordConfirm?.message ||
							isFormSubmitting
						}
						title={
							!username ||
							!email ||
							!password ||
							!passwordConfirm ||
							errors?.username?.message ||
							errors?.email?.message ||
							errors?.password?.message ||
							errors?.passwordConfirm?.message
								? 'Please complete the required fields to enable'
								: 'Sign Up'
						}
						onClick={handleSubmit(onSubmit)}
					>
						{isFormSubmitting ? (
							<div className="w-full flex justify-center my-1">
								<FaSpinner className="animate-spin mr-2" />
							</div>
						) : (
							'SIGN UP'
						)}
					</button>
				</form>
				<div className="max-w-[333px] flex flex-wrap mt-1 mb-3 relative w-2/3 mobile-width-reset text-custom-white font-semibold">
					<div className="w-1/2">
						<Link to="/auth/signin">
							<small>Already have an account?</small>
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

export default SignUp;
