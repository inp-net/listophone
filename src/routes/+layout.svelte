<script lang="ts">
    import type { LayoutData } from './$types';
    import "../style/app.scss";

    export let data: LayoutData;
</script>

<main>
    <slot/>
</main>