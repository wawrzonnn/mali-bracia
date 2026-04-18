<script lang="ts">
	import Icon from '$lib/components/Icon.svelte';
	import { browser } from '$app/environment';

	interface Message {
		role: 'user' | 'assistant';
		content: string;
	}

	let messages = $state<Message[]>([]);
	let input = $state('');
	let loading = $state(false);
	let chatContainer: HTMLDivElement | undefined = $state();

	const quickTopics = [
		{ icon: 'brain' as const, label: 'Starzenie się', question: 'Jak przebiega naturalny proces starzenia się? Co się zmienia?' },
		{ icon: 'heart' as const, label: 'Relacje', question: 'Jak nawiązać i utrzymać przyjacielską relację z osobą starszą?' },
		{ icon: 'users' as const, label: 'Samotność', question: 'Jaka jest skala problemu samotności seniorów w Polsce?' },
		{ icon: 'shield' as const, label: 'Pomoc', question: 'Gdzie mogę szukać pomocy dla samotnego seniora?' },
		{ icon: 'message' as const, label: 'Rozmowa', question: 'Jak zacząć rozmowę z osobą starszą, której nie znam?' },
		{ icon: 'puzzle' as const, label: 'Pamięć', question: 'Jakie ćwiczenia pomagają utrzymać sprawność umysłową seniora?' }
	];

	async function send(text?: string) {
		if (!browser) return;
		const msg = text ?? input.trim();
		if (!msg || loading) return;

		input = '';
		messages = [...messages, { role: 'user', content: msg }];
		loading = true;

		try {
			const res = await fetch('/api/chat', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					messages: messages.map((m) => ({ role: m.role, content: m.content }))
				})
			});
			const data = await res.json();
			messages = [...messages, { role: 'assistant', content: data.reply }];
		} catch {
			messages = [...messages, { role: 'assistant', content: 'Przepraszam, wystąpił błąd. Spróbuj ponownie.' }];
		} finally {
			loading = false;
			requestAnimationFrame(() => {
				chatContainer?.scrollTo({ top: chatContainer.scrollHeight, behavior: 'smooth' });
			});
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			send();
		}
	}
</script>

