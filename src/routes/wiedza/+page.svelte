<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { IconName } from '$lib/data/categories';

	let { data } = $props();

	const catMap = $derived(Object.fromEntries(data.categories.map((c) => [c.slug, c])));
	const showFeatured = $derived(!data.activeCategory && data.articles.length > 3);
	const featured = $derived(showFeatured ? data.articles[0] : null);
	const rest = $derived(showFeatured ? data.articles.slice(1) : data.articles);
</script>

<div class="page">
	<PageHeader
		eyebrow="Poznaj"
		title={data.activeCategory ? data.activeCategory.name : 'Baza wiedzy'}
		subtitle={data.activeCategory
			? data.activeCategory.description
			: 'Praktyczne artykuły o starzeniu się, relacjach z seniorem i przeciwdziałaniu samotności.'}
	/>

	<div class="filters">
		<a href="/wiedza" class="chip" class:active={!data.activeCategory}>Wszystkie</a>
		{#each data.categories as cat}
			<a
				href="/wiedza?kategoria={cat.slug}"
				class="chip"
				class:active={data.activeCategory?.slug === cat.slug}
				style="--c: {cat.color}"
			>
				{cat.name}
			</a>
		{/each}
	</div>

	{#if featured}
		{@const cat = catMap[featured.categorySlug]}
		<a href="/wiedza/{featured.slug}" class="featured" style="--c: {cat?.color ?? '#169FDB'}">
			<div class="featured-visual">
				<span class="featured-ic">
					<Icon name={(cat?.icon ?? 'book') as IconName} size={40} color="white" />
				</span>
			</div>
			<div class="featured-body">
				<div class="art-row">
					<span class="art-badge">{cat?.name ?? featured.categorySlug}</span>
					<span class="art-time"><Icon name="clock" size={13} color="#8794A1" /> {featured.readingTimeMin} min</span>
				</div>
				<h2>{featured.title}</h2>
				<p>{featured.summary}</p>
				<span class="read">Czytaj artykuł <Icon name="arrow-right" size={16} color="var(--c)" /></span>
			</div>
		</a>
	{/if}

	<div class="articles">
		{#each rest as article}
			{@const cat = catMap[article.categorySlug]}
			<a href="/wiedza/{article.slug}" class="art" style="--c: {cat?.color ?? '#169FDB'}">
				<span class="art-ic">
					<Icon name={(cat?.icon ?? 'book') as IconName} size={22} color="var(--c)" />
				</span>
				<span class="art-badge">{cat?.name ?? article.categorySlug.replace(/-/g, ' ')}</span>
				<span class="art-h">{article.title}</span>
				<span class="art-p">{article.summary}</span>
				<span class="art-foot">
					<span class="art-time"><Icon name="clock" size={13} color="#8794A1" /> {article.readingTimeMin} min</span>
					<span class="go">Czytaj <Icon name="arrow-right" size={15} color="var(--c)" /></span>
				</span>
			</a>
		{:else}
			<div class="empty">
				<Icon name="book" size={40} color="#C9D2DA" />
				<p>Brak artykułów w tej kategorii</p>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	@use 'variables' as *;

	.filters {
		display: flex;
		gap: $spacing-sm;
		overflow-x: auto;
		margin-bottom: $spacing-xl;
		-webkit-overflow-scrolling: touch;
		&::-webkit-scrollbar { display: none; }
	}

	.chip {
		white-space: nowrap;
		padding: 9px 18px;
		border-radius: $radius-full;
		font-size: $font-size-sm;
		font-weight: 600;
		background: $color-bg-card;
		color: $color-text-muted;
		border: 1.5px solid $color-border;
		text-decoration: none;
		transition: all 0.15s ease;
		flex-shrink: 0;

		&:hover { border-color: var(--c, $color-primary); color: var(--c, $color-primary); }
		&.active { background: var(--c, $color-primary); color: white; border-color: var(--c, $color-primary); }
	}

	/* wspólne elementy karty */
	.art-badge {
		align-self: flex-start;
		padding: 4px 12px;
		border-radius: $radius-full;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.4px;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		color: var(--c);
	}

	.art-time {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: 12px;
		color: #8794A1;
	}

	.art-h {
		font-size: $font-size-lg;
		font-weight: 700;
		color: $color-secondary;
		line-height: 1.3;
	}

	.art-p {
		font-size: $font-size-sm;
		color: $color-text-muted;
		line-height: 1.55;
	}

	/* ── FEATURED ── */
	.featured {
		display: grid;
		grid-template-columns: 220px 1fr;
		gap: 0;
		border-radius: $radius-lg;
		overflow: hidden;
		border: 1px solid $color-border;
		background: $color-bg-card;
		text-decoration: none;
		color: inherit;
		margin-bottom: $spacing-lg;
		transition: transform 0.16s ease, box-shadow 0.16s ease;

		&:hover {
			transform: translateY(-2px);
			box-shadow: $shadow-lg;
			.read :global(svg) { transform: translateX(4px); }
		}

		@media (max-width: 720px) { grid-template-columns: 1fr; }
	}

	.featured-visual {
		background: linear-gradient(150deg, color-mix(in srgb, var(--c) 88%, black), var(--c));
		display: flex;
		align-items: center;
		justify-content: center;
		padding: $spacing-2xl;
		@media (max-width: 720px) { padding: $spacing-xl; }
	}

	.featured-ic {
		width: 84px;
		height: 84px;
		border-radius: $radius-lg;
		background: rgba(255, 255, 255, 0.18);
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.featured-body {
		padding: $spacing-2xl;
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;

		h2 { font-size: 24px; font-weight: 700; letter-spacing: -0.01em; color: $color-secondary; line-height: 1.25; }
		p { font-size: $font-size-base; color: $color-text-muted; line-height: 1.6; }
	}

	.art-row {
		display: flex;
		align-items: center;
		gap: $spacing-md;
	}

	.read {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		margin-top: $spacing-sm;
		font-size: $font-size-sm;
		font-weight: 700;
		color: var(--c);
		:global(svg) { transition: transform 0.16s ease; }
	}

	/* ── GRID ── */
	.articles {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-lg;
		@media (max-width: 1000px) { grid-template-columns: repeat(2, 1fr); }
		@media (max-width: 640px) { grid-template-columns: 1fr; }
	}

	.art {
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-xl;
		border: 1px solid $color-border;
		text-decoration: none;
		color: inherit;
		transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;

		&:hover {
			transform: translateY(-3px);
			border-color: color-mix(in srgb, var(--c) 45%, $color-border);
			box-shadow: $shadow-md;
			.go :global(svg) { transform: translateX(3px); }
		}
	}

	.art-ic {
		width: 48px;
		height: 48px;
		border-radius: $radius;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		margin-bottom: 4px;
	}

	.art .art-h {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.art .art-p {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		flex: 1;
	}

	.art-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: $spacing-md;
		padding-top: $spacing-md;
		border-top: 1px solid $color-border;
	}

	.go {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-size: $font-size-sm;
		font-weight: 700;
		color: var(--c);
		:global(svg) { transition: transform 0.16s ease; }
	}

	.empty {
		grid-column: 1 / -1;
		text-align: center;
		padding: $spacing-3xl;
		color: $color-text-muted;
		p { margin-top: $spacing-md; }
	}
</style>
