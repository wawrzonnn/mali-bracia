<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import CommunityPanel from '$lib/components/CommunityPanel.svelte';
	import type { IconName } from '$lib/components/Icon.svelte';

	const signals: { icon: IconName; text: string }[] = [
		{ icon: 'phone', text: 'Rzadziej dzwoni albo nie odbiera telefonu tak chętnie jak kiedyś' },
		{ icon: 'message', text: 'Rozmowy są krótsze, jakby chciał/a je szybko skończyć' },
		{ icon: 'user', text: 'Mówi rzeczy w rodzaju „nikomu już nie jestem potrzebny/a" albo „nie ma po co"' },
		{ icon: 'calendar', text: 'Rezygnuje ze spotkań lub wydarzeń, na które kiedyś chętnie chodził/a' },
		{ icon: 'door', text: 'Coraz rzadziej wychodzi z domu' },
		{ icon: 'home', text: 'Zaniedbuje posiłki, higienę lub porządek w domu' },
		{ icon: 'moon', text: 'Skarży się na bezsenność, brak energii albo poczucie pustki' },
		{ icon: 'puzzle', text: 'Stracił/a zainteresowanie dawnym hobby lub zajęciami' },
		{ icon: 'frown', text: 'Jest bardziej drażliwy/a, płaczliwy/a — albo przeciwnie, wyraźnie apatyczny/a' }
	];

	const previewCards = [
		{ icon: 'search' as IconName, title: 'Podsumowanie', desc: 'Co może wskazywać na ryzyko osamotnienia' },
		{ icon: 'message' as IconName, title: 'Wskazówki', desc: 'Na co warto zwrócić uwagę i porozmawiać' },
		{ icon: 'heart' as IconName, title: 'Gdzie szukać pomocy', desc: 'Sprawdzone miejsca wsparcia i kontaktu' }
	];

	let checked = $state<boolean[]>(Array(signals.length).fill(false));
	let showResult = $state(false);

	const count = $derived(checked.filter(Boolean).length);

	const tier = $derived.by(() => {
		if (count <= 1) return 'low';
		if (count <= 4) return 'mid';
		return 'high';
	});

	const tiers = {
		low: {
			color: '#1FA138',
			title: 'Na razie wygląda dobrze',
			text: 'Nie zauważasz wielu niepokojących sygnałów — to dobrze. Samotność potrafi jednak narastać powoli, więc warto po prostu zostać w kontakcie: regularny telefon czy odwiedziny to najlepsza profilaktyka.'
		},
		mid: {
			color: '#F5A623',
			title: 'Warto zwrócić większą uwagę',
			text: 'Kilka sygnałów, które zaznaczyłeś/aś, może być początkiem izolacji. To dobry moment, żeby częściej dzwonić, zaproponować wspólny spacer albo po prostu zapytać wprost, jak się naprawdę czuje.'
		},
		high: {
			color: '#E74C3C',
			title: 'To może być poważny sygnał',
			text: 'Zaznaczyłeś/aś kilka istotnych sygnałów naraz — warto potraktować to poważnie. Nie musisz radzić sobie sam/a: możesz porozmawiać o tym z Telefonem Zaufania albo pomyśleć o regularnych wizytach wolontariusza.'
		}
	};

	function toggle(i: number) {
		checked[i] = !checked[i];
	}

	function checkResult() {
		showResult = true;
	}

	function reset() {
		checked = Array(signals.length).fill(false);
		showResult = false;
	}
</script>

<svelte:head>
	<title>Sprawdź sygnały — mali bracia Ubogich</title>
</svelte:head>

