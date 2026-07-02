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
		{
			icon: 'lightbulb' as const,
			color: '#169FDB',
			label: 'Starzenie się',
			desc: 'Informacje, procesy i wyzwania związane ze starzeniem się.',
			question: 'Jak przebiega naturalny proces starzenia się? Co się zmienia?'
		},
		{
			icon: 'heart' as const,
			color: '#1FA138',
			label: 'Relacje',
			desc: 'Budowanie i utrzymywanie relacji, bliskość, kontakty z innymi.',
			question: 'Jak nawiązać i utrzymać przyjacielską relację z osobą starszą?'
		},
		{
			icon: 'users' as const,
			color: '#F5A623',
			label: 'Samotność',
			desc: 'Rozumienie samotności, jej przyczyny i sposoby radzenia sobie.',
			question: 'Jaka jest skala problemu samotności seniorów w Polsce?'
		},
		{
			icon: 'shield' as const,
			color: '#E74C3C',
			label: 'Pomoc',
			desc: 'Gdzie szukać pomocy, jak wspierać siebie lub innych.',
			question: 'Gdzie mogę szukać pomocy dla samotnego seniora?'
		},
		{
			icon: 'message' as const,
			color: '#16A085',
			label: 'Rozmowa',
			desc: 'Jak rozmawiać o trudnych sprawach i gdzie szukać porad.',
			question: 'Jak zacząć rozmowę z osobą starszą, której nie znam?'
		},
		{
			icon: 'puzzle' as const,
			color: '#9B59B6',
			label: 'Pamięć',
			desc: 'Pamięć, koncentracja i wsparcie w codziennym funkcjonowaniu.',
			question: 'Jakie ćwiczenia pomagają utrzymać sprawność umysłową seniora?'
		}
	];

	const exampleQuestions = [
		'Czy smutek i apatia to normalna część starzenia się?',
		'Jak rozpoznać demencję u bliskiej osoby?',
		'Jestem opiekunem seniora i czuję się wyczerpany.',
		'Jak zostać wolontariuszem MBU?'
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
							<button class="topic-card" style="--c: {topic.color}" onclick={() => send(topic.question)}>
								<span class="topic-ic"><Icon name={topic.icon} size={20} color={topic.color} /></span>
								<span class="topic-h">{topic.label}</span>
								<span class="topic-p">{topic.desc}</span>
								<span class="topic-arrow"><Icon name="chevron-right" size={16} color="#C9D2DA" /></span>
							</button>
						{/each}
					</div>
				</div>

				<div class="welcome-section">
					<h2>Lub zadaj własne pytanie</h2>
					<div class="example-questions">
						{#each exampleQuestions as q}
							<button class="example-row" onclick={() => send(q)}>
								<span class="example-ic"><Icon name="message" size={15} color="#169FDB" /></span>
								<span class="example-text">„{q}"</span>
								<Icon name="chevron-right" size={16} color="#C9D2DA" />
							</button>
						{/each}
					</div>
				</div>

				<div class="welcome-note">
					<Icon name="shield" size={16} color="#8794A1" />
					<span>Nie diagnozuję medycznie — w przypadku wątpliwości zawsze sugeruję konsultację z lekarzem.</span>
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
			<button class="send-btn" onclick={() => send()} disabled={!input.trim() || loading} aria-label="Wyślij pytanie">
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
			font-family: $font-serif;
			font-size: 30px;
			font-weight: 700;
			letter-spacing: -0.01em;
			color: $color-secondary;
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
		background: linear-gradient(135deg, $color-primary, $color-primary-dark);
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

	.topic-card {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		gap: 4px;
		padding: $spacing-lg;
		border-radius: $radius;
		background: $color-bg-card;
		border: 1.5px solid $color-border;
		transition: all 0.15s ease;

		&:hover {
			border-color: var(--c, $color-primary);
			box-shadow: $shadow-sm;
			transform: translateY(-2px);
			.topic-arrow { opacity: 1; transform: translateX(2px); }
		}
	}

	.topic-ic {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--c, $color-primary) 14%, transparent);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 6px;
	}

	.topic-h { font-size: $font-size-base; font-weight: 700; color: $color-secondary; }
	.topic-p { font-size: 13px; color: $color-text-muted; line-height: 1.4; }

	.topic-arrow {
		position: absolute;
		bottom: $spacing-md;
		right: $spacing-md;
		opacity: 0;
		transition: all 0.15s ease;
	}

	.example-questions {
		display: flex;
		flex-direction: column;
		gap: $spacing-sm;
	}

	.example-row {
		display: flex;
		align-items: center;
		gap: $spacing-md;
		text-align: left;
		padding: $spacing-md $spacing-lg;
		border-radius: $radius;
		background: $color-bg-card;
		border: 1.5px solid $color-border;
		transition: all 0.15s ease;

		&:hover { border-color: $color-primary-light; box-shadow: $shadow-sm; }
	}

	.example-ic {
		width: 28px;
		height: 28px;
		border-radius: 50%;
		background: $color-primary-bg;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.example-text {
		flex: 1;
		font-size: $font-size-sm;
		color: $color-text;
		line-height: 1.4;
	}

	.welcome-note {
		display: flex;
		align-items: center;
		gap: $spacing-sm;
		padding: $spacing-md $spacing-lg;
		background: $color-bg-soft;
		border-radius: $radius-sm;
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
		background: linear-gradient(135deg, $color-primary, $color-primary-dark);
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
		background: $color-bg;
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
		background: $color-bg-card;
		border: 1px solid $color-border;
		border-radius: $radius-lg;
		padding: $spacing-sm;
		box-shadow: $shadow-sm;

		textarea {
			flex: 1;
			resize: none;
			border: none;
			border-radius: $radius;
			padding: 10px $spacing-sm;
			font-size: $font-size-base;
			max-height: 120px;
			background: transparent;

			&:focus { box-shadow: none; }
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
