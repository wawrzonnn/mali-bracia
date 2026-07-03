<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data, children } = $props();
	let loggingOut = $state(false);
	let mobileMenuOpen = $state(false);

	async function logout() {
		loggingOut = true;
		await fetch('/api/auth/logout', { method: 'POST' });
		await goto('/administracja/login');
		loggingOut = false;
	}

	const isLogin = $derived(page.url.pathname === '/administracja/login');

	const navGroups: Array<{ title: string | null; items: Array<{ href: string; icon: import('$lib/components/Icon.svelte').IconName; label: string }> }> = [
		{
			title: null,
			items: [{ href: '/administracja', icon: 'home', label: 'Przegląd' }]
		},
		{
			title: 'Treść',
			items: [
				{ href: '/administracja/wiedza', icon: 'book', label: 'Baza wiedzy' },
				{ href: '/administracja/materialy', icon: 'file-text', label: 'Materiały' }
			]
		},
		{
			title: 'Kontakt',
			items: [{ href: '/administracja/zgloszenia', icon: 'message', label: 'Zgłoszenia' }]
		},
		{
			title: 'Zespół',
			items: [{ href: '/administracja/uzytkownicy', icon: 'users', label: 'Użytkownicy' }]
		}
	];

	function isActive(href: string): boolean {
		if (href === '/administracja') return page.url.pathname === '/administracja';
		return page.url.pathname.startsWith(href);
	}
</script>

{#if isLogin}
	<div class="admin-shell login-shell">
		<main class="admin-main centered">
			{@render children()}
		</main>
	</div>
{:else}
	<div class="admin-shell">
		<aside class="admin-sidebar" class:open={mobileMenuOpen}>
			<div class="sidebar-header">
				<a href="/administracja" class="admin-brand" onclick={() => (mobileMenuOpen = false)}>
					<img src="/mbu-logo.svg" alt="" class="admin-logo" />
					<span>Panel CMS</span>
				</a>
			</div>

			<nav class="sidebar-nav">
				{#each navGroups as group}
					{#if group.title}
						<span class="nav-group-title">{group.title}</span>
					{/if}
					{#each group.items as item}
						<a
							href={item.href}
							class="nav-link"
							class:active={isActive(item.href)}
							onclick={() => (mobileMenuOpen = false)}
						>
							<Icon name={item.icon} size={19} color={isActive(item.href) ? '#169FDB' : '#5A6B7A'} />
							<span>{item.label}</span>
						</a>
					{/each}
				{/each}
			</nav>

			<div class="sidebar-foot">
				<a href="/administracja/ustawienia" class="nav-link settings-link" class:active={isActive('/administracja/ustawienia')} onclick={() => (mobileMenuOpen = false)}>
					<Icon name="edit" size={19} color={isActive('/administracja/ustawienia') ? '#169FDB' : '#5A6B7A'} />
					<span>Ustawienia</span>
				</a>
				<a href="/" target="_blank" rel="noopener" class="view-site-link">
					<Icon name="external" size={14} color="#8794A1" />
					Zobacz stronę
				</a>
			</div>
		</aside>

		{#if mobileMenuOpen}
			<button class="overlay" onclick={() => (mobileMenuOpen = false)} aria-label="Zamknij menu"></button>
		{/if}

		<div class="admin-content">
			<header class="admin-bar">
				<button class="hamburger" onclick={() => (mobileMenuOpen = !mobileMenuOpen)} aria-label="Menu">
					<Icon name={mobileMenuOpen ? 'x' : 'menu'} size={22} color="#1D1D1B" />
				</button>
				<span class="admin-bar-spacer"></span>
				{#if data.user}
					<div class="admin-user">
						<span class="admin-user-name">{data.user.name}</span>
						<button class="admin-logout" onclick={logout} disabled={loggingOut}>
							<Icon name="external" size={15} color="#5A6B7A" />
							Wyloguj
						</button>
					</div>
				{/if}
			</header>

			<main class="admin-main">
				{@render children()}
			</main>
		</div>
	</div>
{/if}

<style lang="scss">
	@use '../../lib/styles/variables' as *;

	.admin-shell {
		min-height: 100dvh;
		background: $color-bg;
		display: flex;
	}

	.login-shell {
		display: flex;
	}

	/* ── sidebar ── */
	.admin-sidebar {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: 250px;
		background: $color-bg-card;
		border-right: 1px solid $color-border;
		display: flex;
		flex-direction: column;
		z-index: 100;
		transition: transform 0.25s ease;

		@media (max-width: 860px) {
			transform: translateX(-100%);
			&.open { transform: translateX(0); box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15); }
		}
	}

	.sidebar-header {
		padding: $spacing-lg $spacing-lg $spacing-md;
		border-bottom: 1px solid $color-border;
	}

	.admin-brand {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
		text-decoration: none;
		font-weight: 700;
		color: $color-secondary;
		font-size: $font-size-sm;
	}

	.admin-logo { height: 26px; width: auto; }

	.sidebar-nav {
		flex: 1;
		padding: $spacing-md $spacing-sm;
		display: flex;
		flex-direction: column;
		gap: 2px;
		overflow-y: auto;
	}

	.nav-group-title {
		padding: $spacing-md $spacing-md 6px;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		color: $color-text-muted;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		padding: 11px $spacing-md;
		border-radius: $radius-sm;
		text-decoration: none;
		color: $color-text-muted;
		font-size: $font-size-sm;
		font-weight: 500;
		transition: all 0.12s ease;

		&:hover { background: $color-bg; color: $color-text; }
		&.active { background: $color-primary-bg; color: $color-primary; font-weight: 700; }
	}

	.sidebar-foot {
		padding: $spacing-md;
		border-top: 1px solid $color-border;
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
	}

	.settings-link { margin-bottom: 2px; }

	.view-site-link {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		font-size: 12px;
		font-weight: 600;
		color: $color-text-muted;
		text-decoration: none;
		padding: 8px;

		&:hover { color: $color-primary; }
	}

	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 90;
		border: none;
		cursor: pointer;

		@media (min-width: 861px) { display: none; }
	}

	/* ── content ── */
	.admin-content {
		flex: 1;
		margin-left: 250px;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;

		@media (max-width: 860px) { margin-left: 0; }
	}

	.admin-bar {
		display: flex;
		align-items: center;
		padding: $spacing-md $spacing-2xl;
		background: $color-bg-card;
		border-bottom: 1px solid $color-border;
		position: sticky;
		top: 0;
		z-index: 50;

		@media (max-width: 860px) { padding: $spacing-md; }
	}

	.hamburger {
		display: none;
		width: 36px;
		height: 36px;
		align-items: center;
		justify-content: center;
		border-radius: $radius-sm;
		flex-shrink: 0;

		&:hover { background: $color-bg; }
		@media (max-width: 860px) { display: flex; }
	}

	.admin-bar-spacer { flex: 1; }

	.admin-user {
		display: flex;
		align-items: center;
		gap: $spacing-md;
	}

	.admin-user-name {
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-text-muted;
		@media (max-width: 480px) { display: none; }
	}

	.admin-logout {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 8px 14px;
		border-radius: $radius-sm;
		border: 1.5px solid $color-border;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-text-muted;
		transition: border-color 0.15s ease, color 0.15s ease;

		&:hover { border-color: $color-danger; color: $color-danger; }
		&:disabled { opacity: 0.5; }
	}

	.admin-main {
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		padding: $spacing-2xl;
		flex: 1;

		&.centered {
			max-width: 420px;
			min-height: 100dvh;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: $spacing-lg;
		}

		@media (max-width: 640px) { padding: $spacing-lg; }
	}
</style>
