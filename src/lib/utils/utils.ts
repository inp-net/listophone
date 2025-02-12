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

export function textColorBasedOnBackground(backgroundColor: string): string {
	backgroundColor = backgroundColor.substring(1);
	const r = parseInt(backgroundColor.substring(0, 2), 16);
	const g = parseInt(backgroundColor.substring(2, 4), 16);
	const b = parseInt(backgroundColor.substring(4, 6), 16);

	const srgb = [r / 255, g / 255, b / 255];
	const x = srgb.map((i) => {
		if (i <= 0.04045) {
			return i / 12.92;
		} else {
			return Math.pow((i + 0.055) / 1.055, 2.4);
		}
	});

	const L = 0.2126 * x[0] + 0.7152 * x[1] + 0.0722 * x[2];
	return L > 0.179 ? "#000" : "#fff";
}
