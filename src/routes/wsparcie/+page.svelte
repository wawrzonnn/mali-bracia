<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { resources } from '$lib/data/resources';

	const helplines = resources.filter((r) => r.type === 'helpline');
	const organizations = resources.filter((r) => r.type === 'organization');
	const guides = resources.filter((r) => r.type === 'guide');
</script>

<div class="page">
	<h1 class="page-title">Wsparcie i pomoc</h1>
	<p class="page-intro">Jeśli Ty lub ktoś bliski potrzebuje pomocy — nie jesteś sam/sama. Poniżej znajdziesz sprawdzone kontakty.</p>

	<section class="help-section">
		<h2 class="section-title">
			<Icon name="phone" size={22} color="#E74C3C" />
			Telefony zaufania
		</h2>
		<div class="helpline-list">
			{#each helplines as h}
				<div class="helpline-card">
					<div class="helpline-info">
						<h3>{h.title}</h3>
						<p>{h.description}</p>
					</div>
					{#if h.phone}
						<a href="tel:{h.phone.replace(/\s/g, '')}" class="call-btn">
							<Icon name="phone" size={20} color="white" />
							<span>{h.phone}</span>
						</a>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<section class="help-section">
		<h2 class="section-title">
			<Icon name="shield" size={22} color="#169FDB" />
			Organizacje
		</h2>
		<div class="org-list">
			{#each organizations as org}
				<div class="org-card">
					<h3>{org.title}</h3>
					<p>{org.description}</p>
					<div class="org-actions">
						{#if org.phone}
							<a href="tel:{org.phone.replace(/\s/g, '')}" class="btn btn-secondary">
								<Icon name="phone" size={16} />
								Zadzwoń
							</a>
						{/if}
						{#if org.url}
							<a href={org.url} target="_blank" rel="noopener" class="btn btn-secondary">
								<Icon name="external" size={16} />
								Strona www
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="help-section">
		<h2 class="section-title">
			<Icon name="book" size={22} color="#1FA138" />
			Materiały do pobrania
		</h2>
		<div class="guide-list">
			{#each guides as g}
				<a href={g.url} target="_blank" rel="noopener" class="guide-card">
					<Icon name="book" size={24} color="#1FA138" />
					<div>
						<h3>{g.title}</h3>
						<p>{g.description}</p>
					</div>
					<Icon name="chevron-right" size={18} color="#5A6B7A" />
				</a>
			{/each}
		</div>
	</section>

	<div class="emergency-banner">
		<Icon name="shield" size={24} color="#E74C3C" />
		<div>
			<strong>W nagłym wypadku dzwoń: 112</strong>
			<p>Pogotowie ratunkowe, policja, straż pożarna</p>
		</div>
		<a href="tel:112" class="call-btn small">
			<Icon name="phone" size={18} color="white" />
			112
		</a>
	</div>
</div>

<style lang="scss">
	@use 'variables' as *;

	.page-intro {
		font-size: $font-size-base;
		color: $color-text-muted;
		line-height: 1.6;
		margin-bottom: $spacing-xl;
	}

	.help-section {
		margin-bottom: $spacing-2xl;
	}

	.section-title {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
	}

	.helpline-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: $spacing-md;
	}

	.org-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
		gap: $spacing-md;
	}

	.guide-list {
		display: grid;
		gap: $spacing-sm;
	}

	.helpline-card {
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-lg;
		border: 1px solid $color-border;
		border-left: 4px solid #E74C3C;
	}

	.helpline-info {
		margin-bottom: $spacing-md;

		h3 {
			font-size: $font-size-base;
			font-weight: 700;
			margin-bottom: $spacing-xs;
		}

		p {
			font-size: $font-size-sm;
			color: $color-text-muted;
			line-height: 1.5;
		}
	}

	.call-btn {
		display: inline-flex;
		align-items: center;
		gap: $spacing-sm;
		padding: 12px $spacing-lg;
		background: #E74C3C;
		color: white;
		font-weight: 700;
		font-size: $font-size-base;
		border-radius: $radius;
		text-decoration: none;
		transition: filter 0.15s;

		&:hover { filter: brightness(1.1); }

		&.small {
			padding: 8px $spacing-md;
			font-size: $font-size-sm;
		}
	}

	.org-card {
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-lg;
		border: 1px solid $color-border;
		border-left: 4px solid $color-primary;

		h3 {
			font-size: $font-size-base;
			font-weight: 700;
			margin-bottom: $spacing-xs;
		}

		p {
			font-size: $font-size-sm;
			color: $color-text-muted;
			line-height: 1.5;
			margin-bottom: $spacing-md;
		}
	}

	.org-actions {
		display: flex;
		gap: $spacing-sm;
		flex-wrap: wrap;
	}

	.guide-card {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		background: $color-bg-card;
		border-radius: $radius;
		padding: $spacing-lg;
		border: 1px solid $color-border;
		text-decoration: none;
		color: inherit;
		transition: border-color 0.15s;

		&:hover { border-color: $color-accent; }

		div { flex: 1; }

		h3 {
			font-size: $font-size-sm;
			font-weight: 700;
		}

		p {
			font-size: $font-size-xs;
			color: $color-text-muted;
		}
	}

	.emergency-banner {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		background: #FFF5F5;
		border: 2px solid #E74C3C;
		border-radius: $radius;
		padding: $spacing-lg;
		margin-top: $spacing-lg;

		div { flex: 1; }

		strong {
			font-size: $font-size-base;
			color: #E74C3C;
		}

		p {
			font-size: $font-size-xs;
			color: $color-text-muted;
		}
	}
</style>
