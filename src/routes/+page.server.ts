import { PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from '$env/static/public';
import type { PageServerLoad } from './$types';

interface groups {
	president : boolean;
	treasurer : boolean;
	vicePresident : boolean;
	secretary : boolean;
	group: {
		uid: string;
		name: string;
		type : GroupType;
	};
}

interface user {
	member: {
		pictureFile: string;
		firstName: string;
		lastName: string;
		uid: string;
		major: {
			shortName: string;
		};
		groups: groups[];
		phone: string;
	};
}

interface groupListe {
	pictureFile: string;
	name: string;
	color: string;
	members: user[];
}
enum GroupType {
	Association = "Association",
	Club = "Club",
	Group = "Group",
	Integration = "Integration",
	StudentAssociationSection = "StudentASsociationSection",
	List = "List"
}

function filtreListe(liste : groupListe){
	let h : number = 0;
	liste.members = liste.members.filter((n: user) => n.member.phone !== ''); //filtrage des listes pour retirer les gens qui ont pas mis leur tel = qui veulent pas participer
	for(let i = 0; i < liste.members.length; i++){
		liste.members[i].member.groups =liste.members[i].member.groups.filter((n : groups) => (n.group.type !== (GroupType.Integration) 
		&& n.group.type !== (GroupType.Group) ) //Pour ne pas afficher les groupes d'inté dans la card car inutile
		)
	}
}

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get('token');
	if (!token) return { status: 401, data: 'no token' };
	else {
		const { data } = await fetch('https://churros.inpt.fr/graphql', {
			method: 'POST',
			body: JSON.stringify({
				query: `
            fragment Listeux on User {
                pictureFile
                firstName, lastName
                uid
                major { shortName }
                groups { 
					president,
					treasurer,
					vicePresident,
					secretary,
					group { 
						uid, 
						name, 
						type 
					} 
				}
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
				'Content-Type': 'application/json'
			}
		}).then(async (r) => {
			const result = await r.json();
			if ('errors' in result) {
				cookies.delete('token', {
					path: '/'
				});
				return { status: 401, data: 'invalid token' };
			}
			return result;
		});
        filtreListe(data.liste1);
		filtreListe(data.liste2);
		return { status: 200, data };
	}
};
