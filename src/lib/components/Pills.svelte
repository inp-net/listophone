<script lang="ts">
    export let content : string='';
    let theme: 'filiere' | 'clubs';
    export {theme as class};
</script>

{#if content!==""}
    <div class="pill {theme}">
        {content}
    </div>
{/if}

<style lang="scss">
    .pill{
        font-size: 1rem;
        padding: 0.4rem;
        padding-left: 0.7rem;
        padding-right: 0.7rem;
        border-radius: 0.3rem;
        color: var(--text);
    }

    .pill.filiere{
        background: var(--bg);
    }

    .pill.clubs{
        background: var(--primary-color)
    }
</style>
