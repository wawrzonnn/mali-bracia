<footer class="footer">
	<div class="wrap footer-grid">
		<div class="footer-org">
			<div class="footer-brand">
				<span class="brand-badge">m</span>
				<span class="footer-brand-name">mali bracia Ubogich</span>
			</div>
			<p class="footer-addr">
				Stowarzyszenie mali bracia Ubogich · Organizacja Pożytku Publicznego<br />
				ul. Gen. Wł. Andersa 13, 00-159 Warszawa<br />
				KRS 0000160750
			</p>
		</div>
		<div class="footer-col">
			<div class="footer-col-title">Poznaj</div>
			<a href="/wiedza">Baza wiedzy</a>
			<a href="/cwiczenia">Ćwiczenia</a>
			<a href="/sprawdz-sygnaly">Sprawdź sygnały</a>
			<a href="/asystent">Asystent AI</a>
		</div>
		<div class="footer-col">
			<div class="footer-col-title">Wsparcie</div>
			<a href="/1-procent">Przekaż 1,5% podatku</a>
			<a href="/dolacz?sciezka=wsparcie">Wspieraj co miesiąc</a>
			<a href="tel:+48608018110">Telefon Zaufania</a>
		</div>
	</div>
	<div class="footer-bottom-line">
		<div class="wrap footer-bottom">© 2026 mali bracia Ubogich · Konto: 13 1600 1462 1818 9539 9000 0001</div>
	</div>
</footer>

<style lang="scss">
	.wrap {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 24px;
	}

	.footer { background: var(--rd-ink-2); color: var(--rd-muted-dark); font-size: 14.5px; }
	.footer-grid { padding: 64px 24px 40px; display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 40px; }
	.footer-brand { display: flex; align-items: center; gap: 11px; margin-bottom: 18px; }
	.brand-badge {
		width: 38px;
		height: 38px;
		border-radius: 10px;
		background: var(--rd-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-family: 'Newsreader', serif;
		font-size: 21px;
		font-weight: 600;
		flex-shrink: 0;
	}
	.footer-brand-name { font-family: 'Newsreader', serif; font-size: 19px; font-weight: 600; color: #f1e8da; }
	.footer-addr { line-height: 1.65; margin: 0; max-width: 26em; }
	.footer-col-title { font-weight: 600; color: #f1e8da; margin-bottom: 14px; }
	.footer-col {
		display: flex;
		flex-direction: column;
		gap: 10px;
		a { text-decoration: none; color: var(--rd-muted-dark); &:hover { color: #f1e8da; } }
	}
	.footer-bottom-line { border-top: 1px solid var(--rd-border-dark-2); }
	.footer-bottom { padding: 20px 24px; font-size: 13px; color: var(--rd-faint-dark); }

	@media (max-width: 768px) {
		.wrap { padding: 0 16px; }
		.footer-grid { grid-template-columns: 1fr; gap: 32px; padding: 48px 16px 32px; }
	}
</style>
