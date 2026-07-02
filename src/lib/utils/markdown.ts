function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
}

/**
 * Bardzo lekki, bezpieczny renderer markdown dla odpowiedzi asystenta AI.
 * Model często formatuje odpowiedzi w markdown (**pogrubienie**, listy),
 * a interfejs pokazywał to jako zwykły tekst z gwiazdkami.
 * Wejście jest najpierw escape'owane, więc dopisywane tagi to jedyny HTML.
 */
export function renderChatMarkdown(text: string): string {
	let safe = escapeHtml(text);

	// pogrubienie: **tekst**
	safe = safe.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
	// kursywa: *tekst* (pojedyncza gwiazdka, po usunięciu pogrubień powyżej)
	safe = safe.replace(/\*([^*]+?)\*/g, '<em>$1</em>');
	// linie zaczynające się od "- " lub "* " jako elementy listy
	safe = safe.replace(/(^|\n)[-*] (.+)/g, '$1• $2');
	// nowe linie
	safe = safe.replace(/\n/g, '<br>');

	return safe;
}
