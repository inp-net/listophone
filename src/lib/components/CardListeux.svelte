<script lang="ts">
	import Pills from "./Pills.svelte";
    import Button from "./Button.svelte";
    import user from '../../routes/+page.svelte'

    import type groupListe from '../../routes/+page.svelte'
	import { selectedListe } from "../../routes/stores";
	import { PUBLIC_LISTE1_UID, PUBLIC_LISTE2_UID } from "$env/static/public";
 
    export let selectedUser : user;

    $:console.log(selectedUser)

    let listeName : string;

    $:if($selectedListe === 1){
        listeName = PUBLIC_LISTE1_UID;
    }else if($selectedListe === 2){
        listeName = PUBLIC_LISTE2_UID;
    }
</script>

<div class="card">
    <div class="info">
        <img src="https://pbs.twimg.com/media/FdnpbkmUYAAjhUy?format=jpg&name=4096x4096" alt="profile-pic"/>
        <div class="identity">
            <div class="name">
                <h3>{selectedUser.member.firstName} {selectedUser.member.lastName}</h3>
                <Pills content={selectedUser.member.major.shortName}/>
            </div>
            <div class="list">
                {listeName}
            </div>
        </div>
    </div>
    <div class="clubs">
        {#each selectedUser.member.groups as club}
            <Pills content={club.group.name}/>            
        {/each}
    </div>
    <div class="actions">
        <Button type="redirect" href={"https://churros.inpt.fr/users/"}>Profil Churros</Button>
        <Button type="call" num="">Appeler</Button>
    </div>
</div>

<style lang=scss>
    .card{
        padding: 1em;
        border-radius: 20px;
        background: var(--bg);
        max-width: 500px;
        min-width: 300px;
    }

    .info{
        display: flex;
        align-items: center;
        height:7.5em;
    }

    .info > img {
        height : 100px;
        border-radius: 100%;
    }

    .identity{
        display: flex;
        height:100px;
        padding-left: 0.5em;
        flex-direction: column;
    }
    .name{
        display: flex;
        justify-content: space-between;
        align-items: baseline;   
        gap:0.5em;
    }
    
    .clubs{
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