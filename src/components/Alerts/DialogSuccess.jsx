import React from 'react';

const DialogSuccess = ({ feedbackHeading, feedbackMessage }) => {
	return (
		<>
			<div
				className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mt-3 rounded relative"
				role="alert"
			>
				<strong className="font-bold mr-2">{feedbackHeading}!</strong>
				<span className="block sm:inline">{feedbackMessage}</span>
			</div>
		</>
	);
};

export default DialogSuccess;
