import React from 'react';

const Dialog = ({ feedbackColor, feedbackHeading, feedbackMessage }) => {
	return (
		<>
			<div
				className={`bg-${feedbackColor}-100 border border-${feedbackColor}-400 text-${feedbackColor}-700 px-4 py-3 mt-3 rounded relative`}
				role="alert"
			>
				<strong className="font-bold mr-2">{feedbackHeading}!</strong>
				<span className="block sm:inline">{feedbackMessage}</span>
			</div>
		</>
	);
};

export default Dialog;
