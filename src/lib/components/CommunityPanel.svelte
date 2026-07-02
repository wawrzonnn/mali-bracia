<script lang="ts">
	import Icon from './Icon.svelte';
	import type { IconName } from './Icon.svelte';

	let {
		icon = 'users',
		heading,
		text,
		ctaLabel,
		ctaHref
	}: { icon?: IconName; heading: string; text: string; ctaLabel: string; ctaHref: string } = $props();
</script>

<div class="community-panel">
	<span class="community-ic"><Icon name={icon} size={22} color="white" /></span>
	<div class="community-text">
		<h2>{heading}</h2>
		<p>{text}</p>
	</div>
	<a href={ctaHref} class="btn btn-secondary community-btn">
		{ctaLabel} <Icon name="arrow-right" size={16} />
	</a>
</div>

<style lang="scss">
	@use '../styles/variables' as *;

	.community-panel {
		display: flex;
		align-items: center;
		gap: $spacing-lg;
		margin-top: $spacing-xl;
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-xl;
		flex-wrap: wrap;
	}

	.community-ic {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, $color-primary-dark);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.community-text {
		flex: 1;
		min-width: 220px;

		h2 { font-size: $font-size-base; font-weight: 700; color: $color-secondary; margin-bottom: 2px; }
		p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.5; }
	}

	.community-btn { flex-shrink: 0; white-space: nowrap; }
</style>
