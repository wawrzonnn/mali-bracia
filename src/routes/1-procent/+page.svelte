<script lang="ts">
	const KRS = '0000160750';
	let copied = $state(false);

	async function copyKrs() {
		try {
			await navigator.clipboard.writeText(KRS);
			copied = true;
			setTimeout(() => (copied = false), 2000);
		} catch {
			copied = false;
		}
	}

	const steps: { n: number; title: string; desc: string; forms?: string[] }[] = [
		{
			n: 1,
			title: 'Rozlicz PIT',
			desc: 'Samodzielnie, przez księgowego lub w usłudze Twój e-PIT na podatki.gov.pl — dowolna z popularnych deklaracji.',
			forms: ['PIT-28', 'PIT-36', 'PIT-36L', 'PIT-37', 'PIT-38', 'PIT-39']
		},
		{
			n: 2,
			title: 'Wpisz numer KRS',
			desc: 'W rubryce „Wniosek o przekazanie 1,5% podatku organizacji pożytku publicznego" wpisz numer KRS Stowarzyszenia mali bracia Ubogich.'
		},
		{
			n: 3,
			title: 'Złóż deklarację',
			desc: 'To wszystko. Urząd skarbowy przekaże 1,5% Twojego podatku na konto fundacji — Ty nie płacisz nic ponad to, co i tak jesteś winny/na fiskusowi.'
		}
	];

	const impact = [
		{ num: '1000+', label: 'odwiedzonych seniorów rocznie w ramach programu „Obecność"' },
		{ num: '2000+', label: 'połączeń przyjętych przez Telefon Zaufania w 2025 roku' }
	];
</script>

