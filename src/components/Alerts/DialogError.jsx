import React from 'react';

const DialogError = ({ feedbackHeading, feedbackMessage }) => {
	return (
		<>
			<div
				className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-3 rounded relative"
				role="alert"
			>
				<strong className="font-bold mr-2">{feedbackHeading}!</strong>
				<span className="block sm:inline">{feedbackMessage}</span>
			</div>
		</>
	);
};

export default DialogError;
