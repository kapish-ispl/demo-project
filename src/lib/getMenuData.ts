import { serverRequest } from "@/services/getServerSideRender";
import { GET_MENU_ENDPOINT } from "@/config/apiConfig";
import { CONSTANTS } from "@/config/constant";

export async function getMenuData() {
    const [headerRes, footerRes] = await Promise.all([
        serverRequest({}, `${GET_MENU_ENDPOINT}?slug=${CONSTANTS.HEADER_MENU_SLUG}`, CONSTANTS.REQUEST_GET, 'server'),
        serverRequest({}, `${GET_MENU_ENDPOINT}?slug=${CONSTANTS.FOOTER_MENU_SLUG}`, CONSTANTS.REQUEST_GET, 'server'),
    ]);

    return {
        headerMenu: headerRes?.code === CONSTANTS.STATUS_SUCCESS ? headerRes.data : [],
        footerMenu: footerRes?.code === CONSTANTS.STATUS_SUCCESS ? footerRes.data : []
    };
}
