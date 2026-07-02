<script lang="ts">
	import '$lib/styles/global.scss';
	import Icon from '$lib/components/Icon.svelte';
	import A11yToolbar from '$lib/components/A11yToolbar.svelte';
	import RedesignNav from '$lib/components/redesign/RedesignNav.svelte';
	import RedesignFooter from '$lib/components/redesign/RedesignFooter.svelte';
	import ChromeSwitcher from '$lib/components/redesign/ChromeSwitcher.svelte';
	import MobileFullMenu from '$lib/components/redesign/MobileFullMenu.svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';

	let { children } = $props();

	/* W trybie navbar strona przewija się wewnątrz <main> (overflow-y:auto),
	   nie w oknie — domyślny reset scrolla SvelteKita go nie obejmuje. */
	afterNavigate(() => {
		document.getElementById('main-content')?.scrollTo(0, 0);
		window.scrollTo(0, 0);
	});
	const isAdmin = $derived(page.url.pathname.startsWith('/administracja'));

	/* Globalny przełącznik nawigacji (do prezentacji — porównanie dwóch ścieżek). */
	let chromeMode = $state<'navbar' | 'sidebar'>('navbar');

	$effect(() => {
		if (!browser) return;
		const saved = localStorage.getItem('mbu-chrome-mode');
		if (saved === 'navbar' || saved === 'sidebar') chromeMode = saved;
	});

	function setChromeMode(mode: 'navbar' | 'sidebar') {
		chromeMode = mode;
		if (browser) localStorage.setItem('mbu-chrome-mode', mode);
	}

	const navActive = $derived.by(() => {
		const p = page.url.pathname;
		if (p.startsWith('/wiedza')) return 'wiedza' as const;
		if (p.startsWith('/cwiczenia')) return 'cwiczenia' as const;
		if (p.startsWith('/asystent')) return 'asystent' as const;
		if (p.startsWith('/wsparcie')) return 'wsparcie' as const;
		if (p.startsWith('/pytania')) return 'pytania' as const;
		return undefined;
	});

	let mobileMenuOpen = $state(false);
	let navMobileOpen = $state(false);
	let chatOpen = $state(false);
	let chatInput = $state('');
	let chatLoading = $state(false);
	let chatMessages = $state<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

	async function sendMiniChat() {
		if (!browser) return;
		const msg = chatInput.trim();
		if (!msg || chatLoading) return;
		chatInput = '';
		chatMessages = [...chatMessages, { role: 'user', content: msg }];
		chatLoading = true;
		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ messages: chatMessages.map((m) => ({ role: m.role, content: m.content })) })
			});
			const data = await res.json();
			chatMessages = [...chatMessages, { role: 'assistant', content: data.reply }];
		} catch {
			chatMessages = [...chatMessages, { role: 'assistant', content: 'Błąd. Spróbuj ponownie.' }];
		} finally {
			chatLoading = false;
		}
	}

	const navGroups = [
		{
			title: null,
			items: [{ href: '/', icon: 'home' as const, label: 'Strona główna' }]
		},
		{
			title: 'Poznaj',
			items: [
				{ href: '/wiedza', icon: 'book' as const, label: 'Baza wiedzy' },
				{ href: '/cwiczenia', icon: 'puzzle' as const, label: 'Ćwiczenia' }
			]
		},
		{
			title: 'Zaangażuj się',
			items: [
				{ href: '/1-procent', icon: 'percent' as const, label: 'Przekaż 1,5%' },
				{ href: '/dolacz', icon: 'heart' as const, label: 'Dołącz do nas' }
			]
		},
		{
			title: 'Pomoc',
			items: [
				{ href: '/asystent', icon: 'sparkle' as const, label: 'Asystent AI' },
				{ href: '/wsparcie', icon: 'phone' as const, label: 'Wsparcie' },
				{ href: '/pytania', icon: 'help-circle' as const, label: 'Najczęstsze pytania' }
			]
		}
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

{#snippet chatWidget(hideOnMobile: boolean)}
	{#if !page.url.pathname.startsWith('/asystent')}
		{#if chatOpen}
			<div class="chat-popup">
				<div class="popup-header">
					<div class="popup-avatar"><Icon name="sparkle" size={16} color="white" /></div>
					<span>Asystent MBU</span>
					<button class="popup-close" onclick={() => (chatOpen = false)} aria-label="Zamknij czat">
						<Icon name="x" size={18} color="rgba(255,255,255,0.7)" />
					</button>
				</div>
				<div class="popup-body">
					{#if chatMessages.length === 0}
						<div class="popup-welcome">
							<p>Cześć! Jestem asystentem Bazy Wiedzy MBU. Mogę pomóc w tematach dotyczących starzenia, samotności i wsparcia seniorów.</p>
							<span class="popup-label">Popularne pytania:</span>
							<button class="popup-suggestion" onclick={() => { chatInput = 'Jak mogę pomóc samotnemu seniorowi?'; sendMiniChat(); }}>Jak pomóc samotnemu seniorowi?</button>
							<button class="popup-suggestion" onclick={() => { chatInput = 'Czym jest demencja i jak ją rozpoznać?'; sendMiniChat(); }}>Czym jest demencja?</button>
							<button class="popup-suggestion" onclick={() => { chatInput = 'Gdzie szukać wsparcia dla osoby starszej?'; sendMiniChat(); }}>Gdzie szukać wsparcia?</button>
							<button class="popup-suggestion" onclick={() => { chatInput = 'Jak zostać wolontariuszem MBU?'; sendMiniChat(); }}>Jak zostać wolontariuszem?</button>
						</div>
					{/if}
					{#each chatMessages as msg}
						<div class="popup-msg" class:user={msg.role === 'user'}>
							{msg.content}
						</div>
					{/each}
					{#if chatLoading}
						<div class="popup-msg"><em>Piszę...</em></div>
					{/if}
				</div>
				<div class="popup-input">
					<input
						type="text"
						bind:value={chatInput}
						placeholder="Napisz pytanie..."
						onkeydown={(e) => e.key === 'Enter' && sendMiniChat()}
						disabled={chatLoading}
					/>
					<button onclick={sendMiniChat} disabled={!chatInput.trim() || chatLoading} aria-label="Wyślij wiadomość">
						<Icon name="send" size={16} color="white" />
					</button>
				</div>
				<a href="/asystent" class="popup-expand">
					Otwórz pełnego asystenta
					<Icon name="arrow-right" size={14} color="#169FDB" />
				</a>
			</div>
		{/if}

		<button class="chat-fab" class:hide-mobile={hideOnMobile} onclick={() => (chatOpen = !chatOpen)} aria-label="Otwórz czat">
			{#if chatOpen}
				<Icon name="x" size={24} color="white" />
			{:else}
				<Icon name="sparkle" size={24} color="white" />
			{/if}
		</button>
	{/if}
{/snippet}

{#if isAdmin}
	{@render children()}
{:else if chromeMode === 'navbar'}
<div class="navbar-shell">
	<a href="#main-content" class="skip-link">Przejdź do treści</a>
	<RedesignNav active={navActive} bind:mobileOpen={navMobileOpen} />

	<main id="main-content" tabindex="-1">
		{@render children()}
		<RedesignFooter />
	</main>
</div>

	{#if !navMobileOpen}
		{@render chatWidget(true)}
		<div class="a11y-desktop-only"><A11yToolbar withSidebar={false} /></div>
	{/if}
{:else}
<div class="app-layout">
	<a href="#main-content" class="skip-link">Przejdź do treści</a>

	<aside class="sidebar" class:open={mobileMenuOpen}>
		<div class="sidebar-header">
			<a href="/" class="logo-link" onclick={() => (mobileMenuOpen = false)}>
				<img src="/mbu-logo.svg" alt="Mali Bracia Ubogich" class="sidebar-logo" />
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
						<Icon name={item.icon} size={20} color={isActive(item.href) ? '#0A80C4' : '#8A7F72'} />
						<span>{item.label}</span>
					</a>
				{/each}
			{/each}
		</nav>

		<div class="sidebar-foot">
			<a href="/dolacz" class="join-btn">
				<Icon name="heart" size={18} color="white" />
				<span>Dołącz do nas</span>
			</a>

			<a href="tel:+48608018110" class="helpline">
				<span class="helpline-ic"><Icon name="phone" size={16} color="white" /></span>
				<span class="helpline-body">
					<span class="helpline-label">Telefon Zaufania</span>
					<span class="helpline-num">608 018 110</span>
				</span>
			</a>

			<a href="https://www.malibracia.org.pl" target="_blank" rel="noopener" class="sidebar-link">
				malibracia.org.pl
			</a>
		</div>
	</aside>

	<div class="main-area">
		<header class="topbar">
			<button class="hamburger" onclick={() => (mobileMenuOpen = !mobileMenuOpen)} aria-label="Menu" aria-expanded={mobileMenuOpen}>
				<Icon name={mobileMenuOpen ? 'x' : 'menu'} size={24} color="#221D18" />
			</button>
			<span class="topbar-title">Baza Wiedzy MBU</span>
			<div class="topbar-icons">
				<A11yToolbar inline />
				<a href="/asystent" class="topbar-ai" aria-label="Otwórz asystenta AI">
					<Icon name="sparkle" size={18} color="white" />
				</a>
			</div>
		</header>

		<MobileFullMenu open={mobileMenuOpen} active={navActive} onClose={() => (mobileMenuOpen = false)} />

		<main id="main-content" tabindex="-1">
			{@render children()}
		</main>
	</div>

	{@render chatWidget(true)}
	<A11yToolbar />
</div>
{/if}

{#if !isAdmin}
	<ChromeSwitcher mode={chromeMode} onSelect={setChromeMode} />
{/if}

<style lang="scss">
	@use 'variables' as *;

	.app-layout {
		display: flex;
		min-height: 100dvh;
	}

	.navbar-shell {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		overflow: hidden;
	}

	.a11y-desktop-only {
		@media (max-width: 768px) { display: none; }
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: $sidebar-width;
		background: var(--rd-bg-paper, #{$color-bg-card});
		border-right: 1px solid var(--rd-border, #{$color-border});
		display: flex;
		flex-direction: column;
		z-index: 100;
		transition: transform 0.25s ease;

		/* Na mobile hamburger otwiera teraz pelnoekranowe MobileFullMenu zamiast
		   wysuwania tego panelu - zostaje trwale poza ekranem ponizej 768px. */
		@media (max-width: 768px) {
			transform: translateX(-100%);
			box-shadow: none;
		}
	}

	.sidebar-header {
		padding: 28px 24px 20px;
		border-bottom: 1px solid var(--rd-border, #{$color-border});
	}

	.logo-link {
		display: block;
		text-decoration: none;
	}

	.sidebar-logo {
		height: 44px;
		width: auto;
	}

	.sidebar-nav {
		flex: 1;
		padding: $spacing-md $spacing-sm;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.nav-group-title {
		padding: $spacing-md $spacing-md 6px;
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.6px;
		color: var(--rd-muted-3, #{$color-text-muted});
		opacity: 0.85;
	}

	.nav-link {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		padding: 12px $spacing-md;
		border-radius: $radius-sm;
		text-decoration: none;
		color: var(--rd-muted-2, #{$color-text-muted});
		font-size: $font-size-sm;
		font-weight: 500;
		transition: all 0.12s ease;

		&:hover {
			background: var(--rd-bg-paper-2, #{$color-bg});
			color: var(--rd-ink, #{$color-text});
		}

		&.active {
			background: transparent;
			color: var(--rd-primary, #{$color-primary});
			font-weight: 600;
		}
	}

	.sidebar-foot {
		padding: $spacing-md;
		border-top: 1px solid var(--rd-border, #{$color-border});
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
	}

	.join-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: $spacing-sm;
		padding: 12px $spacing-md;
		border-radius: 999px;
		background: var(--rd-primary, #{$color-primary});
		color: white;
		text-decoration: none;
		font-size: $font-size-sm;
		font-weight: 600;
		transition: background 0.15s ease;

		&:hover { background: var(--rd-primary-hover, #{$color-primary-dark}); }
	}

	.helpline {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 9px 10px;
		border-radius: $radius-sm;
		border: 1px solid var(--rd-border-card, #{$color-border});
		background: var(--rd-surface, #{$color-bg-card});
		text-decoration: none;
		transition: border-color 0.15s ease;

		&:hover { border-color: var(--rd-primary, #{$color-primary}); }
	}

	.helpline-ic {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		background: var(--rd-primary, #{$color-primary});
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.helpline-body { display: flex; flex-direction: column; line-height: 1.25; }
	.helpline-label { font-size: 11px; color: var(--rd-muted-3, #{$color-text-muted}); }
	.helpline-num { font-size: $font-size-sm; font-weight: 700; color: var(--rd-ink, #{$color-text}); letter-spacing: 0.3px; }

	.sidebar-link {
		text-align: center;
		font-size: 11px;
		color: var(--rd-muted-3, #{$color-text-muted});
		text-decoration: none;
		padding-top: 2px;

		&:hover { color: var(--rd-primary, #{$color-primary}); }
	}


	.main-area {
		flex: 1;
		margin-left: $sidebar-width;
		min-height: 100dvh;
		display: flex;
		flex-direction: column;

		@media (max-width: 768px) {
			margin-left: 0;
		}
	}

	.topbar {
		display: none;
		align-items: center;
		gap: $spacing-md;
		padding: $spacing-md $spacing-lg;
		background: var(--rd-bg-paper, #{$color-bg-card});
		border-bottom: 1px solid var(--rd-border, #{$color-border});
		position: sticky;
		top: 0;
		z-index: 50;

		@media (max-width: 768px) {
			display: flex;
		}
	}

	.hamburger {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: $radius-sm;

		&:hover { background: var(--rd-bg-paper-2, #{$color-bg}); }
	}

	.topbar-title {
		flex: 1;
		font-weight: 600;
		font-size: $font-size-base;
		color: var(--rd-ink, #{$color-text});
	}

	.topbar-icons {
		display: flex;
		align-items: center;
		gap: 8px;
		flex-shrink: 0;
	}

	.topbar-ai {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: var(--rd-primary, #{$color-primary});
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	main { flex: 1; min-height: 0; overflow-y: auto; }

	/* ─── CHAT FAB ─── */
	.chat-fab {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 200;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, $color-primary-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 20px rgba($color-primary, 0.35);
		transition: transform 0.15s, box-shadow 0.15s;

		/* W trybie sidebar rolę szybkiego dostępu do AI na mobile pełni już
		   przycisk w topbarze — tam ukrywamy FAB. W trybie navbar (bez topbara)
		   FAB zostaje jedynym dostępem do asystenta, więc go nie chowamy. */
		&.hide-mobile {
			@media (max-width: 768px) { display: none; }
		}

		&:hover {
			transform: scale(1.08);
			box-shadow: 0 6px 28px rgba($color-primary, 0.45);
		}
	}

	/* ─── CHAT POPUP ─── */
	.chat-popup {
		position: fixed;
		bottom: 92px;
		right: 24px;
		z-index: 190;
		width: 400px;
		height: 560px;
		max-height: calc(100dvh - 120px);
		background: $color-bg-card;
		border-radius: $radius-lg;
		border: 1px solid $color-border;
		box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18);
		display: flex;
		flex-direction: column;
		overflow: hidden;

		@media (max-width: 480px) {
			right: 8px;
			left: 8px;
			bottom: 80px;
			width: auto;
			height: calc(100dvh - 100px);
		}
	}

	.popup-header {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
		padding: $spacing-md $spacing-lg;
		background: $color-secondary;
		color: white;
		font-weight: 700;
		font-size: $font-size-sm;

		span { flex: 1; }
	}

	.popup-avatar {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, $color-primary-dark);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.popup-close {
		width: 28px;
		height: 28px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		&:hover { background: rgba(255, 255, 255, 0.1); }
	}

	.popup-body {
		flex: 1;
		overflow-y: auto;
		padding: $spacing-md;
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
	}

	.popup-welcome {
		p {
			font-size: $font-size-sm;
			color: $color-text-muted;
			margin-bottom: $spacing-sm;
			line-height: 1.5;
		}
	}

	.popup-label {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: $color-text-muted;
		margin-top: $spacing-sm;
	}

	.popup-suggestion {
		display: block;
		width: 100%;
		text-align: left;
		padding: $spacing-sm $spacing-md;
		margin-bottom: 4px;
		border-radius: $radius-sm;
		background: $color-primary-bg;
		color: $color-primary;
		font-size: $font-size-xs;
		font-weight: 600;
		border: 1px solid transparent;
		transition: all 0.12s;

		&:hover { border-color: $color-primary; }
	}

	.popup-msg {
		padding: $spacing-sm $spacing-md;
		border-radius: $radius-sm;
		font-size: $font-size-xs;
		line-height: 1.5;
		background: $color-bg;
		border: 1px solid $color-border;
		max-width: 85%;
		word-break: break-word;

		&.user {
			background: $color-primary;
			color: white;
			border-color: $color-primary;
			margin-left: auto;
		}
	}

	.popup-input {
		display: flex;
		gap: 6px;
		padding: $spacing-sm $spacing-md;
		border-top: 1px solid $color-border;

		input {
			flex: 1;
			border: 1px solid $color-border;
			border-radius: $radius-sm;
			padding: 8px 12px;
			font-size: $font-size-xs;
		}

		button {
			width: 34px;
			height: 34px;
			border-radius: 50%;
			background: $color-primary;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-shrink: 0;

			&:disabled { opacity: 0.35; }
		}
	}

	.popup-expand {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		padding: $spacing-sm;
		font-size: $font-size-xs;
		font-weight: 600;
		color: $color-primary;
		text-decoration: none;
		border-top: 1px solid $color-border;

		&:hover { background: $color-primary-bg; }
	}
</style>
