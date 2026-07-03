<script lang="ts">
	import ArticleForm from '$lib/components/admin/ArticleForm.svelte';

	let { data } = $props();
</script>

<svelte:head><title>Edytuj: {data.article.title} — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<div>
		<a href="/administracja/wiedza" class="back-link">← Baza wiedzy</a>
		<h1>Edytuj artykuł</h1>
	</div>
</header>

<ArticleForm
	title={data.article.title}
	categorySlug={data.article.categorySlug}
	summary={data.article.summary}
	content={data.article.content}
	tags={data.article.tags.join(', ')}
	status={data.status}
	publicSlug={data.article.slug}
/>

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
</style>
