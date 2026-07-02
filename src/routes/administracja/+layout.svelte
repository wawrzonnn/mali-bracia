<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let { data, children } = $props();
	let loggingOut = $state(false);

	async function logout() {
		loggingOut = true;
		await fetch('/api/auth/logout', { method: 'POST' });
		await goto('/administracja/login');
		loggingOut = false;
	}

	const isLogin = $derived(page.url.pathname === '/administracja/login');
</script>

<div class="admin-shell">
	{#if !isLogin}
		<header class="admin-bar">
			<a href="/administracja" class="admin-brand">
				<img src="/mbu-logo.svg" alt="" class="admin-logo" />
				<span>Panel administracyjny</span>
			</a>
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
	{/if}

	<main class="admin-main" class:centered={isLogin}>
		{@render children()}
	</main>
</div>

<style lang="scss">
	@use '../../lib/styles/variables' as *;

	.admin-shell {
		min-height: 100dvh;
		background: $color-bg;
	}

	.admin-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: $spacing-md $spacing-2xl;
		background: $color-bg-card;
		border-bottom: 1px solid $color-border;

		@media (max-width: 640px) { padding: $spacing-md; }
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

	.admin-logo { height: 28px; width: auto; }

	.admin-user {
		display: flex;
		align-items: center;
		gap: $spacing-md;
	}

	.admin-user-name {
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-text-muted;
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
		max-width: 1100px;
		margin: 0 auto;
		padding: $spacing-2xl;

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
