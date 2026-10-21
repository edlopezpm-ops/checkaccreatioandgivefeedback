// Review-only local response fixture. Never install on a public origin.
// This enables frontend inspection; it proves no account/backend behavior.
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export async function installReviewFixture(page, { authenticated = true } = {}) {
  const base = 'http://localhost:5173';
  await page.route(`${base}/api/**`, async route => {
    const url = new URL(route.request().url());
    const json = (status, body) => route.fulfill({status, contentType: 'application/json', body: JSON.stringify(body)});
    if (url.pathname === '/api/auth/v1/methods') return json(200, {
      version: 'auth.v1', methods: {google: {available: false}, emailOtp: {available: true}},
    });
    if (url.pathname.startsWith('/api/account/')) {
      if (!authenticated) return json(401, {error: {code: 'sign_in_required', message: 'Sign in to continue.'}});
      let operationId;
      try { operationId = route.request().postDataJSON()?.operationId; } catch {}
      return json(200, {
        email: 'independent-review@example.test',
        policyAuthorizationRequired: false,
        expiresAt: new Date(Date.now() + 86400000).toISOString(), remaining: 5, nextAvailableAt: null,
        ...(operationId ? {operationId, issuedAt: new Date().toISOString()} : {}),
      });
    }
    if (url.pathname === '/api/blog/posts') {
      const content = JSON.parse(await readFile(path.resolve('content/blog/founding-posts.json'), 'utf8'));
      return json(200, {posts: content.posts});
    }
    if (url.pathname === '/api/admin/blog/session') return json(200, {actor: null, canPublish: false});
    return json(404, {error: {code: 'review_fixture_not_implemented'}});
  });
}
