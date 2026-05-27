> **TL;DR:** The browser is the most hostile execution environment in software — your code runs on someone else's machine, under attacker control. The big four: **XSS, CSRF, CSP, token storage.**

## XSS — Cross-Site Scripting

Attacker JS executes in the victim's browser under your origin — total compromise: reads non-`HttpOnly` cookies, exfiltrates the DOM, makes authenticated requests as the user.

| Flavor | Mechanism |
|---|---|
| **Stored** | Payload saved server-side, served back to other users (an unsanitized comment field) |
| **Reflected** | Payload in the URL, echoed back unsanitized (`?q=<script>...`) |
| **DOM-based** | Injection happens entirely client-side, often via `innerHTML`/`eval` on user-controlled data |

**Defense:** React/Vue/Svelte/Angular escape interpolations by default — `<div>{userInput}</div>` is safe. Danger lives in the escape hatches: `dangerouslySetInnerHTML`, `v-html`, `{@html}`. Sanitize anything rendered through them with **DOMPurify**. **Trusted Types** (Chromium-based browsers — check caniuse.com for current Firefox/Safari status) enforces this at the runtime level via CSP — certain DOM sinks only accept pre-approved values.

## CSRF — Cross-Site Request Forgery

Cookies are *ambient authority* — sent automatically on every request to their origin, regardless of which page triggered it. A malicious site auto-submits a form to your bank; the victim's session cookie rides along.

| Defense | How |
|---|---|
| **`SameSite` cookies** | `Lax` (cross-site GET nav only, modern default) or `Strict` — defeats almost all classical CSRF |
| **CSRF tokens** | Server-issued random value, embedded in the page, sent back on state-changing requests — attacker's page can't read it (same-origin policy) |
| **Double-submit cookie** | Server sets a random cookie value; client must echo it in a header/field — works without server-side session state |

## CSP — Content Security Policy

The browser-level allowlist for what your page can load/execute. The strongest defense-in-depth against XSS — even an injected `<script>` gets blocked if it's not allowed.

```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{random}' 'strict-dynamic';
  frame-ancestors 'none';
  base-uri 'self';
```

- **Nonces** — a per-request random value on the header *and* every allowed inline script. Attacker-injected scripts won't have it.
- **`'strict-dynamic'`** — anything loaded by an already-trusted script is also trusted, so a bootstrap script can load third-party libs without listing each one.
- **`Content-Security-Policy-Report-Only`** — report violations without blocking, for rolling out a strict CSP safely.

**SRI (Subresource Integrity)** pins the expected hash of a CDN-hosted script — if the CDN is compromised and contents change, the browser refuses to execute it.

## Token storage — no perfect answer

| Storage | XSS exposure | Verdict |
|---|---|---|
| **`httpOnly` cookie** | JS can't read it — XSS can't exfiltrate | **Recommended default for 2026** |
| **`localStorage`** | JS-readable — one XSS bug = total compromise | Don't use for auth tokens |
| **`sessionStorage`** | Same exposure, tab-scoped | Same problem |
| **In-memory (JS var/state)** | Gone on reload/across tabs | Good for short-lived access tokens |

**The pragmatic recipe:** refresh token in `httpOnly; Secure; SameSite=Strict` cookie · access token in memory · on 401, hit the refresh endpoint · refresh proactively on tab open.

**JWT vs. session tokens:** a JWT is self-describing and signed — no DB lookup, but can't be revoked before expiry without a blacklist. A session token is an opaque string the server looks up — trivially revocable, needs a session store. Most apps: session tokens are simpler. JWTs shine passing identity between microservices.

## OAuth 2.0 / OIDC

| Flow | Use |
|---|---|
| **Authorization Code** | Server-rendered apps — code exchanged server-side with a client secret |
| **Implicit** | ❌ Deprecated — token in the URL fragment, vulnerable to theft. Don't use. |
| **Authorization Code + PKCE** | **Current best practice for SPAs/mobile** — no client secret needed, a `code_verifier`/`code_challenge` pair defeats interception |

`state` is a CSRF guard on the auth request; `nonce` is OIDC's replay guard inside the ID token.

## CORS

The browser's policy on cross-origin JS reads. A "simple request" (`GET`, form-encoded `POST`) goes directly; anything more (custom headers, `application/json`) triggers a **preflight** `OPTIONS` first. Credentialed requests (`credentials: "include"`) require an explicit, non-wildcard `Access-Control-Allow-Origin` plus `Allow-Credentials: true`.

⚠️ **CORS is not server-side auth** — the request was already processed; CORS just blocks the *client* from reading the response.

## The rest, briefly

- **HTTPS + HSTS everywhere.** Mixed content (HTTP resources on an HTTPS page) gets blocked (active) or warned (passive) by the browser.
- **Clickjacking:** `frame-ancestors 'none'` in CSP (preferred) or `X-Frame-Options`.
- **Open redirects:** validate `?next=` targets — same-origin only or an allowlist.
- **Dependency security:** `npm audit` in CI, Dependabot/Renovate, lock file always committed, `--ignore-scripts` in CI where possible.
- **No secrets in frontend code — ever.** Anything bundled or fetched into the browser is readable. `NEXT_PUBLIC_*`/`VITE_*` are public by convention; audit the rest.

## The shortlist that survives any code review

- [ ] Auto-escaping by default; DOMPurify anywhere you bypass it
- [ ] Auth tokens in `httpOnly`/`Secure`/`SameSite` cookies (or memory + refresh cookie), never `localStorage`
- [ ] CSP with `'strict-dynamic'` and nonces
- [ ] `frame-ancestors 'none'` unless embedding is required
- [ ] `SameSite=Lax`/`Strict` + CSRF token on mutations
- [ ] HTTPS-only with HSTS
- [ ] `npm audit` in CI, Dependabot/Renovate active
- [ ] OAuth via Authorization Code + PKCE only
