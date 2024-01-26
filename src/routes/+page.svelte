<script lang="ts">
    import Button from '$lib/components/Button.svelte';
	import CardListeux from '$lib/components/CardListeux.svelte';

</script>
<section>
    <CardListeux filiere="3EA" list="Omni-Liste" clubs={["NebuListe","net7Consulting","OmniMan's FanClub","Can7 Hate club", "Photo7" ,"TVn7"]}></CardListeux>
</section>


<style lang=scss>
    section{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--cardBg);
        
    }
</style>