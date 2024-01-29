<script lang="ts">
	import { PUBLIC_CHURROS_CLIENT_ID } from '$env/static/public';
    import Button from '$lib/components/Button.svelte';
	import CardListeux from '$lib/components/CardListeux.svelte';
	import { ChurrosClient } from '@inp-net/churros-client';
	import type { PageData } from './$types';
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    

    import { selectedListe } from './stores';

    export let data: PageData;
    $: ({ liste1, liste2 } = data.data)

    //lien entre le listophone et Churros par l'oauth (page initiale pour lier le compte churros au site)
    const churrosLoginURL = new ChurrosClient({
        client_id: PUBLIC_CHURROS_CLIENT_ID,
        client_secret: "",
        redirect_uri: "http://localhost:5173/oauth/callback"
    }).authorizationURL
    
    onMount(async () => {
        if(data.status === 401){
            window.location.href = churrosLoginURL;
        }
    })

    interface group {
        uid : string,
        name : string
    }

    interface user {
        member : {
            pictureFile : string,
            firstName : string,
            lastName : string,
            major : {
                shortName : string
            },
            groups : group[],
            phone : string
        }
        
    }

    interface groupListe {
        pictureFile : string,
        name : string,
        color : string,
        members : user[]
    }


    let index : number = 0;

    //initalisation avec toutes les données vides pour pas vexer typeScript
    let selectedUser : user = {
        member : {
            pictureFile : "",
            firstName : "",
            lastName : "",
            major : {
                shortName : "",
            },
            groups : [{
                uid: '',
                name: '',
            }],
            phone : ''
        }
    };

    $:if($selectedListe === 1){
        selectedUser = liste1.members[index];
    }else if ($selectedListe === 2){
        selectedUser = liste2.members[index];
    }


</script>
<section>
    {#if $selectedListe === 0}
        <CardListeux filiere={"??"} liste={"Pantalon"} clubs={["NebuListe","net7Consulting","OmniMan's FanClub","Can7 Hate club", "Photo7" ,"TVn7"]}></CardListeux>
    {:else if $selectedListe === 1}
        <CardListeux filiere={selectedUser.member.major.shortName} liste={liste1.name} clubs={["NebuListe","net7Consulting","OmniMan's FanClub","Can7 Hate club", "Photo7" ,"TVn7"]}></CardListeux>
    {:else if $selectedListe ===2}
        <CardListeux filiere={selectedUser.member.major.shortName} liste={liste2.name} clubs={["NebuListe","net7Consulting","OmniMan's FanClub","Can7 Hate club", "Photo7" ,"TVn7"]}></CardListeux>
    {/if}
    <a href={churrosLoginURL} >Se connecter</a>
    <Button liste1={liste1} bind:index={index} >Listeux {liste1.name}</Button>
    <Button liste2={liste2} bind:index={index} >Listeux {liste2.name}</Button>
    <Button liste1={liste1} liste2={liste2} bind:index={index}>Listeux quelconque</Button>
</section>


<style lang=scss>
    section{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--cardBg);
    }
    
</style>