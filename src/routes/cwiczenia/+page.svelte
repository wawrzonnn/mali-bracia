<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { browser } from '$app/environment';

	let generating = $state(false);
	let generatedExercises = $state('');
	let selectedType = $state('memory');

	const exerciseTypes = [
		{ value: 'memory', label: 'Pamięć', desc: 'Zapamiętywanie sekwencji, list, dat' },
		{ value: 'words', label: 'Słowa', desc: 'Anagramy, przysłowia, synonimy' },
		{ value: 'logic', label: 'Logika', desc: 'Zagadki, sekwencje, sudoku słowne' },
		{ value: 'associations', label: 'Skojarzenia', desc: 'Łączenie kategorii, co nie pasuje' },
		{ value: 'attention', label: 'Uwaga', desc: 'Szukanie różnic, koncentracja' },
		{ value: 'everyday', label: 'Codzienność', desc: 'Planowanie dnia, lista zakupów' }
	];

	const pdfMaterials = [
		{
			title: 'Ćwiczenia usprawniające pamięć',
			description: 'Zestaw ćwiczeń do samodzielnego wykonania w domu',
			url: '/materialy/CWICZENIA_USPRAWNIAJACE_PAMIEC.pdf'
		},
		{
			title: 'Ćwiczenia pamięci',
			description: 'Dodatkowy zestaw ćwiczeń pamięciowych',
			url: '/materialy/C_WICZENIA_PAMIE_CI.pdf'
		},
		{
			title: 'Łamigłówki i zagadki',
			description: 'Zagadki i łamigłówki do wspólnego rozwiązywania przez telefon',
			url: '/materialy/_amig_o_wki_i_zagadki_dla_senioro_w_przez_telefon_na_str_www.pdf'
		},
		{
			title: 'Spotkania ze starszymi',
			description: 'Materiały do prowadzenia spotkań z osobami starszymi',
			url: '/materialy/mbU-Spotkania-ze-starszymi-2021.pdf'
		},
		{
			title: 'Wstępy do small-talków',
			description: 'Gotowe pomysły na rozpoczęcie rozmowy z seniorem',
			url: '/materialy/Wstepy-do-small-talkow.pdf'
		}
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
	<h1 class="page-title">Ćwiczenia pamięci</h1>
	<p class="page-intro">Regularne ćwiczenia pomagają utrzymać sprawność umysłową. Pobierz gotowe materiały lub wygeneruj nowe za pomocą AI.</p>

	<section class="pdf-section">
		<h2 class="section-title">
			<Icon name="book" size={20} color="#F5A623" />
			Materiały do pobrania
		</h2>
		<div class="pdf-grid">
			{#each pdfMaterials as pdf}
				<a href={pdf.url} target="_blank" rel="noopener" class="pdf-card">
					<div class="pdf-icon">PDF</div>
					<div class="pdf-info">
						<h3>{pdf.title}</h3>
						<p>{pdf.description}</p>
					</div>
					<Icon name="external" size={16} color="#5A6B7A" />
				</a>
			{/each}
		</div>
	</section>

	<section class="ai-section">
		<h2 class="section-title">
			<Icon name="sparkle" size={20} color="#169FDB" />
			Generator ćwiczeń AI
		</h2>
		<p class="ai-desc">Wygeneruj unikalne ćwiczenia dostosowane do potrzeb. Możesz je wydrukować lub zapisać.</p>

		<div class="type-grid">
			{#each exerciseTypes as t}
				<button
					class="type-btn"
					class:active={selectedType === t.value}
					onclick={() => (selectedType = t.value)}
				>
					<strong>{t.label}</strong>
					<span>{t.desc}</span>
				</button>
			{/each}
		</div>

		<button class="btn btn-primary btn-full generate-btn" onclick={generateExercises} disabled={generating}>
			{#if generating}
				<span class="loading-inline"></span>
				Generuję ćwiczenia...
			{:else}
				<Icon name="sparkle" size={18} color="white" />
				Generuj: {exerciseTypes.find((t) => t.value === selectedType)?.label}
			{/if}
		</button>

		{#if generatedExercises}
			<div class="generated-result">
				<div class="result-header">
					<h3>Wygenerowane ćwiczenia</h3>
					<button class="btn btn-secondary btn-sm" onclick={printExercises}>
						<Icon name="external" size={14} />
						Drukuj
					</button>
				</div>
				<div class="result-content article-content">
					{@html generatedExercises}
				</div>
			</div>
		{/if}
	</section>
</div>

<style lang="scss">
	@use 'variables' as *;

	.page-intro {
		font-size: $font-size-base;
		color: $color-text-muted;
		line-height: 1.6;
		margin-bottom: $spacing-xl;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
		font-size: $font-size-lg;
		font-weight: 700;
		margin-bottom: $spacing-lg;
	}

	.pdf-section {
		margin-bottom: $spacing-2xl;
	}

	.pdf-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-sm;

		@media (max-width: 600px) {
			grid-template-columns: 1fr;
		}

		:global(:last-child:nth-child(odd)) {
			grid-column: 1 / -1;
		}
	}

	.pdf-card {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-md $spacing-lg;
		border: 1px solid $color-border;
		border-left: 4px solid $color-warm;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.15s, box-shadow 0.15s;

		&:hover {
			border-color: $color-warm;
			box-shadow: $shadow-sm;
		}
	}

	.pdf-icon {
		flex-shrink: 0;
		width: 42px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: $color-warm-light;
		color: $color-warm;
		font-weight: 800;
		font-size: $font-size-xs;
		border-radius: $radius-sm;
	}

	.pdf-info {
		flex: 1;
		h3 { font-size: $font-size-sm; font-weight: 700; }
		p { font-size: $font-size-xs; color: $color-text-muted; }
	}

	.ai-section {
		margin-bottom: $spacing-xl;
	}

	.ai-desc {
		font-size: $font-size-sm;
		color: $color-text-muted;
		margin-bottom: $spacing-lg;
	}

	.type-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-sm;
		margin-bottom: $spacing-lg;

		@media (max-width: 600px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.type-btn {
		padding: $spacing-md;
		border-radius: $radius;
		border: 1.5px solid $color-border;
		background: $color-bg-card;
		text-align: left;
		transition: all 0.15s;
		display: flex;
		flex-direction: column;
		gap: 2px;

		strong {
			font-size: $font-size-sm;
			color: $color-text;
		}

		span {
			font-size: 11px;
			color: $color-text-muted;
			line-height: 1.3;
		}

		&:hover {
			border-color: $color-primary;
		}

		&.active {
			border-color: $color-primary;
			background: $color-primary-bg;

			strong { color: $color-primary; }
		}
	}

	.generate-btn {
		margin-bottom: $spacing-lg;
	}

	.loading-inline {
		display: inline-block;
		width: 16px;
		height: 16px;
		border: 2px solid rgba(255, 255, 255, 0.3);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.generated-result {
		background: $color-bg-card;
		border-radius: $radius;
		border: 1px solid $color-border;
		overflow: hidden;
	}

	.result-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: $spacing-md $spacing-lg;
		border-bottom: 1px solid $color-border;

		h3 { font-size: $font-size-sm; font-weight: 700; }
	}

	.btn-sm {
		padding: 8px $spacing-md;
		min-height: 36px;
		font-size: $font-size-xs;
	}

	.result-content {
		padding: $spacing-lg;
	}
</style>
