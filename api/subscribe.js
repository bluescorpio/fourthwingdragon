// Vercel Serverless Function. Receives { email } from SubscribeForm,
// forwards it to Kit's form endpoint server-side so no API key reaches the browser.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Public form action behind the embed uid 05d532a6e0. Verified 2026-10-28: POST returns 302.
const DEFAULT_ENDPOINT = 'https://app.kit.com/forms/10108140/subscriptions';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const endpoint = process.env.KIT_FORM_ENDPOINT || DEFAULT_ENDPOINT;
  if (!endpoint) {
    return res.status(500).json({ ok: false, error: 'missing_endpoint' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }
  const email = (body && body.email ? String(body.email) : '').trim();

  if (!EMAIL.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  try {
    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ email_address: email }).toString(),
      // Kit returns 302 to /forms/success, and that page 404s without a session.
      // Following the redirect would treat a successful signup as a failure.
      redirect: 'manual',
    });

    // Kit success is 200 or 3xx. 4xx is a real rejection.
    if (upstream.status >= 400) {
      return res.status(502).json({ ok: false, error: 'upstream_rejected' });
    }
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false, error: 'upstream_unreachable' });
  }
}
