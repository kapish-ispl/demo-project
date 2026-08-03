/* eslint-disable @typescript-eslint/no-explicit-any */
import { CONSTANTS } from '@/config/constant';
import { KEYS } from '@/config/key';

/**
 * Unified API request function.
 *
 * - requestType = 'server': Called from React Server Components / generateMetadata.
 *   Runs on the server, so auth headers are attached directly and securely.
 *
 * - requestType = 'client': Called from "use client" components (AppContext, etc.).
 *   Routes through /api/proxy — the browser never sees the auth token or API key.
 */
export async function serverRequest(request: any, url: string, methodName: string, requestType: 'client' | 'server' = 'client'): Promise<any> {
  try {
    let response: Response;

    if (requestType === 'server') {
      // ── Server-side path ──────────────────────────────────────────────────────
      // Running in a React Server Component — auth headers are safe to attach here.
      const requestHeaders = buildServerHeaders();

      if (methodName === CONSTANTS.REQUEST_GET) {
        response = await fetch(url, {
          method: 'GET',
          headers: requestHeaders,
          cache: 'no-store',
        });
      } else {
        response = await fetch(url, {
          method: methodName,
          headers: requestHeaders,
          body: JSON.stringify(request),
        });
      }
    } else {
      // ── Client-side path ──────────────────────────────────────────────────────
      // Strip the external API base from the URL to get just the path + query,
      // then call /api/proxy/<path>?<query> with the real HTTP method.
      // The browser only sees /api/proxy/... — auth headers are added server-side.
      const externalBase = process.env.NEXT_PUBLIC_API_PROXY_URL || 'https://api.jindalsteelpower.com';
      const pathAndQuery = url.replace(externalBase, '');
      const proxyUrl = `/api/proxy${pathAndQuery}`;

      if (methodName === CONSTANTS.REQUEST_GET) {
        response = await fetch(proxyUrl, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });
      } else {
        response = await fetch(proxyUrl, {
          method: methodName,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        });
      }
    }

    const json = await response.json();

    if (json?.errors?.length > 0 && json.errors[0]?.message) {
      console.warn('API Error:', json.errors[0].message);
    }

    if (json && json.code === 'SUC200') {
      return {
        ...json,
        data: json.data,
      };
    }

    return json;
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      error: true,
      message: 'Something went wrong while fetching data.',
    };
  }
}

/**
 * Build secure headers for server-side requests only.
 * NEXT_PUBLIC_API_TOKEN and NEXT_PUBLIC_API_NETWORK_GUID are server-only env vars.
 */
export function buildServerHeaders(): Record<string, string> {
  return {
    [KEYS.CONTENT_TYPE]: CONSTANTS.FORMAT,
    [KEYS.ACCEPT_TYPE]: CONSTANTS.FORMAT,
    [KEYS.ACCEPT_LANGUAGE]: CONSTANTS.LANGUAGE_ENGLISH,
    [KEYS.X_AUTHORIZATION_TOKEN]: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN || ''}`,
    [KEYS.X_NETWORK_GUID]: process.env.NEXT_PUBLIC_API_NETWORK_GUID || '',
  };
}
