<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { articles } from '$lib/data/articles';
	import { adminMaterials, adminUsersMock, activityFeed, articleMeta } from '$lib/data/adminMock';

	let { data } = $props();

	const publishedCount = $derived(
		articles.filter((a) => (articleMeta[a.slug]?.status ?? 'Opublikowany') === 'Opublikowany').length
	);
	const draftCount = $derived(articles.length - publishedCount);

	const stats = $derived([
		{
			label: 'Zgłoszenia',
			value: data.requestsTotal,
			sub: `${data.requestsNowe} nowych`,
			icon: 'message' as const,
			color: '#169FDB',
			href: '/administracja/zgloszenia'
		},
		{
			label: 'Artykuły',
			value: articles.length,
			sub: `${draftCount} w szkicu`,
			icon: 'book' as const,
			color: '#1FA138',
			href: '/administracja/wiedza'
		},
		{
			label: 'Materiały',
			value: adminMaterials.length,
			sub: 'plików PDF',
			icon: 'file-text' as const,
			color: '#F5A623',
			href: '/administracja/materialy'
		},
		{
			label: 'Użytkownicy',
			value: adminUsersMock.length + 1,
			sub: 'aktywnych kont',
			icon: 'users' as const,
			color: '#9B59B6',
			href: '/administracja/uzytkownicy'
		}
	]);

	function formatRelative(iso: string) {
		const diffMs = Date.now() - new Date(iso).getTime();
		const diffH = Math.round(diffMs / 3_600_000);
		if (diffH < 1) return 'przed chwilą';
		if (diffH < 24) return `${diffH} godz. temu`;
		const diffD = Math.round(diffH / 24);
		return `${diffD} dni temu`;
	}
</script>

<svelte:head><title>Przegląd — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<h1>Witaj, {data.user?.name?.split(' ')[0] ?? 'Administratorze'}</h1>
	<p>Skrót tego, co dzieje się na platformie mali bracia Ubogich.</p>
</header>

<div class="stat-grid">
	{#each stats as s}
		<a href={s.href} class="stat-card">
			<span class="stat-ic" style="--c: {s.color}"><Icon name={s.icon} size={20} color={s.color} /></span>
			<div class="stat-body">
				<strong>{s.value}</strong>
				<span class="stat-label">{s.label}</span>
			</div>
			<span class="stat-sub">{s.sub}</span>
		</a>
	{/each}
</div>

<div class="dash-grid">
	<section class="panel">
		<div class="panel-head">
			<h2>Ostatnia aktywność</h2>
		</div>
		<div class="activity-list">
			{#each activityFeed as item (item.id)}
				<div class="activity-row">
					<span class="activity-dot"></span>
					<span class="activity-text">{item.text}</span>
					<span class="activity-time">{formatRelative(item.time)}</span>
				</div>
			{/each}
		</div>
	</section>

	<section class="panel">
		<div class="panel-head">
			<h2>Szybkie akcje</h2>
		</div>
		<div class="quick-links">
			<a href="/administracja/wiedza/nowy" class="quick-link">
				<Icon name="edit" size={17} color="#169FDB" />
				Nowy artykuł
			</a>
			<a href="/administracja/materialy/nowy" class="quick-link">
				<Icon name="file-text" size={17} color="#169FDB" />
				Dodaj materiał
			</a>
			<a href="/administracja/uzytkownicy/nowy" class="quick-link">
				<Icon name="users" size={17} color="#169FDB" />
				Zaproś użytkownika
			</a>
			<a href="/administracja/zgloszenia" class="quick-link">
				<Icon name="message" size={17} color="#169FDB" />
				Przejrzyj zgłoszenia
			</a>
		</div>
	</section>
</div>

<style lang="scss">
	@use '../../lib/styles/variables' as *;

	.dash-head {
		margin-bottom: $spacing-xl;
		h1 { font-family: $font-serif; font-size: 28px; font-weight: 700; color: $color-secondary; }
		p { font-size: $font-size-sm; color: $color-text-muted; margin-top: 4px; }
	}

	.stat-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: $spacing-md;
		margin-bottom: $spacing-xl;
		@media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
		@media (max-width: 480px) { grid-template-columns: 1fr; }
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		padding: $spacing-lg;
		text-decoration: none;
		color: inherit;
		transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;

		&:hover { transform: translateY(-2px); box-shadow: $shadow-md; border-color: color-mix(in srgb, var(--c) 40%, $color-border); }
	}

	.stat-ic {
		width: 38px;
		height: 38px;
		border-radius: $radius-sm;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: color-mix(in srgb, var(--c) 14%, transparent);
	}

	.stat-body {
		display: flex;
		flex-direction: column;
		strong { font-family: $font-serif; font-size: 28px; font-weight: 700; color: $color-secondary; line-height: 1; }
	}

	.stat-label { font-size: $font-size-sm; font-weight: 600; color: $color-text; margin-top: 4px; }
	.stat-sub { font-size: 12px; color: $color-text-muted; }

	.dash-grid {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: $spacing-lg;
		@media (max-width: 860px) { grid-template-columns: 1fr; }
	}

	.panel {
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius;
		padding: $spacing-lg;
	}

	.panel-head {
		margin-bottom: $spacing-md;
		h2 { font-size: $font-size-base; font-weight: 700; color: $color-secondary; }
	}

	.activity-list { display: flex; flex-direction: column; gap: $spacing-md; }

	.activity-row {
		display: flex;
		align-items: flex-start;
		gap: $spacing-sm;
		padding-bottom: $spacing-md;
		border-bottom: 1px solid $color-border;
		&:last-child { border-bottom: none; padding-bottom: 0; }
	}

	.activity-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: $color-primary;
		margin-top: 6px;
		flex-shrink: 0;
	}

	.activity-text { flex: 1; font-size: $font-size-sm; color: $color-text; line-height: 1.5; }
	.activity-time { font-size: 12px; color: $color-text-muted; white-space: nowrap; flex-shrink: 0; }

	.quick-links { display: flex; flex-direction: column; gap: $spacing-sm; }

	.quick-link {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
		padding: $spacing-sm $spacing-md;
		border-radius: $radius-sm;
		border: 1.5px solid $color-border;
		text-decoration: none;
		font-size: $font-size-sm;
		font-weight: 600;
		color: $color-text;
		transition: all 0.15s ease;

		&:hover { border-color: $color-primary; color: $color-primary; }
	}
</style>
