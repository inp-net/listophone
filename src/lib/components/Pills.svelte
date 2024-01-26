<script lang="ts">
    export let content="";
</script>

{#if  content!==""}
<div class="pill">
        {content}
</div>
{/if}

<style>
    .pill{
        padding: 0.4rem;
        border-radius: 0.3rem;
        background: var(--primary-color);
        color: var(--text);
    }
</style>
