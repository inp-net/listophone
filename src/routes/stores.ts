import { writable } from 'svelte/store';

export let selectedListe = writable(0);
export let index = writable(0);
export let userUid = writable('');
export let userPhoneNumber = writable('');
