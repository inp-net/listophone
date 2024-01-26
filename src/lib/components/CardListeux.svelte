<script lang="ts">
	import Pills from "./Pills.svelte";

    export let filiere = "";
    export let liste="";
    export let clubs=[""];
</script>

<div class="card">
    <div class="info">
        <img src="https://pbs.twimg.com/media/FdnpbkmUYAAjhUy?format=jpg&name=4096x4096" alt="profile-pic"/>
        <div class="identity">
            <div class="name">
                <h3>Nolan Grayson</h3>
                <Pills content={filiere}/>
            </div>
            <div class="list">
                {liste}
            </div>
        </div>
    </div>
    <div class="clubs">
        {#each clubs as club}
            <Pills content={club}/>            
        {/each}
    </div>
</div>

<style lang=scss>
    .card{
        padding: 1rem;
        border-radius: 0.3rem;
        background: var(--bg);
    }

    .info{
        display: flex;
        align-items: center;
        height:200px;
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
    }
</style>