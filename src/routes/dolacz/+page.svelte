<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import CommunityPanel from '$lib/components/CommunityPanel.svelte';
	import type { IconName } from '$lib/components/Icon.svelte';
	import { page } from '$app/state';

	type JoinPath = 'wolontariat' | 'wsparcie' | 'pytanie';

	const paths: {
		id: JoinPath;
		icon: IconName;
		color: string;
		title: string;
		desc: string;
		cta: string;
		decor: 'leaf' | 'dots' | null;
		bullets: { icon: IconName; text: string }[];
	}[] = [
		{
			id: 'wolontariat',
			icon: 'heart',
			color: '#1FA138',
			title: 'Zostań wolontariuszem',
			desc: 'Odwiedzaj seniora, buduj relację i wprowadź radość do czyjegoś życia.',
			cta: 'Wybierz ścieżkę',
			decor: 'leaf',
			bullets: [
				{ icon: 'clock', text: 'Wystarczy 1 godzina tygodniowo' },
				{ icon: 'users', text: 'Szkolenie i wsparcie na każdym kroku' }
			]
		},
		{
			id: 'wsparcie',
			icon: 'gift',
			color: '#F5A623',
			title: 'Wesprzyj finansowo',
			desc: 'Jednorazowo lub cyklicznie — pomóż nam działać dalej.',
			cta: 'Wybierz ścieżkę',
			decor: null,
			bullets: [
				{ icon: 'heart', text: 'Jednorazowo lub cyklicznie' },
				{ icon: 'shield', text: 'Decydujesz o wysokości wsparcia' }
			]
		},
		{
			id: 'pytanie',
			icon: 'message',
			color: '#169FDB',
			title: 'Mam pytanie',
			desc: 'Napisz do nas, doradzimy najlepszą formę zaangażowania.',
			cta: 'Napisz do nas',
			decor: 'dots',
			bullets: [
				{ icon: 'message', text: 'Odpowiadamy najszybciej jak to możliwe' },
				{ icon: 'user', text: 'Pomagamy dobrać najlepszą opcję' }
			]
		}
	];

	const steps = ['Ścieżka', 'Twoje dane', 'Podsumowanie'];

	let step = $state(0);
	let path = $state<JoinPath | null>(null);
	let submitted = $state(false);
	let submitting = $state(false);
	let submitError = $state('');

	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let city = $state('');
	let availability = $state('');
	let motivation = $state('');
	let supportType = $state('');
	let message = $state('');

	const availabilityOptions = ['1 godzina / tydzień', '2-3 godziny / tydzień', 'Więcej — jestem elastyczny/a'];
	const supportOptions = [
		{ value: 'jednorazowe', label: 'Wsparcie jednorazowe' },
		{ value: 'cykliczne', label: 'Wsparcie cykliczne (co miesiąc)' }
	];

	const preselect = page.url.searchParams.get('sciezka');
	if (preselect === 'wolontariat' || preselect === 'wsparcie' || preselect === 'pytanie') {
		path = preselect;
		step = 1;
	}

	const activePath = $derived(paths.find((p) => p.id === path) ?? null);

	const step1Valid = $derived.by(() => {
		if (!name.trim() || !email.trim() || !/^\S+@\S+\.\S+$/.test(email)) return false;
		if (path === 'wolontariat' && !availability) return false;
		if (path === 'wsparcie' && !supportType) return false;
		if (path === 'pytanie' && !message.trim()) return false;
		return true;
	});

	function choosePath(p: JoinPath) {
		path = p;
		step = 1;
	}

	function goBack() {
		if (step === 1) {
			step = 0;
		} else if (step === 2) {
			step = 1;
		}
	}

	function goNext() {
		if (step === 1 && step1Valid) step = 2;
	}

	async function submit() {
		const payload = {
			path,
			name,
			email,
			phone: phone || null,
			city: city || null,
			...(path === 'wolontariat' ? { availability, motivation: motivation || null } : {}),
			...(path === 'wsparcie' ? { supportType } : {}),
			...(path === 'pytanie' ? { message } : {})
		};

		submitting = true;
		submitError = '';
		try {
			const res = await fetch('/api/join', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload)
			});
			if (!res.ok) throw new Error(await res.text());
			submitted = true;
		} catch (err) {
			console.error('Nie udało się wysłać zgłoszenia:', err);
			submitError = 'Coś poszło nie tak. Spróbuj ponownie lub zadzwoń pod Telefon Zaufania.';
		} finally {
			submitting = false;
		}
	}
