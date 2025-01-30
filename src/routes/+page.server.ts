import type { PageServerLoad } from './$types';
import {PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID} from "$env/static/public";
import { Listophone } from '$lib/utils/listophone';
import type { Liste } from '$lib/utils/types';
import { randint } from '$lib/utils/utils';

export const load: PageServerLoad = async ({}) => {
	const listophone = Listophone.getInstance([PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID]);

	const listes: [Liste, Liste] = [
		await listophone.getListe(PUBLIC_LISTE1_UID),
		await listophone.getListe(PUBLIC_LISTE2_UID)
	]

	const selectedListeId = randint(0, 1);
	const selectedMemberId = randint(0, listes[selectedListeId].members.length - 1);
	
	return {
		"listes": listes,
		"selectedListeId": selectedListeId,
		"selectedMemberId": selectedMemberId
	}
};