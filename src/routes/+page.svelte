<script lang="ts">
    import Button from '$lib/components/Button.svelte';
	import CardListeux from '$lib/components/CardListeux.svelte';

</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<section>
    <p>deziz</p>
    <Button>petit caca</Button>
    <CardListeux></CardListeux>
</section>


<style lang=scss>
    @use '../style/app.scss' as *;
    section{
        display: flex;
        flex-direction: column;
        align-items: center;

        background: var(--cardBg);
    }
</style>