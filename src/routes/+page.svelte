<script lang="ts">
	import type { PageProps } from './$types';
	import logo from '$lib/asset/logo.png';
	import PopUpWarning from '$lib/components/PopUpWarning.svelte';
	import MemberCard from '$lib/components/MemberCard.svelte';
	import { selectedListeId, selectedMemberId } from '$lib/stores';
	import ComboButton from '$lib/components/ComboButton.svelte';
	import Button from '$lib/components/Button.svelte';
	import { randomMember } from '$lib/utils/utils';

	let { data }: PageProps = $props();
	let { listes } = $derived(data);

	selectedListeId.set(data.selectedListeId);
	selectedMemberId.set(data.selectedMemberId);

	let popUpActive: boolean = $state(true);
</script>

<section>
	<header>
		<img src={logo} alt="logo-site" />
		<div class="rules">
			<div class="rules-description">
				<h1>Rappel des règles :</h1>
				<ul>
					<li><strong>2 personnes </strong>par allos</li>
					<li><strong>Liberté</strong> : On force personne dans les allos</li>
					<li><strong>Informer</strong> : Les listeux doivent tout savoir</li>
				</ul>
			</div>
			<button onclick={() => (popUpActive = true)}>Règles complètes</button>
		</div>
	</header>
	{#if popUpActive}
		<div class="popUp">
			<PopUpWarning bind:popUpActive />
		</div>
	{/if}

	<MemberCard {listes}></MemberCard>

	<div id="buttonUniqueListe">
		<ComboButton {listes} listeId={0} />
		<ComboButton {listes} listeId={1} />
	</div>
	<Button onclick={() => randomMember(listes)}>Listeux quelconque</Button>

	<footer>
		Developed by <a href="https://churros.inpt.fr/groups/net7-n7/">net7</a>
	</footer>
</section>

<style lang="scss">
	section {
		display: flex;
		flex-grow: 1;
		flex-direction: column;
		align-items: center;
		background: var(--cardBg);
		gap: 1rem;

		min-height: 100vh;
	}

	header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;

		@media (min-width: 600px) {
			column-gap: 10rem;
		}
	}

	img {
		padding: 1.2rem;
		padding-bottom: 0rem;
		width: 20rem;
	}

	.popUp {
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 1;

		display: flex;
		justify-content: center;
		align-items: center;

		overflow: auto;
		background: var(--popUp-bg);
	}

	.rules {
		display: flex;
		align-items: center;
		gap: 2rem;

		@media (max-width: 600px) {
			flex-direction: column;
			gap: 1rem;
		}
		.rules-description {
			display: flex;
			flex-direction: column;
			gap: 1rem;

			background: white;
			padding: 1.8rem;
			padding-bottom: 1rem;
			padding-top: 1rem;

			border-radius: 20px;
		}
	}

	#buttonUniqueListe {
		display: flex;
		gap: 1rem;
	}

	button {
		padding: 0.8rem;

		border-radius: 20px;
		border: 0;

		background: white;
		font-weight: bold;
	}

	footer {
		position: flex;

		padding: 0.8rem;
		margin-top: auto;
		margin-bottom: 0.5rem;
		border-radius: 20px;

		font-size: 0.8rem;
		color: rgba(0, 0, 0, 0.8);

		a {
			color: var(--textLink);
			text-decoration: none;
		}
	}
</style>
