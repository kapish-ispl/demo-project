// All API endpoints point directly to the external API base.
// - Server Components (page.tsx, generateMetadata, etc.) call these directly
//   with auth headers added server-side in getServerSideRender.ts.
// - Client Components (use client) call /api/proxy instead, which forwards
//   the request to these URLs with auth headers injected server-side.
const API_BASE = process.env.API_PROXY_URL || 'https://api.jindalsteelpower.com';

export const GET_MENU_ENDPOINT = `${API_BASE}/v1/menu/get`;
export const GET_SPECIFIC_PAGE_ENDPOINT = `${API_BASE}/v1/page/get`;
export const GET_ALL_PAGE_ENDPOINT = `${API_BASE}/v1/page/get-all`;
export const GET_CONTENT_BLOCK_ENDPOINT = `${API_BASE}/v1/content-block/get`;
export const GET_POST_ENDPOINT = `${API_BASE}/v1/post/get-all`;
export const HEADER_MENU_ENDPOINT = `header-main-menu`;
export const FOOTER_MENU_ENDPOINT = `footer-bottom-menu`;
export const FOOTER_CONTENT_BLOCK_ENDPOINT = `footerv2`;
export const POST_FORM_ENDPOINT = `${API_BASE}/v1/form/save`;

// export const GET_MENU_ENDPOINT = `${API_URL}/v1/menu/get`;
// export const GET_SPECIFIC_PAGE_ENDPOINT = `${API_URL}/v1/page/get`;
// export const GET_CONTENT_BLOCK_ENDPOINT = `${API_URL}/v1/content-block/get`;
// export const GET_POST_ENDPOINT = `${API_URL}/v1/post/get-all`;
// export const HEADER_MENU_ENDPOINT = `header-main-menu`;
// export const FOOTER_MENU_ENDPOINT = `footer-bottom-menu`;
// export const FOOTER_CONTENT_BLOCK_ENDPOINT = `footerv2`;
// export const POST_FORM_ENDPOINT = `${API_URL}/v1/form/save`;
