<script lang="ts">
    import type { Roles } from "../../routes/+page.svelte";
    import type { groupListe } from "../../routes/+page.svelte";
    import { PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from "$env/static/public";
    import Button from "./Button.svelte";

    export let liste: groupListe;
    let theme: 'styleListe1' | 'styleListe2'
	export { theme as class };

    let styleListe : string;
    let selectedRoleListe : string = "uwu";
    $:if(liste !== undefined){
        if(liste.name == PUBLIC_LISTE1_UID){
        styleListe = "styleListe1";
        }else if(liste.name == PUBLIC_LISTE2_UID){
            styleListe = "styleListe2";
        } 
    }

</script>
    {#if liste !== undefined}
        <div class="combo-button">
            <label>
                <select name = "choixRole" bind:value={selectedRoleListe}>
                    <option value="Président">Président</option>
                    <option value="Vice-Président">Vice-Président</option>
                    <option value="Trésorier">Trésorier</option>
                    <option value="Secretaire">Secrétaire</option>
                    <option value="Membre" selected>Membre</option>
                </select>
            </label>
            <div class="elem-button">
                <Button type="randomizer" class="styleListe1" liste1={liste}
                    >{selectedRoleListe} {liste.name}
                </Button>	
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

            select:hover{
                background-color: red;
            }
        }

        .elem-button{
            border-left: 1px solid rgb(189, 189, 189);
        }

        &.styleListe1 {
			background: var(--liste1-bg-color);
			color: var(--liste1-text-color);
		}

		&.styleListe2 {
			background: var(--liste2-bg-color);
			color: var(--liste2-text-color);
		}
    }

    label{
        display: flex;
        align-items : center;
    }

</style>