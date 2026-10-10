<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the branded footer in its own site component and share logo/contact data with the rest of the site, so presentation changes do not alter ordering rules.
- Site motion must honor reduced-motion preferences; keep decorative effects in global styles and scroll animations in the existing motion library.

- All visible text lives in src/locales/{fr,ar}/translation.json and is read via useI18n() from src/i18n/context; never hardcode copy in components (keeps FR/AR in sync, RTL handled by the provider).
- Keep src/i18n/index.tsx exporting only the LanguageProvider component, with every non-component export (context, hook, language list, dictionaries) in src/i18n/context.ts, and mount the provider once in the root route — a module that mixes components with values cannot be hot-swapped, which leaves consumers with a stale context and a blank page. useI18n() falls back to French rather than throwing when no provider is mounted.
