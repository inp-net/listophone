<script lang="ts">
    import Icon from "@iconify/svelte";

    export let type ="";
    export let href ="";
    export let num ="";
</script>

<a href={(type === "call") ? "tel:"+num: href}>
    {#if type === "call"}
        <Icon icon="mdi:phone"/>
    {/if}
    <slot/>
</a>

<style>
    a{
        padding: 0.4rem;
        font-size: 1.25em;
        border-radius: 0.3rem;
        background: var(--cardBg);
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
