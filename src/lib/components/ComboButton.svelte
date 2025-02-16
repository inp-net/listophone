<script lang="ts">
	import { type Liste, GroupRole } from '$lib/utils/types';
	import Button from '$lib/components/Button.svelte';
	import { randomMember } from '$lib/utils/utils';
	import Icon from '@iconify/svelte';
	import { env } from '$env/dynamic/public';

	interface Props {
		listes: Liste[];
		listeId: number;
	}

	let { listes, listeId }: Props = $props();
	let liste: Liste = $derived(listes[listeId]);

	let selectedRoleListe: GroupRole = $state(GroupRole.members);
	const filteredIndex: Record<Exclude<GroupRole, GroupRole.members>, number[]> = $derived(
		computeFilteredIndex()
	);
	let listIndexFiltered: number[] = $derived(
		selectedRoleListe === GroupRole.members ? [] : filteredIndex[selectedRoleListe]
	);

	const GroupRoleToText: Record<GroupRole, string> = {
		[GroupRole.members]: 'Membre',
		[GroupRole.president]: 'Président',
		[GroupRole.vicePresident]: 'Vice-Président',
		[GroupRole.treasurer]: 'Trésorier',
		[GroupRole.secretary]: 'Secrétaire'
	};

	function computeFilteredIndex(): Record<Exclude<GroupRole, GroupRole.members>, number[]> {
		let tmpFilteredIndex: Record<Exclude<GroupRole, GroupRole.members>, number[]> = {
			[GroupRole.president]: [],
			[GroupRole.vicePresident]: [],
			[GroupRole.treasurer]: [],
			[GroupRole.secretary]: []
		};

		for (const [index, user] of liste.members.entries()) {
			user.groups.some((group) => {
				for (const role of Object.values(GroupRole)) {
					if (role == GroupRole.members) continue;

					if (group[role] && (group.group.uid === env.PUBLIC_LISTE0_UID || group.group.uid === env.PUBLIC_LISTE1_UID)) {
						tmpFilteredIndex[role].push(index);
					}
				}
			});
		}

		return tmpFilteredIndex;
	}
</script>

<div class="combo-button liste{listeId}">
	<label>
		<Icon icon="fa-solid:caret-down" />
		<select name="choixRole" bind:value={selectedRoleListe}>
			{#each Object.entries(GroupRoleToText) as [role, text]}
				{#if role !== 'members'}
					{#if filteredIndex[role as Exclude<GroupRole, GroupRole.members>].length > 0}
						<option value={role}>{text}</option>
					{/if}
				{/if}
			{/each}
			<option value={GroupRole.members}>{GroupRoleToText.members}</option>
		</select>
	</label>
	<div class="elem-button">
		<Button onclick={() => randomMember(listes, listeId, listIndexFiltered)} class="liste{listeId}">
			{GroupRoleToText[selectedRoleListe]}
			{liste.name}
		</Button>
	</div>
</div>

<style lang="scss">
	.combo-button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1em;
		border-radius: 0.3rem;

		&.liste0 {
			background: var(--liste0-bg-color);
			color: var(--liste0-text-color);
		}

		&.liste1 {
			background: var(--liste1-bg-color);
			color: var(--liste1-text-color);
		}
		border: 0;

		position: relative;

		:global(svg) {
			position: absolute;
			top: 50%;
			left: 10%;
			transform: translate(-50%, -50%);
		}

		select {
			height: 3.5rem;
			width: 0rem;
			padding-left: 1rem;
			padding-right: 1rem;

			border: none;
			background-color: transparent;
			appearance: none;

			cursor: pointer;
		}

		.elem-button {
			border-left: 1px solid rgb(189, 189, 189);
		}
	}

	label {
		display: flex;
		align-items: center;
	}
</style>
