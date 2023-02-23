export async function sendVerificationCode(recipient, message) {
	try {
		const response = await fetch(
			'https://bookworks-email-service.onrender.com/email/send-confirm-code',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					recipient: recipient,
					message: message,
				}),
			}
		);

		const data = await response.json();
		console.log(data);
		if (data.error) {
			return {
				data: data.error,
				error: null,
			};
		}

		return {
			data: data.data,
			error: null,
		};
	} catch (error) {
		console.error(error);
		return {
			data: null,
			error: error,
		};
	}
}

export async function verifyEmailCode(recipient, code) {
	try {
		const response = await fetch(
			'https://bookworks-email-service.onrender.com/email/verify-action-code',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					recipient: recipient,
					code: code,
				}),
			}
		);

		const data = await response.json();
		console.log(data);
		if (data.data.error) {
			return {
				data: null,
				error: data.data.error,
			};
		}

		return {
			data: data.data.data,
			error: null,
		};
	} catch (error) {
		console.error(error);
		return {
			data: null,
			error: error,
		};
	}
}
