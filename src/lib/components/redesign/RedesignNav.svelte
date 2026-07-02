<script lang="ts">
	import A11yToolbar from '$lib/components/A11yToolbar.svelte';

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
		<button class="nav-burger" onclick={() => (mobileOpen = !mobileOpen)} aria-label="Menu" aria-expanded={mobileOpen}>
			{#if mobileOpen}
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M6 18L18 6" /></svg>
			{:else}
				<span></span><span></span><span></span>
			{/if}
		</button>
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
		<div class="nav-mobile-icons">
			<A11yToolbar inline />
			<a href="/asystent" class="icon-btn" aria-label="Asystent AI">
				<svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M13 3l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
			</a>
		</div>
	</div>
</div>

{#if mobileOpen}
	<div class="nav-mobile">
		<div class="nav-mobile-links">
			{#each links as l}
				<a href={l.href} class:active={active === l.id} onclick={closeMobile}>{l.label}</a>
			{/each}
			<a href="/1-procent" class="highlight" onclick={closeMobile}>Przekaż 1,5%</a>
			<a href="/dolacz" class="highlight primary" onclick={closeMobile}>Dołącz do nas</a>
		</div>
	</div>
{/if}

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
		align-items: center;
		gap: 5px;
		width: 40px;
		height: 40px;
		flex-shrink: 0;
		color: var(--rd-ink);
		span { display: block; width: 20px; height: 2px; background: var(--rd-ink); margin: 0 auto; }
	}

	.nav-mobile-icons {
		display: none;
		align-items: center;
		gap: 8px;
		margin-left: auto;
	}

	.icon-btn {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--rd-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.nav-mobile {
		display: none;
		flex-direction: column;
		padding: 8px 20px 24px;
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

			&.highlight {
				font-weight: 700;
				color: var(--rd-accent);
				&.primary { color: var(--rd-primary); }
			}
		}
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

	@media (max-width: 768px) {
		.wrap { padding: 0 16px; }
		.ann-bar { display: none; }
		.nav-links, .nav-cta { display: none; }
		.nav-burger { display: flex; }
		.nav-mobile-icons { display: flex; }

		.nav-mobile {
			display: flex;
			position: fixed;
			top: 70px;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 250;
			overflow-y: auto;
			background: var(--rd-bg-paper);
		}
	}
</style>
