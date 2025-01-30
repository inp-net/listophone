<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		class?: string;
		disabled?: boolean;
		onclick?: () => void;
	}

	let { children, class: className, disabled, onclick }: Props = $props();
</script>

<div class="composant">
	<button {onclick} {disabled} class={className}>
		{@render children?.()}
	</button>
</div>

<style lang="scss">
	.composant {
		display: flex;
	}
	button {
		font-size: 1.25em;
		border-radius: 0.3rem;
		border: 0;
		gap: 0.3rem;
		width: 130px;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--neutral-bg-color);
		color: var(--neutral-text-color);

		padding: 0.3rem;

		cursor: pointer;
		&.comboButton {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		&.styleListe1 {
			color: var(--liste1-text-color);
			background: var(--liste1-bg-color);
			&:hover {
				background: var(--liste1-bg-color-hover);
			}
		}

		&.styleListe2 {
			color: var(--liste2-text-color);
			background: var(--liste2-bg-color);
			&:hover {
				background: var(--liste2-bg-color-hover);
			}
		}

		&:hover {
			background: var(--neutral-bg-color-hover);
		}
	}
</style>
