// app/(frontend)/robots.txt/route.ts
export const dynamic = 'force-dynamic';

export async function GET(): Promise<Response> {
  const cmsRobotsUrl =
    process.env.CMS_ROBOTS_URL ||
    `${process.env.BASE_DOAMAIN || 'https://mea-nova.vercel.app'}/my-route?slug=robots`;

  const TIMEOUT_MS = 5000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(cmsRobotsUrl, {
      cache: 'no-store', // always fresh
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error('robots fetch returned non-ok:', res.status);
    } else {
      const rawJson = await res.json().catch((e) => {
        console.error('Failed to parse robots JSON:', e);
        return null;
      });

      const robotsRaw =
        rawJson && typeof rawJson === 'object'
          ? (rawJson as { data?: { robots?: string } }).data?.robots
          : undefined;

      if (typeof robotsRaw === 'string' && robotsRaw.trim().length > 0) {
        const text = robotsRaw.trim();

        // Parse directives from a single messy line:
        // user-agent / allow / disallow / sitemap
        const directives: string[] = [];
        const re =
          /(user-agent|allow|disallow|sitemap)\s*:\s*([^]*?)(?=(user-agent|allow|disallow|sitemap)\s*:|$)/gi;

        let match: RegExpExecArray | null;
        while ((match = re.exec(text)) !== null) {
          const key = match[1].toLowerCase();
          const value = match[2].trim();

          let normalizedKey = '';
          switch (key) {
            case 'user-agent':
              normalizedKey = 'User-agent';
              break;
            case 'allow':
              normalizedKey = 'Allow';
              break;
            case 'disallow':
              normalizedKey = 'Disallow';
              break;
            case 'sitemap':
              normalizedKey = 'Sitemap';
              break;
          }

          directives.push(`${normalizedKey}: ${value}`);
        }

        const robotsContent =
          directives.length > 0 ? directives.join('\n') : text;

        console.log('robotsContent\n', robotsContent);

        return new Response(robotsContent, {
          headers: { 'Content-Type': 'text/plain' },
        });
      }
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      console.error('robots fetch aborted:', cmsRobotsUrl);
    } else {
      console.error('robots fetch error:', String(err));
    }
  } finally {
    clearTimeout(timeout);
  }

  // Fallback robots.txt
  const baseDomain = process.env.BASE_DOAMAIN || 'https://mea-nova.vercel.app';
  const fallback = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    `Sitemap: ${baseDomain}/sitemap.xml`,
  ].join('\n');

  return new Response(fallback, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
