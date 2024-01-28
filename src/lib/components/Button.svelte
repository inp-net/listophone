<script lang="ts">
    export let type ="";
    export let href ="";
    export let num ="";
</script>

<a href={(type === "call") ? "tel:"+num: href}>
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
        width:130px;
    }
</style>
