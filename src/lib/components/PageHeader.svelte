<script lang="ts">
	let {
		eyebrow = '',
		title,
		subtitle = ''
	}: { eyebrow?: string; title: string; subtitle?: string } = $props();
</script>

<header class="page-header">
	{#if eyebrow}<span class="ph-eyebrow">{eyebrow}</span>{/if}
	<h1>{title}</h1>
	{#if subtitle}<p class="ph-sub">{subtitle}</p>{/if}
</header>

<style lang="scss">
	@use 'variables' as *;

	.page-header {
		margin-bottom: $spacing-2xl;
	}

	.ph-eyebrow {
		display: inline-block;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1.4px;
		color: $color-primary;
		margin-bottom: 12px;
	}

	h1 {
		font-family: $font-serif;
		font-size: 34px;
		font-weight: 700;
		letter-spacing: -0.01em;
		line-height: 1.15;
		color: $color-secondary;

		@media (max-width: 600px) { font-size: 27px; }
	}

	.ph-sub {
		font-size: $font-size-lg;
		color: $color-text-muted;
		line-height: 1.5;
		margin-top: 10px;
		max-width: 660px;

		@media (max-width: 600px) { font-size: $font-size-base; }
	}
</style>
