> **TL;DR:** Security is a property of the whole system — one weak link compromises everything behind it. Assume hostility: assume inputs are malicious, the network is watched, and some component will be breached, then design so each assumption being true does the least damage.

## Authentication vs. authorization

| | Question | Order |
|---|---|---|
| **Authentication (authn)** | Who are you? | First |
| **Authorization (authz)** | What are you allowed to do? | Second, against *this specific resource* |

⚠️ **Broken object-level authorization** — checking "are you logged in" but not "is this resource yours" — is one of the most common serious vulnerabilities in real APIs.

## Sessions vs. tokens

| | Sessions | Tokens (JWT) |
|---|---|---|
| State | Server-side (Redis/DB) | Self-contained, stateless |
| Revocation | **Instant** — delete the session | **Hard** — valid until expiry, no record to delete |
| Scale | Needs a shared store + lookup per request | Scales naturally, no per-request DB hit |
| Mitigation for weakness | — | Short-lived access token + longer refresh token + denylist for emergencies (which quietly reintroduces server state) |

⚠️ A JWT's claims are readable by anyone (signed, not encrypted) — never put secrets in it. Reject `alg: none`.

> "Stateless JWT everywhere" is a cargo-cult default. Choose by whether *instant revocation* or *stateless scale* matters more.

**OAuth 2.0** = delegated *authorization* ("let this app read your contacts," no password shared). **OpenID Connect** = *authentication* layer on top ("Sign in with Google"). Don't hand-roll either — use a vetted library.

## Authorization models

| Model | Basis | Tradeoff |
|---|---|---|
| **RBAC** | Roles (admin/editor/viewer) | Simple, common — struggles with context-dependent rules |
| **ABAC** | Attributes of user/resource/action/environment | Expressive — harder to manage/audit |
| **ReBAC** | Relationships in a graph (Google Zanzibar model) | Powerful for sharing semantics |

Underneath all of them: **principle of least privilege** — minimum access needed, nothing more. Doesn't prevent breaches; *contains* them.

## Password storage and secrets

- **Never plaintext.** Never fast/general hashes (MD5, SHA-256) — attackers try billions of guesses/sec.
- **Use argon2, bcrypt, or scrypt** — deliberately slow and memory-hard.
- **Salt every password** — defeats rainbow tables, modern hash functions handle it for you.
- **Support MFA.**

Secrets: never commit to source control (compromised *permanently*, even after deletion — lives in git history), never hard-code, use a secrets manager (Vault, AWS Secrets Manager) with rotation, inject at runtime.

## Encryption

| | Protects | Mechanism |
|---|---|---|
| **In transit** | Data moving over the network | TLS — *everywhere*, including service-to-service internally |
| **At rest** | Stored data (DB, disk, backups) | Enabled by most managed services — turn it on |

**Key management** is the hard part — keys live in a dedicated KMS, never alongside the data they protect. Encryption is reversible (for data you read back); hashing is one-way (for verification, like passwords). Using one where you need the other is a classic mistake.

## OWASP Top 10 — backend-relevant

| Risk | The fix |
|---|---|
| **Injection** (SQL, command, NoSQL) | **Parameterized queries, always.** Never string-concatenate a query. An ORM's raw-query escape hatch reintroduces the risk. |
| **Broken access control** (IDOR) | Authorize *every* request server-side against the specific resource — the client can't be trusted to enforce this |
| **Cryptographic failures** | The password/encryption practices above |
| **Security misconfiguration** | Hardened defaults, minimal exposed surface, config reviewed as part of deployment |
| **Vulnerable/outdated components** | Automated dependency scanning in CI (Dependabot, Snyk), patch promptly |
| **SSRF** | Allowlist outbound request destinations — never fetch an arbitrary user-supplied URL unchecked |

```sql
-- Vulnerable
"SELECT * FROM users WHERE email = '" + input + "'"
-- Safe — input is data, never code
"SELECT * FROM users WHERE email = $1"
```

## Input validation

**Never trust input** — from users, clients, or other services.

- Validate at the boundary — type, format, length, range.
- **Allowlist over denylist** — a denylist always misses a case.
- **Validate on the server, always** — client-side validation is a UX convenience, nothing more.
- Encode output for its destination — HTML, SQL, shell, URL each need their own escaping. Data from your *own* database can carry a planted attack (stored XSS) — don't trust stored data either.

## API security checklist

Authenticate + authorize every endpoint · rate-limit · validate every input · TLS everywhere · never leak internals in errors (clean error + request ID, log the stack trace server-side) · security headers (CSP, HSTS) · deliberate CORS config · CSRF protection for cookie-based auth.

## Defense in depth

**Never rely on a single security control.** Layer them so one layer's failure is caught by another — network controls, *and* auth, *and* authz, *and* input validation, *and* encryption, *and* least privilege, *and* monitoring. A single perfect wall is a fantasy; many imperfect walls, each catching what the last missed, is a real defense.

**What every backend engineer must do:** internalize the mindset, get the fundamentals right (parameterized queries, proper password hashing, TLS everywhere, authorize every request, manage secrets, scan dependencies), use vetted libraries instead of hand-rolling auth/crypto, and involve security specialists for anything high-stakes. The fundamentals here prevent the *common* breaches — the overwhelming majority.
