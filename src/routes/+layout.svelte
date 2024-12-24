<script lang="ts">
	import type { LayoutData } from './$types';
	import '../style/app.scss';

	interface Props {
		data: LayoutData;
		children?: import('svelte').Snippet;
	}

	let { data, children }: Props = $props();
</script>

<main>
	{@render children?.()}
</main>
