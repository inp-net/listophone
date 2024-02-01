<script lang="ts">
	import Pills from "./Pills.svelte";
    import Button from "./Button.svelte";
    import user from '../../routes/+page.svelte'

	import { selectedListe, userPhoneNumber } from "../../routes/stores";
	import { PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from "$env/static/public";
 
    export let selectedUser : user;

    let listeName : string;

    $:if($selectedListe === 1){
        listeName = PUBLIC_LISTE1_UID;
    }else if($selectedListe === 2){
        listeName = PUBLIC_LISTE2_UID;
    }
</script>

<div class="card">
    <div class="headerInfo {$selectedListe === 1 ? "styleListe1" : "styleListe2"}">
        <img src="https://churros.inpt.fr/storage/{selectedUser.member.pictureFile}" alt='profile-pic'/>
        <div class="identity">
            <div class="name">
                <p>{selectedUser.member.firstName} {selectedUser.member.lastName}<p>
                <Pills class='filiere' content={selectedUser.member.major.shortName}/>
            </div>
            <div class="list">
                {listeName ?? "??"}
            </div>
            <p>{$userPhoneNumber}</p>
        </div>
    </div>
    <div class="clubs">
        {#each selectedUser.member.groups as club}
            <Pills class={$selectedListe === 1 ? 'styleListe1' : 'styleListe2' } content={club.group.name}/>            
        {/each}
    </div>
    <div class="actions">
        <Button type="redirect" class={$selectedListe === 1 ? "styleListe1" : "styleListe2" }>Profil Churros</Button>
        <Button type="call" class={$selectedListe === 1 ? "styleListe1" : "styleListe2" }>Appeler</Button>
    </div>
</div>

<style lang=scss>
    .card{
        padding-bottom: 0.5rem;
        border-radius: 20px;
        background: var(--bg);
        width: 22rem;
    }

    .identity{
        display: flex;
        height:auto;
        flex-direction: column;
        width: 100%;
        .name{
            display: flex;
            justify-content: space-between;
            align-items: baseline;   
            gap:0.8em;
            p{
                font-size: 1.5rem;
            }
        }
        .list{
            text-transform: capitalize;
            font-size: 1.5em;
            font-weight: 800;
        }

    }

    .headerInfo{
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        padding: 1rem;
        display: flex;
        gap : 1em;
        align-items: center;
        height:auto;

        &.styleListe1{
            background: var(--liste1-bg-color);
            color: var(--liste1-text-color);
        }

        &.styleListe2{
            background: var(--liste2-bg-color);
            color: var(--liste2-text-color);
        }
    }

    .headerInfo > img {
        display: flex;
        flex-shrink: 0;
        align-items: baseline;
        height : 8em;
        border-radius: 100%;
    }

    .name{
        display: flex;
        justify-content: space-between;
        align-items: baseline;   
        gap:0.5em;
    }
    
    .clubs{
        padding-right: 1rem;
        padding-left: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap:0.5rem;
        margin: 1em 0;
    }

    .actions{
        display: flex;
        justify-content: space-evenly;

    }
</style>