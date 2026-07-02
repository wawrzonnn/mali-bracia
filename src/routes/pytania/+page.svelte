<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { faqItems } from '$lib/data/faq';
	import { categories } from '$lib/data/categories';

	let openIndex = $state<number | null>(null);
	let activeCategory = $state<string | null>(null);

	const filtered = $derived(
		activeCategory ? faqItems.filter((f) => f.categorySlug === activeCategory) : faqItems
	);

	const catColor = Object.fromEntries(categories.map((c) => [c.slug, c.color]));

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<div class="page">
	<PageHeader
		eyebrow="Pomoc"
		title="Najczęstsze pytania"
		subtitle="Odpowiedzi na pytania o starość, wolontariat i wspieranie seniorów."
	/>

	<div class="filters">
		<button class="chip" class:active={!activeCategory} onclick={() => (activeCategory = null)}>
			Wszystkie
		</button>
		{#each categories as cat}
			<button
				class="chip"
				class:active={activeCategory === cat.slug}
				onclick={() => (activeCategory = cat.slug)}
				style="--c: {cat.color}"
			>
				{cat.name}
			</button>
		{/each}
	</div>

	<div class="faq-list">
		{#each filtered as item, i (item.question)}
			<div class="faq-item" class:open={openIndex === i}>
				<button class="faq-q" onclick={() => toggle(i)} aria-expanded={openIndex === i}>
					<span class="q-dot" style="background: {catColor[item.categorySlug] ?? '#169FDB'}"></span>
					<span class="q-text">{item.question}</span>
					<span class="chevron"><Icon name="chevron-down" size={20} color="#5A6B7A" /></span>
				</button>
				{#if openIndex === i}
					<div class="faq-a"><p>{item.answer}</p></div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="faq-cta">
		<div class="cta-ic"><Icon name="sparkle" size={22} color="white" /></div>
		<div class="cta-body">
			<strong>Nie znalazłeś odpowiedzi?</strong>
			<span>Zapytaj asystenta AI — odpowie w oparciu o materiały Stowarzyszenia.</span>
		</div>
		<a href="/asystent" class="btn btn-primary">Zapytaj AI</a>
	</div>
</div>

<style lang="scss">
	@use 'variables' as *;

	.filters {
		display: flex;
		gap: $spacing-sm;
		overflow-x: auto;
		margin-bottom: $spacing-2xl;
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
		transition: all 0.15s ease;
		flex-shrink: 0;

		&:hover { border-color: var(--c, $color-primary); color: var(--c, $color-primary); }

		&.active {
			background: var(--c, $color-primary);
			color: white;
			border-color: var(--c, $color-primary);
		}
	}

	.faq-list {
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
	}

	.faq-item {
		background: $color-bg-card;
		border-radius: $radius;
		border: 1px solid $color-border;
		overflow: hidden;
		transition: border-color 0.15s ease, box-shadow 0.15s ease;

		&:hover { border-color: $color-primary-light; }
		&.open { border-color: $color-primary; box-shadow: $shadow-sm; }
	}

	.faq-q {
		display: flex;
		align-items: center;
		width: 100%;
		padding: $spacing-lg;
		text-align: left;
		font-weight: 700;
		font-size: $font-size-base;
		line-height: 1.4;
		color: $color-secondary;
		gap: 14px;
	}

	.q-dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.q-text { flex: 1; }

	.chevron {
		flex-shrink: 0;
		transition: transform 0.2s ease;
		.open & { transform: rotate(180deg); }
	}

	.faq-a {
		padding: 0 $spacing-lg $spacing-lg;

		p {
			font-size: $font-size-sm;
			line-height: 1.7;
			color: $color-text-muted;
			padding-top: $spacing-sm;
			border-top: 1px solid $color-border;
		}
	}

	.faq-cta {
		display: flex;
		align-items: center;
		gap: $spacing-lg;
		margin-top: $spacing-2xl;
		padding: $spacing-lg $spacing-xl;
		border-radius: $radius;
		background: linear-gradient(135deg, $color-primary-bg, #E4F1FB);
		border: 1px solid $color-border;
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
</style>
