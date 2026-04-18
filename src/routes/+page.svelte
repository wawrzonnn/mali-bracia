<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import type { IconName } from '$lib/data/categories';

	let { data } = $props();
</script>

<div class="landing">
	<section class="hero">
		<div class="hero-bg">
			<img src="/img/intro.png" alt="" class="hero-bg-img" />
			<div class="hero-gradient"></div>
		</div>
		<div class="hero-inner">
			<span class="hero-chip">
				<Icon name="sparkle" size={14} color="#B3E0F7" />
				Baza Wiedzy z AI
			</span>
			<h1>Zrozum starość.<br />Buduj relacje.<br /><span class="accent">Pomagaj mądrze.</span></h1>
			<p>Materiały edukacyjne, ćwiczenia pamięci i asystent AI -- wszystko o starzeniu się i wsparciu seniorów.</p>
			<div class="hero-buttons">
				<a href="/wiedza" class="btn btn-primary">
					<Icon name="book" size={18} color="white" />
					Przeglądaj wiedzę
				</a>
				<a href="/asystent" class="btn btn-glass">
					<Icon name="sparkle" size={18} color="white" />
					Zapytaj AI
				</a>
			</div>
		</div>
	</section>

	<section class="stats-strip">
		<div class="stats-inner">
			<div class="stat-box">
				<span class="stat-num">10 mln</span>
				<span class="stat-txt">seniorów w Polsce</span>
			</div>
			<div class="stat-box">
				<span class="stat-num">26%</span>
				<span class="stat-txt">80-latków doświadcza samotności</span>
			</div>
			<div class="stat-box">
				<span class="stat-num">800+</span>
				<span class="stat-txt">wolontariuszy MBU</span>
			</div>
			<div class="stat-box">
				<span class="stat-num">53%</span>
				<span class="stat-txt">Polaków czuje się samotnie</span>
			</div>
		</div>
	</section>

	<section class="section-pad">
		<div class="container">
			<h2 class="sec-title">Tematy do poznania</h2>
			<div class="topics-grid">
				{#each data.categories as cat}
					<a href="/wiedza?kategoria={cat.slug}" class="topic-card" style="--c: {cat.color}">
						<div class="topic-icon">
							<Icon name={cat.icon as IconName} size={24} color={cat.color} />
						</div>
						<div>
							<h3>{cat.name}</h3>
							<p>{cat.description}</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section class="impact" style="background-image: url('/img/oldman.png');">
		<div class="impact-overlay">
			<div class="impact-inner">
				<span class="label-tag light">Wyzwanie</span>
				<h2>Samotność to cierpienie w milczeniu</h2>
				<div class="impact-stats">
					<div class="impact-stat">
						<strong>15</strong>
						<span>papierosów dziennie — tyle szkodzi osamotnienie</span>
					</div>
					<div class="impact-stat">
						<strong>50%</strong>
						<span>wyższe ryzyko demencji u osób samotnych</span>
					</div>
					<div class="impact-stat">
						<strong>1.7 mln</strong>
						<span>seniorów w Polsce żyje w samotności</span>
					</div>
				</div>
				<a href="/wiedza/epidemia-osamotnienia" class="link-arrow light">
					Dowiedz się więcej
					<Icon name="arrow-right" size={14} color="white" />
				</a>
			</div>
		</div>
	</section>

	<section class="section-pad light">
		<div class="container">
			<div class="sec-header">
				<h2 class="sec-title">Artykuły</h2>
				<a href="/wiedza" class="link-arrow">Wszystkie <Icon name="arrow-right" size={14} color="#169FDB" /></a>
			</div>
			<div class="articles-grid">
				{#each data.recentArticles as article}
					<a href="/wiedza/{article.slug}" class="art-card">
						<span class="art-badge">{article.categorySlug.replace(/-/g, ' ')}</span>
						<h3>{article.title}</h3>
						<p>{article.summary}</p>
						<span class="art-time">
							<Icon name="clock" size={12} color="#5A6B7A" />
							{article.readingTimeMin} min
						</span>
					</a>
				{/each}
			</div>
		</div>
	</section>

	<section class="volunteer">
		<div class="container vol-layout">
			<div class="vol-text">
				<span class="label-tag green">Wolontariat</span>
				<h2>Zostań przyjacielem osoby starszej</h2>
				<p>Regularnie odwiedzasz seniora, rozmawiasz, pijesz herbatę, spacerujesz. Wystarczy 1 godzina tygodniowo. Stowarzyszenie zapewnia szkolenie i wsparcie koordynatora.</p>
				<a href="https://www.malibracia.org.pl" target="_blank" rel="noopener" class="btn btn-accent">
					Dołącz do wolontariatu
					<Icon name="external" size={16} color="white" />
				</a>
			</div>
			<div class="vol-img">
				<img src="/img/oldwoman.png" alt="Seniorka" />
			</div>
		</div>
	</section>

	<section class="section-pad">
		<div class="container trio-grid">
			<div class="trio-card">
				<div class="trio-ic blue"><Icon name="sparkle" size={24} color="white" /></div>
				<h3>Asystent AI</h3>
				<p>Odpowiem na pytania o starzeniu, samotności i wsparciu.</p>
				<a href="/asystent" class="btn btn-primary btn-sm">Zapytaj</a>
			</div>
			<div class="trio-card">
				<div class="trio-ic green"><Icon name="puzzle" size={24} color="white" /></div>
				<h3>Ćwiczenia</h3>
				<p>PDF-y do pobrania i generator ćwiczeń AI do wydruku.</p>
				<a href="/cwiczenia" class="btn btn-accent btn-sm">Ćwicz</a>
			</div>
			<div class="trio-card">
				<div class="trio-ic red"><Icon name="phone" size={24} color="white" /></div>
				<h3>Wsparcie</h3>
				<p>Telefony zaufania, organizacje i materiały.</p>
				<a href="/wsparcie" class="btn btn-secondary btn-sm">Zobacz</a>
			</div>
		</div>
	</section>

	<section class="banner-end">
		<img src="/img/hands.png" alt="" class="banner-bg" />
		<div class="banner-body">
			<h2>Każda rozmowa ma znaczenie</h2>
			<p>Przełam barierę samotności -- zacznij od jednego pytania</p>
			<a href="/asystent" class="btn btn-primary">
				<Icon name="sparkle" size={18} color="white" />
				Zapytaj Asystenta AI
			</a>
		</div>
	</section>
</div>

<style lang="scss">
	@use 'variables' as *;

	.landing { background: $color-bg; }

	.container {
		max-width: $max-width;
		margin: 0 auto;
		padding: 0 $spacing-2xl;
		@media (max-width: 768px) { padding: 0 $spacing-md; }
	}

	.section-pad {
		padding: $spacing-3xl 0;
		&.light { background: white; }
	}

	.sec-title {
		font-size: $font-size-xl;
		font-weight: 800;
		margin-bottom: $spacing-xl;
	}

	.sec-header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: $spacing-xl;

		.sec-title { margin-bottom: 0; }
	}

	.link-arrow {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-primary;
		text-decoration: none;
		&:hover { text-decoration: underline; }
	}

	.label-tag {
		display: inline-block;
		font-size: 11px;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 1px;
		margin-bottom: $spacing-sm;
		color: $color-warm;
		&.green { color: $color-accent; }
	}

	/* ── HERO ── */
	.hero {
		position: relative;
		min-height: 480px;
		display: flex;
		align-items: center;
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
	}

	.hero-bg-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 30%;
	}

	.hero-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(100deg, rgba(20,20,18,0.92) 0%, rgba(20,20,18,0.7) 50%, rgba(20,20,18,0.2) 100%);
	}

	.hero-inner {
		position: relative;
		z-index: 2;
		max-width: $max-width;
		margin: 0 auto;
		padding: $spacing-3xl $spacing-2xl;
		width: 100%;
		color: white;
		max-width: 580px;
		margin: 0;
		margin-left: max(calc((100% - #{$max-width}) / 2), $spacing-2xl);

		@media (max-width: 768px) {
			padding: $spacing-2xl $spacing-md;
			margin-left: $spacing-md;
		}

		h1 {
			font-size: clamp(28px, 4vw, 48px);
			font-weight: 800;
			line-height: 1.1;
			margin-bottom: $spacing-md;
		}

		p {
			font-size: $font-size-base;
			line-height: 1.6;
			opacity: 0.8;
			margin-bottom: $spacing-xl;
		}
	}

	.accent { color: $color-primary-light; }

	.hero-chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 14px;
		border-radius: $radius-full;
		background: rgba(255,255,255,0.1);
		backdrop-filter: blur(6px);
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.4px;
		text-transform: uppercase;
		color: $color-primary-light;
		margin-bottom: $spacing-lg;
	}

	.hero-buttons {
		display: flex;
		gap: $spacing-md;
		flex-wrap: wrap;
	}

	.btn-glass {
		background: rgba(255,255,255,0.12);
		color: white;
		backdrop-filter: blur(6px);
		border: 1px solid rgba(255,255,255,0.18);
		&:hover { background: rgba(255,255,255,0.2); }
	}

	/* ── STATS ── */
	.stats-strip { background: $color-primary; }

	.stats-inner {
		max-width: $max-width;
		margin: 0 auto;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		padding: $spacing-lg $spacing-2xl;

		@media (max-width: 600px) {
			grid-template-columns: repeat(2, 1fr);
			padding: $spacing-md;
		}
	}

	.stat-box { text-align: center; color: white; padding: $spacing-md 0; }
	.stat-num { display: block; font-size: $font-size-xl; font-weight: 800; color: white; }
	.stat-txt { font-size: 11px; opacity: 0.75; }

	/* ── TOPICS ── */
	.topics-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-md;
		@media (max-width: 600px) { grid-template-columns: 1fr; }
	}

	.topic-card {
		display: flex;
		align-items: center;
		gap: $spacing-lg;
		padding: $spacing-lg $spacing-xl;
		border-radius: $radius;
		border: 1px solid $color-border;
		background: white;
		text-decoration: none;
		color: inherit;
		transition: all 0.15s ease;

		&:hover {
			border-color: var(--c);
			box-shadow: 0 4px 16px rgba(0,0,0,0.05);
		}

		h3 { font-size: $font-size-sm; font-weight: 700; margin-bottom: 2px; }
		p { font-size: $font-size-xs; color: $color-text-muted; line-height: 1.4; }
	}

	.topic-icon {
		width: 48px;
		height: 48px;
		border-radius: $radius;
		display: flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 10%, transparent);
		flex-shrink: 0;
	}

	/* ── IMPACT ── */
	.impact {
		background-size: cover;
		background-position: center top;
		position: relative;
	}

	.impact-overlay {
		background: linear-gradient(135deg, rgba(29, 29, 27, 0.88) 0%, rgba(29, 29, 27, 0.7) 100%);
		padding: $spacing-3xl $spacing-2xl;

		@media (max-width: 768px) { padding: $spacing-xl $spacing-md; }
	}

	.impact-inner {
		max-width: 900px;
		margin: 0 auto;

		h2 {
			font-size: $font-size-2xl;
			font-weight: 800;
			color: white;
			margin-bottom: $spacing-xl;
			line-height: 1.15;

			@media (max-width: 600px) { font-size: $font-size-xl; }
		}
	}

	.impact-stats {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-lg;
		margin-bottom: $spacing-xl;

		@media (max-width: 600px) {
			grid-template-columns: 1fr;
			gap: $spacing-md;
		}
	}

	.impact-stat {
		padding: $spacing-lg;
		background: rgba(255, 255, 255, 0.08);
		border-radius: $radius;
		border: 1px solid rgba(255, 255, 255, 0.12);

		strong {
			display: block;
			font-size: $font-size-2xl;
			font-weight: 800;
			color: $color-warm;
			margin-bottom: 4px;
		}

		span {
			font-size: $font-size-sm;
			color: rgba(255, 255, 255, 0.8);
			line-height: 1.4;
		}
	}

	.label-tag.light {
		background: rgba(255, 255, 255, 0.12);
		color: $color-warm;
	}

	.link-arrow.light {
		color: white;
		&:hover { opacity: 0.8; }
	}

	/* ── ARTICLES ── */
	.articles-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-md;
		@media (max-width: 600px) { grid-template-columns: 1fr; }
	}

	.art-card {
		background: $color-bg;
		border-radius: $radius;
		padding: $spacing-xl;
		border: 1px solid $color-border;
		text-decoration: none;
		color: inherit;
		display: flex;
		flex-direction: column;
		transition: all 0.15s;

		&:hover { border-color: $color-primary; box-shadow: $shadow-sm; }

		h3 { font-size: $font-size-base; font-weight: 700; margin: $spacing-sm 0 $spacing-xs; line-height: 1.3; }
		p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.5; flex: 1; }
	}

	.art-badge {
		align-self: flex-start;
		padding: 3px 10px;
		border-radius: $radius-full;
		font-size: 11px;
		font-weight: 600;
		background: $color-primary-bg;
		color: $color-primary;
		text-transform: capitalize;
	}

	.art-time {
		display: inline-flex;
		align-items: center;
		gap: 3px;
		font-size: 11px;
		color: $color-text-muted;
		margin-top: $spacing-sm;
	}

	/* ── VOLUNTEER ── */
	.volunteer {
		background: linear-gradient(160deg, #F0F9F2, #E8F5EA);
		padding: $spacing-3xl 0;
	}

	.vol-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: $spacing-3xl;
		align-items: center;

		@media (max-width: 768px) {
			grid-template-columns: 1fr;
			gap: $spacing-xl;
		}
	}

	.vol-text {
		h2 { font-size: $font-size-xl; font-weight: 800; margin-bottom: $spacing-md; line-height: 1.2; }
		p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.7; margin-bottom: $spacing-xl; }
	}

	.vol-img {
		@media (max-width: 768px) { order: -1; }

		img {
			width: 100%;
			max-width: 400px;
			border-radius: $radius-lg;
			box-shadow: $shadow-lg;
			display: block;
			margin: 0 auto;
		}
	}

	/* ── TRIO ── */
	.trio-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-lg;
		@media (max-width: 768px) { grid-template-columns: 1fr; }
	}

	.trio-card {
		background: white;
		border-radius: $radius;
		padding: $spacing-xl;
		border: 1px solid $color-border;
		text-align: center;

		h3 { font-size: $font-size-base; font-weight: 700; margin: $spacing-md 0 $spacing-xs; }
		p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.5; margin-bottom: $spacing-lg; }
	}

	.trio-ic {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;

		&.blue { background: linear-gradient(135deg, $color-primary, #0D7AB5); }
		&.green { background: linear-gradient(135deg, $color-accent, #15852D); }
		&.red { background: linear-gradient(135deg, #E74C3C, #C0392B); }
	}

	.btn-sm {
		padding: 10px $spacing-lg;
		min-height: 40px;
		font-size: $font-size-sm;
	}

	/* ── BANNER ── */
	.banner-end {
		position: relative;
		min-height: 260px;
		overflow: hidden;
	}

	.banner-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.banner-body {
		position: relative;
		z-index: 1;
		min-height: 260px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		padding: $spacing-2xl $spacing-lg;
		color: white;
		background: rgba(20,20,18,0.6);

		h2 { font-size: $font-size-xl; font-weight: 800; margin-bottom: $spacing-xs; }
		p { opacity: 0.8; margin-bottom: $spacing-lg; }
	}
</style>
