<script lang="ts">
	import RedesignNav from '$lib/components/redesign/RedesignNav.svelte';
	import RedesignFooter from '$lib/components/redesign/RedesignFooter.svelte';

	let { data } = $props();

	const catMap = $derived(Object.fromEntries(data.categories.map((c) => [c.slug, c])));

	const filterPills = $derived([
		{ label: 'Wszystkie', href: '/wiedza', active: !data.activeCategory },
		...data.categories.map((c) => ({
			label: c.name,
			href: `/wiedza?kategoria=${c.slug}`,
			active: data.activeCategory?.slug === c.slug
		}))
	]);

	const featured = $derived(
		data.articles.length
			? { ...data.articles[0], catName: catMap[data.articles[0].categorySlug]?.name ?? data.articles[0].categorySlug }
			: null
	);
	const gridArticles = $derived(
		data.articles.slice(1).map((a) => ({ ...a, catName: catMap[a.categorySlug]?.name ?? a.categorySlug }))
	);

	const resultLabel = $derived.by(() => {
		const n = data.articles.length;
		const word = n === 1 ? 'artykuł' : n >= 2 && n <= 4 ? 'artykuły' : 'artykułów';
		return `${n} ${word}`;
	});

	let newsletterSent = $state(false);
	function subscribeNewsletter(e: SubmitEvent) {
		e.preventDefault();
		newsletterSent = true;
	}
</script>

