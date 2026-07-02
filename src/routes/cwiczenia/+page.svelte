<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import type { IconName } from '$lib/data/categories';
	import { browser } from '$app/environment';

	let generating = $state(false);
	let generatedExercises = $state('');
	let selectedType = $state('memory');

	const exerciseTypes: { value: string; label: string; desc: string; icon: IconName; color: string }[] = [
		{ value: 'memory', label: 'Pamięć', desc: 'Sekwencje, listy, daty', icon: 'brain', color: '#169FDB' },
		{ value: 'words', label: 'Słowa', desc: 'Anagramy, przysłowia', icon: 'message', color: '#1FA138' },
		{ value: 'logic', label: 'Logika', desc: 'Zagadki, sekwencje', icon: 'puzzle', color: '#F5A623' },
		{ value: 'associations', label: 'Skojarzenia', desc: 'Łączenie kategorii', icon: 'sparkle', color: '#9B59B6' },
		{ value: 'attention', label: 'Uwaga', desc: 'Różnice, koncentracja', icon: 'search', color: '#E74C3C' },
		{ value: 'everyday', label: 'Codzienność', desc: 'Planowanie dnia', icon: 'home', color: '#16A085' }
	];

	const pdfMaterials = [
		{ title: 'Ćwiczenia usprawniające pamięć', description: 'Zestaw ćwiczeń do samodzielnego wykonania w domu', url: '/materialy/CWICZENIA_USPRAWNIAJACE_PAMIEC.pdf' },
		{ title: 'Ćwiczenia pamięci', description: 'Dodatkowy zestaw ćwiczeń pamięciowych', url: '/materialy/C_WICZENIA_PAMIE_CI.pdf' },
		{ title: 'Łamigłówki i zagadki', description: 'Zagadki do wspólnego rozwiązywania przez telefon', url: '/materialy/_amig_o_wki_i_zagadki_dla_senioro_w_przez_telefon_na_str_www.pdf' },
		{ title: 'Spotkania ze starszymi', description: 'Materiały do prowadzenia spotkań z osobami starszymi', url: '/materialy/mbU-Spotkania-ze-starszymi-2021.pdf' },
		{ title: 'Wstępy do small-talków', description: 'Gotowe pomysły na rozpoczęcie rozmowy z seniorem', url: '/materialy/Wstepy-do-small-talkow.pdf' }
	];

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
h1{font-size:22px;color:#169FDB;border-bottom:2px solid #169FDB;padding-bottom:8px}
h2{font-size:18px;margin-top:24px}ol,ul{margin:12px 0}li{margin:8px 0}
.footer{margin-top:40px;text-align:center;color:#999;font-size:12px;border-top:1px solid #eee;padding-top:16px}</style>
</head><body>${generatedExercises}<div class="footer">Wygenerowano przez Bazę Wiedzy MBU | malibracia.org.pl</div></body></html>`);
		printWindow.document.close();
		printWindow.print();
	}
</script>

<div class="page">
	<PageHeader
		eyebrow="Zaangażuj się"
		title="Ćwiczenia pamięci"
		subtitle="Regularne ćwiczenia pomagają utrzymać sprawność umysłową. Pobierz gotowe materiały lub wygeneruj nowe za pomocą AI."
	/>

	<section class="block">
		<div class="sec-head">
			<span class="sec-ic" style="--c: #F5A623"><Icon name="book" size={20} color="#F5A623" /></span>
			<h2>Materiały do pobrania</h2>
		</div>
		<div class="pdf-list">
			{#each pdfMaterials as pdf}
				<a href={pdf.url} target="_blank" rel="noopener" class="pdf">
					<span class="pdf-badge">PDF</span>
					<span class="pdf-info">
						<span class="pdf-h">{pdf.title}</span>
						<span class="pdf-p">{pdf.description}</span>
					</span>
					<span class="pdf-dl"><Icon name="external" size={16} color="#8794A1" /></span>
				</a>
			{/each}
		</div>
	</section>

	<section class="block">
		<div class="sec-head">
			<span class="sec-ic" style="--c: #169FDB"><Icon name="sparkle" size={20} color="#169FDB" /></span>
			<h2>Generator ćwiczeń AI</h2>
		</div>

		<div class="generator">
			<p class="gen-desc">Wybierz rodzaj ćwiczenia, a AI stworzy zestaw gotowy do druku lub zapisania.</p>

			<div class="type-grid">
				{#each exerciseTypes as t}
					<button
						class="type"
						class:active={selectedType === t.value}
						style="--c: {t.color}"
						onclick={() => (selectedType = t.value)}
					>
						<span class="type-ic"><Icon name={t.icon} size={20} color={t.color} /></span>
						<span class="type-body">
							<strong>{t.label}</strong>
							<span>{t.desc}</span>
						</span>
					</button>
				{/each}
			</div>

			<button class="btn btn-primary gen-btn" onclick={generateExercises} disabled={generating}>
				{#if generating}
					<span class="spin"></span>
					Generuję…
				{:else}
					<Icon name="sparkle" size={18} color="white" />
					Generuj ćwiczenia: {exerciseTypes.find((t) => t.value === selectedType)?.label}
				{/if}
			</button>
		</div>

		{#if generatedExercises}
			<div class="result">
				<div class="result-head">
					<h3>Wygenerowane ćwiczenia</h3>
					<button class="btn btn-secondary btn-sm" onclick={printExercises}>
						<Icon name="external" size={14} />
						Drukuj
					</button>
				</div>
				<div class="result-body article-content">
					{@html generatedExercises}
				</div>
			</div>
		{/if}
	</section>
</div>

<style lang="scss">
	@use 'variables' as *;

	.block { margin-bottom: $spacing-2xl; }

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

	/* ── PDF list ── */
	.pdf-list { display: flex; flex-direction: column; gap: $spacing-sm; }

	.pdf {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		background: $color-bg-card;
		border-radius: $radius;
		padding: 14px $spacing-lg;
		border: 1px solid $color-border;
		text-decoration: none;
		color: inherit;
		transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;

		&:hover {
			transform: translateX(3px);
			border-color: color-mix(in srgb, $color-warm 45%, $color-border);
			box-shadow: $shadow-sm;
		}
	}

	.pdf-badge {
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: $color-warm-light;
		color: #C77F0A;
		font-weight: 800;
		font-size: 12px;
		border-radius: $radius-sm;
	}

	.pdf-info { flex: 1; display: flex; flex-direction: column; gap: 2px; min-width: 0; }
	.pdf-h { font-size: $font-size-base; font-weight: 700; color: $color-secondary; }
	.pdf-p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.4; }
	.pdf-dl { flex-shrink: 0; }

	/* ── Generator ── */
	.generator {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-xl;
	}

	.gen-desc {
		font-size: $font-size-sm;
		color: $color-text-muted;
		margin-bottom: $spacing-lg;
	}

	.type-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-sm;
		margin-bottom: $spacing-xl;
		@media (max-width: 720px) { grid-template-columns: repeat(2, 1fr); }
		@media (max-width: 440px) { grid-template-columns: 1fr; }
	}

	.type {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		padding: 14px $spacing-md;
		border-radius: $radius;
		border: 1.5px solid $color-border;
		background: $color-bg;
		text-align: left;
		transition: all 0.15s ease;

		&:hover { border-color: color-mix(in srgb, var(--c) 45%, $color-border); }

		&.active {
			border-color: var(--c);
			background: color-mix(in srgb, var(--c) 7%, $color-bg-card);
			box-shadow: 0 0 0 3px color-mix(in srgb, var(--c) 14%, transparent);
		}
	}

	.type-ic {
		width: 40px;
		height: 40px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		flex-shrink: 0;
	}

	.type-body {
		display: flex;
		flex-direction: column;
		gap: 1px;
		strong { font-size: $font-size-sm; font-weight: 700; color: $color-secondary; }
		span { font-size: 12px; color: $color-text-muted; line-height: 1.3; }
	}

	.gen-btn { width: 100%; }

	.spin {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin { to { transform: rotate(360deg); } }

	/* ── Result ── */
	.result {
		margin-top: $spacing-lg;
		background: $color-bg-card;
		border-radius: $radius;
		border: 1px solid $color-border;
		overflow: hidden;
	}

	.result-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: $spacing-md $spacing-lg;
		border-bottom: 1px solid $color-border;
		h3 { font-size: $font-size-base; font-weight: 700; color: $color-secondary; }
	}

	.btn-sm { padding: 8px $spacing-md; min-height: 38px; font-size: $font-size-xs; }
	.result-body { padding: $spacing-lg; }
</style>
