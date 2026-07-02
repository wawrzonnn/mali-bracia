<script lang="ts">
	let { data } = $props();

	const catMap = $derived(Object.fromEntries(data.categories.map((c) => [c.slug, c])));
	const topics = $derived(
		data.categories.map((c, i) => ({
			num: String(i + 1).padStart(2, '0'),
			title: c.name,
			desc: c.description,
			slug: c.slug
		}))
	);
	const articleImages = ['/article1.avif', '/article2.avif', '/article3.avif'];
	const articlesShown = $derived(
		data.recentArticles.slice(0, 3).map((a, i) => ({
			cat: catMap[a.categorySlug]?.name ?? a.categorySlug,
			title: a.title,
			desc: a.summary,
			read: `${a.readingTimeMin} min czytania`,
			slug: a.slug,
			img: articleImages[i]
		}))
	);
</script>

<svelte:head>
	<title>mali bracia Ubogich — Program „Obecność" dla samotnych seniorów</title>
	<meta
		name="description"
		content="1,7 miliona seniorów w Polsce żyje w osamotnieniu. Łączymy ich z wolontariuszami, budujemy trwałe relacje i dzielimy się wiedzą o starości."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Hanken+Grotesk:wght@400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="landing2">
		<!-- hero -->
		<section class="hero wrap">
			<div class="hero-copy">
				<span class="eyebrow accent"><span class="rule"></span>Program „Obecność"</span>
				<h1>Starość nie musi oznaczać <em>samotności.</em></h1>
				<p class="lead">
					1,7 miliona seniorów w Polsce żyje w osamotnieniu. Łączymy ich z wolontariuszami, budujemy
					trwałe relacje i dzielimy się wiedzą o starości — dla rodzin, opiekunów i każdego, kto chce
					być obecny.
				</p>
				<div class="hero-actions">
					<a href="#wolontariat" class="btn-solid btn-lg">Zostań wolontariuszem →</a>
					<a href="#wiedza" class="btn-line btn-lg">Przeglądaj wiedzę</a>
				</div>
			</div>
			<div class="hero-art">
				<div class="placeholder ph-45">
					<img src="/lp-1.avif" alt="Senior i wolontariusz spędzający czas razem" />
				</div>
				<div class="hero-float">
					<div class="hero-float-num">1 godz.</div>
					<div class="hero-float-txt">tygodniowo wystarczy, by odmienić czyjąś samotność</div>
				</div>
			</div>
		</section>

		<!-- trust strip -->
		<section class="wrap trust-wrap">
			<div class="trust-strip">
				<div class="trust-item">
					<div class="trust-num">od 2002</div>
					<div class="trust-label">działamy w Polsce</div>
				</div>
				<div class="trust-item">
					<div class="trust-num">14 miast</div>
					<div class="trust-label">w całym kraju</div>
				</div>
				<div class="trust-item">
					<div class="trust-num">1000+</div>
					<div class="trust-label">wolontariuszy</div>
				</div>
				<div class="trust-item">
					<div class="trust-num">800</div>
					<div class="trust-label">seniorów pod opieką dziennie</div>
				</div>
			</div>
		</section>

		<!-- wyzwanie (dark) -->
		<section class="dark-section">
			<div class="wrap dark-inner">
				<span class="eyebrow accent-soft"><span class="rule accent-soft-rule"></span>Wyzwanie</span>
				<h2 class="dark-h2">Samotność to cierpienie w milczeniu.</h2>
				<p class="dark-lead">
					Osamotnienie nie jest tylko smutkiem. To realne zagrożenie dla zdrowia i życia osób
					starszych — a wciąż pozostaje niewidoczne.
				</p>
				<div class="wyzwanie-grid">
					<div class="wyzwanie-stat">
						<div class="wyzwanie-big">26%</div>
						<div class="wyzwanie-txt">wyższe ryzyko przedwczesnej śmierci z powodu osamotnienia</div>
					</div>
					<div class="wyzwanie-stat">
						<div class="wyzwanie-big">50%</div>
						<div class="wyzwanie-txt">wyższe ryzyko demencji u osób doświadczających samotności</div>
					</div>
					<div class="wyzwanie-stat">
						<div class="wyzwanie-big">1,7 mln</div>
						<div class="wyzwanie-txt">seniorów w Polsce żyje w osamotnieniu</div>
					</div>
				</div>
				<p class="dark-source">Na podstawie badań nad samotnością osób starszych.</p>
			</div>
		</section>

		<!-- cytat założyciela -->
		<section class="wrap quote-section">
			<div class="placeholder ph-11">
				<img src="/armand.jfif" alt="Armand Marquiset, założyciel Stowarzyszenia" />
			</div>
			<div class="quote-body">
				<div class="quote-mark">„</div>
				<blockquote>Kwiaty przed chlebem.</blockquote>
				<p class="quote-desc">
					Ta myśl towarzyszy nam od 1946 roku. Seniorom brakuje nie tyle rzeczy, ile
					<strong>drugiego człowieka</strong> — rozmowy, uwagi, bliskości. Obecność jest tak samo
					ważna jak potrzeby materialne.
				</p>
				<div class="quote-attr"><span class="attr-rule"></span><span><strong>Armand Marquiset</strong> · założyciel Stowarzyszenia</span></div>
			</div>
		</section>

		<!-- baza wiedzy -->
		<section id="wiedza" class="wiedza-section">
			<div class="wrap">
				<div class="section-head">
					<div>
						<span class="eyebrow primary">Baza wiedzy</span>
						<h2 class="section-h2">Zrozum, zanim zaczniesz pomagać</h2>
					</div>
					<a href="/wiedza" class="link-arrow">Wszystkie tematy →</a>
				</div>
				<div class="topics-grid">
					{#each topics as t}
						<a href="/wiedza?kategoria={t.slug}" class="topic-card">
							<span class="topic-num">{t.num}</span>
							<h3>{t.title}</h3>
							<p>{t.desc}</p>
							<span class="topic-read">Czytaj →</span>
						</a>
					{/each}
				</div>
			</div>
		</section>

		<!-- wolontariat -->
		<section id="wolontariat" class="wrap vol-section">
			<div class="vol-copy">
				<span class="eyebrow accent">Wolontariat</span>
				<h2 class="section-h2">Zostań przyjacielem osoby starszej</h2>
				<p class="lead">
					Regularnie odwiedzasz seniora, rozmawiasz, pijecie herbatę, spacerujecie. Zapewniamy
					szkolenie i wsparcie koordynatora w 14 miastach — nie jesteś w tym sam.
				</p>
				<div class="vol-points">
					<div class="vol-point"><span class="check">✓</span><span>Wystarczy 1 godzina tygodniowo, w Twoim mieście.</span></div>
					<div class="vol-point"><span class="check">✓</span><span>Pełne szkolenie i stałe wsparcie koordynatora.</span></div>
					<div class="vol-point"><span class="check">✓</span><span>Dołączasz do wspólnoty ponad 1000 wolontariuszy.</span></div>
				</div>
				<a href="/dolacz?sciezka=wolontariat" class="btn-accent btn-lg">Dołącz do wolontariatu →</a>
			</div>
			<div class="placeholder ph-54">
				<img src="/wspolnyspacer.avif" alt="Wolontariusz i senior podczas wspólnego spaceru w parku" />
			</div>
		</section>

		<!-- jak pomóc (dark) -->
		<section id="pomoc" class="dark-section">
			<div class="wrap dark-inner">
				<span class="eyebrow accent-soft">Jak pomóc</span>
				<h2 class="dark-h2 pomoc-h2">Każdy gest ma znaczenie</h2>
				<div class="pomoc-grid">
					<a href="/1-procent" class="pomoc-card">
						<h3>Przekaż 1,5% podatku</h3>
						<p>Rozlicz PIT i przekaż 1,5% dla seniorów zmagających się z samotnością.</p>
						<span class="pomoc-cta">Przekaż →</span>
					</a>
					<a href="/dolacz?sciezka=wsparcie" class="pomoc-card">
						<h3>Wspieraj co miesiąc</h3>
						<p>50 zł miesięcznie potrafi uwolnić jedną starszą osobę od samotności.</p>
						<span class="pomoc-cta">Wspieram →</span>
					</a>
					<a href="/dolacz?sciezka=wolontariat" class="pomoc-card">
						<h3>Zostań wolontariuszem</h3>
						<p>Buduj relacje z seniorami w swojej okolicy — zapewniamy szkolenie.</p>
						<span class="pomoc-cta">Dołącz →</span>
					</a>
				</div>
			</div>
		</section>

		<!-- artykuły -->
		<section class="wrap art-section">
			<div class="section-head">
				<div>
					<span class="eyebrow primary">Artykuły</span>
					<h2 class="section-h2">Praktyczna wiedza o starości</h2>
				</div>
				<a href="/wiedza" class="link-arrow">Wszystkie artykuły →</a>
			</div>
			<div class="art-grid">
				{#each articlesShown as art}
					<a href="/wiedza/{art.slug}" class="art-card">
						<div class="placeholder ph-1610">
							<img src={art.img} alt={art.title} />
						</div>
						<div class="art-body">
							<span class="art-cat">{art.cat}</span>
							<h3>{art.title}</h3>
							<p>{art.desc}</p>
							<span class="art-read">{art.read}</span>
						</div>
					</a>
				{/each}
			</div>
		</section>

		<!-- final CTA -->
		<section id="kontakt" class="wrap cta-wrap">
			<div class="cta-block">
				<div class="cta-copy">
					<h2>Każda rozmowa ma znaczenie.</h2>
					<p>
						Zostaw swoje dane, a odezwiemy się z informacjami o wolontariacie i możliwościach
						wsparcia seniorów w Twojej okolicy. Bez zobowiązań, odpowiadamy w ciągu kilku dni.
					</p>
				</div>
				<div class="cta-actions">
					<a href="/dolacz" class="btn-white">Wypełnij formularz</a>
					<a href="tel:+48608018110" class="btn-ghost-white">Zadzwoń: 608 018 110</a>
				</div>
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

	.wrap {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px;
	}

	h1, h2, h3, blockquote {
		font-family: 'Newsreader', serif;
	}

	/* ── buttons ── */
	.btn-solid,
	.btn-line,
	.btn-accent,
	.btn-white,
	.btn-ghost-white {
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		font-weight: 600;
		font-size: 15px;
		padding: 10px 16px;
		border-radius: 999px;
		transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
		white-space: nowrap;
	}
	.btn-solid { background: var(--rd-primary); color: #fff; &:hover { background: var(--rd-primary-hover); } }
	.btn-line { border: 1.5px solid var(--rd-ink); color: var(--rd-ink); &:hover { background: var(--rd-ink); color: #fff; } }
	.btn-accent { background: var(--rd-accent); color: #fff; &:hover { background: var(--rd-accent-hover); } }
	.btn-white { background: #fff; color: var(--rd-primary); &:hover { background: #f1e8da; } }
	.btn-ghost-white { border: 1.5px solid rgba(255, 255, 255, 0.55); color: #fff; &:hover { background: rgba(255, 255, 255, 0.12); } }
	.btn-lg { font-size: 16px; padding: 16px 28px; }

	/* ── zdjęcia ── */
	.placeholder {
		border-radius: 22px;
		overflow: hidden;
		background: var(--rd-ph-a);
		border: 1px solid var(--rd-ph-border);

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			display: block;
		}
	}
	.ph-45 { aspect-ratio: 4 / 5; }
	.ph-11 { aspect-ratio: 1 / 1; border-radius: 20px; img { transform: scale(1.28); } }
	.ph-54 { aspect-ratio: 5 / 4; }
	.ph-1610 { aspect-ratio: 16 / 10; border-radius: 0; border: none; border-bottom: 1px solid var(--rd-border-card); padding: 0; }

	/* ── eyebrow ── */
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
		&.primary { color: var(--rd-primary); }
	}

	/* ── hero ── */
	.hero {
		padding: 72px 24px 40px;
		display: grid;
		grid-template-columns: 1.05fr 0.95fr;
		gap: 56px;
		align-items: center;
	}
	.hero-copy h1 {
		font-weight: 500;
		font-size: 60px;
		line-height: 1.04;
		letter-spacing: -0.015em;
		margin: 0 0 22px;
		em { font-style: italic; color: var(--rd-primary); }
	}
	.lead { font-size: 19px; line-height: 1.6; color: var(--rd-muted); max-width: 30em; margin: 0 0 32px; }
	.hero-actions { display: flex; flex-wrap: wrap; gap: 13px; }

	.hero-art { position: relative; }
	.hero-float {
		position: absolute;
		bottom: -22px;
		left: -22px;
		background: #fff;
		border: 1px solid var(--rd-border-card);
		border-radius: 16px;
		padding: 18px 22px;
		box-shadow: 0 18px 40px -20px rgba(34, 29, 24, 0.35);
	}
	.hero-float-num { font-family: 'Newsreader', serif; font-size: 38px; font-weight: 600; line-height: 1; color: var(--rd-accent); }
	.hero-float-txt { font-size: 13px; color: var(--rd-muted-2); margin-top: 5px; max-width: 11em; }

	/* ── trust strip ── */
	.trust-wrap { padding: 26px 24px 8px; }
	.trust-strip {
		border-top: 1px solid var(--rd-border);
		border-bottom: 1px solid var(--rd-border);
		padding: 26px 0;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 24px;
	}
	.trust-num { font-family: 'Newsreader', serif; font-size: 32px; font-weight: 600; line-height: 1; }
	.trust-label { font-size: 14px; color: var(--rd-muted-2); margin-top: 4px; }

	/* ── dark sections ── */
	.dark-section { background: var(--rd-ink-dark); color: #f1e8da; }
	.dark-inner { padding: 88px 24px; }
	.dark-h2 { font-weight: 500; font-size: 44px; line-height: 1.1; letter-spacing: -0.01em; margin: 0 0 14px; max-width: 16em; color: #fff; }
	.dark-lead { font-size: 18px; line-height: 1.6; color: var(--rd-muted-dark); max-width: 36em; margin: 0 0 52px; }
	.dark-source { font-size: 13px; color: var(--rd-faint-dark); margin: 44px 0 0; }

	.wyzwanie-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
	.wyzwanie-stat { border-top: 1px solid var(--rd-border-dark); padding-top: 22px; }
	.wyzwanie-big { font-family: 'Newsreader', serif; font-size: 56px; font-weight: 600; line-height: 1; color: #fff; }
	.wyzwanie-txt { font-size: 16px; line-height: 1.5; color: var(--rd-muted-dark-2); margin-top: 12px; }

	/* ── founder quote ── */
	.quote-section {
		padding: 96px 24px;
		display: grid;
		grid-template-columns: 0.8fr 1.2fr;
		gap: 56px;
		align-items: center;
	}
	.quote-mark { font-family: 'Newsreader', serif; font-size: 80px; line-height: 1; color: #d9ccb8; margin-bottom: 4px; }
	blockquote {
		margin: 0;
		font-style: italic;
		font-weight: 400;
		font-size: 38px;
		line-height: 1.2;
		letter-spacing: -0.01em;
		color: var(--rd-ink);
	}
	.quote-desc { font-size: 18px; line-height: 1.65; color: var(--rd-muted); margin: 22px 0 24px; max-width: 34em; strong { font-weight: 600; color: var(--rd-ink); } }
	.quote-attr { display: flex; align-items: center; gap: 12px; font-size: 15px; }
	.attr-rule { width: 32px; height: 1.5px; background: var(--rd-accent); display: inline-block; }

	/* ── section head (shared) ── */
	.section-head {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: flex-end;
		justify-content: space-between;
		margin-bottom: 44px;
	}
	.section-h2 { font-weight: 500; font-size: 40px; line-height: 1.1; margin: 12px 0 0; }
	.link-arrow { text-decoration: none; font-weight: 600; font-size: 15px; color: var(--rd-primary); }

	/* ── baza wiedzy ── */
	.wiedza-section { background: var(--rd-bg-paper-2); border-top: 1px solid var(--rd-border); border-bottom: 1px solid var(--rd-border); padding: 88px 0; }
	.topics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
	.topic-card {
		text-decoration: none;
		color: inherit;
		background: var(--rd-surface);
		border: 1px solid var(--rd-border-card);
		border-radius: 16px;
		padding: 26px 24px;
		display: flex;
		flex-direction: column;
		min-height: 220px;
		transition: border-color 0.15s ease, transform 0.15s ease;
		&:hover { border-color: var(--rd-primary); transform: translateY(-3px); }
		.topic-num { font-family: 'Newsreader', serif; font-size: 15px; font-weight: 600; color: var(--rd-accent); }
		h3 { font-weight: 600; font-size: 22px; line-height: 1.2; margin: 14px 0 10px; }
		p { font-size: 14.5px; line-height: 1.55; color: var(--rd-muted-2); margin: 0; }
		.topic-read { margin-top: auto; padding-top: 16px; font-weight: 600; font-size: 14px; color: var(--rd-primary); }
	}

	/* ── wolontariat ── */
	.vol-section {
		padding: 96px 24px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 56px;
		align-items: center;
	}
	.vol-points { display: flex; flex-direction: column; gap: 14px; margin-bottom: 32px; }
	.vol-point {
		display: flex;
		gap: 13px;
		align-items: flex-start;
		.check {
			flex: none;
			width: 22px;
			height: 22px;
			border-radius: 50%;
			background: var(--rd-accent-soft-bg);
			color: var(--rd-accent);
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 13px;
			font-weight: 700;
			margin-top: 1px;
		}
		span:last-child { font-size: 16px; line-height: 1.5; color: #3a342c; }
	}

	/* ── jak pomóc ── */
	.pomoc-h2 { margin: 12px 0 44px; }
	.pomoc-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
	.pomoc-card {
		text-decoration: none;
		background: var(--rd-ink-card-dark);
		border: 1px solid var(--rd-border-dark);
		border-radius: 16px;
		padding: 28px 26px;
		display: flex;
		flex-direction: column;
		min-height: 180px;
		transition: border-color 0.15s ease, background 0.15s ease;
		&:hover { border-color: var(--rd-accent-soft); background: var(--rd-ink-card-dark-hover); }
		h3 { font-weight: 600; font-size: 23px; color: #fff; margin: 0 0 10px; }
		p { font-size: 15px; line-height: 1.55; color: var(--rd-muted-dark); margin: 0; }
		.pomoc-cta { margin-top: auto; padding-top: 18px; font-weight: 600; font-size: 14px; color: var(--rd-accent-soft); }
	}

	/* ── artykuły ── */
	.art-section { padding: 96px 24px; }
	.art-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
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
	.art-body {
		padding: 22px 22px 24px;
		display: flex;
		flex-direction: column;
		flex: 1;
		.art-cat { font-size: 12px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--rd-accent); }
		h3 { font-weight: 600; font-size: 21px; line-height: 1.22; margin: 11px 0 9px; }
		p { font-size: 14.5px; line-height: 1.55; color: var(--rd-muted-2); margin: 0; }
		.art-read { margin-top: auto; padding-top: 16px; font-size: 13px; color: #9a8e7c; }
	}

	/* ── final CTA ── */
	.cta-wrap { margin: 0 auto 88px; padding: 0 24px; }
	.cta-block {
		background: var(--rd-primary);
		border-radius: 26px;
		padding: 72px 56px;
		color: #fff;
		display: grid;
		grid-template-columns: 1.3fr 0.7fr;
		gap: 40px;
		align-items: center;
	}
	.cta-copy {
		h2 { font-weight: 500; font-size: 44px; line-height: 1.08; letter-spacing: -0.01em; margin: 0 0 16px; }
		p { font-size: 18px; line-height: 1.6; color: #d6ecf9; margin: 0; max-width: 34em; }
	}
	.cta-actions { display: flex; flex-direction: column; gap: 12px; }

	/* ── responsive ── */
	@media (max-width: 980px) {
		.hero { grid-template-columns: 1fr; padding-top: 40px; }
		.hero-art { max-width: 380px; margin: 0 auto; }
		.hero-copy h1 { font-size: 44px; }
		.quote-section { grid-template-columns: 1fr; }
		.quote-section .placeholder { max-width: 320px; margin: 0 auto; }
		.vol-section { grid-template-columns: 1fr; }
		.vol-section .placeholder { order: -1; max-width: 420px; margin: 0 auto; }
		.topics-grid { grid-template-columns: repeat(2, 1fr); }
		.pomoc-grid { grid-template-columns: 1fr; }
		.art-grid { grid-template-columns: repeat(2, 1fr); }
		.cta-block { grid-template-columns: 1fr; padding: 48px 32px; }
	}

	@media (max-width: 768px) {
		.wrap { padding: 0 16px; }
		.hero { padding: 28px 16px 40px; }
		.hero-copy h1 { font-size: 32px; }
		.lead { font-size: 16px; }
		.hero-actions { flex-direction: column; align-items: stretch; }
		.hero-actions a { justify-content: center; }
		.hero-art { max-width: 280px; margin: 0 auto; }
		.hero-float {
			position: static;
			width: max-content;
			max-width: 100%;
			margin: -28px auto 0;
		}
		.trust-strip { grid-template-columns: repeat(2, 1fr); gap: 20px 12px; }
		.dark-inner, .art-section, .vol-section, .quote-section { padding: 48px 16px; }
		.wiedza-section { padding: 48px 0; }
		.dark-h2 { font-size: 28px; }
		.section-h2 { font-size: 26px; }
		.wyzwanie-grid { grid-template-columns: 1fr; gap: 20px; }
		.wyzwanie-big { font-size: 42px; }
		blockquote { font-size: 26px; }
		.topics-grid { grid-template-columns: 1fr; }
		.art-grid { grid-template-columns: 1fr; }
		.cta-copy h2 { font-size: 28px; }
		.pomoc-h2 { margin: 12px 0 32px; }
	}
</style>
