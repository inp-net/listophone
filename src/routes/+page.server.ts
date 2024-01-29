import { PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from "$env/static/public";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');
	if (!token) return { status: 401 , data:'no token'};
	else {const { data } = await fetch('https://churros.inpt.fr/graphql', {
		method: 'POST',
		body: JSON.stringify({
			query: `
            fragment Listeux on User {
                pictureFile
                firstName, lastName
                major { shortName }
                groups { group { uid, name } }
                phone
            }

            fragment Liste on Group {
                pictureFile
                name
                color
                members { 
                    member{
                        ...Listeux
                    }
                }
            }
            
            query data($liste1: String!, $liste2: String!) { 
                me { 
                    ...Listeux
                },

                liste1: group(uid: $liste1) { ...Liste }
                liste2: group(uid: $liste2) { ...Liste }
             }`,
            variables: { liste1: PUBLIC_LISTE1_UID, liste2: PUBLIC_LISTE2_UID } //Nom des listes
        }),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        }
    }).then(r => r.json()); 
    
    return {status: 200, data};
    }
}
