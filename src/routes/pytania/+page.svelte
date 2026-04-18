<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { faqItems } from '$lib/data/faq';
	import { categories } from '$lib/data/categories';

	let openIndex = $state<number | null>(null);
	let activeCategory = $state<string | null>(null);

	const filtered = $derived(
		activeCategory ? faqItems.filter((f) => f.categorySlug === activeCategory) : faqItems
	);

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<div class="page">
	<h1 class="page-title">Często zadawane pytania</h1>

	<div class="category-filters">
		<button class="filter-chip" class:active={!activeCategory} onclick={() => (activeCategory = null)}>Wszystkie</button>
		{#each categories as cat}
			<button class="filter-chip" class:active={activeCategory === cat.slug} onclick={() => (activeCategory = cat.slug)} style="--chip-color: {cat.color}">
				{cat.name}
			</button>
		{/each}
	</div>

	<div class="faq-list">
		{#each filtered as item, i}
			<div class="faq-item" class:open={openIndex === i}>
				<button class="faq-question" onclick={() => toggle(i)}>
					<span>{item.question}</span>
					<span class="faq-chevron">
						<Icon name="chevron-down" size={20} color="#5A6B7A" />
					</span>
				</button>
				{#if openIndex === i}
					<div class="faq-answer">
						<p>{item.answer}</p>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="faq-footer">
		<p>Nie znalazłeś odpowiedzi?</p>
		<a href="/asystent" class="btn btn-primary">
			<Icon name="sparkle" size={18} color="white" />
			Zapytaj Asystenta AI
		</a>
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
		transition: all 0.15s;
		flex-shrink: 0;

		&:hover { border-color: var(--chip-color, $color-primary); color: var(--chip-color, $color-primary); }

		&.active {
			background: var(--chip-color, $color-primary);
			color: white;
			border-color: var(--chip-color, $color-primary);
		}
	}

	.faq-list {
		display: grid;
		gap: $spacing-sm;
	}

	.faq-item {
		background: $color-bg-card;
		border-radius: $radius;
		border: 1px solid $color-border;
		border-left: 3px solid $color-primary-light;
		overflow: hidden;
		transition: border-color 0.15s;

		&.open {
			border-left-color: $color-primary;
			border-color: $color-primary;
		}
	}

	.faq-question {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: $spacing-lg;
		text-align: left;
		font-weight: 700;
		font-size: $font-size-base;
		line-height: 1.4;
		gap: $spacing-md;

		span:first-child { flex: 1; }
	}

	.faq-chevron {
		flex-shrink: 0;
		transition: transform 0.2s ease;

		.open & { transform: rotate(180deg); }
	}

	.faq-answer {
		padding: 0 $spacing-lg $spacing-lg;
		background: $color-primary-bg;

		p {
			font-size: $font-size-sm;
			line-height: 1.7;
			color: $color-text;
			padding-top: $spacing-md;
		}
	}

	.faq-footer {
		text-align: center;
		margin-top: $spacing-xl;
		padding: $spacing-xl;
		background: $color-primary-bg;
		border-radius: $radius;

		p {
			font-weight: 600;
			margin-bottom: $spacing-md;
		}
	}
</style>