</script>

<div class="page">
	{#if submitted}
		<div class="success">
			<span class="success-ic"><Icon name="check" size={32} color="white" /></span>
			<h1>Dziękujemy, {name.split(' ')[0]}!</h1>
			<p>
				Twoje zgłoszenie zostało przyjęte. Odezwiemy się na adres <strong>{email}</strong> w ciągu
				kilku dni.
			</p>
			<a href="/" class="btn btn-primary">Wróć do strony głównej</a>
		</div>
	{:else}
		<div class="head-row">
			<PageHeader
				eyebrow="Zaangażuj się"
				title="Dołącz do nas"
				subtitle="Kilka kroków dzieli Cię od pierwszego spotkania z drugim człowiekiem."
			/>
			{#if step === 0}
				<svg class="hero-art" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
					<circle cx="150" cy="70" r="70" fill="#1FA138" opacity="0.08" />
					<path d="M30 40q30-18 55 5" stroke="#169FDB" stroke-width="2" stroke-dasharray="4 6" stroke-linecap="round" opacity="0.5" />
					<path d="M120 150c2-14 12-24 12-24" stroke="#169FDB" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.35" />
					<!-- serce -->
					<path d="M172 40c-4-6-13-6-16 1-3-7-12-7-16-1-5 7 0 15 16 26 16-11 21-19 16-26z" fill="#1FA138" opacity="0.55" />
					<!-- postać niebieska -->
					<circle cx="88" cy="88" r="17" fill="#169FDB" opacity="0.85" />
					<path d="M60 160c0-24 15-42 34-42s34 12 34 30v12H60z" fill="#169FDB" opacity="0.85" />
					<!-- postać zielona, oparta o niebieską -->
					<circle cx="132" cy="94" r="15" fill="#1FA138" opacity="0.85" />
					<path d="M104 162c0-22 13-38 30-38 15 0 27 12 29 28v10H104z" fill="#1FA138" opacity="0.85" />
				</svg>
			{/if}
		</div>

		<div class="stepper">
			<div class="stepper-inner">
				{#each steps as label, i}
					<div class="step" class:active={i === step} class:done={i < step}>
						<span class="step-dot">{#if i < step}<Icon name="check" size={12} color="white" />{:else}{i + 1}{/if}</span>
						<span class="step-label">{label}</span>
					</div>
					{#if i < steps.length - 1}<span class="step-line" class:done={i < step}></span>{/if}
				{/each}
			</div>
		</div>

		{#if step === 0}
			<div class="paths">
				{#each paths as p}
					<div class="path-card" style="--c: {p.color}">
						{#if p.decor === 'leaf'}
							<svg class="decor decor-leaf" viewBox="0 0 60 60" fill="none" aria-hidden="true">
								<path d="M10 50c-4-16 6-30 22-32" stroke={p.color} stroke-width="2" stroke-linecap="round" opacity="0.3" />
								<path d="M18 42c6 2 12-1 14-8" stroke={p.color} stroke-width="2" stroke-linecap="round" opacity="0.3" />
							</svg>
						{:else if p.decor === 'dots'}
							<svg class="decor decor-dots" viewBox="0 0 60 60" fill="none" aria-hidden="true">
								{#each [0, 1, 2] as row}
									{#each [0, 1, 2] as col}
										<circle cx={10 + col * 12} cy={10 + row * 12} r="2" fill={p.color} opacity="0.22" />
									{/each}
								{/each}
							</svg>
						{/if}

						<span class="path-ic-wrap">
							<span class="path-ic"><Icon name={p.icon} size={30} color={p.color} /></span>
						</span>
						<span class="path-h">{p.title}</span>
						<span class="path-p">{p.desc}</span>

						<ul class="path-bullets">
							{#each p.bullets as b}
								<li>
									<span class="bullet-ic"><Icon name={b.icon} size={13} color={p.color} /></span>
									{b.text}
								</li>
							{/each}
						</ul>

						<button class="path-cta" onclick={() => choosePath(p.id)}>
							{p.cta} <Icon name="arrow-right" size={15} color="white" />
						</button>
					</div>
				{/each}
			</div>

			<CommunityPanel
				heading="Razem możemy więcej"
				text="Dzięki Tobie osoby starsze odzyskują radość życia i czują, że nie są same. Dołącz do naszej społeczności!"
				ctaLabel="Poznaj nasze działania"
				ctaHref="/"
			/>
		{/if}

		{#if step === 1 && activePath}
			<div class="panel-form">
				<div class="chosen-path" style="--c: {activePath.color}">
					<span class="chosen-ic"><Icon name={activePath.icon} size={18} color={activePath.color} /></span>
					{activePath.title}
					<button class="chosen-change" onclick={() => (step = 0)}>Zmień</button>
				</div>

				<div class="form-grid">
					<div class="form-row">
						<label for="name">Imię i nazwisko *</label>
						<input id="name" type="text" bind:value={name} placeholder="Anna Kowalska" />
					</div>
					<div class="form-row">
						<label for="email">E-mail *</label>
						<input id="email" type="email" bind:value={email} placeholder="anna@example.com" />
					</div>
					<div class="form-row">
						<label for="phone">Telefon (opcjonalnie)</label>
						<input id="phone" type="tel" bind:value={phone} placeholder="600 000 000" />
					</div>
					<div class="form-row">
						<label for="city">Miasto (opcjonalnie)</label>
						<input id="city" type="text" bind:value={city} placeholder="Warszawa" />
					</div>
				</div>

				{#if path === 'wolontariat'}
					<div class="form-row">
						<span class="group-label">Ile czasu możesz poświęcić? *</span>
						<div class="choice-row">
							{#each availabilityOptions as opt}
								<button
									class="choice-chip"
									class:active={availability === opt}
									onclick={() => (availability = opt)}
								>{opt}</button>
							{/each}
						</div>
					</div>
					<div class="form-row">
						<label for="motivation">Co Cię skłania do wolontariatu? (opcjonalnie)</label>
						<textarea id="motivation" bind:value={motivation} rows="3" placeholder="Chcę pomagać, bo..."></textarea>
					</div>
				{:else if path === 'wsparcie'}
					<div class="form-row">
						<span class="group-label">Forma wsparcia *</span>
						<div class="choice-row">
							{#each supportOptions as opt}
								<button
									class="choice-chip"
									class:active={supportType === opt.value}
									onclick={() => (supportType = opt.value)}
								>{opt.label}</button>
							{/each}
						</div>
					</div>
				{:else if path === 'pytanie'}
					<div class="form-row">
						<label for="message">Twoja wiadomość *</label>
						<textarea id="message" bind:value={message} rows="4" placeholder="Napisz, w czym możemy pomóc..."></textarea>
					</div>
				{/if}

				<div class="actions">
					<button class="btn btn-secondary" onclick={goBack}>Wstecz</button>
					<button class="btn btn-primary" onclick={goNext} disabled={!step1Valid}>Dalej</button>
				</div>
			</div>
		{/if}

		{#if step === 2 && activePath}
			<div class="panel-form">
				<h2 class="summary-title">Sprawdź swoje dane</h2>
				<dl class="summary">
					<div class="summary-row"><dt>Ścieżka</dt><dd>{activePath.title}</dd></div>
					<div class="summary-row"><dt>Imię i nazwisko</dt><dd>{name}</dd></div>
					<div class="summary-row"><dt>E-mail</dt><dd>{email}</dd></div>
					{#if phone}<div class="summary-row"><dt>Telefon</dt><dd>{phone}</dd></div>{/if}
					{#if city}<div class="summary-row"><dt>Miasto</dt><dd>{city}</dd></div>{/if}
					{#if path === 'wolontariat'}
						<div class="summary-row"><dt>Dostępność</dt><dd>{availability}</dd></div>
						{#if motivation}<div class="summary-row"><dt>Motywacja</dt><dd>{motivation}</dd></div>{/if}
					{:else if path === 'wsparcie'}
						<div class="summary-row">
							<dt>Forma wsparcia</dt>
							<dd>{supportOptions.find((o) => o.value === supportType)?.label}</dd>
						</div>
					{:else if path === 'pytanie'}
						<div class="summary-row"><dt>Wiadomość</dt><dd>{message}</dd></div>
					{/if}
				</dl>

				{#if submitError}
					<p class="submit-error">{submitError}</p>
				{/if}

				<div class="actions">
					<button class="btn btn-secondary" onclick={goBack} disabled={submitting}>Wstecz</button>
					<button class="btn btn-primary" onclick={submit} disabled={submitting}>
						{#if submitting}
							<span class="spin"></span>
							Wysyłanie...
						{:else}
							<Icon name="send" size={16} color="white" />
							Wyślij zgłoszenie
						{/if}
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style lang="scss">
	@use 'variables' as *;

	.page { max-width: 1040px; }

	/* ── HEADER + ILLUSTRATION ── */
	.head-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: $spacing-xl;

		:global(.page-header) { flex: 1; margin-bottom: $spacing-xl; }
	}

	.hero-art {
		width: 190px;
		height: auto;
		flex-shrink: 0;
		margin-top: -8px;
		@media (max-width: 860px) { display: none; }
	}

	/* ── STEPPER ── */
	.stepper {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-lg $spacing-xl;
		margin-bottom: $spacing-2xl;
	}

	.stepper-inner {
		display: flex;
		align-items: center;
	}

	.step {
		display: flex;
		align-items: center;
		gap: 10px;
		flex-shrink: 0;
	}

	.step-dot {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: $color-bg-card;
		border: 1.5px solid $color-border;
		color: $color-text-muted;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		font-weight: 700;
		flex-shrink: 0;

		.active & { border-color: $color-primary; color: $color-primary; }
		.done & { background: $color-accent; border-color: $color-accent; color: white; }
	}

	.step-label {
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-text-muted;
		white-space: nowrap;

		.active & { color: $color-secondary; }
		@media (max-width: 560px) { display: none; }
	}

	.step-line {
		flex: 1;
		height: 1.5px;
		background: $color-border;
		margin: 0 $spacing-md;
		&.done { background: $color-accent; }
	}

	/* ── STEP 0: PATH CARDS ── */
	.paths {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-lg;
		@media (max-width: 720px) { grid-template-columns: 1fr; }
	}

	.path-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		background: $color-bg-card;
		border: 1.5px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-xl;
		overflow: hidden;
		transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;

		&:hover {
			transform: translateY(-3px);
			border-color: color-mix(in srgb, var(--c) 45%, $color-border);
			box-shadow: $shadow-md;
		}
	}

	.decor {
		position: absolute;
		width: 64px;
		height: 64px;

		&-leaf { top: $spacing-lg; right: $spacing-lg; }
		&-dots { top: $spacing-lg; right: $spacing-lg; }
	}

	.path-ic-wrap {
		width: 76px;
		height: 76px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: radial-gradient(circle, color-mix(in srgb, var(--c) 16%, transparent) 0%, color-mix(in srgb, var(--c) 6%, transparent) 70%, transparent 100%);
		margin-bottom: $spacing-lg;
	}

	.path-ic {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 14%, transparent);
	}

	.path-h { font-size: 21px; font-weight: 700; color: $color-secondary; margin-bottom: 8px; line-height: 1.25; }
	.path-p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.55; margin-bottom: $spacing-lg; }

	.path-bullets {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
		margin-bottom: $spacing-xl;
		flex: 1;

		li {
			display: flex;
			align-items: center;
			gap: $spacing-sm;
			font-size: $font-size-sm;
			color: $color-text;
		}
	}

	.bullet-ic {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		flex-shrink: 0;
	}

	.path-cta {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		width: 100%;
		padding: 12px $spacing-lg;
		border-radius: $radius-sm;
		background: var(--c);
		color: white;
		font-weight: 700;
		font-size: $font-size-sm;
		transition: filter 0.15s ease;
		&:hover { filter: brightness(1.08); }
	}

	/* ── STEP 1 & 2 PANEL ── */
	.panel-form {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-2xl;
		@media (max-width: 600px) { padding: $spacing-lg; }
	}

	.chosen-path {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
		font-weight: 700;
		color: $color-secondary;
		margin-bottom: $spacing-xl;
		padding-bottom: $spacing-lg;
		border-bottom: 1px solid $color-border;
	}

	.chosen-ic {
		width: 34px;
		height: 34px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 12%, transparent);
	}

	.chosen-change {
		margin-left: auto;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-primary;
		text-decoration: underline;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: $spacing-md;
		margin-bottom: $spacing-md;
		@media (max-width: 560px) { grid-template-columns: 1fr; }
	}

	.form-row {
		display: flex;
		flex-direction: column;
		gap: 6px;
		margin-bottom: $spacing-md;

		label, .group-label { font-size: $font-size-sm; font-weight: 600; color: $color-text; }
	}

	.choice-row {
		display: flex;
		flex-wrap: wrap;
		gap: $spacing-sm;
	}

	.choice-chip {
		padding: 10px 16px;
		border-radius: $radius-full;
		border: 1.5px solid $color-border;
		background: $color-bg;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-text;
		transition: all 0.15s ease;

		&:hover { border-color: $color-primary; }
		&.active { border-color: $color-primary; background: $color-primary-bg; color: $color-primary; }
	}

	.actions {
		display: flex;
		justify-content: space-between;
		gap: $spacing-md;
		margin-top: $spacing-xl;
		padding-top: $spacing-lg;
		border-top: 1px solid $color-border;
	}

	.submit-error {
		margin-top: $spacing-lg;
		padding: $spacing-md $spacing-lg;
		border-radius: $radius-sm;
		background: color-mix(in srgb, $color-danger 8%, transparent);
		border: 1px solid color-mix(in srgb, $color-danger 25%, transparent);
		color: $color-danger;
		font-size: $font-size-sm;
	}

	.spin {
		display: inline-block;
		width: 15px;
		height: 15px;
		border: 2px solid rgba(255, 255, 255, 0.35);
		border-top-color: white;
		border-radius: 50%;
		animation: spin 0.6s linear infinite;
	}

	@keyframes spin { to { transform: rotate(360deg); } }

	/* ── STEP 2: SUMMARY ── */
	.summary-title {
		font-family: $font-serif;
		font-size: 24px;
		font-weight: 700;
		color: $color-secondary;
		margin-bottom: $spacing-lg;
	}

	.summary { display: flex; flex-direction: column; gap: $spacing-md; }

	.summary-row {
		display: grid;
		grid-template-columns: 160px 1fr;
		gap: $spacing-md;
		padding-bottom: $spacing-md;
		border-bottom: 1px solid $color-border;

		dt { font-size: $font-size-sm; font-weight: 600; color: $color-text-muted; }
		dd { font-size: $font-size-sm; color: $color-secondary; line-height: 1.5; }

		@media (max-width: 500px) { grid-template-columns: 1fr; gap: 4px; }
	}

	/* ── SUCCESS ── */
	.success {
		text-align: center;
		padding: $spacing-3xl 0;

		h1 {
			font-family: $font-serif;
			font-size: 32px;
			font-weight: 700;
			color: $color-secondary;
			margin: $spacing-lg 0 $spacing-sm;
		}

		p {
			font-size: $font-size-lg;
			color: $color-text-muted;
			line-height: 1.6;
			max-width: 480px;
			margin: 0 auto $spacing-xl;
			strong { color: $color-secondary; }
		}
	}

	.success-ic {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-accent, $color-accent-dark);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 20px rgba($color-accent, 0.3);
	}
</style>
