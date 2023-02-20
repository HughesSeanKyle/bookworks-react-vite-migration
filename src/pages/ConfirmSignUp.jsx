import { Link } from 'react-router-dom';
import signUpImage from '../assets/images/signup-image.jpg';

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import DialogSuccess from '../components/Alerts/DialogSuccess';

const validationSchema = yup.object().shape({
	code: yup
		.string()
		.matches(/^$|\s?/i, 'Input cannot be blank')
		.required('Code is a required field'),
});

const ConfirmSignUp = ({ readAuthState, writeAuthState }) => {
	const {
		signupError,
		signupSuccess,
		signupErrorFeedback,
		signupSuccessFeedback,
	} = readAuthState;

	const {
		setSignupError,
		setSignupSuccess,
		setSignupErrorFeedback,
		setSignupSuccessFeedback,
	} = writeAuthState;

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm({
		mode: 'onBlur',
		resolver: yupResolver(validationSchema),
	});

	const code = watch('code');

	const disabledBtnClasses = !code
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

					{signupSuccess && (
						<DialogSuccess
							feedbackHeading={'Success'}
							feedbackMessage={signupSuccessFeedback}
						/>
					)}

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
						disabled={!code}
						title={
							!code ? 'Please complete the required fields to enable' : 'Submit'
						}
					>
						SUBMIT
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
