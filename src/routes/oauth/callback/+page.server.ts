import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';
import { ChurrosClient } from '@inp-net/churros-client';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

//redirection vers le site après validation du lien entre churros et le site
export const load: PageServerLoad = async ({ url, cookies }) => {
	const churros = new ChurrosClient({
		client_id: publicEnv.PUBLIC_CHURROS_CLIENT_ID,
		client_secret: env.CHURROS_CLIENT_SECRET,
		redirect_uri: new URL('/oauth/callback', publicEnv.PUBLIC_ORIGIN).toString()
	});

	churros.state = url.searchParams.get('state') ?? '';

	const token = await churros.getToken(
		url.searchParams.get('code') ?? '',
		url.searchParams.get('state') ?? ''
	);
	cookies.set('token', token, {
		path: '/'
	});
	throw redirect(307, '/');
};
