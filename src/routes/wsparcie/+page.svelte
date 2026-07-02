<script lang="ts">
	import RedesignNav from '$lib/components/redesign/RedesignNav.svelte';
	import RedesignFooter from '$lib/components/redesign/RedesignFooter.svelte';
	import { resources } from '$lib/data/resources';

	const helplines = resources.filter((r) => r.type === 'helpline');
	const organizations = resources.filter((r) => r.type === 'organization');

	function orgInitial(title: string): string {
		return title.includes('Mali Bracia Ubogich') ? 'm' : title.charAt(0);
	}
	const guides = resources.filter((r) => r.type === 'guide');
</script>

<svelte:head>
	<title>Wsparcie i pomoc — mali bracia Ubogich</title>
	<meta
		name="description"
		content="Telefony zaufania, organizacje pomocowe i materiały do pobrania dla seniorów, ich bliskich i wolontariuszy."
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
	<RedesignNav active="wsparcie" />

	<main id="main-content" tabindex="-1">
		<!-- page header -->
		<section class="page-head">
			<div class="wrap head-inner">
				<span class="eyebrow primary"><span class="rule"></span>Pomoc</span>
				<h1>Wsparcie i pomoc</h1>
				<p class="lead">
					Jeśli Ty lub ktoś bliski potrzebuje pomocy — nie jesteś sam. Poniżej sprawdzone kontakty,
					organizacje i materiały, po które możesz sięgnąć w każdej chwili.
				</p>
			</div>
		</section>

		<!-- emergency 112 -->
		<section class="wrap emergency-wrap">
			<a href="tel:112" class="emergency-banner">
				<span class="em-left">
					<span class="em-ic">☎</span>
					<span class="em-title">W nagłym wypadku dzwoń 112</span>
				</span>
				<span class="em-sub">Pogotowie ratunkowe · policja · straż pożarna</span>
				<span class="em-num">112</span>
			</a>
		</section>

		<!-- helplines -->
		<section class="wrap section">
			<div class="sec-head">
				<span class="sec-num">01</span>
				<h2>Telefony zaufania</h2>
			</div>
			<p class="sec-lead">Bezpłatne linie wsparcia — z psychologiem, prawnikiem lub osobą, która po prostu wysłucha.</p>
			<div class="helplines-grid">
				{#each helplines as h}
					<a href="tel:{h.phone?.replace(/\s/g, '')}" class="helpline-card">
						<h3>{h.title}</h3>
						<p>{h.description}</p>
						<div class="helpline-foot">
							<span class="hl-number">{h.phone}</span>
							{#if h.tag}<span class="hl-tag">{h.tag}</span>{/if}
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- organizations -->
		<section class="wrap section">
			<div class="sec-head">
				<span class="sec-num">02</span>
				<h2>Organizacje</h2>
			</div>
			<p class="sec-lead">Instytucje niosące pomoc seniorom — od wolontariatu towarzyszącego po opiekę domową.</p>
			<div class="orgs-grid">
				{#each organizations as o}
					<div class="org-card">
						<span class="org-initial">{orgInitial(o.title)}</span>
						<h3>{o.title}</h3>
						<p>{o.description}</p>
						<div class="org-links">
							{#if o.phone}
								<a href="tel:{o.phone.replace(/\s/g, '')}" class="org-chip">Zadzwoń</a>
							{/if}
							{#if o.url}
								<a href={o.url} target="_blank" rel="noopener" class="org-chip">Strona www</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- materials -->
		<section class="wrap section materials-section">
			<div class="sec-head">
				<span class="sec-num">03</span>
				<h2>Materiały do pobrania</h2>
			</div>
			<p class="sec-lead">Praktyczne poradniki dla wolontariuszy, opiekunów i rodzin.</p>
			<div class="materials-grid">
				{#each guides as g}
					<a href={g.url} target="_blank" rel="noopener" class="material-card">
						<div class="material-top">
							<span class="pdf-badge">PDF</span>
							<span class="dl-ic">↓</span>
						</div>
						<h3>{g.title}</h3>
						<p>{g.description}</p>
						<span class="dl-link">Pobierz PDF →</span>
					</a>
				{/each}
			</div>
		</section>

		<!-- reassurance CTA -->
		<section class="wrap reassure-wrap">
			<div class="reassure">
				<div class="reassure-copy">
					<span class="eyebrow accent-soft"><span class="rule accent-soft-rule"></span>Nie jesteś sam</span>
					<h2>Porozmawiaj z kimś, kto rozumie</h2>
					<p>Nasz Telefon Zaufania obsługują psychologowie i przeszkoleni wolontariusze. Rozmowa jest bezpłatna i poufna.</p>
				</div>
				<div class="reassure-actions">
					<a href="tel:+48608018110" class="btn-solid">Zadzwoń: 608 018 110</a>
					<a href="/asystent" class="btn-ghost-dark">Napisz do Asystenta AI</a>
				</div>
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
		max-width: 760px;
		h1 { font-weight: 500; font-size: 56px; line-height: 1.03; letter-spacing: -0.015em; margin: 0 0 18px; }
	}
	.lead { font-size: 19px; line-height: 1.6; color: var(--rd-muted); margin: 0; }

	/* ── emergency ── */
	.emergency-wrap { padding: 28px 24px 0; }
	.emergency-banner {
		text-decoration: none;
		color: #fff;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 18px 28px;
		background: var(--rd-accent);
		border-radius: 16px;
		padding: 22px 30px;
		transition: background 0.15s ease;
		&:hover { background: var(--rd-accent-hover); }
	}
	.em-left { display: inline-flex; align-items: center; gap: 12px; }
	.em-ic {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.16);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 22px;
		flex-shrink: 0;
	}
	.em-title { font-family: 'Newsreader', serif; font-size: 23px; font-weight: 600; }
	.em-sub { font-size: 15px; color: #f6dddd; }
	.em-num { margin-left: auto; font-family: 'Newsreader', serif; font-weight: 600; font-size: 34px; letter-spacing: 0.02em; }

	/* ── section shared ── */
	.section { padding: 64px 24px 0; }
	.sec-head { display: flex; align-items: baseline; gap: 14px; margin-bottom: 8px; h2 { font-weight: 500; font-size: 34px; line-height: 1.1; margin: 0; } }
	.sec-num { font-family: 'Newsreader', serif; font-size: 15px; font-weight: 600; color: var(--rd-accent); }
	.sec-lead { font-size: 16px; line-height: 1.6; color: var(--rd-muted-2); margin: 0 0 32px; max-width: 40em; }

	/* ── helplines ── */
	.helplines-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
	.helpline-card {
		text-decoration: none;
		color: inherit;
		background: var(--rd-surface);
		border: 1px solid var(--rd-border-card);
		border-radius: 16px;
		padding: 28px;
		display: flex;
		flex-direction: column;
		transition: border-color 0.15s ease;
		&:hover { border-color: var(--rd-primary); }
		h3 { font-weight: 600; font-size: 22px; line-height: 1.2; margin: 0 0 10px; }
		p { font-size: 15px; line-height: 1.55; color: var(--rd-muted-2); margin: 0 0 20px; }
	}
	.helpline-foot { margin-top: auto; display: flex; align-items: center; gap: 12px; }
	.hl-number { font-family: 'Newsreader', serif; font-weight: 600; font-size: 28px; color: var(--rd-primary); letter-spacing: 0.01em; }
	.hl-tag {
		font-size: 12px;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--rd-muted-3);
		background: var(--rd-bg-paper-2);
		padding: 5px 10px;
		border-radius: 999px;
	}

	/* ── organizations ── */
	.orgs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
	.org-card {
		background: var(--rd-surface);
		border: 1px solid var(--rd-border-card);
		border-radius: 16px;
		padding: 28px 26px;
		display: flex;
		flex-direction: column;
		min-height: 230px;
		h3 { font-weight: 600; font-size: 20px; line-height: 1.2; margin: 0 0 9px; }
		p { font-size: 14.5px; line-height: 1.55; color: var(--rd-muted-2); margin: 0 0 20px; }
	}
	.org-initial {
		width: 46px;
		height: 46px;
		border-radius: 12px;
		background: var(--rd-primary-soft-bg);
		color: var(--rd-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		font-family: 'Newsreader', serif;
		font-size: 24px;
		font-weight: 600;
		margin-bottom: 18px;
	}
	.org-links { margin-top: auto; display: flex; flex-wrap: wrap; gap: 10px; }
	.org-chip {
		text-decoration: none;
		font-weight: 600;
		font-size: 14px;
		color: var(--rd-primary);
		border: 1.5px solid var(--rd-primary-soft-border);
		background: var(--rd-primary-soft-bg);
		padding: 8px 14px;
		border-radius: 999px;
		transition: background 0.15s ease, color 0.15s ease;
		&:hover { background: var(--rd-primary); color: #fff; border-color: var(--rd-primary); }
	}

	/* ── materials ── */
	.materials-section { padding-bottom: 40px; }
	.materials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
	.material-card {
		text-decoration: none;
		color: inherit;
		background: var(--rd-surface);
		border: 1px solid var(--rd-border-card);
		border-radius: 16px;
		padding: 26px 24px;
		display: flex;
		flex-direction: column;
		min-height: 200px;
		transition: border-color 0.15s ease, transform 0.15s ease;
		&:hover { border-color: var(--rd-primary); transform: translateY(-3px); }
		h3 { font-weight: 600; font-size: 21px; line-height: 1.2; margin: 0 0 9px; }
		p { font-size: 14.5px; line-height: 1.55; color: var(--rd-muted-2); margin: 0; }
	}
	.material-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
	.pdf-badge { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: var(--rd-accent); background: var(--rd-accent-soft-bg); padding: 5px 10px; border-radius: 7px; }
	.dl-ic { font-size: 19px; color: #c3b6a2; }
	.dl-link { margin-top: auto; padding-top: 16px; font-weight: 600; font-size: 14px; color: var(--rd-primary); }

	/* ── reassure CTA ── */
	.reassure-wrap { padding: 0 24px 88px; margin-top: 40px; }
	.reassure {
		background: var(--rd-ink-dark);
		border-radius: 24px;
		padding: 60px 56px;
		color: #f1e8da;
		display: grid;
		grid-template-columns: 1.2fr 0.8fr;
		gap: 40px;
		align-items: center;
	}
	.reassure-copy {
		h2 { font-weight: 500; font-size: 36px; line-height: 1.12; color: #fff; margin: 12px 0 12px; max-width: 15em; }
		p { font-size: 16px; line-height: 1.6; color: var(--rd-muted-dark); margin: 0; max-width: 32em; }
	}
	.reassure-actions { display: flex; flex-direction: column; gap: 12px; }

	.btn-solid, .btn-ghost-dark {
		text-decoration: none;
		text-align: center;
		font-weight: 600;
		font-size: 16px;
		padding: 16px 24px;
		border-radius: 999px;
		transition: background 0.15s ease;
	}
	.btn-solid { background: var(--rd-primary); color: #fff; &:hover { background: var(--rd-primary-hover); } }
	.btn-ghost-dark { border: 1.5px solid rgba(255, 255, 255, 0.5); color: #fff; &:hover { background: rgba(255, 255, 255, 0.12); } }

	/* ── responsive ── */
	@media (max-width: 980px) {
		.helplines-grid { grid-template-columns: 1fr; }
		.orgs-grid { grid-template-columns: repeat(2, 1fr); }
		.materials-grid { grid-template-columns: repeat(2, 1fr); }
		.reassure { grid-template-columns: 1fr; }
	}

	@media (max-width: 768px) {
		.wrap { padding: 0 16px; }
		.head-inner { padding: 40px 16px; }
		.head-inner h1 { font-size: 38px; }
		.emergency-wrap { padding: 20px 16px 0; }
		.emergency-banner { padding: 20px; }
		.em-num { margin-left: 0; }
		.section { padding: 40px 16px 0; }
		.sec-head h2 { font-size: 26px; }
		.orgs-grid, .materials-grid { grid-template-columns: 1fr; }
		.reassure-wrap { padding: 0 16px 56px; }
		.reassure { padding: 40px 24px; }
		.reassure-copy h2 { font-size: 26px; }
	}
</style>
