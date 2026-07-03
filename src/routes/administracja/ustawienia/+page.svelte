<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import DemoToast from '$lib/components/admin/DemoToast.svelte';

	let orgName = $state('Stowarzyszenie mali bracia Ubogich');
	let krs = $state('0000160750');
	let address = $state('ul. Gen. Wł. Andersa 13, 00-159 Warszawa');
	let helpline = $state('608 018 110');
	let email = $state('kontakt@malibracia.org.pl');
	let account = $state('13 1600 1462 1818 9539 9000 0001');

	let toastShow = $state(false);
	function save(e: SubmitEvent) {
		e.preventDefault();
		toastShow = true;
		setTimeout(() => (toastShow = false), 3200);
	}
</script>

<svelte:head><title>Ustawienia — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<h1>Ustawienia</h1>
	<p>Dane organizacji widoczne na stronie i w stopce.</p>
</header>

<form class="settings-form" onsubmit={save}>
	<div class="field">
		<label for="s-name">Nazwa organizacji</label>
		<input id="s-name" type="text" bind:value={orgName} />
	</div>

	<div class="field-row">
		<div class="field">
			<label for="s-krs">Numer KRS</label>
			<input id="s-krs" type="text" bind:value={krs} />
		</div>
		<div class="field">
			<label for="s-account">Numer konta</label>
			<input id="s-account" type="text" bind:value={account} />
		</div>
	</div>

	<div class="field">
		<label for="s-address">Adres</label>
		<input id="s-address" type="text" bind:value={address} />
	</div>

	<div class="field-row">
		<div class="field">
			<label for="s-helpline">Telefon Zaufania</label>
			<input id="s-helpline" type="text" bind:value={helpline} />
		</div>
		<div class="field">
			<label for="s-email">E-mail kontaktowy</label>
			<input id="s-email" type="email" bind:value={email} />
		</div>
	</div>

	<button type="submit" class="btn btn-primary">
		<Icon name="check" size={16} color="white" />
		Zapisz zmiany
	</button>
</form>

<DemoToast show={toastShow} message="Tryb demo — ustawienia nie zostały zapisane." />

<style lang="scss">
	@use '../../../lib/styles/variables' as *;

	.dash-head {
		margin-bottom: $spacing-xl;
		h1 { font-family: $font-serif; font-size: 28px; font-weight: 700; color: $color-secondary; }
		p { font-size: $font-size-sm; color: $color-text-muted; margin-top: 4px; }
	}

	.settings-form {
		display: flex;
		flex-direction: column;
		gap: $spacing-lg;
		max-width: 720px;
	}

	.field-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: $spacing-lg;
		@media (max-width: 600px) { grid-template-columns: 1fr; }
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 6px;

		label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: $color-text-muted; }

		input {
			border: 1px solid $color-border;
			background: $color-bg-card;
			border-radius: $radius;
			padding: $spacing-md $spacing-lg;
			font-size: $font-size-base;
			font-family: inherit;
			&:focus { outline: none; border-color: $color-primary; }
		}
	}
</style>
