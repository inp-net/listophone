<script lang="ts">
	interface Props {
		popUpActive: boolean;
	}

	let { popUpActive = $bindable() }: Props = $props();
</script>

<div class="rules">
	<h1>Bienvenue sur le listophone ! La platforme des allos de l'N7 !</h1>

	<p>
		Avant de vous laisser sélectionner un 1A pour vos allos quelques petits rappels sur les règles :
	</p>
	<ul>
		<li>
			Chaque allo doit être fait par groupe de <strong>DEUX LISTEUX MINIMUM</strong> peut importe la
			demande. Vous devez appeler un seul 1A, les listes s'occuperont d'envoyer une deuxième personne
		</li>
		<li>
			<strong>Liberté</strong> : Vous ne devez pas forcer quelqu'un à faire quelque chose qu'il ne veut
			pas
		</li>
		<li><strong>Informer</strong> : Les listeux doivent être au courant de tout avant de venir</li>
	</ul>
	<p>
		Le non-respect de ces règles entrainera des sanctions (mais vous êtes pas des enculés hein :) )
	</p>
	<button
		onclick={() => {
			popUpActive = false;
		}}>Oui c'est promis pas de bétises</button
	>
</div>

<style>
	.rules {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: auto;

        max-width: 40rem;
		border-radius: 20px;
		margin: 1rem;
		padding: 1rem;
		padding-top: 2rem;
		padding-left: 2rem;
		padding-right: 2rem;
		gap: 1rem;

		background: rgb(255, 247, 174);
		opacity: 1;
	}

	h1 {
		text-align: center;
		line-height: 1em;
	}

	button {
		padding: 0.8rem;
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;

		border-radius: 20px;
		border: 0;

        background: white;
        font-size: 1.3em;
        font-weight: 600;

    }
</style>
