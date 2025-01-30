import { selectedListeId, selectedMemberId } from "$lib/stores";
import type { Liste } from "./types";

export function randint(start: number, end: number): number {
	return Math.floor(Math.random() * (end - start + 1)) + start;
}

export function randomMember(listes: Liste[], listeId?: number, possibleMemberId?: number[]): void {
	const _selectedListeId = listeId ?? randint(0, listes.length - 1);
	selectedListeId.set(_selectedListeId);
	selectedMemberId.set(possibleMemberId?.length ?
		possibleMemberId[randint(0, possibleMemberId.length - 1)] :
		randint(0, listes[_selectedListeId].members.length - 1)
	);
}