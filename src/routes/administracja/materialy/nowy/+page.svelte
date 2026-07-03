<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import DemoToast from '$lib/components/admin/DemoToast.svelte';

	let title = $state('');
	let description = $state('');
	let category = $state<'Ćwiczenia' | 'Wsparcie' | 'Wolontariat'>('Ćwiczenia');
	let fileName = $state<string | null>(null);
	let dragOver = $state(false);
	let toastShow = $state(false);

	function handleFiles(files: FileList | null) {
		if (files && files.length) fileName = files[0].name;
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		handleFiles(e.dataTransfer?.files ?? null);
	}

	function save(e: SubmitEvent) {
		e.preventDefault();
		toastShow = true;
		setTimeout(() => (toastShow = false), 3200);
	}
</script>

<svelte:head><title>Dodaj materiał — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<div>
		<a href="/administracja/materialy" class="back-link">← Materiały</a>
		<h1>Dodaj materiał</h1>
	</div>
</header>

<form class="material-form" onsubmit={save}>
	<div class="form-main">
		<button
			type="button"
			class="dropzone"
			class:drag={dragOver}
			ondragover={(e) => { e.preventDefault(); dragOver = true; }}
			ondragleave={() => (dragOver = false)}
			ondrop={onDrop}
			onclick={() => document.getElementById('file-input')?.click()}
		>
			<Icon name="file-text" size={32} color="#F5A623" />
			{#if fileName}
				<strong>{fileName}</strong>
				<span>Kliknij, aby wybrać inny plik</span>
			{:else}
				<strong>Przeciągnij plik PDF tutaj</strong>
				<span>albo kliknij, aby wybrać z dysku</span>
			{/if}
			<input id="file-input" type="file" accept="application/pdf" hidden onchange={(e) => handleFiles(e.currentTarget.files)} />
		</button>

		<div class="field">
			<label for="mf-title">Tytuł materiału</label>
			<input id="mf-title" type="text" bind:value={title} placeholder="Np. Ćwiczenia usprawniające pamięć" required />
		</div>

		<div class="field">
			<label for="mf-desc">Opis</label>
			<textarea id="mf-desc" bind:value={description} rows="3" placeholder="Krótki opis widoczny przy pliku..."></textarea>
		</div>
	</div>

	<aside class="form-side">
		<div class="side-card">
			<span class="side-title">Kategoria</span>
			<select bind:value={category}>
				<option>Ćwiczenia</option>
				<option>Wsparcie</option>
				<option>Wolontariat</option>
			</select>
		</div>

		<button type="submit" class="btn btn-primary btn-full">
			<Icon name="check" size={16} color="white" />
			Dodaj materiał
		</button>
	</aside>
</form>

<DemoToast show={toastShow} message="Tryb demo — plik nie został przesłany na serwer." />

<style lang="scss">
	@use '../../../../lib/styles/variables' as *;

	.dash-head {
		margin-bottom: $spacing-xl;
		h1 { font-family: $font-serif; font-size: 26px; font-weight: 700; color: $color-secondary; margin-top: 4px; }
	}

	.back-link {
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-text-muted;
		text-decoration: none;
		&:hover { color: $color-primary; }
	}

	.material-form {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: $spacing-lg;
		align-items: start;
		@media (max-width: 900px) { grid-template-columns: 1fr; }
	}

	.form-main, .form-side { display: flex; flex-direction: column; gap: $spacing-md; }

	.dropzone {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		text-align: center;
		padding: $spacing-2xl;
		border: 2px dashed $color-border;
		border-radius: $radius;
		background: $color-bg-card;
		transition: border-color 0.15s ease, background 0.15s ease;

		strong { font-size: $font-size-base; color: $color-secondary; margin-top: $spacing-sm; }
		span { font-size: $font-size-sm; color: $color-text-muted; }

		&:hover, &.drag { border-color: $color-warm; background: $color-warm-light; }
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		padding: $spacing-md $spacing-lg;

		label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: $color-text-muted; }

		input, textarea {
			border: none;
			font-family: inherit;
			font-size: $font-size-base;
			color: $color-text;
			resize: vertical;
			&:focus { outline: none; }
		}
	}

	.side-card {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		padding: $spacing-md $spacing-lg;
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
	}

	.side-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: $color-text-muted; }

	select {
		border: 1.5px solid $color-border;
		border-radius: $radius-sm;
		padding: 8px 10px;
		font-size: $font-size-sm;
		font-family: inherit;
		background: $color-bg;
	}
</style>
