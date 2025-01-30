import type { PageServerLoad } from './$types';
import {env} from "$env/dynamic/public";
import { Listophone } from '$lib/utils/listophone';
import type { Liste } from '$lib/utils/types';
import { randint } from '$lib/utils/utils';

export const load: PageServerLoad = async ({}) => {
	const listophone = Listophone.getInstance([env.PUBLIC_LISTE0_UID, env.PUBLIC_LISTE1_UID]);

	const listes: [Liste, Liste] = [
		await listophone.getListe(env.PUBLIC_LISTE0_UID),
		await listophone.getListe(env.PUBLIC_LISTE1_UID)
	]

	const selectedListeId = randint(0, 1);
	const selectedMemberId = randint(0, listes[selectedListeId].members.length - 1);
	
	return {
		"listes": listes,
		"selectedListeId": selectedListeId,
		"selectedMemberId": selectedMemberId
	}
};