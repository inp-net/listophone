<script lang="ts">
    import Icon from '@iconify/svelte';

    import groupListe from '../../routes/+page.svelte'
    import { selectedListe, userPhoneNumber, userUid } from '../../routes/stores'

    export let liste1 : groupListe | undefined = undefined;
    export let liste2 : groupListe | undefined = undefined;
    export let index : number = 0;
    export let type: 'randomizer' | 'call' | 'redirect';
    export let href ="";
    export let num ="";

    function selectRandomListe(){
        if(liste1 !== undefined && liste2 === undefined){
            selectedListe.set(1);
        }if(liste1 === undefined && liste2 !== undefined){
            selectedListe.set(2);
        }if(liste1 !== undefined && liste2 !== undefined){
            selectedListe.set(Math.floor(Math.random()*2)+1);
        }
    }

    function selectRandomUser(){
        selectRandomListe();
        if($selectedListe === 1 && liste1 !== undefined){
            index=Math.floor(Math.random()*(liste1.members.length-1))
        }else if($selectedListe === 2 && liste2 !== undefined){
            index=Math.floor(Math.random()*(liste2.members.length-1))
        }
    }
</script>

<div>	
    <button class={type} on:click={() => {
        switch( type ) {
            case "randomizer":
                selectRandomListe();
                break;
            case "call":
                window.open(`tel:${userPhoneNumber}`);
                break;
            case "redirect":
                window.open(`https://churros.inpt.fr/users/${userUid}`);
                break;
        }
    }}>
        {#if type==="call"}
            <Icon icon="mdi:phone"/>
        {/if}
        <slot />
    </button>
</div>

<style>
    button{
        padding: 0.4rem;
        font-size: 1.25em;
        border-radius: 0.3rem;
        background: var(--primary-color);
        color: var(--text);
        border: 0;
        max-width:130px;
        text-decoration: none;
        display:flex;
        justify-content: center;
        align-items: center;
        gap: 0.5em;
}
</style>
