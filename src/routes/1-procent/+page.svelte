<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

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

	const steps = [
		{
			n: 1,
			title: 'Rozlicz PIT',
			desc: 'Samodzielnie, przez księgowego lub w usłudze Twój e-PIT na podatki.gov.pl — dowolna z popularnych deklaracji (PIT-28, PIT-36, PIT-36L, PIT-37, PIT-38, PIT-39).'
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
</svelte:head>

<div class="page">
	<PageHeader
		eyebrow="Zaangażuj się"
		title="Przekaż 1,5% podatku"
		subtitle="To jedyna forma pomocy, która nic Cię nie kosztuje — to już Twój podatek, decydujesz tylko, dokąd trafi."
	/>

	<div class="panel krs-panel">
		<div class="krs-text">
			<span class="krs-label">Numer KRS Stowarzyszenia</span>
			<span class="krs-number">{KRS}</span>
			<span class="krs-name">Stowarzyszenie mali bracia Ubogich</span>
		</div>
		<button class="btn btn-primary copy-btn" onclick={copyKrs}>
			<Icon name={copied ? 'check' : 'copy'} size={18} color="white" />
			{copied ? 'Skopiowano!' : 'Kopiuj numer KRS'}
		</button>
	</div>

	<section class="block">
		<div class="sec-head">
			<span class="sec-ic" style="--c: #169FDB"><Icon name="clipboard-check" size={20} color="#169FDB" /></span>
			<h2>Jak to zrobić — 3 kroki</h2>
		</div>
		<div class="steps">
			{#each steps as s}
				<div class="step-card">
					<span class="step-num">{s.n}</span>
					<div>
						<h3>{s.title}</h3>
						<p>{s.desc}</p>
					</div>
				</div>
			{/each}
		</div>
		<p class="deadline-note">
			<Icon name="clock" size={15} color="#8794A1" />
			<span>
				Termin: rozliczenie PIT (a wraz z nim wniosek o 1,5%) składa się co roku najpóźniej
				<strong>do 30 kwietnia</strong>, za pomocą
				<a href="https://www.podatki.gov.pl/pit/twoj-e-pit/" target="_blank" rel="noopener">usługi Twój e-PIT</a>.
			</span>
		</p>
	</section>

	<section class="block">
		<div class="sec-head">
			<span class="sec-ic" style="--c: #1FA138"><Icon name="heart" size={20} color="#1FA138" /></span>
			<h2>Na co realnie idzie Twoje 1,5%</h2>
		</div>
		<p class="funds-desc">
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

	<div class="panel more-panel">
		<div>
			<span class="eyebrow">Chcesz zrobić więcej?</span>
			<h2>1,5% to dopiero początek</h2>
			<p>Możesz też zostać wolontariuszem, wesprzeć nas jednorazowo lub cyklicznie.</p>
		</div>
		<a href="/dolacz" class="btn btn-accent">
			Zobacz inne formy wsparcia <Icon name="arrow-right" size={16} color="white" />
		</a>
	</div>
</div>

<style lang="scss">
	@use 'variables' as *;

	.page { max-width: 820px; }

	.block { margin: $spacing-2xl 0; }

	.sec-head {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		margin-bottom: $spacing-lg;
		h2 { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; color: $color-secondary; }
	}

	.sec-ic {
		width: 40px;
		height: 40px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		flex-shrink: 0;
	}

	/* ── KRS PANEL ── */
	.krs-panel {
		background: linear-gradient(135deg, $color-primary-bg, #E4F1FB);
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-2xl;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $spacing-xl;
		flex-wrap: wrap;
	}

	.krs-text { display: flex; flex-direction: column; gap: 4px; }

	.krs-label {
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		color: $color-primary;
	}

	.krs-number {
		font-family: $font-serif;
		font-size: 40px;
		font-weight: 700;
		letter-spacing: 0.02em;
		color: $color-secondary;
	}

	.krs-name { font-size: $font-size-sm; color: $color-text-muted; }

	.copy-btn { flex-shrink: 0; white-space: nowrap; }

	/* ── STEPS ── */
	.steps {
		display: flex;
		flex-direction: column;
		gap: $spacing-md;
		margin-bottom: $spacing-lg;
	}

	.step-card {
		display: flex;
		align-items: flex-start;
		gap: $spacing-lg;
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		padding: $spacing-lg;

		h3 { font-size: $font-size-base; font-weight: 700; color: $color-secondary; margin-bottom: 4px; }
		p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.55; }
	}

	.step-num {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		background: $color-primary;
		color: white;
		font-weight: 700;
		font-size: $font-size-sm;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.deadline-note {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		font-size: $font-size-sm;
		color: $color-text-muted;
		line-height: 1.5;
		background: $color-bg-soft;
		border-radius: $radius-sm;
		padding: $spacing-md $spacing-lg;

		:global(svg) { flex-shrink: 0; margin-top: 3px; }
		strong { color: $color-secondary; }
		a { color: $color-primary; font-weight: 600; }
	}

	/* ── FUNDS ── */
	.funds-desc {
		font-size: $font-size-base;
		color: $color-text-muted;
		line-height: 1.65;
		margin-bottom: $spacing-lg;
		strong { color: $color-secondary; }
	}

	.impact-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-md;
		margin-bottom: $spacing-sm;
		@media (max-width: 560px) { grid-template-columns: 1fr; }
	}

	.impact-card {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		padding: $spacing-lg;
		text-align: center;

		strong {
			display: block;
			font-family: $font-serif;
			font-size: 34px;
			font-weight: 700;
			color: $color-accent;
		}
		span { font-size: $font-size-sm; color: $color-text-muted; }
	}

	.impact-source { font-size: 12px; color: $color-text-muted; opacity: 0.7; }

	/* ── MORE PANEL ── */
	.more-panel {
		background: linear-gradient(135deg, $color-accent-bg, #EAF7ED);
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-2xl;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: $spacing-xl;
		flex-wrap: wrap;
		margin-top: $spacing-2xl;

		h2 { font-family: $font-serif; font-size: 24px; font-weight: 700; color: $color-secondary; margin: 6px 0; }
		p { font-size: $font-size-sm; color: $color-text-muted; }
	}

	.eyebrow {
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		color: $color-accent;
	}
</style>
