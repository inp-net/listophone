<script lang="ts">
	import Icon from '@iconify/svelte';
	import Pills from '$lib/components/Pills.svelte';
	import Button from '$lib/components/Button.svelte';
	import noProfilPicture from '$lib/asset/no-profile-picture.webp';
	import type { Liste, User } from '$lib/utils/types';
	import { selectedListeId, selectedMemberId } from '$lib/stores';

	interface Props {
		listes: Liste[];
	}

	let { listes }: Props = $props();

	// Usefull shortcuts
	let liste: Liste = $derived(listes[$selectedListeId]);
	let member: User = $derived(liste.members[$selectedMemberId]);
</script>

<div class="card">
	<div class="headerInfo {$selectedListeId === 1 ? 'styleListe1' : 'styleListe2'}">
		{#if member.pictureFile}
			<img src="https://churros.inpt.fr/storage/{member.pictureFile}" alt="profile-pic" />
		{:else}
			<img src={noProfilPicture} alt="default-profile_pic" />
		{/if}

		<div class="identity">
			<div class="name">
				<p id="stringName">{member.firstName} {member.lastName}</p>
				{console.log(member)}
				<Pills class="filiere" content={member.major.name} />
			</div>
			<div class="list">
				{liste.name}
			</div>
			<p>{member.phone}</p>
		</div>
	</div>
	<div class="clubs">
		{#each member.groups as club}
			<Pills
				class={$selectedListeId === 1 ? 'styleListe1' : 'styleListe2'}
				content={club.group.name}
			/>
		{/each}
	</div>
	<div class="actions">
		<Button
			onclick={() => {
				window.open(`https://churros.inpt.fr/${member.uid}`);
			}}
			class={$selectedListeId === 1 ? 'styleListe1' : 'styleListe2'}
		>
			Profil Churros
		</Button>
		<Button
			onclick={() => {
				window.location.href = `tel:${member.phone}`;
			}}
			class={$selectedListeId === 1 ? 'styleListe1' : 'styleListe2'}
		>
			<Icon icon="mdi:phone" />
			Appeler
		</Button>
	</div>
</div>

<style lang="scss">
	.card {
		padding-bottom: 0.8rem;
		border-radius: 20px;
		background: var(--bg);
		width: 22rem;
	}

	.identity {
		display: flex;
		height: auto;
		flex-direction: column;
		width: 100%;
		.name {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			gap: 0.8em;
			p {
				font-size: 1.5rem;
			}

			#stringName {
				overflow-wrap: anywhere;
			}
		}
		.list {
			text-transform: capitalize;
			font-size: 1.5em;
			font-weight: 800;
		}
	}

	.headerInfo {
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;
		padding: 1rem;
		display: flex;
		gap: 1em;
		align-items: center;
		height: auto;

		&.styleListe1 {
			background: var(--liste1-bg-color);
			color: var(--liste1-text-color);
		}

		&.styleListe2 {
			background: var(--liste2-bg-color);
			color: var(--liste2-text-color);
		}
	}

	.headerInfo > img {
		display: flex;
		flex-shrink: 0;
		align-items: baseline;
		height: 8em;
		border-radius: 100%;
	}

	.headerInfo > img {
		display: flex;
		flex-shrink: 0;
		align-items: baseline;
		height: 7em;
		width: 7em;
		object-fit: cover;
		border-radius: 100%;
	}

	.name {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 0.5em;
	}

	.clubs {
		padding-right: 1rem;
		padding-left: 1rem;
		flex-shrink: 0;
		height: 8rem;
		gap: 0.5rem;
		margin: 1em 0;
		overflow: auto;
	}
	.actions {
		display: flex;
		justify-content: space-evenly;
	}
</style>
