<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';

	const signals = [
		'Rzadziej dzwoni albo nie odbiera telefonu tak chętnie jak kiedyś',
		'Rozmowy są krótsze, jakby chciał/a je szybko skończyć',
		'Mówi rzeczy w rodzaju „nikomu już nie jestem potrzebny/a" albo „nie ma po co"',
		'Rezygnuje ze spotkań lub wydarzeń, na które kiedyś chętnie chodził/a',
		'Coraz rzadziej wychodzi z domu',
		'Zaniedbuje posiłki, higienę lub porządek w domu',
		'Skarży się na bezsenność, brak energii albo poczucie pustki',
		'Stracił/a zainteresowanie dawnym hobby lub zajęciami',
		'Jest bardziej drażliwy/a, płaczliwy/a — albo przeciwnie, wyraźnie apatyczny/a'
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
	<PageHeader
		eyebrow="Poznaj"
		title="Sprawdź sygnały"
		subtitle="Samotni seniorzy rzadko proszą o pomoc wprost. Zaznacz, co pasuje do Twojego bliskiego — zobaczysz, na co warto zwrócić uwagę."
	/>

	<div class="disclaimer">
		<Icon name="shield" size={16} color="#8794A1" />
		<span>To nie jest narzędzie diagnostyczne ani test kliniczny — to lista sygnałów, które badacze i organizacje pomocowe łączą z ryzykiem osamotnienia. Potraktuj wynik jako punkt wyjścia do rozmowy, nie diagnozę.</span>
	</div>

	{#if !showResult}
		<div class="checklist">
			{#each signals as signal, i}
				<button class="signal-row" class:active={checked[i]} onclick={() => toggle(i)}>
					<span class="signal-box">
						{#if checked[i]}<Icon name="check" size={14} color="white" />{/if}
					</span>
					<span class="signal-text">{signal}</span>
				</button>
			{/each}
		</div>

		<button class="btn btn-primary btn-full check-btn" onclick={checkResult}>
			Sprawdź wynik ({count}/{signals.length} zaznaczonych)
		</button>
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
</div>

<style lang="scss">
	@use 'variables' as *;

	.page { max-width: 720px; }

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
		margin-bottom: $spacing-2xl;

		:global(svg) { flex-shrink: 0; margin-top: 2px; }
	}

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

	.signal-text { font-size: $font-size-sm; color: $color-text; line-height: 1.4; }

	.check-btn { font-size: $font-size-base; }

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
