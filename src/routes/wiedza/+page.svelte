<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';

	let { data } = $props();
</script>

<div class="page">
	<h1 class="page-title">
		{#if data.activeCategory}
			{data.activeCategory.name}
		{:else}
			Baza wiedzy
		{/if}
	</h1>

	<div class="category-filters">
		<a href="/wiedza" class="filter-chip" class:active={!data.activeCategory}>Wszystkie</a>
		{#each data.categories as cat}
			<a href="/wiedza?kategoria={cat.slug}" class="filter-chip" class:active={data.activeCategory?.slug === cat.slug} style="--chip-color: {cat.color}">
				{cat.name}
			</a>
		{/each}
	</div>

	<div class="article-list">
		{#each data.articles as article}
			<a href="/wiedza/{article.slug}" class="article-card">
				<div class="article-meta">
					<span class="badge">{article.categorySlug.replace(/-/g, ' ')}</span>
					<span class="reading-time">
						<Icon name="clock" size={14} color="#5A6B7A" />
						{article.readingTimeMin} min
					</span>
				</div>
				<h2>{article.title}</h2>
				<p>{article.summary}</p>
				<div class="tags">
					{#each article.tags as tag}
						<span class="tag">#{tag}</span>
					{/each}
				</div>
			</a>
		{:else}
			<div class="empty">
				<Icon name="book" size={40} color="#E0E7ED" />
				<p>Brak artykułów w tej kategorii</p>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'variables' as *;

	.category-filters {
		display: flex;
		gap: $spacing-sm;
		overflow-x: auto;
		padding-bottom: $spacing-md;
		margin-bottom: $spacing-lg;
		-webkit-overflow-scrolling: touch;

		&::-webkit-scrollbar { display: none; }
	}

	.filter-chip {
		white-space: nowrap;
		padding: 8px 16px;
		border-radius: $radius-full;
		font-size: $font-size-sm;
		font-weight: 600;
		background: $color-bg-card;
		color: $color-text-muted;
		border: 1.5px solid $color-border;
		text-decoration: none;
		transition: all 0.15s;
		flex-shrink: 0;

		&:hover { border-color: var(--chip-color, $color-primary); color: var(--chip-color, $color-primary); }

		&.active {
			background: var(--chip-color, $color-primary);
			color: white;
			border-color: var(--chip-color, $color-primary);
		}
	}

	.article-list {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-md;

		@media (max-width: 700px) {
			grid-template-columns: 1fr;
		}
	}

	.article-card {
		display: flex;
		flex-direction: column;
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-lg;
		border: 1px solid $color-border;
		border-top: 3px solid $color-primary-light;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.15s, box-shadow 0.15s;

		&:hover {
			border-top-color: $color-primary;
			box-shadow: $shadow-md;
		}

		h2 {
			font-size: $font-size-base;
			font-weight: 700;
			margin: $spacing-sm 0 $spacing-xs;
		}

		p {
			font-size: $font-size-sm;
			color: $color-text-muted;
			line-height: 1.5;
			flex: 1;
		}
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

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin-top: $spacing-sm;
	}

	.tag {
		font-size: $font-size-xs;
		color: $color-primary;
		background: $color-primary-bg;
		padding: 2px 8px;
		border-radius: $radius-full;
	}

	.empty {
		text-align: center;
		padding: $spacing-3xl;
		color: $color-text-muted;

		p { margin-top: $spacing-md; }
	}
</style>
