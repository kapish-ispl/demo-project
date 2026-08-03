const API_BASE = process.env.NEXT_PUBLIC_API_PROXY_URL || 'https://api.jindalsteelpower.com';

export const GET_MENU_ENDPOINT = `${API_BASE}/v1/menu/get`;
export const GET_SPECIFIC_PAGE_ENDPOINT = `${API_BASE}/v1/page/get`;
export const GET_ALL_PAGE_ENDPOINT = `${API_BASE}/v1/page/get-all`;
export const GET_CONTENT_BLOCK_ENDPOINT = `${API_BASE}/v1/content-block/get`;
export const GET_POST_ENDPOINT = `${API_BASE}/v1/post/get-all`;
export const HEADER_MENU_ENDPOINT = `header-main-menu`;
export const FOOTER_MENU_ENDPOINT = `footer-bottom-menu`;
export const FOOTER_CONTENT_BLOCK_ENDPOINT = `footerv2`;
export const POST_FORM_ENDPOINT = `${API_BASE}/v1/form/save`;
