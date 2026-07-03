<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import DemoToast from '$lib/components/admin/DemoToast.svelte';

	let email = $state('');
	let role = $state<'Administrator' | 'Redaktor' | 'Moderator'>('Redaktor');
	let toastShow = $state(false);

	const roleDescriptions: Record<string, string> = {
		Administrator: 'Pełny dostęp: treści, materiały, użytkownicy i ustawienia.',
		Redaktor: 'Może dodawać i edytować artykuły oraz materiały.',
		Moderator: 'Może przeglądać i zamykać zgłoszenia z formularza.'
	};

	function send(e: SubmitEvent) {
		e.preventDefault();
		toastShow = true;
		setTimeout(() => (toastShow = false), 3200);
	}
</script>

<svelte:head><title>Zaproś użytkownika — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<div>
		<a href="/administracja/uzytkownicy" class="back-link">← Użytkownicy</a>
		<h1>Zaproś użytkownika</h1>
	</div>
</header>

<form class="invite-form" onsubmit={send}>
	<div class="field">
		<label for="inv-email">Adres e-mail</label>
		<input id="inv-email" type="email" bind:value={email} placeholder="np. anna@malibracia.org.pl" required />
	</div>

	<div class="field">
		<span class="field-label">Rola</span>
		<div class="role-grid">
			{#each ['Administrator', 'Redaktor', 'Moderator'] as r}
				<button type="button" class="role-card" class:active={role === r} onclick={() => (role = r as typeof role)}>
					<strong>{r}</strong>
					<span>{roleDescriptions[r]}</span>
				</button>
			{/each}
		</div>
	</div>

	<button type="submit" class="btn btn-primary">
		<Icon name="send" size={16} color="white" />
		Wyślij zaproszenie
	</button>
</form>

<DemoToast show={toastShow} message="Tryb demo — zaproszenie nie zostało wysłane." />

<style lang="scss">
	@use '../../../../lib/styles/variables' as *;

	.dash-head {
		margin-bottom: $spacing-xl;
		h1 { font-family: $font-serif; font-size: 26px; font-weight: 700; color: $color-secondary; margin-top: 4px; }
	}

	.back-link {
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-text-muted;
		text-decoration: none;
		&:hover { color: $color-primary; }
	}

	.invite-form {
		display: flex;
		flex-direction: column;
		gap: $spacing-lg;
		max-width: 640px;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
	}

	.field label, .field-label {
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.4px;
		color: $color-text-muted;
	}

	input {
		border: 1px solid $color-border;
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-md $spacing-lg;
		font-size: $font-size-base;
		font-family: inherit;
		&:focus { outline: none; border-color: $color-primary; }
	}

	.role-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-sm;
		@media (max-width: 640px) { grid-template-columns: 1fr; }
	}

	.role-card {
		display: flex;
		flex-direction: column;
		gap: 4px;
		text-align: left;
		padding: $spacing-md;
		border-radius: $radius;
		border: 1.5px solid $color-border;
		background: $color-bg-card;
		transition: all 0.15s ease;

		strong { font-size: $font-size-sm; color: $color-secondary; }
		span { font-size: 12px; color: $color-text-muted; line-height: 1.4; }

		&:hover { border-color: $color-primary; }
		&.active { border-color: $color-primary; background: $color-primary-bg; }
	}
</style>
