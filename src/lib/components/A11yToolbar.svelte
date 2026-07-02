<script lang="ts">
	import { browser } from '$app/environment';

	let { withSidebar = true, inline = false }: { withSidebar?: boolean; inline?: boolean } = $props();

	let open = $state(false);
	let fontLevel = $state(0);
	let contrast = $state(false);

	if (browser) {
		const f = Number(localStorage.getItem('a11y-font') ?? '0');
		fontLevel = f === 1 || f === 2 ? f : 0;
		contrast = localStorage.getItem('a11y-contrast') === '1';
	}

	$effect(() => {
		if (!browser) return;
		const el = document.documentElement;
		el.classList.toggle('a11y-text-1', fontLevel === 1);
		el.classList.toggle('a11y-text-2', fontLevel === 2);
		el.classList.toggle('a11y-contrast', contrast);
		localStorage.setItem('a11y-font', String(fontLevel));
		localStorage.setItem('a11y-contrast', contrast ? '1' : '0');
	});

	const sizes = [
		{ level: 0, label: 'A', title: 'Normalna' },
		{ level: 1, label: 'A+', title: 'Duża' },
		{ level: 2, label: 'A++', title: 'Bardzo duża' }
	];

	function reset() {
		fontLevel = 0;
		contrast = false;
	}
</script>

<div class="a11y" class:no-sidebar={!withSidebar} class:inline>
	{#if open}
		<div class="panel" role="dialog" aria-label="Ustawienia dostępności">
			<div class="panel-head">
				<span>Dostępność</span>
				<button class="x" onclick={() => (open = false)} aria-label="Zamknij ustawienia dostępności">✕</button>
			</div>

			<div class="group">
				<span class="g-label">Wielkość tekstu</span>
				<div class="sizes">
					{#each sizes as s}
						<button
							class="size"
							class:active={fontLevel === s.level}
							style="font-size: {13 + s.level * 4}px"
							onclick={() => (fontLevel = s.level)}
							aria-pressed={fontLevel === s.level}
							title={s.title}
						>{s.label}</button>
					{/each}
				</div>
			</div>

			<div class="group">
				<span class="g-label">Wysoki kontrast</span>
				<button
					class="switch"
					class:on={contrast}
					onclick={() => (contrast = !contrast)}
					role="switch"
					aria-checked={contrast}
				>
					<span class="knob"></span>
					<span class="switch-txt">{contrast ? 'Włączony' : 'Wyłączony'}</span>
				</button>
			</div>

			{#if fontLevel !== 0 || contrast}
				<button class="reset" onclick={reset}>Przywróć domyślne</button>
			{/if}
		</div>
	{/if}

	<button
		class="launcher"
		onclick={() => (open = !open)}
		aria-label="Ustawienia dostępności"
		aria-expanded={open}
	>
		<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="5" r="2.4" />
			<path d="M5 9.3c2.2.9 4.6 1.3 7 1.3s4.8-.4 7-1.3" />
			<path d="M12 10.8V16" />
			<path d="M9 20l3-5 3 5" />
		</svg>
	</button>
</div>

<style lang="scss">
	@use 'variables' as *;

	.a11y {
		position: fixed;
		left: calc(#{$sidebar-width} + 24px);
		bottom: 24px;
		z-index: 160;

		/* Na mobile ten sam przycisk pokazujemy juz w wariancie "inline" wewnatrz
		   topbara (obok przycisku AI) — floating wersja chowa sie calkiem. */
		@media (max-width: 768px) {
			display: none;
		}

		&.no-sidebar {
			left: 24px;

			@media (max-width: 768px) {
				left: 16px;
				right: auto;
				top: auto;
				bottom: 16px;
			}
		}

		&.inline {
			position: relative;
			left: auto;
			right: auto;
			top: auto;
			bottom: auto;

			@media (max-width: 768px) {
				display: block;
				left: auto;
				right: auto;
				top: auto;
				bottom: auto;
			}
		}
	}

	.launcher {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, $color-primary-dark);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 18px rgba($color-primary, 0.35);
		transition: transform 0.15s ease;

		&:hover { transform: scale(1.06); }
		@media (max-width: 768px) { width: 36px; height: 36px; }

		.inline & { width: 36px; height: 36px; box-shadow: none; }
	}

	.panel {
		position: absolute;
		bottom: 64px;
		left: 0;
		width: 264px;
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		box-shadow: 0 12px 40px rgba(29, 29, 27, 0.18);
		padding: $spacing-lg;

		@media (max-width: 768px) {
			bottom: auto;
			top: 56px;
			left: auto;
			right: 0;
		}

		@media (max-width: 340px) { width: calc(100vw - 32px); }

		.inline & {
			bottom: auto;
			top: calc(100% + 10px);
			left: auto;
			right: 0;
		}
	}

	.panel-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: $spacing-lg;

		span { font-weight: 700; font-size: $font-size-base; color: $color-secondary; }

		.x {
			width: 28px;
			height: 28px;
			border-radius: 50%;
			color: $color-text-muted;
			font-size: 13px;
			&:hover { background: $color-bg; }
		}
	}

	.group {
		margin-bottom: $spacing-lg;
		&:last-of-type { margin-bottom: 0; }
	}

	.g-label {
		display: block;
		font-size: 12px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.5px;
		color: $color-text-muted;
		margin-bottom: $spacing-sm;
	}

	.sizes { display: flex; gap: $spacing-sm; }

	.size {
		flex: 1;
		height: 46px;
		border-radius: $radius-sm;
		border: 1.5px solid $color-border;
		background: $color-bg-card;
		font-weight: 800;
		color: $color-text;
		line-height: 1;
		transition: all 0.15s ease;

		&:hover { border-color: $color-primary; }
		&.active { border-color: $color-primary; background: $color-primary-bg; color: $color-primary; }
	}

	.switch {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		padding: 9px 12px;
		border-radius: $radius-sm;
		border: 1.5px solid $color-border;
		background: $color-bg-card;
		transition: border-color 0.15s ease;

		.knob {
			width: 40px;
			height: 22px;
			border-radius: $radius-full;
			background: $color-border;
			position: relative;
			flex-shrink: 0;
			transition: background 0.15s ease;

			&::after {
				content: '';
				position: absolute;
				top: 2px;
				left: 2px;
				width: 18px;
				height: 18px;
				border-radius: 50%;
				background: #fff;
				box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
				transition: transform 0.15s ease;
			}
		}

		.switch-txt { font-size: $font-size-sm; font-weight: 600; color: $color-text-muted; }

		&.on {
			border-color: $color-accent;
			.knob { background: $color-accent; &::after { transform: translateX(18px); } }
			.switch-txt { color: $color-accent-dark; }
		}
	}

	.reset {
		margin-top: $spacing-md;
		font-size: $font-size-sm;
		color: $color-primary;
		text-decoration: underline;
	}
</style>
