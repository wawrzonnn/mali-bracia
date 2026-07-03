<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { adminMaterials } from '$lib/data/adminMock';
	import DemoToast from '$lib/components/admin/DemoToast.svelte';

	let categoryFilter = $state<'ALL' | 'Ćwiczenia' | 'Wsparcie' | 'Wolontariat'>('ALL');
	const filtered = $derived(
		categoryFilter === 'ALL' ? adminMaterials : adminMaterials.filter((m) => m.category === categoryFilter)
	);

	function formatSize(kb: number) {
		return kb >= 1024 ? `${(kb / 1024).toFixed(1)} MB` : `${kb} KB`;
	}

	let toastShow = $state(false);
	function demoDelete() {
		toastShow = true;
		setTimeout(() => (toastShow = false), 3200);
	}
</script>

<svelte:head><title>Materiały — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<div>
		<h1>Materiały</h1>
		<p>Pliki PDF udostępniane na stronie (ćwiczenia, wsparcie, wolontariat).</p>
	</div>
	<a href="/administracja/materialy/nowy" class="btn btn-primary">
		<Icon name="file-text" size={16} color="white" />
		Dodaj materiał
	</a>
</header>

<div class="filters">
	{#each [['ALL', 'Wszystkie'], ['Ćwiczenia', 'Ćwiczenia'], ['Wsparcie', 'Wsparcie'], ['Wolontariat', 'Wolontariat']] as [value, label]}
		<button class="chip" class:active={categoryFilter === value} onclick={() => (categoryFilter = value as typeof categoryFilter)}>
			{label}
			<span class="chip-count">{value === 'ALL' ? adminMaterials.length : adminMaterials.filter((m) => m.category === value).length}</span>
		</button>
	{/each}
</div>

<div class="materials-grid">
	{#each filtered as m (m.id)}
		<div class="material-card">
			<span class="pdf-ic"><Icon name="file-text" size={20} color="#F5A623" /></span>
			<div class="material-body">
				<strong>{m.title}</strong>
				<span class="material-desc">{m.description}</span>
				<span class="material-meta">{formatSize(m.sizeKb)} · dodano {m.uploadedAt}</span>
			</div>
			<div class="material-actions">
				<a href={m.url} target="_blank" rel="noopener" class="icon-btn" aria-label="Pobierz">
					<Icon name="external" size={16} color="#5A6B7A" />
				</a>
				<button class="icon-btn" aria-label="Usuń" onclick={demoDelete}>
					<Icon name="x" size={16} color="#E74C3C" />
				</button>
			</div>
		</div>
	{/each}
</div>

<DemoToast show={toastShow} message="Tryb demo — usuwanie plików nie jest jeszcze podłączone." />

<style lang="scss">
	@use '../../../lib/styles/variables' as *;

	.dash-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: $spacing-lg;
		margin-bottom: $spacing-xl;
		flex-wrap: wrap;
		h1 { font-family: $font-serif; font-size: 28px; font-weight: 700; color: $color-secondary; }
		p { font-size: $font-size-sm; color: $color-text-muted; margin-top: 4px; }
	}

	.filters { display: flex; gap: $spacing-sm; margin-bottom: $spacing-lg; flex-wrap: wrap; }

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		border-radius: $radius-full;
		border: 1.5px solid $color-border;
		background: $color-bg-card;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-text-muted;
		transition: all 0.15s ease;

		&:hover { border-color: $color-primary; }
		&.active { border-color: $color-primary; background: $color-primary-bg; color: $color-primary; }
	}

	.chip-count {
		font-size: 11px;
		font-weight: 700;
		background: rgba(0, 0, 0, 0.08);
		border-radius: $radius-full;
		padding: 1px 7px;
	}

	.materials-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: $spacing-md;
		@media (max-width: 720px) { grid-template-columns: 1fr; }
	}

	.material-card {
		display: flex;
		align-items: flex-start;
		gap: $spacing-md;
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		padding: $spacing-lg;
		transition: box-shadow 0.15s ease, border-color 0.15s ease;
		&:hover { box-shadow: $shadow-sm; border-color: color-mix(in srgb, $color-warm 40%, $color-border); }
	}

	.pdf-ic {
		width: 40px;
		height: 40px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: $color-warm-light;
		flex-shrink: 0;
	}

	.material-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
		strong { font-size: $font-size-sm; color: $color-secondary; }
	}

	.material-desc { font-size: 12.5px; color: $color-text-muted; line-height: 1.4; }
	.material-meta { font-size: 11px; color: $color-text-muted; opacity: 0.8; margin-top: 2px; }

	.material-actions { display: flex; flex-direction: column; gap: 4px; flex-shrink: 0; }

	.icon-btn {
		width: 32px;
		height: 32px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: $radius-sm;
		&:hover { background: $color-bg; }
	}
</style>
