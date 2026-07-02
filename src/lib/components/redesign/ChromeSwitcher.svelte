<script lang="ts">
	let { mode, onSelect }: { mode: 'navbar' | 'sidebar'; onSelect: (m: 'navbar' | 'sidebar') => void } = $props();
</script>

<div class="chrome-switch" role="group" aria-label="Tryb nawigacji (do prezentacji)">
	<button
		class:active={mode === 'navbar'}
		onclick={() => onSelect('navbar')}
		title="Nawigacja: górny pasek"
		aria-label="Nawigacja: górny pasek"
		aria-pressed={mode === 'navbar'}
	>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4" />
			<rect x="1" y="1" width="14" height="4" rx="1.5" fill="currentColor" />
		</svg>
	</button>
	<button
		class:active={mode === 'sidebar'}
		onclick={() => onSelect('sidebar')}
		title="Nawigacja: boczny panel"
		aria-label="Nawigacja: boczny panel"
		aria-pressed={mode === 'sidebar'}
	>
		<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
			<rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4" />
			<rect x="1" y="1" width="5" height="14" rx="1.5" fill="currentColor" />
		</svg>
	</button>
</div>

<style lang="scss">
	.chrome-switch {
		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 500;
		display: flex;
		gap: 2px;
		background: rgba(255, 255, 255, 0.95);
		border: 1px solid rgba(0, 0, 0, 0.12);
		border-radius: 10px;
		padding: 3px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
		backdrop-filter: blur(6px);

		@media (max-width: 768px) { display: none; }
	}

	button {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 7px;
		color: #8794a1;
		transition: background 0.15s ease, color 0.15s ease;

		&:hover { background: rgba(0, 0, 0, 0.06); }
		&.active { background: #0a80c4; color: #fff; }
	}
</style>
