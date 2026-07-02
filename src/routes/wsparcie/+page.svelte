<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import PageHeader from '$lib/components/PageHeader.svelte';
	import { resources } from '$lib/data/resources';

	const helplines = resources.filter((r) => r.type === 'helpline');
	const organizations = resources.filter((r) => r.type === 'organization');
	const guides = resources.filter((r) => r.type === 'guide');

	const orgColors = ['#169FDB', '#1FA138', '#9B59B6', '#F5A623'];
</script>

<div class="page">
	<PageHeader
		eyebrow="Pomoc"
		title="Wsparcie i pomoc"
		subtitle="Jeśli Ty lub ktoś bliski potrzebuje pomocy — nie jesteś sam/sama. Poniżej sprawdzone kontakty."
	/>

	<section class="block">
		<div class="sec-head">
			<span class="sec-ic" style="--c: #E74C3C"><Icon name="phone" size={20} color="#E74C3C" /></span>
			<h2>Telefony zaufania</h2>
		</div>
		<div class="grid two">
			{#each helplines as h}
				<div class="card helpline">
					<span class="hl-ic"><Icon name="phone" size={18} color="#E74C3C" /></span>
					<div class="helpline-info">
						<h3>{h.title}</h3>
						<p>{h.description}</p>
					</div>
					{#if h.phone}
						<a href="tel:{h.phone.replace(/\s/g, '')}" class="call-btn">
							<Icon name="phone" size={18} color="white" />
							<span>{h.phone}</span>
						</a>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<section class="block">
		<div class="sec-head">
			<span class="sec-ic" style="--c: #169FDB"><Icon name="shield" size={20} color="#169FDB" /></span>
			<h2>Organizacje</h2>
		</div>
		<div class="grid two">
			{#each organizations as org, i}
				<div class="card org" style="--c: {orgColors[i % orgColors.length]}">
					<span class="org-mono">{org.title.charAt(0)}</span>
					<h3>{org.title}</h3>
					<p>{org.description}</p>
					<div class="org-actions">
						{#if org.phone}
							<a href="tel:{org.phone.replace(/\s/g, '')}" class="btn btn-secondary btn-sm">
								<Icon name="phone" size={16} />
								Zadzwoń
							</a>
						{/if}
						{#if org.url}
							<a href={org.url} target="_blank" rel="noopener" class="btn btn-secondary btn-sm">
								<Icon name="external" size={16} />
								Strona www
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="block">
		<div class="sec-head">
			<span class="sec-ic" style="--c: #1FA138"><Icon name="book" size={20} color="#1FA138" /></span>
			<h2>Materiały do pobrania</h2>
		</div>
		<div class="grid">
			{#each guides as g}
				<a href={g.url} target="_blank" rel="noopener" class="card guide">
					<span class="guide-ic"><Icon name="book" size={22} color="#1FA138" /></span>
					<span class="guide-body">
						<span class="guide-h">{g.title}</span>
						<span class="guide-p">{g.description}</span>
					</span>
					<Icon name="chevron-right" size={18} color="#8794A1" />
				</a>
			{/each}
		</div>
	</section>

	<div class="emergency">
		<span class="em-ic"><Icon name="shield" size={22} color="white" /></span>
		<div class="em-body">
			<strong>W nagłym wypadku dzwoń 112</strong>
			<span>Pogotowie ratunkowe, policja, straż pożarna</span>
		</div>
		<a href="tel:112" class="em-btn">
			<Icon name="phone" size={18} color="white" />
			112
		</a>
	</div>
</div>

<style lang="scss">
	@use 'variables' as *;

	.block { margin-bottom: $spacing-2xl; }

	.sec-head {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		margin-bottom: $spacing-lg;
		h2 { font-size: 22px; font-weight: 700; letter-spacing: -0.01em; color: $color-secondary; }
	}

	.sec-ic {
		width: 40px;
		height: 40px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 12%, transparent);
		flex-shrink: 0;
	}

	.grid {
		display: grid;
		gap: $spacing-md;
		&.two {
			grid-template-columns: repeat(2, 1fr);
			@media (max-width: 720px) { grid-template-columns: 1fr; }
		}
	}

	.card {
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-xl;
		border: 1px solid $color-border;
		transition: transform 0.16s ease, border-color 0.16s ease, box-shadow 0.16s ease;
	}

	/* ── Telefony ── */
	.helpline {
		display: flex;
		flex-direction: column;
		gap: $spacing-md;
		&:hover { transform: translateY(-2px); border-color: color-mix(in srgb, $color-danger 40%, $color-border); box-shadow: $shadow-md; }
	}

	.hl-ic {
		width: 42px;
		height: 42px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, $color-danger 12%, transparent);
	}

	.helpline-info {
		flex: 1;
		h3 { font-size: $font-size-base; font-weight: 700; color: $color-secondary; margin-bottom: 4px; }
		p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.5; }
	}

	.call-btn {
		display: inline-flex;
		align-self: flex-start;
		align-items: center;
		gap: $spacing-sm;
		padding: 11px $spacing-lg;
		background: $color-danger;
		color: white;
		font-weight: 700;
		font-size: $font-size-base;
		border-radius: $radius-sm;
		text-decoration: none;
		transition: filter 0.15s;
		&:hover { filter: brightness(1.08); }
	}

	/* ── Organizacje ── */
	.org {
		display: flex;
		flex-direction: column;
		&:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--c) 40%, $color-border); box-shadow: $shadow-md; }
		h3 { font-size: $font-size-base; font-weight: 700; color: $color-secondary; margin-bottom: 4px; }
		p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.5; margin-bottom: $spacing-md; }
	}

	.org-mono {
		width: 44px;
		height: 44px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 14%, transparent);
		color: var(--c);
		font-weight: 800;
		font-size: 20px;
		margin-bottom: $spacing-md;
	}

	.org-actions { display: flex; gap: $spacing-sm; flex-wrap: wrap; margin-top: auto; }

	.btn-sm { padding: 9px $spacing-md; min-height: 40px; font-size: $font-size-sm; }

	/* ── Materiały ── */
	.guide {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		text-decoration: none;
		color: inherit;
		padding: $spacing-md $spacing-lg;
		&:hover { transform: translateX(3px); border-color: color-mix(in srgb, $color-accent 40%, $color-border); box-shadow: $shadow-sm; }
	}

	.guide-ic {
		width: 44px;
		height: 44px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: $color-accent-bg;
		flex-shrink: 0;
	}

	.guide-body { flex: 1; display: flex; flex-direction: column; gap: 2px; }
	.guide-h { font-size: $font-size-base; font-weight: 700; color: $color-secondary; }
	.guide-p { font-size: $font-size-sm; color: $color-text-muted; line-height: 1.4; }

	/* ── 112 ── */
	.emergency {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		background: color-mix(in srgb, $color-danger 7%, $color-bg-card);
		border: 1.5px solid color-mix(in srgb, $color-danger 30%, $color-border);
		border-radius: $radius;
		padding: $spacing-lg $spacing-xl;
		margin-top: $spacing-lg;
	}

	.em-ic {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: $color-danger;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.em-body {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
		strong { font-size: $font-size-base; color: $color-danger; font-weight: 800; }
		span { font-size: $font-size-sm; color: $color-text-muted; }
	}

	.em-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 10px $spacing-lg;
		background: $color-danger;
		color: white;
		font-weight: 800;
		font-size: $font-size-base;
		border-radius: $radius-sm;
		text-decoration: none;
		flex-shrink: 0;
		&:hover { filter: brightness(1.08); }
	}
</style>
