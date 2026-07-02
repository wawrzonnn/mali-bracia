<script lang="ts">
	import { browser } from '$app/environment';

	let generating = $state(false);
	let generatedExercises = $state('');
	let selectedType = $state('memory');

	const exerciseTypes: { value: string; name: string; hint: string }[] = [
		{ value: 'memory', name: 'Pamięć', hint: 'Sekwencje, listy, daty' },
		{ value: 'words', name: 'Słowa', hint: 'Anagramy, przysłowia' },
		{ value: 'logic', name: 'Logika', hint: 'Zagadki, sekwencje' },
		{ value: 'associations', name: 'Skojarzenia', hint: 'Łączenie kategorii' },
		{ value: 'attention', name: 'Uwaga', hint: 'Różnice, koncentracja' },
		{ value: 'everyday', name: 'Codzienność', hint: 'Planowanie dnia' }
	];

	const pdfMaterials = [
		{ title: 'Ćwiczenia usprawniające pamięć', desc: 'Zestaw ćwiczeń do samodzielnego wykonania w domu.', url: '/materialy/CWICZENIA_USPRAWNIAJACE_PAMIEC.pdf' },
		{ title: 'Ćwiczenia pamięci', desc: 'Dodatkowy zestaw ćwiczeń pamięciowych.', url: '/materialy/C_WICZENIA_PAMIE_CI.pdf' },
		{ title: 'Łamigłówki i zagadki', desc: 'Zagadki do wspólnego rozwiązywania przez telefon.', url: '/materialy/_amig_o_wki_i_zagadki_dla_senioro_w_przez_telefon_na_str_www.pdf' },
		{ title: 'Spotkania ze starszymi', desc: 'Materiały do prowadzenia spotkań z osobami starszymi.', url: '/materialy/mbU-Spotkania-ze-starszymi-2021.pdf' },
		{ title: 'Wstępy do small-talków', desc: 'Gotowe pomysły na rozpoczęcie rozmowy z seniorem.', url: '/materialy/Wstepy-do-small-talkow.pdf' }
	];

	const selectedLabel = $derived(exerciseTypes.find((t) => t.value === selectedType)?.name ?? '');

	async function generateExercises() {
		if (!browser || generating) return;
		generating = true;
		generatedExercises = '';
		try {
			const res = await fetch('/api/exercises', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ type: selectedType })
			});
			const data = await res.json();
			generatedExercises = data.exercises;
		} catch {
			generatedExercises = '<p>Przepraszam, wystąpił błąd. Spróbuj ponownie.</p>';
		} finally {
			generating = false;
		}
	}

	function printExercises() {
		const printWindow = window.open('', '_blank');
		if (!printWindow) return;
		printWindow.document.write(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Ćwiczenia - MBU</title>
<style>body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;padding:20px;line-height:1.7;font-size:16px}
h1{font-size:22px;color:#0A80C4;border-bottom:2px solid #0A80C4;padding-bottom:8px}
h2{font-size:18px;margin-top:24px}ol,ul{margin:12px 0}li{margin:8px 0}
.footer{margin-top:40px;text-align:center;color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px}</style>
</head><body>${generatedExercises}<div class="footer">Wygenerowano przez Bazę Wiedzy MBU | malibracia.org.pl</div></body></html>`);
		printWindow.document.close();
		printWindow.print();
	}
</script>

<svelte:head>
	<title>Ćwiczenia pamięci — mali bracia Ubogich</title>
	<meta
		name="description"
		content="Gotowe materiały PDF i generator ćwiczeń AI do treningu umysłu dla seniorów."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400&family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="landing2">
		<!-- page header -->
		<section class="page-head">
			<div class="wrap head-inner">
				<span class="eyebrow accent"><span class="rule"></span>Zaangażuj się</span>
				<h1>Ćwiczenia pamięci</h1>
				<p class="lead">
					Regularny trening umysłu pomaga seniorom zachować sprawność i pewność siebie. Pobierz
					gotowe materiały do wspólnej pracy albo wygeneruj świeży zestaw za pomocą asystenta AI.
				</p>
			</div>
		</section>

		<!-- materiały do pobrania -->
		<section class="wrap materials-section">
			<div class="sec-head">
				<span class="sec-num">01</span>
				<h2>Materiały do pobrania</h2>
			</div>
			<div class="materials-grid">
				{#each pdfMaterials as m}
					<a href={m.url} target="_blank" rel="noopener" class="material-card">
						<div class="material-top">
							<span class="pdf-badge">PDF</span>
							<span class="dl-ic">↓</span>
						</div>
						<h3>{m.title}</h3>
						<p>{m.desc}</p>
						<span class="dl-link">Pobierz PDF →</span>
					</a>
				{/each}
			</div>
		</section>

		<!-- generator AI -->
		<section class="wrap generator-section">
			<div class="generator">
				<div class="sec-head">
					<span class="sec-num soft">02</span>
					<h2 class="white">Generator ćwiczeń AI</h2>
				</div>
				<p class="gen-lead">
					Wybierz rodzaj ćwiczenia, a asystent stworzy gotowy do druku lub zapisania zestaw —
					dopasowany do możliwości seniora.
				</p>
				<div class="type-grid">
					{#each exerciseTypes as t}
						<button
							type="button"
							class="type-card"
							class:active={selectedType === t.value}
							onclick={() => (selectedType = t.value)}
						>
							<span class="type-name">{t.name}</span>
							<span class="type-hint">{t.hint}</span>
						</button>
					{/each}
				</div>
				<div class="gen-cta-row">
					<button class="gen-btn" onclick={generateExercises} disabled={generating}>
						{#if generating}
							<span class="spin"></span> Generuję…
						{:else}
							✦ Generuj ćwiczenia: {selectedLabel}
						{/if}
					</button>
					<span class="gen-note">Zestaw pojawi się poniżej — gotowy do druku lub zapisania jako PDF.</span>
				</div>

				{#if generatedExercises}
					<div class="result">
						<div class="result-head">
							<h3>Wygenerowane ćwiczenia</h3>
							<button class="print-btn" onclick={printExercises}>Drukuj</button>
						</div>
						<div class="result-body article-content">
							{@html generatedExercises}
						</div>
					</div>
				{/if}
			</div>
		</section>
</div>

<style lang="scss">
	.landing2 {
		font-family: 'Inter', system-ui, sans-serif;
		color: var(--rd-ink);
		background: var(--rd-bg-paper);
		-webkit-font-smoothing: antialiased;
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
		color: var(--rd-accent);
		.rule { width: 22px; height: 1.5px; display: inline-block; background: var(--rd-accent); }
	}

	/* ── page header ── */
	.page-head { border-bottom: 1px solid var(--rd-border); background: var(--rd-bg-paper-2); }
	.head-inner {
		padding: 72px 24px 64px;
		max-width: 760px;

		h1 { font-weight: 500; font-size: 56px; line-height: 1.03; letter-spacing: -0.015em; margin: 0 0 18px; }
	}
	.lead { font-size: 19px; line-height: 1.6; color: var(--rd-muted); margin: 0; }

	.sec-head {
		display: flex;
		align-items: baseline;
		gap: 14px;
		margin-bottom: 32px;
		h2 { font-weight: 500; font-size: 34px; line-height: 1.1; margin: 0; &.white { color: #fff; } }
	}
	.sec-num { font-family: 'Newsreader', serif; font-size: 15px; font-weight: 600; color: var(--rd-accent); &.soft { color: var(--rd-accent-soft); } }

	/* ── materiały ── */
	.materials-section { padding: 72px 24px 24px; }
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
	.pdf-badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 11px;
		font-weight: 700;
		letter-spacing: 0.08em;
		color: var(--rd-accent);
		background: var(--rd-accent-soft-bg);
		padding: 5px 10px;
		border-radius: 7px;
	}
	.dl-ic { font-size: 19px; color: #c3b6a2; }
	.dl-link { margin-top: auto; padding-top: 16px; font-weight: 600; font-size: 14px; color: var(--rd-primary); }

	/* ── generator ── */
	.generator-section { padding: 56px 24px 88px; }
	.generator { background: var(--rd-ink-dark); border-radius: 24px; padding: 56px 56px 52px; color: #f1e8da; }
	.gen-lead { font-size: 17px; line-height: 1.6; color: var(--rd-muted-dark); margin: 0 0 36px; max-width: 40em; }

	.type-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 36px; }
	.type-card {
		cursor: pointer;
		font-family: inherit;
		text-align: left;
		display: flex;
		flex-direction: column;
		padding: 22px;
		border-radius: 14px;
		transition: all 0.15s ease;
		min-height: 96px;
		justify-content: center;
		background: var(--rd-ink-card-dark);
		border: 1.5px solid var(--rd-border-dark);

		.type-name { font-family: 'Newsreader', serif; font-weight: 600; font-size: 20px; color: #fff; }
		.type-hint { font-size: 14px; color: var(--rd-muted-dark-3); margin-top: 4px; }

		&:hover { border-color: var(--rd-accent-soft); }
		&.active {
			background: var(--rd-primary);
			border-color: var(--rd-primary);
			.type-hint { color: var(--rd-primary-soft-text); }
		}
	}

	.gen-cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: 16px;
		align-items: center;
		border-top: 1px solid var(--rd-border-dark);
		padding-top: 32px;
	}
	.gen-btn {
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-weight: 600;
		font-size: 16px;
		padding: 16px 30px;
		border-radius: 999px;
		background: var(--rd-primary);
		color: #fff;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		&:hover:not(:disabled) { background: var(--rd-primary-hover); }
		&:disabled { opacity: 0.7; cursor: default; }
	}
	.gen-note { font-size: 14px; color: var(--rd-faint-dark); min-width: 0; flex: 1 1 200px; }

	.spin {
		display: inline-block;
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}
	@keyframes spin { to { transform: rotate(360deg); } }

	/* ── result ── */
	.result { margin-top: 32px; background: var(--rd-ink-card-dark); border-radius: 16px; border: 1px solid var(--rd-border-dark); overflow: hidden; }
	.result-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16px 22px;
		border-bottom: 1px solid var(--rd-border-dark);
		h3 { font-size: 16px; font-weight: 600; font-family: 'Inter', sans-serif; color: #fff; margin: 0; }
	}
	.print-btn {
		cursor: pointer;
		font-family: inherit;
		font-weight: 600;
		font-size: 13px;
		padding: 8px 16px;
		border-radius: 999px;
		border: 1.5px solid var(--rd-border-dark);
		background: transparent;
		color: var(--rd-muted-dark);
		&:hover { border-color: var(--rd-primary); color: #fff; }
	}
	.result-body {
		padding: 24px;
		background: var(--rd-bg-paper);
		color: var(--rd-ink);
		max-width: 100%;
		overflow-wrap: break-word;
		:global(*) { max-width: 100%; overflow-wrap: break-word; }
		:global(h1), :global(h2) { font-family: 'Newsreader', serif; color: var(--rd-ink); }
		:global(h2) { margin-top: 20px; }
	}

	/* ── responsive ── */
	@media (max-width: 980px) {
		.materials-grid { grid-template-columns: repeat(2, 1fr); }
		.type-grid { grid-template-columns: repeat(2, 1fr); }
	}

	@media (max-width: 768px) {
		.wrap { padding: 0 16px; }
		.head-inner { padding: 40px 16px; }
		.head-inner h1 { font-size: 38px; }
		.materials-section { padding: 40px 16px 8px; }
		.materials-grid { grid-template-columns: 1fr; }
		.generator-section { padding: 32px 16px 56px; }
		.generator { padding: 32px 24px; }
		.type-grid { grid-template-columns: 1fr; }
		.sec-head h2 { font-size: 26px; }
	}
</style>
