export async function updatePassword(recipient, newPassword) {
	try {
		const response = await fetch(
			'https://bookworks-auth-service.onrender.com/user/update-password',
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					recipient: recipient,
					newPassword: newPassword,
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
