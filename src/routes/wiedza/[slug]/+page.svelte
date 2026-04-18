<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	let { data } = $props();
</script>

<div class="page">
	<nav class="breadcrumb">
		<a href="/wiedza">Wiedza</a>
		<Icon name="chevron-right" size={14} color="#5A6B7A" />
		{#if data.category}
			<a href="/wiedza?kategoria={data.category.slug}">{data.category.name}</a>
			<Icon name="chevron-right" size={14} color="#5A6B7A" />
		{/if}
		<span>{data.article.title}</span>
	</nav>

	<article class="article">
		<header class="article-header">
			<div class="article-meta">
				{#if data.category}
					<span class="badge" style="background: color-mix(in srgb, {data.category.color} 15%, transparent); color: {data.category.color};">
						{data.category.name}
					</span>
				{/if}
				<span class="reading-time">
					<Icon name="clock" size={14} color="#5A6B7A" />
					{data.article.readingTimeMin} min czytania
				</span>
			</div>
			<h1>{data.article.title}</h1>
			<p class="article-summary">{data.article.summary}</p>
		</header>

		<div class="article-content">
			{@html data.article.content}
		</div>

		<div class="article-tags">
			{#each data.article.tags as tag}
				<span class="tag">#{tag}</span>
			{/each}
		</div>
	</article>

	<div class="article-footer">
		<a href="/asystent" class="btn btn-primary btn-full">
			<Icon name="sparkle" size={18} color="white" />
			Masz pytania? Zapytaj Asystenta AI
		</a>
		<a href="/wiedza" class="btn btn-secondary btn-full">
			<Icon name="arrow-right" size={18} />
			Więcej artykułów
		</a>
	</div>
</div>

<style lang="scss">
	@use 'variables' as *;

	.breadcrumb {
		display: flex;
		align-items: center;
		gap: 6px;
		font-size: $font-size-sm;
		color: $color-text-muted;
		margin-bottom: $spacing-lg;
		flex-wrap: wrap;

		a {
			color: $color-primary;
			text-decoration: none;
			&:hover { text-decoration: underline; }
		}

		span { color: $color-text; }
	}

	.article-header {
		margin-bottom: $spacing-xl;
		padding-bottom: $spacing-xl;
		border-bottom: 1px solid $color-border;

		h1 {
			font-size: $font-size-xl;
			font-weight: 800;
			line-height: 1.2;
			margin: $spacing-md 0;
			color: $color-primary;
		}
	}

	.article-summary {
		font-size: $font-size-lg;
		color: $color-text-muted;
		line-height: 1.5;
	}

	.article-meta {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
	}

	.reading-time {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: $font-size-xs;
		color: $color-text-muted;
	}

	.article-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin: $spacing-xl 0;
		padding-top: $spacing-lg;
		border-top: 1px solid $color-border;
	}

	.tag {
		font-size: $font-size-sm;
		color: $color-primary;
		background: $color-primary-bg;
		padding: 4px 12px;
		border-radius: $radius-full;
	}

	.article-footer {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: $spacing-md;
		margin-top: $spacing-lg;

		@media (max-width: 500px) {
			grid-template-columns: 1fr;
		}
	}
</style>
