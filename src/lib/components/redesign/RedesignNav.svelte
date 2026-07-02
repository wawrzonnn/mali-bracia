<script lang="ts">
	let {
		active = undefined,
		mobileOpen = $bindable(false)
	}: {
		active?: 'wiedza' | 'cwiczenia' | 'wsparcie' | 'pytania' | 'asystent';
		mobileOpen?: boolean;
	} = $props();

	const links: Array<{ id: 'wiedza' | 'cwiczenia' | 'wsparcie' | 'pytania' | 'asystent'; href: string; label: string }> = [
		{ id: 'wiedza', href: '/wiedza', label: 'Baza wiedzy' },
		{ id: 'cwiczenia', href: '/cwiczenia', label: 'Ćwiczenia' },
		{ id: 'asystent', href: '/asystent', label: 'Asystent AI' },
		{ id: 'wsparcie', href: '/wsparcie', label: 'Wsparcie' },
		{ id: 'pytania', href: '/pytania', label: 'Pytania' }
	];

	function closeMobile() {
		mobileOpen = false;
	}
</script>

<div class="ann-bar">
	<div class="wrap ann-inner">
		<span class="ann-text"><span class="dot"></span>Telefon Zaufania dla osób starszych — bezpłatnie, codziennie</span>
		<a href="tel:+48608018110" class="ann-phone">608 018 110</a>
	</div>
</div>

<div class="nav-sticky">
	<div class="wrap nav-inner">
		<a href="/" class="brand">
			<span class="brand-badge">m</span>
			<span class="brand-word">
				<span class="brand-name">mali bracia</span>
				<span class="brand-sub">Ubogich</span>
			</span>
		</a>
		<nav class="nav-links">
			{#each links as l}
				<a href={l.href} class:active={active === l.id}>{l.label}</a>
			{/each}
		</nav>
		<div class="nav-cta">
			<a href="/1-procent" class="btn-outline">Przekaż 1,5%</a>
			<a href="/dolacz" class="btn-solid">Dołącz do nas</a>
		</div>
		<button class="nav-burger" onclick={() => (mobileOpen = !mobileOpen)} aria-label="Menu" aria-expanded={mobileOpen}>
			<span></span><span></span><span></span>
		</button>
	</div>

	{#if mobileOpen}
		<div class="nav-mobile">
			<div class="nav-mobile-links">
				{#each links as l}
					<a href={l.href} class:active={active === l.id} onclick={closeMobile}>{l.label}</a>
				{/each}
			</div>
			<div class="nav-mobile-cta">
				<a href="/1-procent" class="btn-outline" onclick={closeMobile}>Przekaż 1,5%</a>
				<a href="/dolacz" class="btn-solid" onclick={closeMobile}>Dołącz do nas</a>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.wrap {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.ann-bar {
		background: var(--rd-ink);
		color: #f1e8da;
		font-size: 14px;
		letter-spacing: 0.01em;
	}
	.ann-inner {
		padding: 11px 24px;
		display: flex;
		flex-wrap: wrap;
		gap: 8px 24px;
		align-items: center;
		justify-content: space-between;
	}
	.ann-text {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		.dot { width: 7px; height: 7px; border-radius: 50%; background: var(--rd-accent-soft); display: inline-block; flex-shrink: 0; }
	}
	.ann-phone { text-decoration: none; font-weight: 600; color: #fff; }

	.nav-sticky {
		position: sticky;
		top: 0;
		z-index: 30;
		background: rgba(250, 246, 239, 0.86);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--rd-border);
	}
	.nav-inner {
		padding: 15px 24px;
		display: flex;
		align-items: center;
		gap: 24px;
	}
	.brand {
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 11px;
		margin-right: 4px;
		color: var(--rd-ink);
	}
	.brand-badge {
		width: 40px;
		height: 40px;
		border-radius: 11px;
		background: var(--rd-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-family: 'Newsreader', serif;
		font-size: 22px;
		font-weight: 600;
		line-height: 1;
		flex-shrink: 0;
	}
	.brand-word { display: flex; flex-direction: column; line-height: 1.05; }
	.brand-name { font-family: 'Newsreader', serif; font-size: 19px; font-weight: 600; }
	.brand-sub { font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--rd-muted-3); }

	.nav-links {
		display: flex;
		gap: 22px;
		margin-left: auto;
		font-size: 14.5px;
		font-weight: 500;
		a {
			text-decoration: none;
			color: var(--rd-ink);
			white-space: nowrap;
			&:hover { color: var(--rd-primary); }
			&.active { color: var(--rd-primary); font-weight: 600; }
		}
	}
	.nav-cta { display: flex; gap: 10px; align-items: center; }

	.nav-burger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		width: 40px;
		height: 40px;
		margin-left: auto;
		span { display: block; width: 20px; height: 2px; background: var(--rd-ink); margin: 0 auto; }
	}

	.nav-mobile {
		display: none;
		flex-direction: column;
		padding: 4px 20px 24px;
		border-top: 1px solid var(--rd-border);
		background: var(--rd-bg-paper);
		box-shadow: 0 16px 32px -12px rgba(34, 29, 24, 0.22);
	}

	.nav-mobile-links {
		display: flex;
		flex-direction: column;

		a {
			padding: 15px 2px;
			text-decoration: none;
			font-weight: 500;
			font-size: 16px;
			color: var(--rd-ink);
			border-bottom: 1px solid var(--rd-border);
			&.active { color: var(--rd-primary); font-weight: 600; }
			&:last-child { border-bottom: none; }
		}
	}

	.nav-mobile-cta {
		display: flex;
		flex-direction: column;
		gap: 10px;
		margin-top: 18px;

		.btn-outline, .btn-solid { text-align: center; padding: 15px 16px; font-size: 15.5px; }
	}

	.btn-solid, .btn-outline {
		text-decoration: none;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
		font-weight: 600;
		font-size: 15px;
		padding: 10px 16px;
		border-radius: 999px;
		transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
		white-space: nowrap;
	}
	.btn-solid { background: var(--rd-primary); color: #fff; &:hover { background: var(--rd-primary-hover); } }
	.btn-outline { border: 1.5px solid var(--rd-border-outline); color: var(--rd-ink); &:hover { border-color: var(--rd-ink); } }

	@media (max-width: 860px) {
		.nav-links, .nav-cta { display: none; }
		.nav-burger { display: flex; }
		.nav-mobile { display: flex; }
	}

	@media (max-width: 768px) {
		.wrap { padding: 0 16px; }
		.ann-inner { padding: 9px 16px 9px 74px; font-size: 12.5px; }
	}
</style>