<svelte:head>
	<title>Baza wiedzy — mali bracia Ubogich</title>
	<meta
		name="description"
		content="Praktyczne artykuły o starzeniu się, relacjach z seniorem i przeciwdziałaniu samotności — dla rodzin, opiekunów i wolontariuszy."
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
	<RedesignNav active="wiedza" />

	<main id="main-content" tabindex="-1">
		<!-- page header -->
		<section class="page-head">
			<div class="wrap head-inner">
				<div>
					<span class="eyebrow primary"><span class="rule"></span>Poznaj</span>
					<h1>Baza wiedzy</h1>
					<p class="lead">
						Praktyczne artykuły o starzeniu się, relacjach z seniorem i przeciwdziałaniu samotności —
						napisane dla rodzin, opiekunów i wolontariuszy.
					</p>
				</div>
				<div class="hint-card">
					<span class="hint-label">Nie wiesz od czego zacząć?</span>
					<p>Zapytaj naszego asystenta AI — odpowie na pytania o starość, samotność i opiekę.</p>
					<a href="/asystent" class="hint-link">Otwórz Asystenta AI →</a>
				</div>
			</div>
		</section>

		<!-- category filter -->
		<section class="wrap filter-wrap">
			<div class="filter-row">
				{#each filterPills as p}
					<a href={p.href} class="pill" class:active={p.active}>{p.label}</a>
				{/each}
				<span class="result-label">{resultLabel}</span>
			</div>
		</section>

		<!-- featured article -->
		{#if featured}
			<section class="wrap featured-wrap">
				<a href="/wiedza/{featured.slug}" class="featured">
					<div class="placeholder ph-1611">
						<span class="ph-caption">zdjęcie — artykuł wyróżniony</span>
					</div>
					<div class="featured-body">
						<div class="featured-meta">
							<span class="art-cat">{featured.catName}</span>
							<span class="sep-dot"></span>
							<span class="art-read">{featured.readingTimeMin} min</span>
							<span class="badge-featured">Wyróżniony</span>
						</div>
						<h2>{featured.title}</h2>
						<p>{featured.summary}</p>
						<span class="read-link">Czytaj artykuł →</span>
					</div>
				</a>
			</section>
		{/if}

		<!-- article grid -->
		<section class="wrap grid-wrap">
			<div class="art-grid">
				{#each gridArticles as art}
					<a href="/wiedza/{art.slug}" class="art-card">
						<div class="placeholder ph-1610"></div>
						<div class="art-body">
							<div class="art-meta">
								<span class="art-cat">{art.catName}</span>
								<span class="sep-dot"></span>
								<span class="art-read">{art.readingTimeMin} min</span>
							</div>
							<h3>{art.title}</h3>
							<p>{art.summary}</p>
							<span class="art-read-link">Czytaj →</span>
						</div>
					</a>
				{:else}
					{#if !featured}
						<div class="empty">Brak artykułów w tej kategorii.</div>
					{/if}
				{/each}
			</div>
		</section>

		<!-- newsletter -->
		<section class="wrap newsletter-wrap">
			<div class="newsletter">
				<div class="nl-copy">
					<span class="eyebrow accent-soft"><span class="rule accent-soft-rule"></span>Bądź na bieżąco</span>
					<h2>Nowe artykuły o starości prosto na Twój e-mail</h2>
					<p>Raz w miesiącu, praktyczna wiedza dla rodzin i wolontariuszy. Bez spamu.</p>
				</div>
				{#if newsletterSent}
					<div class="nl-thanks">Dziękujemy! Sprawdź swoją skrzynkę, by potwierdzić zapis.</div>
				{:else}
					<form class="nl-form" onsubmit={subscribeNewsletter}>
						<input type="email" required placeholder="Twój adres e-mail" />
						<button type="submit">Zapisz się</button>
					</form>
				{/if}
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
	h1, h2, h3 { font-family: 'Newsreader', serif; }

	.eyebrow {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		margin-bottom: 20px;
		.rule { width: 22px; height: 1.5px; display: inline-block; }
		&.primary { color: var(--rd-primary); .rule { background: var(--rd-primary); } }
		&.accent-soft { color: var(--rd-accent-soft); .rule.accent-soft-rule { background: var(--rd-accent-soft); } }
	}

	/* ── page header ── */
	.page-head { border-bottom: 1px solid var(--rd-border); background: var(--rd-bg-paper-2); }
	.head-inner {
		padding: 72px 24px 64px;
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 48px;
		align-items: end;

		h1 { font-weight: 500; font-size: 56px; line-height: 1.03; letter-spacing: -0.015em; margin: 0 0 18px; }
	}
	.lead { font-size: 19px; line-height: 1.6; color: var(--rd-muted); max-width: 34em; margin: 0; }

	.hint-card {
		display: flex;
		flex-direction: column;
		gap: 12px;
		justify-self: end;
		background: #fff;
		border: 1px solid var(--rd-border-card);
		border-radius: 16px;
		padding: 24px 26px;
		max-width: 320px;
		box-shadow: 0 18px 40px -24px rgba(34, 29, 24, 0.35);

		.hint-label { font-size: 12px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: var(--rd-accent); }
		p { font-size: 15px; line-height: 1.55; color: var(--rd-muted); margin: 0; }
	}
	.hint-link { text-decoration: none; font-weight: 600; font-size: 15px; color: var(--rd-primary); margin-top: 2px; }

	/* ── filter ── */
	.filter-wrap { padding: 34px 24px 0; }
	.filter-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
	.pill {
		cursor: pointer;
		font-size: 14.5px;
		font-weight: 600;
		padding: 10px 18px;
		border-radius: 999px;
		transition: all 0.15s ease;
		text-decoration: none;
		background: transparent;
		color: var(--rd-muted);
		border: 1.5px solid var(--rd-border-tab);
		&:hover { border-color: var(--rd-primary); color: var(--rd-primary); }
		&.active { background: var(--rd-ink); color: #fff; border-color: var(--rd-ink); &:hover { color: #fff; } }
	}
	.result-label { margin-left: auto; font-size: 14px; color: var(--rd-muted-3); white-space: nowrap; }

	/* ── placeholders ── */
	.placeholder {
		background: repeating-linear-gradient(48deg, var(--rd-ph-a), var(--rd-ph-a) 12px, var(--rd-ph-b) 12px, var(--rd-ph-b) 24px);
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
		padding: 16px;
	}
	.ph-caption {
		font-family: ui-monospace, Menlo, monospace;
		font-size: 12px;
		color: #9a8e7c;
		background: rgba(250, 246, 239, 0.85);
		padding: 6px 12px;
		border-radius: 8px;
	}
	.ph-1611 { aspect-ratio: 16 / 11; }
	.ph-1610 { aspect-ratio: 16 / 10; border-bottom: 1px solid var(--rd-border-card); }

	.sep-dot { width: 4px; height: 4px; border-radius: 50%; background: var(--rd-dot); flex-shrink: 0; }
	.art-cat { font-size: 12px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--rd-accent); }
	.art-read { font-size: 13px; color: var(--rd-muted-3); }

	/* ── featured ── */
	.featured-wrap { padding: 32px 24px 0; }
	.featured {
		text-decoration: none;
		color: inherit;
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		background: var(--rd-surface);
		border: 1px solid var(--rd-border-card);
		border-radius: 20px;
		overflow: hidden;
		transition: border-color 0.15s ease;
		&:hover { border-color: var(--rd-primary); }
	}
	.featured-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
	.badge-featured {
		margin-left: auto;
		font-size: 11px;
		font-weight: 600;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--rd-primary);
		border: 1px solid var(--rd-primary-soft-border);
		background: var(--rd-primary-soft-bg);
		padding: 4px 10px;
		border-radius: 999px;
	}
	.featured-body {
		padding: 44px 44px 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		h2 { font-weight: 600; font-size: 34px; line-height: 1.12; letter-spacing: -0.01em; margin: 0 0 14px; }
		p { font-size: 17px; line-height: 1.6; color: var(--rd-muted); margin: 0 0 22px; }
	}
	.read-link { font-weight: 600; font-size: 15px; color: var(--rd-primary); }

	/* ── grid ── */
	.grid-wrap { padding: 28px 24px 40px; }
	.art-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
	.empty { grid-column: 1 / -1; text-align: center; padding: 48px 0; color: var(--rd-muted-3); font-size: 15px; }
	.art-card {
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		background: var(--rd-surface);
		border: 1px solid var(--rd-border-card);
		border-radius: 16px;
		overflow: hidden;
		transition: border-color 0.15s ease, transform 0.15s ease;
		&:hover { border-color: var(--rd-primary); transform: translateY(-3px); }
	}
	.art-meta { display: flex; align-items: center; gap: 10px; margin-bottom: 11px; }
	.art-body {
		padding: 22px 22px 24px;
		display: flex;
		flex-direction: column;
		flex: 1;
		h3 { font-weight: 600; font-size: 21px; line-height: 1.22; margin: 0 0 9px; }
		p { font-size: 14.5px; line-height: 1.55; color: var(--rd-muted-2); margin: 0; }
	}
	.art-read-link { margin-top: auto; padding-top: 18px; font-weight: 600; font-size: 14px; color: var(--rd-primary); }

	/* ── newsletter ── */
	.newsletter-wrap { padding: 0 24px 88px; }
	.newsletter {
		background: var(--rd-ink-dark);
		border-radius: 24px;
		padding: 60px 56px;
		color: #f1e8da;
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 40px;
		align-items: center;

		h2 { font-weight: 500; font-size: 36px; line-height: 1.12; color: #fff; margin: 12px 0 12px; max-width: 14em; }
		p { font-size: 16px; line-height: 1.6; color: var(--rd-muted-dark); margin: 0; max-width: 32em; }
	}
	.nl-form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		input {
			padding: 15px 18px;
			border-radius: 999px;
			border: 1px solid var(--rd-border-dark);
			background: var(--rd-ink-card-dark);
			color: #fff;
			font-size: 15px;
			font-family: inherit;
			outline: none;
			&::placeholder { color: var(--rd-muted-dark-3); }
			&:focus { border-color: var(--rd-primary); }
		}
		button {
			border: none;
			cursor: pointer;
			font-family: inherit;
			font-weight: 600;
			font-size: 16px;
			padding: 15px 24px;
			border-radius: 999px;
			background: var(--rd-primary);
			color: #fff;
			&:hover { background: var(--rd-primary-hover); }
		}
	}
	.nl-thanks {
		font-size: 15px;
		font-weight: 600;
		color: var(--rd-accent-soft);
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--rd-border-dark);
		border-radius: 14px;
		padding: 20px 22px;
	}

	/* ── responsive ── */
	@media (max-width: 980px) {
		.head-inner { grid-template-columns: 1fr; align-items: start; }
		.hint-card { justify-self: start; max-width: 100%; }
		.featured { grid-template-columns: 1fr; }
		.art-grid { grid-template-columns: repeat(2, 1fr); }
		.newsletter { grid-template-columns: 1fr; }
	}

	@media (max-width: 768px) {
		.wrap { padding: 0 16px; }
		.head-inner { padding: 40px 16px 40px; }
		.head-inner h1 { font-size: 38px; }
		.featured-wrap, .grid-wrap { padding-left: 16px; padding-right: 16px; }
		.featured-body { padding: 28px 24px; }
		.featured-body h2 { font-size: 26px; }
		.art-grid { grid-template-columns: 1fr; }
		.newsletter { padding: 40px 24px; }
		.newsletter h2 { font-size: 28px; }
		.newsletter-wrap { padding: 0 16px 56px; }
	}
</style>
