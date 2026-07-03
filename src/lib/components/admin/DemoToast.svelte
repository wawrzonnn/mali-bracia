<script lang="ts">
	let { message = 'Tryb demo — zmiana nie została zapisana.', show = false }: { message?: string; show?: boolean } = $props();
</script>

{#if show}
	<div class="demo-toast" role="status">
		<span class="dot"></span>
		{message}
	</div>
{/if}

<style lang="scss">
	@use '../../styles/variables' as *;

	.demo-toast {
		position: fixed;
		bottom: 28px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 400;
		display: flex;
		align-items: center;
		gap: 10px;
		background: $color-secondary;
		color: #fff;
		font-size: $font-size-sm;
		font-weight: 600;
		padding: 12px 20px;
		border-radius: $radius-full;
		box-shadow: 0 12px 32px rgba(0, 0, 0, 0.25);
		animation: toast-in 0.2s ease;
		white-space: nowrap;

		@media (max-width: 640px) {
			white-space: normal;
			text-align: center;
			width: calc(100% - 32px);
		}
	}

	.dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: $color-warm;
		flex-shrink: 0;
	}

	@keyframes toast-in {
		from { opacity: 0; transform: translate(-50%, 8px); }
		to { opacity: 1; transform: translate(-50%, 0); }
	}
</style>
