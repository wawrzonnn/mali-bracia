<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { articles } from '$lib/data/articles';
	import { categories } from '$lib/data/categories';
	import { articleMeta } from '$lib/data/adminMock';
	import DemoToast from '$lib/components/admin/DemoToast.svelte';

	const catMap = Object.fromEntries(categories.map((c) => [c.slug, c]));
	const rows = articles.map((a) => ({
		...a,
		catName: catMap[a.categorySlug]?.name ?? a.categorySlug,
		catColor: catMap[a.categorySlug]?.color ?? '#169FDB',
		status: articleMeta[a.slug]?.status ?? 'Opublikowany',
		updatedAt: articleMeta[a.slug]?.updatedAt ?? '2026-01-01'
	}));

	let statusFilter = $state<'ALL' | 'Opublikowany' | 'Szkic'>('ALL');
	const filtered = $derived(statusFilter === 'ALL' ? rows : rows.filter((r) => r.status === statusFilter));

	let toastShow = $state(false);
	function demoDelete() {
		toastShow = true;
		setTimeout(() => (toastShow = false), 3200);
	}
</script>

<svelte:head><title>Baza wiedzy — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<div>
		<h1>Baza wiedzy</h1>
		<p>Artykuły publikowane na stronie w sekcji „Baza wiedzy".</p>
	</div>
	<a href="/administracja/wiedza/nowy" class="btn btn-primary">
		<Icon name="edit" size={16} color="white" />
		Nowy artykuł
	</a>
</header>

<div class="filters">
	{#each [['ALL', 'Wszystkie'], ['Opublikowany', 'Opublikowane'], ['Szkic', 'Szkice']] as [value, label]}
		<button class="chip" class:active={statusFilter === value} onclick={() => (statusFilter = value as typeof statusFilter)}>
			{label}
			<span class="chip-count">{value === 'ALL' ? rows.length : rows.filter((r) => r.status === value).length}</span>
		</button>
	{/each}
</div>

<div class="table">
	<div class="table-head">
		<span class="col-title">Tytuł</span>
		<span class="col-cat">Kategoria</span>
		<span class="col-status">Status</span>
		<span class="col-date">Aktualizacja</span>
		<span class="col-actions"></span>
	</div>
	{#each filtered as a (a.slug)}
		<div class="table-row">
			<div class="col-title">
				<strong>{a.title}</strong>
				<span class="row-summary">{a.summary}</span>
			</div>
			<span class="col-cat"><span class="cat-badge" style="--c: {a.catColor}">{a.catName}</span></span>
			<span class="col-status">
				<span class="status-badge" class:draft={a.status === 'Szkic'}>{a.status}</span>
			</span>
			<span class="col-date">{a.updatedAt}</span>
			<span class="col-actions">
				<a href="/administracja/wiedza/{a.slug}" class="icon-btn" aria-label="Edytuj">
					<Icon name="edit" size={16} color="#5A6B7A" />
				</a>
				<a href="/wiedza/{a.slug}" target="_blank" rel="noopener" class="icon-btn" aria-label="Podgląd">
					<Icon name="external" size={16} color="#5A6B7A" />
				</a>
				<button class="icon-btn" aria-label="Usuń" onclick={demoDelete}>
					<Icon name="x" size={16} color="#E74C3C" />
				</button>
			</span>
		</div>
	{/each}
</div>

<DemoToast show={toastShow} message="Tryb demo — usuwanie artykułów nie jest jeszcze podłączone." />

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

	.table {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		overflow: hidden;
	}

	.table-head, .table-row {
		display: grid;
		grid-template-columns: 2.4fr 1fr 0.9fr 0.9fr auto;
		gap: $spacing-md;
		align-items: center;
		padding: $spacing-md $spacing-lg;
	}

	.table-head {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.4px;
		color: $color-text-muted;
		border-bottom: 1px solid $color-border;
		@media (max-width: 780px) { display: none; }
	}

	.table-row {
		border-bottom: 1px solid $color-border;
		&:last-child { border-bottom: none; }

		@media (max-width: 780px) {
			grid-template-columns: 1fr;
			gap: 6px;
		}
	}

	.col-title {
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 0;
		strong { font-size: $font-size-sm; color: $color-secondary; }
	}

	.row-summary {
		font-size: 12px;
		color: $color-text-muted;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.cat-badge {
		display: inline-block;
		padding: 3px 10px;
		border-radius: $radius-full;
		font-size: 11px;
		font-weight: 700;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		color: var(--c);
	}

	.status-badge {
		display: inline-block;
		padding: 3px 10px;
		border-radius: $radius-full;
		font-size: 11px;
		font-weight: 700;
		background: color-mix(in srgb, $color-accent 12%, transparent);
		color: $color-accent-dark;

		&.draft { background: color-mix(in srgb, $color-warm 16%, transparent); color: #a06407; }
	}

	.col-date { font-size: 12px; color: $color-text-muted; white-space: nowrap; }

	.col-actions { display: flex; gap: 4px; justify-content: flex-end; }

	.icon-btn {
		width: 32px;
		height: 32px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: $radius-sm;
		flex-shrink: 0;
		&:hover { background: $color-bg; }
	}
</style>
