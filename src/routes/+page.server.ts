import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies }) => {
    const token = cookies.get('token')
    const { data } = await fetch("https://churros.inpt.fr/graphql", {
        method: "POST",
        body: JSON.stringify({
            query: `
            fragment Listeux on User {
                pictureFile
                firstName, lastName
                major { name }
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
            variables: { liste1: "pan7on", liste2: "ber7ker" }
        }),
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
        }
    }).then(r => r.json())

    return data
}