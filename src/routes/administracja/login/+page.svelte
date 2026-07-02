<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { goto, invalidateAll } from '$app/navigation';

	let email = $state('');
	let password = $state('');
	let loading = $state(false);
	let errorMsg = $state('');

	async function submit(e: Event) {
		e.preventDefault();
		loading = true;
		errorMsg = '';
		try {
			const res = await fetch('/api/auth/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password })
			});
			if (!res.ok) {
				const body = await res.json().catch(() => null);
				throw new Error(body?.message || 'Nieprawidłowy e-mail lub hasło.');
			}
			await invalidateAll();
			await goto('/administracja');
		} catch (err) {
			errorMsg = err instanceof Error ? err.message : 'Coś poszło nie tak.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head><title>Logowanie — Panel administracyjny</title></svelte:head>

<div class="login-card">
	<span class="login-ic"><Icon name="shield" size={26} color="white" /></span>
	<h1>Panel administracyjny</h1>
	<p class="login-sub">Zaloguj się, aby zarządzać zgłoszeniami.</p>

	<form onsubmit={submit}>
		<div class="form-row">
			<label for="email">E-mail</label>
			<input id="email" type="email" bind:value={email} required autocomplete="username" />
		</div>
		<div class="form-row">
			<label for="password">Hasło</label>
			<input id="password" type="password" bind:value={password} required autocomplete="current-password" />
		</div>

		{#if errorMsg}<p class="login-error">{errorMsg}</p>{/if}

		<button type="submit" class="btn btn-primary btn-full" disabled={loading}>
			{loading ? 'Logowanie...' : 'Zaloguj się'}
		</button>
	</form>
</div>

<style lang="scss">
	@use '../../../lib/styles/variables' as *;

	.login-card {
		width: 100%;
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-2xl;
		text-align: center;
		box-shadow: $shadow-lg;
	}

	.login-ic {
		width: 56px;
		height: 56px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, $color-primary-dark);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-bottom: $spacing-lg;
	}

	h1 {
		font-family: $font-serif;
		font-size: 24px;
		font-weight: 700;
		color: $color-secondary;
		margin-bottom: 4px;
	}

	.login-sub {
		font-size: $font-size-sm;
		color: $color-text-muted;
		margin-bottom: $spacing-xl;
	}

	form { display: flex; flex-direction: column; gap: $spacing-md; text-align: left; }

	.form-row {
		display: flex;
		flex-direction: column;
		gap: 6px;
		label { font-size: $font-size-sm; font-weight: 600; color: $color-text; }
	}

	.login-error {
		font-size: $font-size-sm;
		color: $color-danger;
		background: color-mix(in srgb, $color-danger 8%, transparent);
		border: 1px solid color-mix(in srgb, $color-danger 25%, transparent);
		border-radius: $radius-sm;
		padding: 10px 14px;
	}
</style>
