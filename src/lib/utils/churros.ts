import {env} from "$env/dynamic/private";

export async function query(query: string, variables: any): Promise<any> {
	const response = await fetch('https://churros.inpt.fr/graphql', {
		method: 'POST',
		body: JSON.stringify({
			query: query,
			variables: variables
		}),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${env.CHURROS_BOT_TOKEN}`
		}
	});
	const body = await response.json();

	if (response.status !== 200 || 'errors' in body) {
		console.error(`An error occured, while trying to fetch data from Churros: ${response.statusText}`);

		if (body.errors) {
			console.error(body.errors);
		}

		return
	}

	return body;
}
