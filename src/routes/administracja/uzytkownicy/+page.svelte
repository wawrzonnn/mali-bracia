<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { adminUsersMock, initials } from '$lib/data/adminMock';
	import DemoToast from '$lib/components/admin/DemoToast.svelte';

	let { data } = $props();

	const roleColors: Record<string, string> = {
		Administrator: '#169FDB',
		Redaktor: '#1FA138',
		Moderator: '#F5A623'
	};

	const you = $derived({ id: 'you', name: data.user?.name ?? 'Ty', email: data.user?.email ?? '', role: 'Administrator' as const, lastLogin: new Date().toISOString(), isYou: true });
	const rows = $derived([you, ...adminUsersMock]);

	function formatDate(iso: string) {
		return new Date(iso).toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
	}

	let toastShow = $state(false);
	function demoAction() {
		toastShow = true;
		setTimeout(() => (toastShow = false), 3200);
	}
</script>

<svelte:head><title>Użytkownicy — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<div>
		<h1>Użytkownicy</h1>
		<p>Osoby z dostępem do panelu administracyjnego.</p>
	</div>
	<a href="/administracja/uzytkownicy/nowy" class="btn btn-primary">
		<Icon name="users" size={16} color="white" />
		Zaproś użytkownika
	</a>
</header>

<div class="table">
	<div class="table-head">
		<span class="col-user">Użytkownik</span>
		<span class="col-role">Rola</span>
		<span class="col-login">Ostatnie logowanie</span>
		<span class="col-actions"></span>
	</div>
	{#each rows as u (u.id)}
		<div class="table-row">
			<div class="col-user">
				<span class="avatar" style="--c: {roleColors[u.role]}">{initials(u.name)}</span>
				<div class="user-info">
					<strong>{u.name} {#if u.isYou}<span class="you-tag">to Ty</span>{/if}</strong>
					<span class="user-email">{u.email}</span>
				</div>
			</div>
			<span class="col-role"><span class="role-badge" style="--c: {roleColors[u.role]}">{u.role}</span></span>
			<span class="col-login">{formatDate(u.lastLogin)}</span>
			<span class="col-actions">
				{#if !u.isYou}
					<button class="icon-btn" aria-label="Edytuj rolę" onclick={demoAction}>
						<Icon name="edit" size={16} color="#5A6B7A" />
					</button>
					<button class="icon-btn" aria-label="Usuń dostęp" onclick={demoAction}>
						<Icon name="x" size={16} color="#E74C3C" />
					</button>
				{/if}
			</span>
		</div>
	{/each}
</div>

<DemoToast show={toastShow} message="Tryb demo — zarządzanie użytkownikami nie jest jeszcze podłączone." />

<style lang="scss">
	@use '../../../lib/styles/variables' as *;

	.dash-head {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: $spacing-lg;
		margin-bottom: $spacing-xl;
		flex-wrap: wrap;
		h1 { font-family: $font-serif; font-size: 28px; font-weight: 700; color: $color-secondary; }
		p { font-size: $font-size-sm; color: $color-text-muted; margin-top: 4px; }
	}

	.table {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		overflow: hidden;
	}

	.table-head, .table-row {
		display: grid;
		grid-template-columns: 2fr 1fr 1.2fr auto;
		gap: $spacing-md;
		align-items: center;
		padding: $spacing-md $spacing-lg;
	}

	.table-head {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.4px;
		color: $color-text-muted;
		border-bottom: 1px solid $color-border;
		@media (max-width: 700px) { display: none; }
	}

	.table-row {
		border-bottom: 1px solid $color-border;
		&:last-child { border-bottom: none; }
		@media (max-width: 700px) { grid-template-columns: 1fr; gap: $spacing-sm; }
	}

	.col-user { display: flex; align-items: center; gap: $spacing-md; min-width: 0; }

	.avatar {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 16%, transparent);
		color: var(--c);
		font-weight: 800;
		font-size: 13px;
		flex-shrink: 0;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		min-width: 0;
		strong { font-size: $font-size-sm; color: $color-secondary; display: flex; align-items: center; gap: 6px; }
	}

	.you-tag {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.3px;
		color: $color-primary;
		background: $color-primary-bg;
		padding: 2px 7px;
		border-radius: $radius-full;
	}

	.user-email { font-size: 12px; color: $color-text-muted; }

	.role-badge {
		display: inline-block;
		padding: 3px 10px;
		border-radius: $radius-full;
		font-size: 11px;
		font-weight: 700;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		color: var(--c);
	}

	.col-login { font-size: 12px; color: $color-text-muted; white-space: nowrap; }
	.col-actions { display: flex; gap: 4px; justify-content: flex-end; }

	.icon-btn {
		width: 32px;
		height: 32px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border-radius: $radius-sm;
		&:hover { background: $color-bg; }
	}
</style>
