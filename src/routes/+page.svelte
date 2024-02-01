<script lang="ts">
	import { PUBLIC_CHURROS_CLIENT_ID, PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from '$env/static/public';
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
    onMount( () => {
        ({ liste1, liste2 } = data.data);
    });
     
   
    //definition de type redondante ça doit dégager.
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

    let index : number = 0;
    let popUpActive : boolean = true;

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
        userUid.set(selectedUser.member.uid);
        userPhoneNumber.set(selectedUser.member.phone);
    }
    let test : any; //extremement sus, doit être changé ou a envoyer a movaicode. au choix quoi.
    //pour ceux qui lirons peut être ce code à l'avenir je suis désolé mdrrrrrrrr 
    $: test = selectedUser;

</script>

<section>
    <img src={logo} alt="logo-site"/>
    {#if popUpActive}
        <div class="popUp">
            <PopUpWarning bind:popUpActive={popUpActive}/>
        </div>
    {/if}
    <div class="rules-mini">
        <h1>Rappel des règles :</h1>
        <ul>
            <li>2 personnes par allos</li>
            <li>Liberté : On force personne dans les allos</li>
            <li>Informer : Les listeux doivent tout savoir</li>
        </ul>
    </div>
    <button on:click={() => popUpActive=true}>Règles complètes</button>

    <CardListeux selectedUser={test}></CardListeux>
    <div id="buttonUniqueListe">
        <Button type="randomizer" class='styleListe1' liste1={liste1} bind:index={index} >Listeux {PUBLIC_LISTE1_UID}</Button>
        <Button type="randomizer" class='styleListe2' liste2={liste2} bind:index={index} >Listeux {PUBLIC_LISTE2_UID}</Button>
    </div>
    <Button type="randomizer" liste1={liste1} liste2={liste2} bind:index={index}>Listeux quelconque</Button>
    <footer>Developped by <a href="https://churros.inpt.fr/groups/pan7on/">Pan7on</a> & <a href="https://churros.inpt.fr/groups/net7-n7/">net7</a></footer>
</section>


<style lang=scss>
    section{
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: center;
        background: var(--cardBg);
        gap: 1rem;

        min-height : 100vh;
    }
    
    img{
        padding : 1.2rem;
        padding-bottom: 0.0rem ;
        width: 20rem;
    }

    .popUp{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;

        display: flex;
        justify-content: center;
        align-items: center;

        background: rgba(112, 110, 110, 0.4);
    }

    .rules-mini{
        display: flex;
        flex-direction: column;
        gap: 1rem;

        background: white;
        padding: 1.8rem;
        padding-bottom: 1rem;
        padding-top: 1rem;

        border-radius: 20px;
    }

    #buttonUniqueListe{
        display: flex;
        gap: 1rem;
    }

    button{
        padding: 0.8rem;
        
        border-radius: 20px;
        border: 0;

        background: white;
        font-weight: bold;
    }

    footer{
        position: flex;

        padding: 0.8rem;
        margin-top:auto ;
        margin-bottom: 1rem;
        border-radius: 20px;
        background: rgb(255, 255, 255);

        font-size: 0.8rem;
        color: rgba(0,0,0, 0.8);

        a{
            color : var(--textLink);
            text-decoration: none;
        }
    }


</style>