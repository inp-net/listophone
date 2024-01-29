<script lang="ts">
    import Icon from '@iconify/svelte';

    import groupListe from '../../routes/+page.svelte'
    import { selectedListe } from '../../routes/stores'

    export let liste1 : groupListe | undefined = undefined;
    export let liste2 : groupListe | undefined = undefined;
    export let index : number = 0;
    export let type ="";
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
</script>

<a href={(type === "call") ? "tel:"+num: href}>
    {#if type === "call"}
        <Icon icon="mdi:phone"/>
    {/if}
    <slot/>
</a>
	
<button on:click={() => {
    selectRandomListe();
    if($selectedListe === 1 && liste1 !== undefined){
        index=Math.floor(Math.random()*(liste1.members.length-1))
    }else if($selectedListe === 2 && liste2 !== undefined){
        index=Math.floor(Math.random()*(liste2.members.length-1))
    }
}}>
    <slot />
</button>

<style>
    a{
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
