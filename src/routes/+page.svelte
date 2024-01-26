<script lang="ts">
    import Button from '$lib/components/Button.svelte';
	import CardListeux from '$lib/components/CardListeux.svelte';

</script>
<section>
    <p>deziz</p>
    <Button>AH</Button>
    <CardListeux filiere="3EA" liste="Omni-Liste" clubs={["NebuListe","net7Consulting","OmniMan's FanClub"]}></CardListeux>
</section>


<style lang=scss>
    section{
        display: flex;
        flex-direction: column;
        align-items: center;
        background: var(--cardBg);
    }
</style>