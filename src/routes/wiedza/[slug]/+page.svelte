<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	let { data } = $props();
</script>

<div class="page">
	<nav class="breadcrumb">
		<a href="/wiedza">Baza wiedzy</a>
		<Icon name="chevron-right" size={14} color="#8794A1" />
		{#if data.category}
			<a href="/wiedza?kategoria={data.category.slug}">{data.category.name}</a>
			<Icon name="chevron-right" size={14} color="#8794A1" />
		{/if}
		<span>{data.article.title}</span>
	</nav>

	<article class="article">
		<header class="article-header">
			<div class="meta">
				{#if data.category}
					<span
						class="badge"
						style="background: color-mix(in srgb, {data.category.color} 12%, transparent); color: {data.category.color};"
					>
						{data.category.name}
					</span>
				{/if}
				<span class="reading-time">
					<Icon name="clock" size={14} color="#8794A1" />
					{data.article.readingTimeMin} min czytania
				</span>
			</div>
			<h1>{data.article.title}</h1>
			<p class="summary">{data.article.summary}</p>
		</header>

		<div class="article-content">
			{@html data.article.content}
		</div>

		<div class="tags">
			{#each data.article.tags as tag}
				<span class="tag">#{tag}</span>
			{/each}
		</div>

		<div class="cta">
			<div class="cta-ic"><Icon name="sparkle" size={22} color="white" /></div>
			<div class="cta-body">
				<strong>Masz pytania do tego tematu?</strong>
				<span>Asystent AI odpowie w oparciu o materiały Stowarzyszenia.</span>
			</div>
			<a href="/asystent" class="btn btn-primary">Zapytaj AI</a>
		</div>

		<a href="/wiedza" class="back-link">
			<Icon name="arrow-right" size={16} color="#169FDB" />
			Wróć do wszystkich artykułów
		</a>
	</article>
</div>

<style lang="scss">
	@use 'variables' as *;

	.article { max-width: 760px; }

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: $font-size-sm;
		color: $color-text-muted;
		margin-bottom: $spacing-xl;
		flex-wrap: wrap;

		a { color: $color-primary; text-decoration: none; &:hover { text-decoration: underline; } }
		span { color: $color-text; }
	}

	.article-header {
		margin-bottom: $spacing-xl;
		padding-bottom: $spacing-xl;
		border-bottom: 1px solid $color-border;
	}

	.meta {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		margin-bottom: $spacing-lg;
	}

	.badge {
		padding: 5px 14px;
		border-radius: $radius-full;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.4px;
	}

	.reading-time {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 13px;
		color: $color-text-muted;
	}

	h1 {
		font-family: $font-serif;
		font-size: clamp(28px, 3.6vw, 42px);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: -0.01em;
		color: $color-secondary;
		margin-bottom: $spacing-md;
	}

	.summary {
		font-size: $font-size-lg;
		color: $color-text-muted;
		line-height: 1.6;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: $spacing-xl 0;
		padding-top: $spacing-lg;
		border-top: 1px solid $color-border;
	}

	.tag {
		font-size: $font-size-sm;
		color: $color-text-muted;
		background: $color-bg-soft;
		padding: 4px 12px;
		border-radius: $radius-full;
	}

	.cta {
		display: flex;
		align-items: center;
		gap: $spacing-lg;
		padding: $spacing-lg $spacing-xl;
		border-radius: $radius;
		background: linear-gradient(135deg, $color-primary-bg, #E4F1FB);
		border: 1px solid $color-border;
		margin-bottom: $spacing-xl;
		flex-wrap: wrap;

		.btn { margin-left: auto; @media (max-width: 560px) { margin-left: 0; width: 100%; } }
	}

	.cta-ic {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, $color-primary-dark);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.cta-body {
		display: flex;
		flex-direction: column;
		gap: 3px;
		strong { font-size: $font-size-base; font-weight: 700; color: $color-secondary; }
		span { font-size: $font-size-sm; color: $color-text-muted; }
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-primary;
		text-decoration: none;
		:global(svg) { transform: rotate(180deg); }
		&:hover { text-decoration: underline; }
	}
</style>
