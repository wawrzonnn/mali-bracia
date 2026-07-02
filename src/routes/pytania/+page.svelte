<script lang="ts">
	import RedesignNav from '$lib/components/redesign/RedesignNav.svelte';
	import RedesignFooter from '$lib/components/redesign/RedesignFooter.svelte';
	import { faqItems } from '$lib/data/faq';
	import { categories } from '$lib/data/categories';

	let activeCategory = $state<string | null>(null);
	let openSet = $state<Set<number>>(new Set());

	const indexed = faqItems.map((item, i) => ({ item, i }));
	const filtered = $derived(
		activeCategory ? indexed.filter((x) => x.item.categorySlug === activeCategory) : indexed
	);

	function toggle(i: number) {
		const next = new Set(openSet);
		if (next.has(i)) next.delete(i);
		else next.add(i);
		openSet = next;
	}
</script>

<svelte:head>
	<title>Najczęstsze pytania — mali bracia Ubogich</title>
	<meta
		name="description"
		content="Krótkie, praktyczne odpowiedzi na pytania o starość, wolontariat i wspieranie seniorów."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<a href="#main-content" class="skip-link">Przejdź do treści</a>

<div class="landing2">
	<RedesignNav active="pytania" />

	<main id="main-content" tabindex="-1">
		<!-- page header -->
		<section class="page-head">
			<div class="wrap head-inner">
				<span class="eyebrow primary"><span class="rule"></span>Pomoc</span>
				<h1>Najczęstsze pytania</h1>
				<p class="lead">
					Krótkie, praktyczne odpowiedzi na pytania o starość, wolontariat i wspieranie seniorów.
					Nie znalazłeś swojego — zapytaj naszego asystenta AI.
				</p>
			</div>
		</section>

		<!-- category filter -->
		<section class="narrow filter-wrap">
			<div class="filter-row">
				<button class="pill" class:active={!activeCategory} onclick={() => (activeCategory = null)}>Wszystkie</button>
				{#each categories as cat}
					<button class="pill" class:active={activeCategory === cat.slug} onclick={() => (activeCategory = cat.slug)}>
						{cat.name}
					</button>
				{/each}
			</div>
		</section>

		<!-- accordion -->
		<section class="narrow accordion-wrap">
			<div class="accordion">
				{#each filtered as { item, i } (item.question)}
					<div class="faq-card">
						<button class="faq-btn" onclick={() => toggle(i)} aria-expanded={openSet.has(i)}>
							<span class="faq-q">{item.question}</span>
							<span class="faq-indicator" class:open={openSet.has(i)}>{openSet.has(i) ? '–' : '+'}</span>
						</button>
						{#if openSet.has(i)}
							<div class="faq-answer">{item.answer}</div>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- ask AI CTA -->
		<section class="narrow ask-wrap">
			<div class="ask-cta">
				<div class="ask-copy">
					<h2>Nie znalazłeś odpowiedzi?</h2>
					<p>Zapytaj asystenta AI — odpowie w oparciu o materiały Stowarzyszenia, o każdej porze.</p>
				</div>
				<a href="/asystent" class="ask-btn">Zapytaj AI →</a>
			</div>
		</section>
	</main>

	<RedesignFooter />
</div>

<style lang="scss">
	.landing2 {
		font-family: 'Hanken Grotesk', system-ui, sans-serif;
		color: var(--rd-ink);
		background: var(--rd-bg-paper);
		-webkit-font-smoothing: antialiased;
	}

	.skip-link {
		position: fixed;
		top: -80px;
		left: 8px;
		z-index: 1000;
		background: var(--rd-primary);
		color: #fff;
		padding: 10px 18px;
		border-radius: 8px;
		font-weight: 700;
		text-decoration: none;
		transition: top 0.16s ease;
		&:focus { top: 8px; }
	}

	.wrap { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
	.narrow { max-width: 900px; margin: 0 auto; padding: 0 24px; }
	h1, h2 { font-family: 'Newsreader', serif; }

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		margin-bottom: 20px;
		color: var(--rd-primary);
		.rule { width: 22px; height: 1.5px; display: inline-block; background: var(--rd-primary); }
	}

	/* ── page header ── */
	.page-head { border-bottom: 1px solid var(--rd-border); background: var(--rd-bg-paper-2); }
	.head-inner {
		padding: 72px 24px 64px;
		max-width: 760px;
		h1 { font-weight: 500; font-size: 56px; line-height: 1.03; letter-spacing: -0.015em; margin: 0 0 18px; }
	}
	.lead { font-size: 19px; line-height: 1.6; color: var(--rd-muted); margin: 0; }

	/* ── filter ── */
	.filter-wrap { padding: 34px 24px 0; }
	.filter-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
	.pill {
		cursor: pointer;
		font-family: inherit;
		font-size: 14.5px;
		font-weight: 600;
		padding: 10px 18px;
		border-radius: 999px;
		transition: all 0.15s ease;
		background: transparent;
		color: var(--rd-muted);
		border: 1.5px solid var(--rd-border-tab);
		&:hover { border-color: var(--rd-ink); color: var(--rd-ink); }
		&.active { background: var(--rd-ink); color: #fff; border-color: var(--rd-ink); &:hover { color: #fff; } }
	}

	/* ── accordion ── */
	.accordion-wrap { padding: 28px 24px 40px; }
	.accordion { display: flex; flex-direction: column; gap: 12px; }
	.faq-card { background: var(--rd-surface); border: 1px solid var(--rd-border-card); border-radius: 14px; overflow: hidden; }
	.faq-btn {
		width: 100%;
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		background: transparent;
		border: none;
		padding: 22px 24px;
		display: flex;
		align-items: center;
		gap: 18px;
	}
	.faq-q { flex: 1; font-family: 'Newsreader', serif; font-weight: 600; font-size: 20px; line-height: 1.28; color: var(--rd-ink); }
	.faq-indicator {
		flex: none;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: var(--rd-bg-paper-2);
		color: var(--rd-muted-3);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20px;
		line-height: 1;
		transition: background 0.15s ease, color 0.15s ease;
		&.open { background: var(--rd-primary); color: #fff; }
	}
	.faq-answer { padding: 0 62px 24px 24px; font-size: 16px; line-height: 1.65; color: var(--rd-muted); }

	/* ── ask AI CTA ── */
	.ask-wrap { padding: 0 24px 88px; }
	.ask-cta {
		background: var(--rd-ink-dark);
		border-radius: 22px;
		padding: 44px 48px;
		color: #f1e8da;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 24px 40px;
	}
	.ask-copy {
		flex: 1;
		min-width: 260px;
		h2 { font-weight: 500; font-size: 28px; line-height: 1.15; color: #fff; margin: 0 0 8px; }
		p { font-size: 16px; line-height: 1.6; color: var(--rd-muted-dark); margin: 0; }
	}
	.ask-btn {
		text-decoration: none;
		flex: none;
		font-weight: 600;
		font-size: 16px;
		padding: 16px 30px;
		border-radius: 999px;
		background: var(--rd-primary);
		color: #fff;
		transition: background 0.15s ease;
		&:hover { background: var(--rd-primary-hover); }
	}

	/* ── responsive ── */
	@media (max-width: 768px) {
		.wrap, .narrow { padding: 0 16px; }
		.head-inner { padding: 40px 16px; }
		.head-inner h1 { font-size: 38px; }
		.filter-wrap { padding: 28px 16px 0; }
		.accordion-wrap { padding: 20px 16px 32px; }
		.faq-q { font-size: 18px; }
		.faq-answer { padding: 0 24px 20px; }
		.ask-wrap { padding: 0 16px 56px; }
		.ask-cta { padding: 32px 24px; flex-direction: column; align-items: flex-start; }
		.ask-btn { width: 100%; text-align: center; }
	}
</style>
