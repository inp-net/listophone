import { dev } from "$app/environment";
import { CHURROS_CLIENT_SECRET } from "$env/static/private";
import { PUBLIC_CHURROS_CLIENT_ID } from "$env/static/public";
import { ChurrosClient } from "@inp-net/churros-client";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";



export const load: PageServerLoad = async ({ url, cookies }) => {
    const churros = new ChurrosClient({
        client_id: PUBLIC_CHURROS_CLIENT_ID,
        client_secret: CHURROS_CLIENT_SECRET,
        redirect_uri: dev ? "http://localhost:5173/oauth/callback" : ''
    })

    churros.state = url.searchParams.get('state') ?? ''

    const token = await churros.getToken(url.searchParams.get('code') ?? '', url.searchParams.get('state') ?? '')
    cookies.set('token', token, {
        path: "/"
    })
    throw redirect(307, '/')
}