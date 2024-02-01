<script lang="ts">
	import { PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from '$env/static/public';
	import { env } from '$env/dynamic/public';
	import Button from '$lib/components/Button.svelte';
	import CardListeux from '$lib/components/CardListeux.svelte';
	import { ChurrosClient } from '@inp-net/churros-client';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { selectedListe, userUid, userPhoneNumber } from './stores';
	import logo from '$lib/asset/listophoneLogo.png';
	import PopUpWarning from '$lib/components/PopUpWarning.svelte';

	export let data: PageData;

	let liste1: any;
	let liste2: any;
	onMount(() => {
		({ liste1, liste2 } = data.data);
	});

	//definition de type redondante ça doit dégager.
	interface groups {
		group: {
			uid: string;
			name: string;
		};
	}

	interface user {
		member: {
			pictureFile: string;
			firstName: string;
			lastName: string;
			uid: string;
			major: {
				shortName: string;
			};
			groups: groups[];
			phone: string;
		};
	}

	interface groupListe {
		pictureFile: string;
		name: string;
		color: string;
		members: user[];
	}

	//lien entre le listophone et Churros par l'oauth (page initiale pour lier le compte churros au site)
	const churrosLoginURL = new ChurrosClient({
		client_id: env.PUBLIC_CHURROS_CLIENT_ID,
		client_secret: '',
		redirect_uri: new URL('/oauth/callback', env.PUBLIC_ORIGIN).toString()
	}).authorizationURL;

	onMount(async () => {
		if (data.status === 401) {
			window.location.href = churrosLoginURL;
		}
	});

	let index: number = 0;
	let popUpActive: boolean = true;

	//initalisation avec toutes les données vides pour pas vexer typeScript
	let selectedUser: user = {
		member: {
			pictureFile: 'Aucune',
			firstName: '??',
			lastName: '??',
			uid: '??',
			major: {
				shortName: '??'
			},
			groups: [
				{
					group: {
						uid: '1',
						name: 'Group 1'
					}
				},
				{
					group: {
						uid: '2',
						name: 'Group 2'
					}
				}
			],
			phone: '?'
		}
	};

	$: if ($selectedListe === 1) {
		selectedUser = liste1.members[index];
		userUid.set(selectedUser.member.uid);
		userPhoneNumber.set(selectedUser.member.phone);
	} else if ($selectedListe === 2) {
		selectedUser = liste2.members[index];
		userUid.set(selectedUser.member.uid);
		userPhoneNumber.set(selectedUser.member.phone);
	}
	let test: any; //extremement sus, doit être changé ou a envoyer a movaicode. au choix quoi.
	//pour ceux qui lirons peut être ce code à l'avenir je suis désolé mdrrrrrrrr
	$: test = selectedUser;
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
			<button on:click={() => (popUpActive = true)}>Règles complètes</button>
		</div>
	</header>
	{#if popUpActive}
		<div class="popUp">
			<PopUpWarning bind:popUpActive />
		</div>
	{/if}
	<CardListeux selectedUser={test}></CardListeux>
	<div id="buttonUniqueListe">
		<Button type="randomizer" class="styleListe1" {liste1} bind:index
			>Listeux {PUBLIC_LISTE1_UID}</Button
		>
		<Button type="randomizer" class="styleListe2" {liste2} bind:index
			>Listeux {PUBLIC_LISTE2_UID}</Button
		>
	</div>
	<Button type="randomizer" {liste1} {liste2} bind:index>Listeux quelconque</Button>
	<footer>
		Developped by <a href="https://churros.inpt.fr/groups/pan7on/">Pan7on</a> &
		<a href="https://churros.inpt.fr/groups/net7-n7/">net7</a>
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

		background: rgba(112, 110, 110, 0.4);
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
		margin-bottom: 1rem;
		border-radius: 20px;
		background: rgb(255, 255, 255);

		font-size: 0.8rem;
		color: rgba(0, 0, 0, 0.8);

		a {
			color: var(--textLink);
			text-decoration: none;
		}
	}
</style>
