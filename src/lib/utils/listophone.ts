import { query } from "./churros";
import { ListeMembersQuery, ListeQuery } from "./queries";
import type { Liste as T_Liste, ListeInfo, User } from "./types";

class Liste {
	private uid: string

	private details: ListeInfo | undefined;
	private details_ttl: Date = new Date();

	public constructor(uid: string) {
		this.uid = uid;
	}

	public async getDetails(): Promise<ListeInfo> {
		if (!this.details || this.details_ttl < new Date()) {
			const { data } = await query(ListeQuery, { uid: this.uid });
			this.details = data.group;

			// set a cache for 1 hour
			this.details_ttl = new Date();
			this.details_ttl.setSeconds(this.details_ttl.getSeconds() + 3600);
		}

		if (!this.details) {
			throw new Error("Failed to fetch details");
		}

		return this.details;
	}

	private members: User[] = [];
	private members_ttl: Date = new Date();

	private static filterMembers(members: User[]): User[] {
		return members
			.filter((member) => member.phone !== "")
			.map((member) => {
				// cleanup groups
				member.groups = member.groups.filter(
					(group) => 
						group.group.type !== "Integration" &&
						group.group.type !== "Group"
				);

				return member;
			});
	}

	private async populateMembers(after?: string, reset: Boolean = true): Promise<void> {
		if (reset) this.members = [];
		const { data } = await query(ListeMembersQuery, { uid: this.uid, after: after });
		this.members.push(...Liste.filterMembers(
			data.group.members.edges.map(
				(edge: { node: { user: User } }) => edge.node.user)
			)
		);

		if (data.group.members.pageInfo.hasNextPage) {
			await this.populateMembers(data.group.members.pageInfo.endCursor, false);
		}
	}

	public async getMembers(): Promise<User[]> {
		if (this.members.length === 0 || this.members_ttl < new Date()) {
			await this.populateMembers();

			// set a cache for 1 hour
			this.members_ttl = new Date();
			this.members_ttl.setSeconds(this.members_ttl.getSeconds() + 3600);
		}

		return this.members;
	}
	
}

export class Listophone {
	static #instance: Listophone;

	private Listes: { [uid: string]: Liste } = {};
	

	private constructor(ListeUid: [string, string]) {
		ListeUid.forEach(uid => {
			this.Listes[uid] = new Liste(uid);
		});
	}

	public static getInstance(ListesUid: [string, string]): Listophone {
		if (!Listophone.#instance) {
			Listophone.#instance = new Listophone(ListesUid);
		}
		return Listophone.#instance;
	}

	private async getDetails(uid: string): Promise<ListeInfo> {
		return this.Listes[uid].getDetails();
	}

	private async getMembers(uid: string): Promise<User[]> {
		return this.Listes[uid].getMembers();
	}

	public async getListe(uid: string): Promise<T_Liste> {
		const details = await this.getDetails(uid);
		const members = await this.getMembers(uid);

		return {
			...details,
			members: members
		};
	}
}