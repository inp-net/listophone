<script lang="ts">
    import type { Roles } from "../../routes/+page.svelte";
    import groupListe from "../../routes/+page.svelte";
    import { PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from "$env/static/public";
    import Button from "./Button.svelte";

    export let selectedRoleListe : Roles;
    export let liste: groupListe;

    let styleListe : string;

    if(liste.name == PUBLIC_LISTE1_UID){
        styleListe = "styleListe1";
    }else if(liste.name == PUBLIC_LISTE2_UID){
        styleListe = "styleListe2";
    }

</script>

    <div class="combo-button styleListe1">
        <label>
            <div class="deploySelectButton"> + </div>
            <select name = "choixRole" bind:value={selectedRoleListe}>
                <option value="Prez" selected>Président</option>
                <option value="VP">Vice-Président</option>
                <option value="Trez">Trésorier</option>
                <option value="Secretaire">Secrétaire</option>
                <option value="Membre">Membre</option>
            </select>
        </label>
        <Button type="randomizer" class="styleListe1" liste={liste}
            >Listeux {liste.name}
        </Button>			
    </div>


<style lang="css">

</style>