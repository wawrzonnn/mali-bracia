<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { IconName } from '$lib/data/categories';

	let { data } = $props();
</script>

<div class="landing">
	<!-- ── HERO ── -->
	<section class="hero">
		<div class="hero-bg">
			<img src="/img/intro.png" alt="" class="hero-bg-img" />
			<div class="hero-gradient"></div>
		</div>
		<div class="wrap hero-wrap">
			<div class="hero-content">
				<span class="chip">
					<Icon name="sparkle" size={14} color="#B3E0F7" />
					Baza wiedzy z asystentem AI
				</span>
				<h1>Bądź obecny.<br />Starość nie musi oznaczać <span class="accent">samotności</span>.</h1>
				<p>
					Materiały o starzeniu się, ćwiczenia pamięci i asystent AI — wszystko, czego potrzebujesz,
					by zrozumieć seniora i zbudować z nim prawdziwą relację.
				</p>
				<div class="hero-actions">
					<a href="/wiedza" class="btn btn-primary">
						<Icon name="book" size={18} color="white" />
						Przeglądaj wiedzę
					</a>
					<a href="/asystent" class="btn btn-glass">
						<Icon name="sparkle" size={18} color="white" />
						Zapytaj asystenta AI
					</a>
				</div>
				<div class="hero-trust">
					<span><strong>Od 2002</strong> w Polsce</span>
					<span class="dot"></span>
					<span><strong>14</strong> miast</span>
					<span class="dot"></span>
					<span><strong>1000+</strong> wolontariuszy</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ── STATYSTYKI ── -->
	<section class="stats">
		<div class="wrap stats-grid">
			<div class="stat">
				<span class="stat-num">800</span>
				<span class="stat-txt">seniorów pod opieką każdego dnia</span>
			</div>
			<div class="stat">
				<span class="stat-num">80&nbsp;tys.</span>
				<span class="stat-txt">godzin wolontariatu rocznie</span>
			</div>
			<div class="stat">
				<span class="stat-num">14</span>
				<span class="stat-txt">miast w całej Polsce</span>
			</div>
			<div class="stat">
				<span class="stat-num">20+</span>
				<span class="stat-txt">lat doświadczenia</span>
			</div>
		</div>
		<p class="stats-source">Dane: Stowarzyszenie mali bracia Ubogich</p>
	</section>

	<!-- ── CYTAT ── -->
	<section class="section quote">
		<div class="wrap quote-inner">
			<span class="quote-mark">„</span>
			<blockquote>Kwiaty przed chlebem</blockquote>
			<p class="quote-desc">
				Ta myśl towarzyszy nam od 1946 roku. Seniorom brakuje nie tyle rzeczy, ile
				<strong>drugiego człowieka</strong> — rozmowy, uwagi, bliskości. Bliskość jest tak samo ważna
				jak potrzeby materialne.
			</p>
			<cite>Armand Marquiset · założyciel Stowarzyszenia</cite>
		</div>
	</section>

	<!-- ── TEMATY ── -->
	<section class="section">
		<div class="wrap">
			<header class="head">
				<h2>Tematy do poznania</h2>
				<p class="head-sub">Cztery obszary, od których warto zacząć.</p>
			</header>
			<div class="topics">
				{#each data.categories as cat}
					<a href="/wiedza?kategoria={cat.slug}" class="topic" style="--c: {cat.color}">
						<span class="topic-ic">
							<Icon name={cat.icon as IconName} size={22} color={cat.color} />
						</span>
						<span class="topic-body">
							<span class="topic-h">{cat.name}</span>
							<span class="topic-p">{cat.description}</span>
						</span>
						<span class="topic-arrow"><Icon name="arrow-right" size={18} color={cat.color} /></span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- ── IMPACT (jedyny mocny akcent) ── -->
	<section class="impact" style="background-image: url('/img/oldman.png');">
		<div class="impact-overlay">
			<div class="wrap impact-inner">
				<span class="eyebrow">Wyzwanie</span>
				<h2>Samotność to cierpienie w milczeniu</h2>
				<div class="impact-stats">
					<div class="impact-stat">
						<strong>26%</strong>
						<span>wyższe ryzyko przedwczesnej śmierci z powodu osamotnienia</span>
					</div>
					<div class="impact-stat">
						<strong>50%</strong>
						<span>wyższe ryzyko demencji u osób doświadczających samotności</span>
					</div>
					<div class="impact-stat">
						<strong>1,7 mln</strong>
						<span>seniorów w Polsce żyje w osamotnieniu</span>
					</div>
				</div>
				<div class="impact-foot">
					<a href="/wiedza/epidemia-osamotnienia" class="arrow-link light">
						Dowiedz się więcej <Icon name="arrow-right" size={14} color="white" />
					</a>
					<span class="impact-source">Na podstawie badań nad samotnością osób starszych</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ── ARTYKUŁY ── -->
	<section class="section">
		<div class="wrap">
			<header class="head head-row">
				<div>
					<h2>Najnowsze artykuły</h2>
					<p class="head-sub">Praktyczna wiedza o starości i budowaniu relacji.</p>
				</div>
				<a href="/wiedza" class="arrow-link">Wszystkie artykuły <Icon name="arrow-right" size={14} color="#169FDB" /></a>
			</header>
			<div class="articles">
				{#each data.recentArticles as article}
					<a href="/wiedza/{article.slug}" class="art">
						<span class="art-badge">{article.categorySlug.replace(/-/g, ' ')}</span>
						<span class="art-h">{article.title}</span>
						<span class="art-p">{article.summary}</span>
						<span class="art-meta">
							<Icon name="clock" size={13} color="#8794A1" />
							{article.readingTimeMin} min czytania
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<!-- ── WOLONTARIAT (panel) ── -->
	<section class="section">
		<div class="wrap">
			<div class="panel vol">
				<div class="vol-text">
					<span class="eyebrow green">Wolontariat</span>
					<h2>Zostań przyjacielem osoby starszej</h2>
					<p>
						Regularnie odwiedzasz seniora, rozmawiasz, pijesz herbatę, spacerujesz. Wystarczy
						<strong>1 godzina tygodniowo</strong>. Stowarzyszenie zapewnia szkolenie i wsparcie
						koordynatora — nie jesteś w tym sam.
					</p>
					<a href="/dolacz?sciezka=wolontariat" class="btn btn-accent">
						Dołącz do wolontariatu <Icon name="arrow-right" size={16} color="white" />
					</a>
				</div>
				<div class="vol-img">
					<img src="/img/oldwoman.png" alt="Seniorka podczas spotkania z wolontariuszem" />
				</div>
			</div>
		</div>
	</section>

	<!-- ── OD CZEGO ZACZĄĆ ── -->
	<section class="section">
		<div class="wrap">
			<header class="head center">
				<h2>Od czego zacząć?</h2>
				<p class="head-sub">Trzy najczęstsze potrzeby — wybierz swoją.</p>
			</header>
			<div class="trio">
				<div class="card-t">
					<span class="trio-ic blue"><Icon name="sparkle" size={22} color="white" /></span>
					<span class="trio-h">Asystent AI</span>
					<span class="trio-p">Odpowie na pytania o starzeniu się, samotności i wsparciu seniorów.</span>
					<a href="/asystent" class="btn btn-primary btn-sm">Zapytaj</a>
				</div>
				<div class="card-t">
					<span class="trio-ic green"><Icon name="puzzle" size={22} color="white" /></span>
					<span class="trio-h">Ćwiczenia</span>
					<span class="trio-p">Gotowe PDF-y do pobrania i generator ćwiczeń pamięci do wydruku.</span>
					<a href="/cwiczenia" class="btn btn-accent btn-sm">Ćwicz</a>
				</div>
				<div class="card-t">
					<span class="trio-ic red"><Icon name="phone" size={22} color="white" /></span>
					<span class="trio-h">Wsparcie</span>
					<span class="trio-p">Telefony zaufania, organizacje pomocowe i materiały dla opiekunów.</span>
					<a href="/wsparcie" class="btn btn-secondary btn-sm">Zobacz</a>
				</div>
			</div>
		</div>
	</section>

	<!-- ── DOŁĄCZ / FORMULARZ (panel) ── -->
	<section class="section" id="dolacz">
		<div class="wrap">
			<div class="panel join">
				<div class="join-text">
					<span class="eyebrow">Dołącz do nas</span>
					<h2>Każda rozmowa ma znaczenie</h2>
					<p>
						Zostaw swoje dane, a odezwiemy się do Ciebie z informacjami o wolontariacie i
						możliwościach wsparcia seniorów w Twojej okolicy.
					</p>
					<span class="join-assure">
						<Icon name="shield" size={18} color="#1FA138" />
						Bez zobowiązań. Odpowiadamy w ciągu kilku dni.
					</span>
				</div>
				<div class="join-teaser">
					<div class="teaser-row">
						<span class="teaser-ic blue"><Icon name="heart" size={20} color="white" /></span>
						<span>Zostań wolontariuszem</span>
					</div>
					<div class="teaser-row">
						<span class="teaser-ic warm"><Icon name="gift" size={20} color="white" /></span>
						<span>Wesprzyj finansowo</span>
					</div>
					<div class="teaser-row">
						<span class="teaser-ic primary"><Icon name="message" size={20} color="white" /></span>
						<span>Zadaj pytanie</span>
					</div>
					<a href="/dolacz" class="btn btn-primary btn-full">
						Wypełnij formularz <Icon name="arrow-right" size={18} color="white" />
					</a>
				</div>
			</div>
		</div>
	</section>
</div>

<style lang="scss">
	@use 'variables' as *;

	$wrap: 1140px;

	.landing { background: $color-bg; }

	/* ── wspólny layout ── */
	.wrap {
		max-width: $wrap;
		margin: 0 auto;
		padding: 0 $spacing-2xl;
		width: 100%;
		@media (max-width: 768px) { padding: 0 $spacing-lg; }
	}

	.section {
		padding: 84px 0;
		@media (max-width: 768px) { padding: 56px 0; }
	}

	.head {
		margin-bottom: $spacing-2xl;

		h2 {
			font-family: $font-serif;
			font-size: 32px;
			font-weight: 700;
			letter-spacing: -0.01em;
			color: $color-secondary;
			@media (max-width: 600px) { font-size: 26px; }
		}

		.head-sub {
			font-size: $font-size-base;
			color: $color-text-muted;
			margin-top: 8px;
		}

		&.center { text-align: center; }

		&.head-row {
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			gap: $spacing-lg;
			@media (max-width: 600px) { flex-direction: column; align-items: flex-start; gap: $spacing-md; }
		}
	}

	.eyebrow {
		display: inline-block;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 1.4px;
		color: $color-primary;
		margin-bottom: 12px;

		&.green { color: $color-accent; }
	}

	.arrow-link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-primary;
		text-decoration: none;
		white-space: nowrap;
		transition: gap 0.15s ease;
		&:hover { gap: 10px; }
		&.light { color: white; }
	}

	/* ── HERO ── */
	.hero {
		position: relative;
		min-height: 600px;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	.hero-bg { position: absolute; inset: 0; }

	.hero-bg-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 65% 28%;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			98deg,
			rgba(15, 23, 28, 0.95) 0%,
			rgba(15, 23, 28, 0.85) 34%,
			rgba(15, 23, 28, 0.45) 62%,
			rgba(15, 23, 28, 0.15) 100%
		);
	}

	.hero-wrap { position: relative; z-index: 2; }

	.hero-content {
		max-width: 600px;
		color: white;
		padding: 72px 0;

		h1 {
			font-family: $font-serif;
			font-size: clamp(30px, 3.6vw, 46px);
			font-weight: 700;
			line-height: 1.16;
			letter-spacing: -0.01em;
			margin: 18px 0 20px;
		}

		p {
			font-size: $font-size-base;
			line-height: 1.6;
			color: rgba(255, 255, 255, 0.8);
			margin-bottom: $spacing-xl;
			max-width: 500px;
		}
	}

	.accent { color: $color-primary-light; }

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 7px;
		padding: 7px 15px;
		border-radius: $radius-full;
		background: rgba(255, 255, 255, 0.12);
		border: 1px solid rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(8px);
		font-size: 12px;
		font-weight: 700;
		letter-spacing: 0.5px;
		text-transform: uppercase;
		color: $color-primary-light;
	}

	.hero-actions {
		display: flex;
		gap: $spacing-md;
		flex-wrap: wrap;
	}

	.btn-glass {
		background: rgba(255, 255, 255, 0.14);
		color: white;
		backdrop-filter: blur(8px);
		border: 1px solid rgba(255, 255, 255, 0.24);
		&:hover { background: rgba(255, 255, 255, 0.24); }
	}

	.hero-trust {
		display: flex;
		align-items: center;
		gap: 14px;
		margin-top: $spacing-xl;
		font-size: $font-size-sm;
		color: rgba(255, 255, 255, 0.7);
		flex-wrap: wrap;

		strong { color: white; font-weight: 700; }
		.dot { width: 4px; height: 4px; border-radius: 50%; background: rgba(255, 255, 255, 0.35); }
	}

	/* ── STATYSTYKI ── */
	.stats {
		background: $color-bg-soft;
		border-top: 1px solid $color-border;
		border-bottom: 1px solid $color-border;
		padding: $spacing-2xl 0 $spacing-lg;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		@media (max-width: 600px) { grid-template-columns: repeat(2, 1fr); gap: $spacing-lg; }
	}

	.stat {
		text-align: center;
		padding: 0 $spacing-md;
		position: relative;

		&:not(:last-child)::after {
			content: '';
			position: absolute;
			right: 0;
			top: 15%;
			height: 70%;
			width: 1px;
			background: $color-border;
			@media (max-width: 600px) { display: none; }
		}
	}

	.stat-num {
		display: block;
		font-family: $font-heading;
		font-size: 40px;
		font-weight: 800;
		letter-spacing: -0.02em;
		line-height: 1;
		color: $color-primary;
		@media (max-width: 600px) { font-size: 32px; }
	}

	.stat-txt {
		display: block;
		font-size: $font-size-sm;
		color: $color-text-muted;
		line-height: 1.4;
		margin-top: 10px;
	}

	.stats-source {
		text-align: center;
		font-size: 12px;
		color: $color-text-muted;
		opacity: 0.7;
		margin-top: $spacing-xl;
	}

	/* ── CYTAT ── */
	.quote { background: $color-bg; text-align: center; }

	.quote-inner { max-width: 720px; }

	.quote-mark {
		display: block;
		font-family: Georgia, serif;
		font-size: 80px;
		line-height: 0.5;
		height: 34px;
		color: $color-primary-light;
	}

	blockquote {
		font-family: $font-serif;
		font-size: clamp(28px, 3.4vw, 42px);
		font-weight: 700;
		font-style: italic;
		letter-spacing: -0.01em;
		color: $color-secondary;
		margin-bottom: $spacing-md;
	}

	.quote-desc {
		font-size: $font-size-lg;
		line-height: 1.6;
		color: $color-text-muted;
		max-width: 600px;
		margin: 0 auto $spacing-lg;
		strong { color: $color-secondary; font-weight: 700; }
		@media (max-width: 600px) { font-size: $font-size-base; }
	}

	cite {
		font-style: normal;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-primary;
	}

	/* ── TEMATY ── */
	.topics {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-md;
		@media (max-width: 640px) { grid-template-columns: 1fr; }
	}

	.topic {
		display: flex;
		align-items: center;
		gap: $spacing-lg;
		padding: $spacing-lg $spacing-xl;
		border-radius: $radius;
		border: 1px solid $color-border;
		background: $color-bg-card;
		text-decoration: none;
		color: inherit;
		transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;

		&:hover {
			transform: translateY(-2px);
			border-color: color-mix(in srgb, var(--c) 45%, $color-border);
			box-shadow: $shadow-md;
			.topic-arrow { opacity: 1; transform: translateX(0); }
		}
	}

	.topic-ic {
		width: 52px;
		height: 52px;
		border-radius: $radius;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		flex-shrink: 0;
	}

	.topic-body { flex: 1; display: flex; flex-direction: column; gap: 4px; }
	.topic-h { font-size: $font-size-base; font-weight: 700; color: $color-secondary; }
	.topic-p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.45; }

	.topic-arrow {
		flex-shrink: 0;
		opacity: 0;
		transform: translateX(-6px);
		transition: opacity 0.16s ease, transform 0.16s ease;
		@media (max-width: 640px) { display: none; }
	}

	/* ── IMPACT ── */
	.impact { background-size: cover; background-position: center 30%; }

	.impact-overlay {
		background: linear-gradient(120deg, rgba(15, 23, 28, 0.94) 0%, rgba(15, 23, 28, 0.78) 100%);
		padding: 84px 0;
		@media (max-width: 768px) { padding: 56px 0; }
	}

	.impact-inner {
		.eyebrow { color: $color-warm; }
		h2 {
			font-family: $font-serif;
			font-size: 34px;
			font-weight: 700;
			letter-spacing: -0.01em;
			color: white;
			margin-bottom: $spacing-2xl;
			line-height: 1.15;
			@media (max-width: 600px) { font-size: 26px; }
		}
	}

	.impact-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-lg;
		margin-bottom: $spacing-2xl;
		@media (max-width: 700px) { grid-template-columns: 1fr; gap: $spacing-md; }
	}

	.impact-stat {
		padding: $spacing-lg $spacing-xl;
		background: rgba(255, 255, 255, 0.06);
		border-radius: $radius;
		border: 1px solid rgba(255, 255, 255, 0.12);

		strong {
			display: block;
			font-family: $font-heading;
			font-size: 40px;
			font-weight: 800;
			letter-spacing: -0.02em;
			color: $color-warm;
			margin-bottom: 8px;
			line-height: 1;
		}
		span { font-size: $font-size-sm; color: rgba(255, 255, 255, 0.78); line-height: 1.5; }
	}

	.impact-foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $spacing-md;
		flex-wrap: wrap;
	}

	.impact-source { font-size: 12px; color: rgba(255, 255, 255, 0.5); }

	/* ── ARTYKUŁY ── */
	.articles {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-lg;
		@media (max-width: 640px) { grid-template-columns: 1fr; }
	}

	.art {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-xl;
		border: 1px solid $color-border;
		text-decoration: none;
		color: inherit;
		transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;

		&:hover {
			transform: translateY(-2px);
			border-color: $color-primary-light;
			box-shadow: $shadow-md;
		}
	}

	.art-badge {
		padding: 4px 12px;
		border-radius: $radius-full;
		font-size: 11px;
		font-weight: 700;
		background: $color-primary-bg;
		color: $color-primary;
		text-transform: uppercase;
		letter-spacing: 0.4px;
		margin-bottom: $spacing-md;
	}

	.art-h { font-size: $font-size-lg; font-weight: 700; color: $color-secondary; line-height: 1.3; margin-bottom: 8px; }
	.art-p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.55; flex: 1; }
	.art-meta { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; color: #8794A1; margin-top: $spacing-lg; }

	/* ── PANEL (wolontariat + dołącz) ── */
	.panel {
		border-radius: $radius-lg;
		border: 1px solid $color-border;
		padding: $spacing-2xl;
		@media (min-width: 900px) { padding: 56px; }
	}

	.vol {
		background: linear-gradient(135deg, $color-accent-bg 0%, #EAF7ED 100%);
		display: grid;
		grid-template-columns: 1.15fr 1fr;
		gap: 56px;
		align-items: center;
		@media (max-width: 860px) { grid-template-columns: 1fr; gap: $spacing-xl; }

		h2 { font-family: $font-serif; font-size: 30px; font-weight: 700; letter-spacing: -0.01em; color: $color-secondary; margin-bottom: $spacing-md; line-height: 1.15; @media (max-width: 600px) { font-size: 26px; } }
		p { font-size: $font-size-base; color: $color-text-muted; line-height: 1.7; margin-bottom: $spacing-xl; strong { color: $color-secondary; } }
	}

	.vol-img {
		@media (max-width: 860px) { order: -1; }
		img {
			width: 100%;
			max-width: 380px;
			border-radius: $radius;
			box-shadow: $shadow-lg;
			display: block;
			margin: 0 auto;
			aspect-ratio: 4 / 3;
			object-fit: cover;
		}
	}

	/* ── TRIO ── */
	.trio {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-lg;
		@media (max-width: 820px) { grid-template-columns: 1fr; }
	}

	.card-t {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-2xl $spacing-xl;
		border: 1px solid $color-border;
		transition: transform 0.16s ease, box-shadow 0.16s ease;
		&:hover { transform: translateY(-3px); box-shadow: $shadow-md; }
	}

	.trio-ic {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: $spacing-md;
		&.blue { background: linear-gradient(135deg, $color-primary, $color-primary-dark); }
		&.green { background: linear-gradient(135deg, $color-accent, $color-accent-dark); }
		&.red { background: linear-gradient(135deg, #E74C3C, #C0392B); }
	}

	.trio-h { font-size: $font-size-lg; font-weight: 700; color: $color-secondary; margin-bottom: 8px; }
	.trio-p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.55; margin-bottom: $spacing-lg; flex: 1; }

	.btn-sm { padding: 10px $spacing-lg; min-height: 42px; font-size: $font-size-sm; }

	/* ── DOŁĄCZ ── */
	.join {
		background: linear-gradient(135deg, $color-primary-bg 0%, #E4F1FB 100%);
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 56px;
		align-items: center;
		@media (max-width: 860px) { grid-template-columns: 1fr; gap: $spacing-xl; }

		h2 { font-family: $font-serif; font-size: 30px; font-weight: 700; letter-spacing: -0.01em; color: $color-secondary; margin-bottom: $spacing-md; line-height: 1.15; @media (max-width: 600px) { font-size: 26px; } }
		p { font-size: $font-size-base; color: $color-text-muted; line-height: 1.7; }
	}

	.join-assure {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: $spacing-lg;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-accent-dark;
	}

	.join-teaser {
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-xl;
		box-shadow: $shadow-lg;
		border: 1px solid $color-border;
		display: flex;
		flex-direction: column;
		gap: $spacing-md;
	}

	.teaser-row {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		font-size: $font-size-base;
		font-weight: 600;
		color: $color-secondary;
	}

	.teaser-ic {
		width: 40px;
		height: 40px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;

		&.blue { background: linear-gradient(135deg, $color-primary, $color-primary-dark); }
		&.warm { background: linear-gradient(135deg, $color-warm, #D98E10); }
		&.primary { background: linear-gradient(135deg, $color-accent, $color-accent-dark); }
	}

	.btn-full { width: 100%; justify-content: center; margin-top: 4px; }
</style>
