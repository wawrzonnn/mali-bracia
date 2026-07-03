<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { categories } from '$lib/data/categories';
	import DemoToast from '$lib/components/admin/DemoToast.svelte';

	let {
		title = '',
		categorySlug = categories[0].slug,
		summary = '',
		content = '',
		tags = '',
		status = 'Szkic' as 'Opublikowany' | 'Szkic',
		publicSlug = ''
	}: {
		title?: string;
		categorySlug?: string;
		summary?: string;
		content?: string;
		tags?: string;
		status?: 'Opublikowany' | 'Szkic';
		publicSlug?: string;
	} = $props();

	let toastShow = $state(false);

	function save(e: SubmitEvent) {
		e.preventDefault();
		toastShow = true;
		setTimeout(() => (toastShow = false), 3200);
	}
</script>

<form class="article-form" onsubmit={save}>
	<div class="form-main">
		<div class="field">
			<label for="af-title">Tytuł</label>
			<input id="af-title" type="text" bind:value={title} placeholder="Np. Jak przebiega starzenie się?" required />
		</div>

		<div class="field">
			<label for="af-summary">Zajawka</label>
			<textarea id="af-summary" bind:value={summary} rows="2" placeholder="Krótki opis widoczny na liście artykułów..."></textarea>
		</div>

		<div class="field">
			<label for="af-content">Treść</label>
			<textarea id="af-content" class="content-area" bind:value={content} rows="14" placeholder="Treść artykułu (HTML)..."></textarea>
			<span class="field-hint">Docelowo: edytor WYSIWYG. Teraz podgląd treści źródłowej HTML.</span>
		</div>
	</div>

	<aside class="form-side">
		<div class="side-card">
			<span class="side-title">Status</span>
			<div class="status-toggle">
				<button type="button" class:active={status === 'Opublikowany'} onclick={() => (status = 'Opublikowany')}>
					Opublikowany
				</button>
				<button type="button" class:active={status === 'Szkic'} onclick={() => (status = 'Szkic')}>
					Szkic
				</button>
			</div>
		</div>

		<div class="side-card">
			<span class="side-title">Kategoria</span>
			<select bind:value={categorySlug}>
				{#each categories as c}
					<option value={c.slug}>{c.name}</option>
				{/each}
			</select>
		</div>

		<div class="side-card">
			<span class="side-title">Tagi</span>
			<input type="text" bind:value={tags} placeholder="starzenie, zdrowie, procesy" />
		</div>

		{#if publicSlug}
			<a href="/wiedza/{publicSlug}" target="_blank" rel="noopener" class="preview-link">
				<Icon name="external" size={15} color="#169FDB" />
				Zobacz na stronie
			</a>
		{/if}

		<button type="submit" class="btn btn-primary btn-full">
			<Icon name="check" size={16} color="white" />
			Zapisz artykuł
		</button>
	</aside>
</form>

<DemoToast show={toastShow} message="Tryb demo — artykuł nie został zapisany do bazy." />

<style lang="scss">
	@use '../../styles/variables' as *;

	.article-form {
		display: grid;
		grid-template-columns: 1fr 280px;
		gap: $spacing-lg;
		align-items: start;
		@media (max-width: 900px) { grid-template-columns: 1fr; }
	}

	.form-main, .form-side { display: flex; flex-direction: column; gap: $spacing-md; }

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

	.content-area { font-family: ui-monospace, Menlo, monospace; font-size: 13px; line-height: 1.6; }
	.field-hint { font-size: 11px; color: $color-text-muted; }

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

	.status-toggle {
		display: flex;
		border-radius: $radius-sm;
		border: 1.5px solid $color-border;
		overflow: hidden;

		button {
			flex: 1;
			padding: 9px 6px;
			font-size: 12px;
			font-weight: 700;
			color: $color-text-muted;
			background: $color-bg;
			transition: all 0.15s ease;

			&.active { background: $color-primary; color: white; }
			&:first-child.active { background: $color-accent; }
		}
	}

	select, .side-card input {
		border: 1.5px solid $color-border;
		border-radius: $radius-sm;
		padding: 8px 10px;
		font-size: $font-size-sm;
		font-family: inherit;
		background: $color-bg;
	}

	.preview-link {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-primary;
		text-decoration: none;
		padding: 10px;
		border-radius: $radius-sm;
		border: 1.5px solid $color-border;
		&:hover { border-color: $color-primary; }
	}
</style>
