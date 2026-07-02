<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { enhance } from '$app/forms';

	let { data } = $props();

	const pathLabels: Record<string, string> = {
		WOLONTARIAT: 'Wolontariat',
		WSPARCIE: 'Wsparcie finansowe',
		PYTANIE: 'Pytanie'
	};

	const pathColors: Record<string, string> = {
		WOLONTARIAT: '#1FA138',
		WSPARCIE: '#F5A623',
		PYTANIE: '#169FDB'
	};

	const statusLabels: Record<string, string> = {
		NOWE: 'Nowe',
		W_TOKU: 'W toku',
		ZAMKNIETE: 'Zamknięte'
	};

	let statusFilter = $state<'ALL' | 'NOWE' | 'W_TOKU' | 'ZAMKNIETE'>('ALL');

	const filtered = $derived(
		statusFilter === 'ALL' ? data.requests : data.requests.filter((r) => r.status === statusFilter)
	);

	function formatDate(iso: string) {
		return new Date(iso).toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
	}
</script>

<svelte:head><title>Zgłoszenia — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<h1>Zgłoszenia z formularza</h1>
	<p>Wszystkie zgłoszenia wysłane przez „Dołącz do nas".</p>
</header>

<div class="filters">
	{#each [['ALL', 'Wszystkie'], ['NOWE', 'Nowe'], ['W_TOKU', 'W toku'], ['ZAMKNIETE', 'Zamknięte']] as [value, label]}
		<button class="chip" class:active={statusFilter === value} onclick={() => (statusFilter = value as typeof statusFilter)}>
			{label}
			<span class="chip-count">{value === 'ALL' ? data.requests.length : data.requests.filter((r) => r.status === value).length}</span>
		</button>
	{/each}
</div>

{#if filtered.length === 0}
	<div class="empty">
		<Icon name="book" size={36} color="#C9D2DA" />
		<p>Brak zgłoszeń w tej kategorii.</p>
	</div>
{:else}
	<div class="list">
		{#each filtered as r (r.id)}
			<div class="row">
				<div class="row-main">
					<span class="path-badge" style="--c: {pathColors[r.path]}">{pathLabels[r.path] ?? r.path}</span>
					<div class="row-info">
						<strong>{r.name}</strong>
						<span class="row-email">{r.email}</span>
					</div>
					<span class="row-date">{formatDate(r.createdAt)}</span>
				</div>

				<div class="row-details">
					{#if r.phone}<span><b>Tel:</b> {r.phone}</span>{/if}
					{#if r.city}<span><b>Miasto:</b> {r.city}</span>{/if}
					{#if r.availability}<span><b>Dostępność:</b> {r.availability}</span>{/if}
					{#if r.supportType}<span><b>Forma:</b> {r.supportType === 'JEDNORAZOWE' ? 'Jednorazowe' : 'Cykliczne'}</span>{/if}
					{#if r.motivation}<span class="full"><b>Motywacja:</b> {r.motivation}</span>{/if}
					{#if r.message}<span class="full"><b>Wiadomość:</b> {r.message}</span>{/if}
				</div>

				<form method="POST" action="?/updateStatus" use:enhance class="row-status">
					<input type="hidden" name="id" value={r.id} />
					<label>
						Status:
						<select name="status" value={r.status} onchange={(e) => e.currentTarget.form?.requestSubmit()}>
							{#each Object.entries(statusLabels) as [value, label]}
								<option {value}>{label}</option>
							{/each}
						</select>
					</label>
				</form>
			</div>
		{/each}
	</div>
{/if}

<style lang="scss">
	@use '../../lib/styles/variables' as *;

	.dash-head {
		margin-bottom: $spacing-xl;
		h1 { font-family: $font-serif; font-size: 28px; font-weight: 700; color: $color-secondary; }
		p { font-size: $font-size-sm; color: $color-text-muted; margin-top: 4px; }
	}

	.filters { display: flex; gap: $spacing-sm; margin-bottom: $spacing-xl; flex-wrap: wrap; }

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

	.empty { text-align: center; padding: $spacing-3xl; color: $color-text-muted; p { margin-top: $spacing-md; } }

	.list { display: flex; flex-direction: column; gap: $spacing-md; }

	.row {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		padding: $spacing-lg;
	}

	.row-main {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		flex-wrap: wrap;
	}

	.path-badge {
		padding: 4px 12px;
		border-radius: $radius-full;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.4px;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		color: var(--c);
	}

	.row-info {
		display: flex;
		flex-direction: column;
		strong { font-size: $font-size-base; color: $color-secondary; }
		.row-email { font-size: $font-size-sm; color: $color-text-muted; }
	}

	.row-date {
		margin-left: auto;
		font-size: 12px;
		color: $color-text-muted;
	}

	.row-details {
		display: flex;
		flex-wrap: wrap;
		gap: $spacing-sm $spacing-lg;
		margin-top: $spacing-md;
		padding-top: $spacing-md;
		border-top: 1px solid $color-border;
		font-size: $font-size-sm;
		color: $color-text;

		b { color: $color-text-muted; font-weight: 600; }
		.full { width: 100%; }
	}

	.row-status {
		margin-top: $spacing-md;

		label {
			display: inline-flex;
			align-items: center;
			gap: $spacing-sm;
			font-size: $font-size-sm;
			font-weight: 600;
			color: $color-text-muted;
		}

		select {
			padding: 6px 10px;
			border-radius: $radius-sm;
			border: 1.5px solid $color-border;
			font-size: $font-size-sm;
			font-family: inherit;
			background: $color-bg;
		}
	}
</style>
