<script lang="ts">
	import '$lib/styles/global.scss';
	import Icon from '$lib/components/Icon.svelte';
	import { page } from '$app/state';
	import { browser } from '$app/environment';

	let { children } = $props();
	let mobileMenuOpen = $state(false);
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

	const navItems = [
		{ href: '/', icon: 'home' as const, label: 'Strona główna' },
		{ href: '/wiedza', icon: 'book' as const, label: 'Baza wiedzy' },
		{ href: '/cwiczenia', icon: 'puzzle' as const, label: 'Ćwiczenia' },
		{ href: '/asystent', icon: 'sparkle' as const, label: 'Asystent AI' },
		{ href: '/pytania', icon: 'help-circle' as const, label: 'FAQ' },
		{ href: '/wsparcie', icon: 'phone' as const, label: 'Wsparcie' }
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<div class="app-layout">
	<aside class="sidebar" class:open={mobileMenuOpen}>
		<div class="sidebar-header">
			<a href="/" class="logo-link" onclick={() => (mobileMenuOpen = false)}>
				<img src="/mbu-logo.svg" alt="Mali Bracia Ubogich" class="sidebar-logo" />
			</a>
		</div>

		<nav class="sidebar-nav">
			{#each navItems as item}
				<a
					href={item.href}
					class="nav-link"
					class:active={isActive(item.href)}
					onclick={() => (mobileMenuOpen = false)}
				>
					<Icon name={item.icon} size={20} color={isActive(item.href) ? '#169FDB' : '#5A6B7A'} />
					<span>{item.label}</span>
				</a>
			{/each}
		</nav>

		<div class="sidebar-join">
			<a href="https://www.malibracia.org.pl" target="_blank" rel="noopener" class="join-link">
				<Icon name="heart" size={18} color="white" />
				<span>Dołącz do nas</span>
			</a>
		</div>

		<div class="sidebar-footer">
			<div class="sidebar-cta">
				<Icon name="phone" size={18} color="#E74C3C" />
				<div>
					<span class="cta-label">Telefon Zaufania</span>
					<a href="tel:+48608018110" class="cta-phone">608 018 110</a>
				</div>
			</div>
			<p class="sidebar-copy">malibracia.org.pl</p>
		</div>
	</aside>

	{#if mobileMenuOpen}
		<button class="overlay" onclick={() => (mobileMenuOpen = false)} aria-label="Zamknij menu"></button>
	{/if}

	<div class="main-area">
		<header class="topbar">
			<button class="hamburger" onclick={() => (mobileMenuOpen = !mobileMenuOpen)} aria-label="Menu">
				<Icon name={mobileMenuOpen ? 'x' : 'menu'} size={24} color="#1D1D1B" />
			</button>
			<span class="topbar-title">Baza Wiedzy MBU</span>
			<a href="/asystent" class="topbar-ai">
				<Icon name="sparkle" size={18} color="white" />
			</a>
		</header>

		<main>
			{@render children()}
		</main>
	</div>

	{#if !page.url.pathname.startsWith('/asystent')}
		{#if chatOpen}
			<div class="chat-popup">
				<div class="popup-header">
					<div class="popup-avatar"><Icon name="sparkle" size={16} color="white" /></div>
					<span>Asystent MBU</span>
					<button class="popup-close" onclick={() => (chatOpen = false)}>
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
					<button onclick={sendMiniChat} disabled={!chatInput.trim() || chatLoading}>
						<Icon name="send" size={16} color="white" />
					</button>
				</div>
				<a href="/asystent" class="popup-expand">
					Otwórz pełnego asystenta
					<Icon name="arrow-right" size={14} color="#169FDB" />
				</a>
			</div>
		{/if}

		<button class="chat-fab" onclick={() => (chatOpen = !chatOpen)} aria-label="Otwórz czat">
			{#if chatOpen}
				<Icon name="x" size={24} color="white" />
			{:else}
				<Icon name="sparkle" size={24} color="white" />
			{/if}
		</button>
	{/if}
</div>

<style lang="scss">
	@use 'variables' as *;

	.app-layout {
		display: flex;
		min-height: 100dvh;
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		width: $sidebar-width;
		background: $color-bg-card;
		border-right: 1px solid $color-border;
		display: flex;
		flex-direction: column;
		z-index: 100;
		transition: transform 0.25s ease;

		@media (max-width: 768px) {
			transform: translateX(-100%);
			box-shadow: none;
			&.open {
				transform: translateX(0);
				box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
			}
		}
	}

	.sidebar-header {
		padding: 28px 24px 20px;
		border-bottom: 1px solid $color-border;
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

	.nav-link {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		padding: 12px $spacing-md;
		border-radius: $radius-sm;
		text-decoration: none;
		color: $color-text-muted;
		font-size: $font-size-sm;
		font-weight: 500;
		transition: all 0.12s ease;

		&:hover {
			background: $color-bg;
			color: $color-text;
		}

		&.active {
			background: $color-primary-bg;
			color: $color-primary;
			font-weight: 700;
		}
	}

	.sidebar-footer {
		padding: $spacing-md $spacing-lg $spacing-lg;
		border-top: 1px solid $color-border;
	}

	.sidebar-cta {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
		padding: $spacing-md;
		background: #FFF5F5;
		border-radius: $radius-sm;
		margin-bottom: $spacing-sm;
	}

	.cta-label {
		display: block;
		font-size: 11px;
		color: $color-text-muted;
	}

	.cta-phone {
		font-weight: 800;
		font-size: $font-size-sm;
		color: #E74C3C;
		text-decoration: none;
	}

	.sidebar-copy {
		font-size: 11px;
		color: $color-text-muted;
		text-align: center;
	}

	.overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 90;
		border: none;
		cursor: pointer;

		@media (min-width: 769px) {
			display: none;
		}
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
		background: $color-bg-card;
		border-bottom: 1px solid $color-border;
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

		&:hover { background: $color-bg; }
	}

	.topbar-title {
		flex: 1;
		font-weight: 700;
		font-size: $font-size-base;
	}

	.topbar-ai {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, #0D7AB5);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	main { flex: 1; }

	/* ─── JOIN LINK ─── */
	.sidebar-join {
		padding: 0 $spacing-sm $spacing-sm;
	}

	.join-link {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
		padding: 12px $spacing-md;
		border-radius: $radius-sm;
		background: linear-gradient(135deg, $color-accent, #15852D);
		color: white;
		text-decoration: none;
		font-size: $font-size-sm;
		font-weight: 700;
		transition: filter 0.15s;

		&:hover { filter: brightness(1.1); }
	}

	/* ─── CHAT FAB ─── */
	.chat-fab {
		position: fixed;
		bottom: 24px;
		right: 24px;
		z-index: 200;
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, #0D7AB5);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 20px rgba($color-primary, 0.35);
		transition: transform 0.15s, box-shadow 0.15s;

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
		background: linear-gradient(135deg, $color-primary, #0D7AB5);
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
