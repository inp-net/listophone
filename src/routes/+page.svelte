<script lang="ts">
	import { PUBLIC_CHURROS_CLIENT_ID } from '$env/static/public';
    import Button from '$lib/components/Button.svelte';
	import CardListeux from '$lib/components/CardListeux.svelte';
	import { ChurrosClient } from '@inp-net/churros-client';
	import type { PageData } from './$types';

    export let data: PageData;
    $: console.log({data, liste1})
    $: ({ liste1, liste2 } = data)

    const churrosLoginURL = new ChurrosClient({
        client_id: PUBLIC_CHURROS_CLIENT_ID,
        client_secret: "",
        redirect_uri: "http://localhost:5173/oauth/callback"
    }).authorizationURL


</script>
<section>
    <CardListeux filiere="3EA" liste="Omni-Liste" clubs={["NebuListe","net7Consulting","OmniMan's FanClub","Can7 Hate club", "Photo7" ,"TVn7"]}></CardListeux>
    <a href={churrosLoginURL} >Se connecter</a>
    <p>deziz</p>
    <Button>petit caca</Button>
    <CardListeux></CardListeux>

    <pre>
        {JSON.stringify([liste1.name, liste2.name])}
    </pre>
</section>


<style lang=scss>
    section{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--cardBg);
        
    }
</style>