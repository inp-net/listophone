export const ListeQuery = `
fragment Liste on Group {
	pictureFile
	uid
	name
	color
}

query data($uid: String!) {
	group(uid: $uid) {
		...Liste
	}
}
`

export const ListeMembersQuery = `
fragment ListeMembers on User {
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

query data($uid: String!, $after: String) {
	group(uid: $uid) {
		members(after: $after) {
			edges {
				node {
					user {
            ...ListeMembers
          }
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
}
`