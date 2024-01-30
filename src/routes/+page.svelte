<script lang="ts">
	import { PUBLIC_CHURROS_CLIENT_ID, PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from '$env/static/public';
    import Button from '$lib/components/Button.svelte';
	import CardListeux from '$lib/components/CardListeux.svelte';
	import { ChurrosClient } from '@inp-net/churros-client';
	import type { PageData } from './$types';
    import { onMount } from 'svelte';
     
    import { selectedListe, userUid, userPhoneNumber } from './stores';

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

interface groups {
    group : {
        uid : string,
        name : string
    }
}

interface user {
    member : {
        pictureFile : string,
        firstName : string,
        lastName : string,
        uid: string,
        major : {
            shortName : string
        },
        groups : groups[]
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
            pictureFile : "Aucune",
            firstName : "??",
            lastName : "??",
            uid: "??",
            major : {
                shortName : "??",
            },
            groups : [
                {
                    group: {
                        uid: "1",
                        name: "Group 1"
                    }
                },
                {
                    group: {
                        uid: "2",
                        name: "Group 2"
                    }
                },
            ],
            phone : "?"
        }
    };


    $:if($selectedListe === 1){
        selectedUser = liste1.members[index];
        userUid.set(selectedUser.member.uid);
        userPhoneNumber.set(selectedUser.member.phone);

    }else if ($selectedListe === 2){
        selectedUser = liste2.members[index];
    }
    let test : any; //extremement sus, doit être changé ou a envoyer a movaicode. au choix quoi.
    //pour ceux qui lirons peut être ce code à l'avenir je suis désolé mdrrrrrrrr 
    $: test = selectedUser

</script>

<section>
    <CardListeux selectedUser={test}></CardListeux>
    <a href={churrosLoginURL} >Se connecter</a>
    <Button type="randomizer" liste1={liste1} bind:index={index} >Listeux {PUBLIC_LISTE1_UID}</Button>
    <Button type="randomizer" liste2={liste2} bind:index={index} >Listeux {PUBLIC_LISTE2_UID}</Button>
    <Button type="randomizer" liste1={liste1} liste2={liste2} bind:index={index}>Listeux quelconque</Button>
</section>


<style lang=scss>
    section{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--cardBg);
    }
    
</style>