<script lang="ts">
	import ArticleForm from '$lib/components/admin/ArticleForm.svelte';
</script>

<svelte:head><title>Nowy artykuł — Panel administracyjny</title></svelte:head>

<header class="dash-head">
	<div>
		<a href="/administracja/wiedza" class="back-link">← Baza wiedzy</a>
		<h1>Nowy artykuł</h1>
	</div>
</header>

<ArticleForm />

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