<div class="chat-page">
	<div class="chat-messages" bind:this={chatContainer}>
		{#if messages.length === 0}
			<div class="welcome">
				<div class="welcome-hero">
					<div class="welcome-avatar">
						<Icon name="sparkle" size={32} color="white" />
					</div>
					<h1>Asystent Bazy Wiedzy MBU</h1>
					<p>Witaj! Jestem tu, aby pomóc Ci zrozumieć tematy związane ze starzeniem się, samotnością seniorów i wsparciem. Odpowiadam na podstawie materiałów Stowarzyszenia Mali Bracia Ubogich.</p>
				</div>

				<div class="welcome-section">
					<h2>W czym mogę Ci pomóc?</h2>
					<div class="topics-grid">
						{#each quickTopics as topic}
							<button class="topic-btn" onclick={() => send(topic.question)}>
								<div class="topic-icon">
									<Icon name={topic.icon} size={20} color="#169FDB" />
								</div>
								<span>{topic.label}</span>
							</button>
						{/each}
					</div>
				</div>

				<div class="welcome-section">
					<h2>Lub zadaj własne pytanie</h2>
					<div class="example-questions">
						<button class="example-btn" onclick={() => send('Czy smutek i apatia to normalna część starzenia się?')}>
							"Czy smutek i apatia to normalna część starzenia się?"
						</button>
						<button class="example-btn" onclick={() => send('Jak rozpoznać demencję u bliskiej osoby?')}>
							"Jak rozpoznać demencję u bliskiej osoby?"
						</button>
						<button class="example-btn" onclick={() => send('Jestem opiekunem seniora i czuję się wyczerpany. Co mogę zrobić?')}>
							"Jestem opiekunem seniora i czuję się wyczerpany."
						</button>
						<button class="example-btn" onclick={() => send('Jak zostać wolontariuszem Mali Bracia Ubogich?')}>
							"Jak zostać wolontariuszem MBU?"
						</button>
					</div>
				</div>

				<div class="welcome-note">
					<Icon name="shield" size={16} color="#5A6B7A" />
					<span>Nie diagnozuję medycznie -- w przypadku wątpliwości zawsze sugeruję konsultację z lekarzem.</span>
				</div>
			</div>
		{/if}

		{#each messages as msg}
			<div class="message" class:user={msg.role === 'user'} class:assistant={msg.role === 'assistant'}>
				{#if msg.role === 'assistant'}
					<div class="msg-avatar">
						<Icon name="sparkle" size={16} color="white" />
					</div>
				{/if}
				<div class="msg-bubble">
					{msg.content}
				</div>
			</div>
		{/each}

		{#if loading}
			<div class="message assistant">
				<div class="msg-avatar">
					<Icon name="sparkle" size={16} color="white" />
				</div>
				<div class="msg-bubble typing">
					<span></span><span></span><span></span>
				</div>
			</div>
		{/if}
	</div>

	<div class="chat-input-area">
		<div class="input-wrap">
			<textarea
				bind:value={input}
				onkeydown={handleKeydown}
				placeholder="Napisz swoje pytanie..."
				rows={1}
				disabled={loading}
			></textarea>
			<button class="send-btn" onclick={() => send()} disabled={!input.trim() || loading}>
				<Icon name="send" size={20} color="white" />
			</button>
		</div>
		<p class="input-hint">Enter = wyślij. Shift+Enter = nowa linia.</p>
	</div>
</div>

<style lang="scss">
	@use 'variables' as *;

	.chat-page {
		display: flex;
		flex-direction: column;
		height: 100dvh;
		background: $color-bg;
	}

	.chat-messages {
		flex: 1;
		overflow-y: auto;
		padding: $spacing-lg;
		display: flex;
		flex-direction: column;
		gap: $spacing-md;
	}

	/* ─── WELCOME ─── */
	.welcome {
		max-width: 760px;
		margin: 0 auto;
		width: 100%;
	}

	.welcome-hero {
		text-align: center;
		padding: $spacing-2xl 0 $spacing-xl;

		h1 {
			font-size: $font-size-xl;
			font-weight: 800;
			margin: $spacing-md 0 $spacing-sm;
		}

		p {
			font-size: $font-size-sm;
			color: $color-text-muted;
			line-height: 1.6;
			max-width: 480px;
			margin: 0 auto;
		}
	}

	.welcome-avatar {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, #0D7AB5);
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 20px rgba($color-primary, 0.3);
	}

	.welcome-section {
		margin-bottom: $spacing-xl;

		h2 {
			font-size: $font-size-sm;
			font-weight: 700;
			color: $color-text-muted;
			text-transform: uppercase;
			letter-spacing: 0.5px;
			margin-bottom: $spacing-md;
		}
	}

	.topics-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: $spacing-sm;

		@media (max-width: 600px) {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	.topic-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: $spacing-sm;
		padding: $spacing-lg $spacing-md;
		border-radius: $radius;
		background: $color-bg-card;
		border: 1.5px solid $color-border;
		transition: all 0.15s ease;

		&:hover {
			border-color: $color-primary;
			background: $color-primary-bg;
			transform: translateY(-1px);
			box-shadow: $shadow-sm;
		}

		span {
			font-size: $font-size-sm;
			font-weight: 600;
			color: $color-text;
		}
	}

	.topic-icon {
		width: 44px;
		height: 44px;
		border-radius: $radius-sm;
		background: $color-primary-bg;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.example-questions {
		display: grid;
		gap: $spacing-sm;
	}

	.example-btn {
		text-align: left;
		padding: $spacing-md $spacing-lg;
		border-radius: $radius;
		background: $color-bg-card;
		border: 1.5px solid $color-border;
		font-size: $font-size-sm;
		color: $color-text-muted;
		font-style: italic;
		line-height: 1.4;
		transition: all 0.15s ease;

		&:hover {
			border-color: $color-primary;
			color: $color-primary;
			background: $color-primary-bg;
		}
	}

	.welcome-note {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
		padding: $spacing-md;
		background: $color-bg-card;
		border-radius: $radius-sm;
		border: 1px solid $color-border;
		font-size: $font-size-xs;
		color: $color-text-muted;
	}

	/* ─── MESSAGES ─── */
	.message {
		display: flex;
		gap: $spacing-sm;
		align-items: flex-start;
		max-width: 760px;
		margin: 0 auto;
		width: 100%;

		&.user { justify-content: flex-end; }
	}

	.msg-avatar {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: linear-gradient(135deg, $color-primary, #0D7AB5);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.msg-bubble {
		max-width: 75%;
		padding: $spacing-md $spacing-lg;
		border-radius: $radius;
		font-size: $font-size-sm;
		line-height: 1.65;
		white-space: pre-wrap;

		.user & {
			background: $color-primary;
			color: white;
			border-bottom-right-radius: 4px;
		}

		.assistant & {
			background: $color-bg-card;
			border: 1px solid $color-border;
			border-bottom-left-radius: 4px;
		}
	}

	.typing {
		display: flex;
		gap: 5px;
		padding: $spacing-md $spacing-lg;

		span {
			width: 8px;
			height: 8px;
			border-radius: 50%;
			background: $color-text-muted;
			animation: bounce 1.2s infinite;

			&:nth-child(2) { animation-delay: 0.2s; }
			&:nth-child(3) { animation-delay: 0.4s; }
		}
	}

	@keyframes bounce {
		0%, 60%, 100% { transform: translateY(0); }
		30% { transform: translateY(-6px); }
	}

	/* ─── INPUT ─── */
	.chat-input-area {
		padding: $spacing-md $spacing-lg;
		border-top: 1px solid $color-border;
		background: $color-bg-card;
		max-width: 760px;
		margin: 0 auto;
		width: 100%;

		@media (max-width: 768px) {
			max-width: 100%;
			padding: $spacing-md;
		}
	}

	.input-wrap {
		display: flex;
		gap: $spacing-sm;
		align-items: flex-end;

		textarea {
			flex: 1;
			resize: none;
			border-radius: $radius;
			padding: 14px $spacing-md;
			font-size: $font-size-base;
			max-height: 120px;
			background: $color-bg;
		}
	}

	.send-btn {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		background: $color-primary;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		transition: all 0.15s;
		box-shadow: 0 2px 8px rgba($color-primary, 0.3);

		&:hover:not(:disabled) { filter: brightness(1.1); transform: scale(1.04); }
		&:disabled { opacity: 0.35; cursor: not-allowed; box-shadow: none; }
	}

	.input-hint {
		font-size: 11px;
		color: $color-text-muted;
		text-align: center;
		margin-top: 6px;
		opacity: 0.6;
	}
</style>