<svelte:head>
	<title>Przekaż 1,5% podatku — mali bracia Ubogich</title>
	<meta
		name="description"
		content="To jedyna forma pomocy, która nic Cię nie kosztuje — to już Twój podatek, decydujesz tylko, dokąd trafi."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="landing2">
	<!-- page header -->
	<section class="page-head">
		<div class="wrap head-inner">
			<span class="eyebrow accent"><span class="rule"></span>Zaangażuj się</span>
			<h1>Przekaż 1,5% podatku</h1>
			<p class="lead">
				To jedyna forma pomocy, która nic Cię nie kosztuje — to już Twój podatek, decydujesz
				tylko, dokąd trafi.
			</p>
		</div>
	</section>

	<!-- KRS panel -->
	<section class="wrap krs-wrap">
		<div class="krs-panel">
			<div class="krs-text">
				<span class="krs-label">Numer KRS Stowarzyszenia</span>
				<span class="krs-number">{KRS}</span>
				<span class="krs-name">Stowarzyszenie mali bracia Ubogich</span>
			</div>
			<button class="copy-btn" onclick={copyKrs}>{copied ? 'Skopiowano ✓' : 'Kopiuj numer KRS'}</button>
		</div>
	</section>

	<!-- kroki -->
	<section class="wrap section">
		<div class="sec-head">
			<span class="sec-num">01</span>
			<h2>Jak to zrobić — 3 kroki</h2>
		</div>
		<div class="steps">
			{#each steps as s}
				<div class="step-card">
					<span class="step-badge">{s.n}</span>
					<div class="step-body">
						<h3>{s.title}</h3>
						<p>{s.desc}</p>
						{#if s.forms}
							<div class="pit-forms">
								{#each s.forms as f}<span class="pit-pill">{f}</span>{/each}
							</div>
						{/if}
					</div>
				</div>
			{/each}
		</div>
		<p class="deadline-note">
			Termin: rozliczenie PIT (a wraz z nim wniosek o 1,5%) składa się co roku najpóźniej
			<strong>do 30 kwietnia</strong>, za pomocą
			<a href="https://www.podatki.gov.pl/pit/twoj-e-pit/" target="_blank" rel="noopener">usługi Twój e-PIT</a>.
		</p>
	</section>

	<!-- na co idzie -->
	<section class="wrap section">
		<div class="sec-head">
			<span class="sec-num">02</span>
			<h2>Na co realnie idzie Twoje 1,5%</h2>
		</div>
		<p class="sec-lead">
			Wsparcie trafia bezpośrednio do programu <strong>„Obecność"</strong> (regularne wizyty
			wolontariuszy u samotnych seniorów) oraz na <strong>Telefon Zaufania</strong>, prowadzony
			przez wykwalifikowanych psychologów.
		</p>
		<div class="impact-grid">
			{#each impact as i}
				<div class="impact-card">
					<strong>{i.num}</strong>
					<span>{i.label}</span>
				</div>
			{/each}
		</div>
		<span class="impact-source">Dane: Stowarzyszenie mali bracia Ubogich, 2025</span>
	</section>

	<!-- final CTA -->
	<section class="wrap cta-wrap">
		<div class="cta-block">
			<div class="cta-copy">
				<span class="eyebrow accent-soft"><span class="rule accent-soft-rule"></span>Dziękujemy</span>
				<h2>1,5% to dopiero początek</h2>
				<p>
					Dzięki Tobie osoby starsze odzyskują radość życia i czują, że nie są same. Możesz też
					zostać wolontariuszem albo wesprzeć nas jednorazowo lub cyklicznie.
				</p>
			</div>
			<a href="/dolacz" class="cta-btn">Zobacz inne formy wsparcia →</a>
		</div>
	</section>
</div>

<style lang="scss">
	.landing2 {
		font-family: 'Hanken Grotesk', system-ui, sans-serif;
		color: var(--rd-ink);
		background: var(--rd-bg-paper);
		-webkit-font-smoothing: antialiased;
	}

	.wrap { max-width: 900px; margin: 0 auto; padding: 0 24px; }
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
		&.accent { color: var(--rd-accent); .rule { background: var(--rd-accent); } }
		&.accent-soft { color: var(--rd-accent-soft); .rule.accent-soft-rule { background: var(--rd-accent-soft); } }
	}

	/* ── page header ── */
	.page-head { border-bottom: 1px solid var(--rd-border); background: var(--rd-bg-paper-2); }
	.head-inner {
		padding: 72px 24px 64px;
		max-width: 760px;
		h1 { font-weight: 500; font-size: 56px; line-height: 1.03; letter-spacing: -0.015em; margin: 0 0 18px; }
	}
	.lead { font-size: 19px; line-height: 1.6; color: var(--rd-muted); margin: 0; }

	/* ── KRS panel ── */
	.krs-wrap { padding: 40px 24px 0; }
	.krs-panel {
		background: var(--rd-primary-soft-bg);
		border: 1px solid var(--rd-primary-soft-border);
		border-radius: 16px;
		padding: 32px 36px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		flex-wrap: wrap;
	}
	.krs-text { display: flex; flex-direction: column; gap: 4px; }
	.krs-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.6px; color: var(--rd-primary); }
	.krs-number { font-family: 'Newsreader', serif; font-size: 40px; font-weight: 600; letter-spacing: 0.02em; color: var(--rd-ink); }
	.krs-name { font-size: 15px; color: var(--rd-muted); }
	.copy-btn {
		flex-shrink: 0;
		white-space: nowrap;
		cursor: pointer;
		font-family: inherit;
		font-weight: 600;
		font-size: 15px;
		padding: 14px 24px;
		border-radius: 999px;
		border: none;
		background: var(--rd-primary);
		color: #fff;
		transition: background 0.15s ease;
		&:hover { background: var(--rd-primary-hover); }
	}

	/* ── section shared ── */
	.section { padding: 56px 24px 0; }
	.sec-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 20px; h2 { font-weight: 500; font-size: 34px; line-height: 1.1; margin: 0; } }
	.sec-num { font-family: 'Newsreader', serif; font-size: 15px; font-weight: 600; color: var(--rd-accent); }
	.sec-lead { font-size: 16px; line-height: 1.65; color: var(--rd-muted-2); margin: 0 0 28px; strong { color: var(--rd-ink); } }

	/* ── steps ── */
	.steps { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
	.step-card {
		display: flex;
		align-items: flex-start;
		gap: 20px;
		background: var(--rd-surface);
		border: 1px solid var(--rd-border-card);
		border-radius: 16px;
		padding: 24px 26px;
	}
	.step-badge {
		flex-shrink: 0;
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: var(--rd-primary);
		color: #fff;
		font-family: 'Newsreader', serif;
		font-weight: 600;
		font-size: 15px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.step-body {
		h3 { font-weight: 600; font-size: 21px; line-height: 1.2; margin: 0 0 8px; }
		p { font-size: 15px; line-height: 1.55; color: var(--rd-muted-2); margin: 0; }
	}
	.pit-forms { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; }
	.pit-pill {
		font-size: 12px;
		font-weight: 600;
		color: var(--rd-primary);
		background: var(--rd-primary-soft-bg);
		padding: 4px 12px;
		border-radius: 999px;
	}

	.deadline-note {
		font-size: 15px;
		color: var(--rd-muted-2);
		line-height: 1.55;
		background: var(--rd-bg-paper-2);
		border-radius: 12px;
		padding: 16px 20px;
		strong { color: var(--rd-ink); }
		a { color: var(--rd-primary); font-weight: 600; }
	}

	/* ── impact ── */
	.impact-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 12px; }
	.impact-card {
		background: var(--rd-surface);
		border: 1px solid var(--rd-border-card);
		border-radius: 16px;
		padding: 26px;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		strong { font-family: 'Newsreader', serif; font-size: 34px; font-weight: 600; color: var(--rd-ink); margin-bottom: 8px; }
		span { font-size: 14.5px; color: var(--rd-muted-2); }
	}
	.impact-source { font-size: 12px; color: var(--rd-muted-3); }

	/* ── final CTA ── */
	.cta-wrap { padding: 0 24px 88px; margin-top: 40px; }
	.cta-block {
		background: var(--rd-ink-dark);
		border-radius: 24px;
		padding: 56px;
		color: #f1e8da;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 32px;
	}
	.cta-copy {
		flex: 1;
		min-width: 260px;
		h2 { font-weight: 500; font-size: 34px; line-height: 1.15; color: #fff; margin: 0 0 12px; }
		p { font-size: 16px; line-height: 1.6; color: var(--rd-muted-dark); margin: 0; max-width: 32em; }
	}
	.cta-btn {
		flex-shrink: 0;
		text-decoration: none;
		font-weight: 600;
		font-size: 16px;
		padding: 16px 28px;
		border-radius: 999px;
		background: var(--rd-primary);
		color: #fff;
		transition: background 0.15s ease;
		&:hover { background: var(--rd-primary-hover); }
	}

	/* ── responsive ── */
	@media (max-width: 768px) {
		.wrap { padding: 0 16px; }
		.head-inner { padding: 40px 16px; }
		.head-inner h1 { font-size: 38px; }
		.krs-wrap { padding: 28px 16px 0; }
		.krs-panel { padding: 24px; flex-direction: column; align-items: flex-start; }
		.copy-btn { width: 100%; text-align: center; }
		.section { padding: 40px 16px 0; }
		.sec-head h2 { font-size: 26px; }
		.impact-grid { grid-template-columns: 1fr; }
		.cta-wrap { padding: 0 16px 56px; }
		.cta-block { padding: 32px 24px; }
		.cta-btn { width: 100%; text-align: center; }
	}
</style>
