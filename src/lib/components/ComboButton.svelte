<script lang="ts">
    import type { groupListe } from "../../routes/+page.svelte";
    import type { groups } from "../../routes/+page.svelte";
    import { PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from "$env/static/public";
    import Button from "./Button.svelte";

    export let liste: groupListe;
    let theme: 'styleListe1' | 'styleListe2' | undefined = undefined;
	export { theme as class };

    let styleListe : string;
    let selectedRoleListe : string = "Membre";
    let selectedListe1 : Boolean;
    $:if(liste !== undefined){
        if(liste.uid == PUBLIC_LISTE1_UID){
            styleListe = "styleListe1";
            selectedListe1 = true;
        }else if(liste.uid == PUBLIC_LISTE2_UID){
            styleListe = "styleListe2";
            selectedListe1 = false;
        } 
    }

    let listUserIndexWithRolePrez : number[] = [];
    let listUserIndexWithRoleVP : number[] = [];
    let listUserIndexWithRoleTreasurer : number[] = [];
    let listUserIndexWithRoleSecretary : number[] = [];
    let listUserIndexAll : number[] = [];
    let listIndexFiltered : number[] = [];

    //Filtrage des tableau de membres des listes selon leur role.
    for(let i = 0; i < liste.members.length; i++){
        if(liste.members[i].member.groups.some((n : groups) => n.group.name === liste.name && n.president === true)){
            listUserIndexWithRolePrez.push(i);            
        }
        if(liste.members[i].member.groups.some((n : groups) => n.group.name === liste.name && n.vicePresident === true)){
            listUserIndexWithRoleVP.push(i);            
        }
        if(liste.members[i].member.groups.some((n : groups) => n.group.name === liste.name && n.treasurer === true)){
            listUserIndexWithRoleTreasurer.push(i);            
        }
        if(liste.members[i].member.groups.some((n : groups) => n.group.name === liste.name && n.secretary === true)){
            listUserIndexWithRoleSecretary.push(i);            
        }
        listUserIndexAll.push(i);
    }

    $:switch(selectedRoleListe){
        case("Président"):{
            listIndexFiltered = listUserIndexWithRolePrez;
            break;
        }
        case("Vice-Prez"):{
            listIndexFiltered = listUserIndexWithRoleVP;
            break;
        }
        case("Trésorier"):{
            listIndexFiltered = listUserIndexWithRoleTreasurer;
            break;
        }
        case("Secrétaire"):{
            listIndexFiltered = listUserIndexWithRoleSecretary;
            break;
        }
        case("Membre"):{
            listIndexFiltered = listUserIndexAll;
            break;
        }
    }

</script>
    {#if liste !== undefined}
        <div class="combo-button {theme}">
            <label>
                <select name = "choixRole" bind:value={selectedRoleListe}>
                    <option value="Membre" selected>Membre</option>
                    <option value="Président">Président</option>
                    <option value="Vice-Prez">Vice-Président</option>
                    <option value="Trésorier">Trésorier</option>
                    <option value="Secrétaire">Secrétaire</option>
                </select>
            </label>
            <div class="elem-button">
                {#if selectedListe1}
                <Button type="randomizer-unique" class={theme} liste1={liste} listPossibleMember={listIndexFiltered}
                    >{selectedRoleListe} {liste.name}
                </Button>
                {:else}
                <Button type="randomizer-unique" class={theme} liste2={liste} listPossibleMember={listIndexFiltered}
                    >{selectedRoleListe} {liste.name}
                </Button>
                {/if}
            </div>		
        </div>
    {/if}


<style lang="scss">

    .combo-button{
        display: flex;
        align-items: center;
        justify-content: center;
		font-size: 1em;
		border-radius: 0.3rem;
		background: var(--liste1-bg-color);
        &.styleListe1 {
			background: var(--liste1-bg-color);
			color: var(--liste1-text-color);
		}

		&.styleListe2 {
			background: var(--liste2-bg-color);
			color: var(--liste2-text-color);
		}
		border: 0;

        select {
            height: 3.5rem;
            width: 2.1rem;
            padding-left: 0.5rem;
            padding-right: 0.5rem;

            border:none;
            background-color: transparent;
            background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6l-6-6z'/%3E%3C/svg%3E");
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
            color: transparent; 

        }

        .elem-button{
            border-left: 1px solid rgb(189, 189, 189);
        }

    }

    label{
        display: flex;
        align-items : center;
    }

</style>