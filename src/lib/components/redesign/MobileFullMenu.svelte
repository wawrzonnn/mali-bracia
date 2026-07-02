<script lang="ts">
	let {
		open = false,
		active = undefined,
		onClose
	}: {
		open?: boolean;
		active?: 'wiedza' | 'cwiczenia' | 'wsparcie' | 'pytania' | 'asystent';
		onClose: () => void;
	} = $props();

	const links: Array<{ id: 'wiedza' | 'cwiczenia' | 'wsparcie' | 'pytania' | 'asystent'; href: string; label: string }> = [
		{ id: 'wiedza', href: '/wiedza', label: 'Baza wiedzy' },
		{ id: 'cwiczenia', href: '/cwiczenia', label: 'Ćwiczenia' },
		{ id: 'asystent', href: '/asystent', label: 'Asystent AI' },
		{ id: 'wsparcie', href: '/wsparcie', label: 'Wsparcie' },
		{ id: 'pytania', href: '/pytania', label: 'Pytania' }
	];
</script>

{#if open}
	<div class="mobile-full-menu">
		<div class="mfm-links">
			{#each links as l}
				<a href={l.href} class:active={active === l.id} onclick={onClose}>{l.label}</a>
			{/each}
			<a href="/1-procent" class="highlight" onclick={onClose}>Przekaż 1,5%</a>
			<a href="/dolacz" class="highlight primary" onclick={onClose}>Dołącz do nas</a>
		</div>
	</div>
{/if}

<style lang="scss">
	.mobile-full-menu {
		position: fixed;
		top: 70px;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 250;
		overflow-y: auto;
		background: var(--rd-bg-paper, #faf6ef);
		padding: 8px 20px 24px;
	}

	.mfm-links {
		display: flex;
		flex-direction: column;

		a {
			padding: 16px 2px;
			text-decoration: none;
			font-family: 'Inter', system-ui, sans-serif;
			font-weight: 500;
			font-size: 16.5px;
			color: var(--rd-ink, #221d18);
			border-bottom: 1px solid var(--rd-border, #e7dbcb);

			&.active { color: var(--rd-primary, #0a80c4); font-weight: 600; }

			&.highlight {
				font-weight: 700;
				color: var(--rd-accent, #b8324a);
				&.primary { color: var(--rd-primary, #0a80c4); }
			}
		}
	}
</style>
