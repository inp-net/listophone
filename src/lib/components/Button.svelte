<script lang="ts">
	import Icon from '@iconify/svelte';
	import type { groupListe } from '../../routes/+page.svelte';
	import { selectedListe, userPhoneNumber, userUid } from '../../routes/stores';
	import { index } from "../../routes/stores";

	let theme: 'styleListe1' | 'styleListe2' | undefined = undefined;
	export { theme as class };

	export let listPossibleMember : number[] | undefined = undefined;
	export let liste1: groupListe | undefined = undefined;
	export let liste2: groupListe | undefined = undefined;
	export let type: 'randomizer' | 'call' | 'redirect' | 'randomizer-unique';

	let listPossibleMemberEmpty : boolean
	$:listPossibleMemberEmpty = (listPossibleMember === undefined || listPossibleMember.length === 0);

	function selectRandomListe() {
		if (liste1 !== undefined && liste2 === undefined) {
			selectedListe.set(1);
		}
		if (liste1 === undefined && liste2 !== undefined) {
			selectedListe.set(2);
		}
		if (liste1 !== undefined && liste2 !== undefined) {
			selectedListe.set(Math.floor(Math.random() * 2) + 1);
		}
	}

	function selectRandomUser() {
		selectRandomListe();
		if ($selectedListe === 1 && liste1 !== undefined) {
			index.set(Math.floor(Math.random() * (liste1.members.length - 1)));
		} else if ($selectedListe === 2 && liste2 !== undefined) {
			index.set(Math.floor(Math.random() * (liste2.members.length - 1)));
		}
	}

	function selectRandomUserIndex(){
		selectRandomListe();
		if(listPossibleMember !== undefined){
			index.set(listPossibleMember[Math.floor(Math.random() * (listPossibleMember.length))]);
		}
	}

</script>

<div class="composant">
	<button
		class={theme}
		disabled={listPossibleMemberEmpty}
		on:click={() => {
			switch (type) {
				case 'randomizer':
					selectRandomUser();
					break;
				case 'randomizer-unique':
					selectRandomUserIndex();
					break;
				case 'call':
					window.open(`tel:${$userPhoneNumber}`);
					break;
				case 'redirect':
					window.open(`https://churros.inpt.fr/users/${$userUid}`);
					break;
			}
		}}
	>
		{#if type === 'call'}
			<Icon icon="mdi:phone" />
		{/if}
		<slot />
	</button>
</div>

<style lang="scss">
	.composant {
		display: flex;
	}
	button {
		font-size: 1.25em;
		border-radius: 0.3rem;
		background: var(--primary-color);
		border: 0;
		gap: 0.3rem;
		width: 130px;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--neutral-bg-color);
		color: var(--neutral-text-color);

		padding: 0.3rem;

		&.styleListe1 {
			color: var(--liste1-text-color);
			background: var(--liste1-bg-color);
		}

		&.styleListe2 {
			color: var(--liste2-text-color);
			background: var(--liste2-bg-color);
		}
	}
</style>
