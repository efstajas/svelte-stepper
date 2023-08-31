<script lang="ts">
	export let max: number;
	export let curr: number;
	export let duration: number;
</script>

<div class="progress-bar">
	<div
		class="inner"
		style:width="{(curr / max) * 100}%"
		style:transition="width {duration}ms ease"
	/>
</div>

<style>
	.progress-bar {
		width: 100%;
		height: 0.5rem;
		background-color: var(--color-primary-level-1);
	}

	.progress-bar .inner {
		height: 100%;
		background-color: var(--color-primary-level-2);
		transition: width 300ms ease;
		border-radius: 0 1rem 1rem 0;
	}
</style>
