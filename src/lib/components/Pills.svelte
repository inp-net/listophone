<script lang="ts">
	interface Props {
		content?: string;
		class: 'filiere' | 'styleListe1' | 'styleListe2';
	}

	let { content = '', class: theme }: Props = $props();
	
</script>

{#if content !== ''}
	<div class="pill {theme}">
		{content}
	</div>
{/if}

<style lang="scss">
    .pill{
        display: inline-flex;
        align-items: center;
        font-size: 1rem;
        padding: 0.4rem;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border-radius: 0.3rem;
        margin: 0.25rem;
        color: black;

		&.filiere {
			background: var(--bg);
		}

		&.styleListe1 {
			background: var(--liste1-bg-color);
			color: var(--liste1-text-color);
		}

		&.styleListe2 {
			background: var(--liste2-bg-color);
			color: var(--liste2-text-color);
		}
	}
</style>
