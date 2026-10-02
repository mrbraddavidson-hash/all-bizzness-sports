# Shared footer

This plain static site has no build system, so the canonical footer markup lives in
`shared/site-footer.html`. The sync script injects that real HTML into the public
pages that use the shared footer:

- `dist/index.html`
- `dist/404.html`
- `dist/about/index.html`
- `dist/contact/index.html`
- `dist/privacy/index.html`
- `dist/terms/index.html`

Run this from the project root after changing the partial:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\sync-footer.ps1
```

The footer CSS is in `dist/styles.css` and uses the site's theme variables
(`--brand-bg`, `--brand-surface`, `--brand-text`, `--brand-muted`,
`--brand-accent`, and `--brand-line`). No iframe or tracker is involved.

The project does not have a verified All Bizzness Sports contact email, so the
legal notices use the existing official Facebook page as the public contact
route and do not invent an email address. The privacy and terms pages are
site-specific drafts at `/privacy/` and `/terms/`; review them with appropriate
legal counsel before treating them as legal advice.