<div class="page">
<div class="content">
	<div class="head-row">
		<PageHeader
			eyebrow="Poznaj"
			title="Sprawdź sygnały"
			subtitle="Samotni seniorzy rzadko proszą o pomoc wprost. Zaznacz, co pasuje do Twojego bliskiego — zobaczysz, na co warto zwrócić uwagę."
		/>
		{#if !showResult}
			<svg class="hero-art" viewBox="0 0 220 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<circle cx="150" cy="70" r="70" fill="#1FA138" opacity="0.08" />
				<path d="M30 40q30-18 55 5" stroke="#169FDB" stroke-width="2" stroke-dasharray="4 6" stroke-linecap="round" opacity="0.5" />
				<path d="M172 40c-4-6-13-6-16 1-3-7-12-7-16-1-5 7 0 15 16 26 16-11 21-19 16-26z" fill="#1FA138" opacity="0.55" />
				<circle cx="88" cy="88" r="17" fill="#169FDB" opacity="0.85" />
				<path d="M60 160c0-24 15-42 34-42s34 12 34 30v12H60z" fill="#169FDB" opacity="0.85" />
				<circle cx="132" cy="94" r="15" fill="#1FA138" opacity="0.85" />
				<path d="M104 162c0-22 13-38 30-38 15 0 27 12 29 28v10H104z" fill="#1FA138" opacity="0.85" />
			</svg>
		{/if}
	</div>

	<div class="disclaimer">
		<Icon name="shield" size={16} color="#8794A1" />
		<span>To nie jest narzędzie diagnostyczne ani test kliniczny — to lista sygnałów, które badacze i organizacje pomocowe łączą z ryzykiem osamotnienia. Potraktuj wynik jako punkt wyjścia do rozmowy, nie diagnozę.</span>
	</div>

	{#if !showResult}
		<div class="info-box">
			<span class="info-ic"><Icon name="help-circle" size={20} color="#169FDB" /></span>
			<div>
				<h2>Jak to działa?</h2>
				<p>
					Zaznacz sygnały, które zauważasz u bliskiej osoby. Po zatwierdzeniu zobaczysz krótkie
					podsumowanie z podpowiedziami, na co warto zwrócić uwagę i gdzie szukać wsparcia.
				</p>
			</div>
		</div>

		<div class="sec-head">
			<span class="sec-badge">1</span>
			<h2>Zaznacz sygnały, które zauważasz</h2>
		</div>

		<div class="checklist">
			{#each signals as signal, i}
				<button class="signal-row" class:active={checked[i]} onclick={() => toggle(i)}>
					<span class="signal-box">
						{#if checked[i]}<Icon name="check" size={14} color="white" />{/if}
					</span>
					<span class="signal-ic"><Icon name={signal.icon} size={16} color="#169FDB" /></span>
					<span class="signal-text">{signal.text}</span>
				</button>
			{/each}
		</div>

		<button class="btn btn-primary btn-full check-btn" onclick={checkResult}>
			Sprawdź wynik ({count}/{signals.length} zaznaczonych)
		</button>
		<p class="privacy-note">
			<Icon name="lock" size={13} color="#8794A1" />
			Twoje odpowiedzi są anonimowe i nie są nigdzie zapisywane.
		</p>

		<div class="sec-head next-head">
			<span class="sec-badge">2</span>
			<h2>Co dalej?</h2>
		</div>
		<p class="next-sub">Po sprawdzeniu wyniku zobaczysz:</p>
		<div class="preview-grid">
			{#each previewCards as p}
				<div class="preview-card">
					<span class="preview-ic"><Icon name={p.icon} size={18} color="#169FDB" /></span>
					<span class="preview-h">{p.title}</span>
					<span class="preview-p">{p.desc}</span>
				</div>
			{/each}
		</div>
	{:else}
		<div class="result-panel" style="--c: {tiers[tier].color}">
			<span class="result-count">{count}<span>/{signals.length}</span></span>
			<h2>{tiers[tier].title}</h2>
			<p>{tiers[tier].text}</p>

			<div class="result-actions">
				<a href="/wiedza/jak-rozmawiac-z-seniorem" class="btn btn-secondary">
					<Icon name="book" size={16} />
					Jak rozmawiać z osobą starszą
				</a>
				<a href="/wsparcie" class="btn btn-secondary">
					<Icon name="phone" size={16} />
					Telefon Zaufania
				</a>
				<a href="/dolacz?sciezka=wolontariat" class="btn btn-accent">
					<Icon name="heart" size={16} color="white" />
					Zostań wolontariuszem
				</a>
			</div>

			<button class="reset-link" onclick={reset}>Sprawdź jeszcze raz</button>
		</div>
	{/if}

	<CommunityPanel
		icon="heart"
		tone="green"
		heading="Nie jesteś sam"
		text="Jeśli czujesz, że sytuacja bliskiej osoby Cię niepokoi, skontaktuj się z nami. Jesteśmy, aby pomóc."
		ctaLabel="Skontaktuj się z nami"
		ctaHref="/wsparcie"
	/>
</div>
</div>

<style lang="scss">
	@use 'variables' as *;

	.content { max-width: 780px; }

	/* ── HEADER + ILLUSTRATION ── */
	.head-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: $spacing-xl;

		:global(.page-header) { flex: 1; margin-bottom: $spacing-xl; }
	}

	.hero-art {
		width: 170px;
		height: auto;
		flex-shrink: 0;
		margin-top: -4px;
		@media (max-width: 760px) { display: none; }
	}

	.disclaimer {
		display: flex;
		align-items: flex-start;
		gap: $spacing-sm;
		background: $color-bg-soft;
		border-radius: $radius-sm;
		padding: $spacing-md $spacing-lg;
		font-size: $font-size-sm;
		color: $color-text-muted;
		line-height: 1.5;
		margin-bottom: $spacing-lg;

		:global(svg) { flex-shrink: 0; margin-top: 2px; }
	}

	/* ── INFO BOX ── */
	.info-box {
		display: flex;
		align-items: flex-start;
		gap: $spacing-md;
		background: $color-primary-bg;
		border-radius: $radius;
		padding: $spacing-lg;
		margin-bottom: $spacing-2xl;

		h2 { font-size: $font-size-base; font-weight: 700; color: $color-secondary; margin-bottom: 4px; }
		p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.5; }
	}

	.info-ic {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		background: $color-bg-card;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	/* ── SECTION BADGES ── */
	.sec-head {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		margin-bottom: $spacing-lg;
		h2 { font-size: 20px; font-weight: 700; letter-spacing: -0.01em; color: $color-secondary; }

		&.next-head { margin-top: $spacing-2xl; margin-bottom: 4px; }
	}

	.sec-badge {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: $color-primary;
		color: white;
		font-weight: 700;
		font-size: $font-size-sm;
		flex-shrink: 0;
	}

	.next-sub {
		font-size: $font-size-sm;
		color: $color-text-muted;
		margin-bottom: $spacing-md;
		margin-left: 42px;
	}

	/* ── CHECKLIST ── */
	.checklist {
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
		margin-bottom: $spacing-xl;
	}

	.signal-row {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		width: 100%;
		text-align: left;
		padding: $spacing-md $spacing-lg;
		border-radius: $radius;
		border: 1.5px solid $color-border;
		background: $color-bg-card;
		transition: all 0.15s ease;

		&:hover { border-color: $color-primary-light; }

		&.active {
			border-color: $color-primary;
			background: $color-primary-bg;
		}
	}

	.signal-box {
		width: 24px;
		height: 24px;
		border-radius: 6px;
		border: 1.5px solid $color-border;
		background: $color-bg-card;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: all 0.15s ease;

		.active & { background: $color-primary; border-color: $color-primary; }
	}

	.signal-ic {
		width: 32px;
		height: 32px;
		border-radius: $radius-sm;
		background: $color-primary-bg;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.signal-text { font-size: $font-size-sm; color: $color-text; line-height: 1.4; }

	.check-btn { font-size: $font-size-base; }

	.privacy-note {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		font-size: 12px;
		color: $color-text-muted;
		margin-top: $spacing-sm;
	}

	/* ── PREVIEW CARDS ── */
	.preview-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-md;
		@media (max-width: 640px) { grid-template-columns: 1fr; }
	}

	.preview-card {
		display: flex;
		flex-direction: column;
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		padding: $spacing-lg;
	}

	.preview-ic {
		width: 36px;
		height: 36px;
		border-radius: $radius-sm;
		background: $color-primary-bg;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: $spacing-sm;
	}

	.preview-h { font-size: $font-size-sm; font-weight: 700; color: $color-secondary; margin-bottom: 2px; }
	.preview-p { font-size: 12px; color: $color-text-muted; line-height: 1.4; }

	/* ── RESULT ── */
	.result-panel {
		text-align: center;
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-2xl;
	}

	.result-count {
		display: inline-flex;
		align-items: baseline;
		font-family: $font-serif;
		font-size: 48px;
		font-weight: 700;
		color: var(--c);

		span { font-size: 20px; font-weight: 600; color: $color-text-muted; }
	}

	.result-panel h2 {
		font-family: $font-serif;
		font-size: 26px;
		font-weight: 700;
		color: $color-secondary;
		margin: $spacing-sm 0 $spacing-md;
	}

	.result-panel p {
		font-size: $font-size-base;
		color: $color-text-muted;
		line-height: 1.65;
		max-width: 520px;
		margin: 0 auto $spacing-xl;
	}

	.result-actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: $spacing-sm;
		margin-bottom: $spacing-lg;
	}

	.reset-link {
		font-size: $font-size-sm;
		color: $color-text-muted;
		text-decoration: underline;
	}
</style>
