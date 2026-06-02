"use client";

import { serverRequest } from "@/services/getServerSideRender";
import { GET_ALL_PAGE_ENDPOINT, GET_MENU_ENDPOINT } from "@/config/apiConfig";
import { ReactNode, createContext, useState, useEffect } from "react";
import { CONSTANTS } from "@/config/constant";
import AOS from "aos";

type contextType = {
    headerMenu: any[];
    footerMenu: any[];
    allPageData: any[];
    menuType: string;
};

export const AppContext = createContext<contextType>({
    headerMenu: [],
    footerMenu: [],
    allPageData: [],
    menuType: "",
});

const AppContextProvider = ({ children }: { children: ReactNode }) => {

    const [headerMenu, setHeaderMenu] = useState<any[]>([]);
    const [footerMenu, setFooterMenu] = useState<any[]>([]);
    const [allPageData, setAllPageData] = useState<any[]>([]);
    const [menuType, setMenuType] = useState("page");


    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    useEffect(() => {
        //Fetch data from API
        const perRequiredRequest = async () => {
            const getHeaderMenu = await serverRequest(
                {},
                `${GET_MENU_ENDPOINT}?slug=${CONSTANTS.HEADER_MENU_SLUG}`,
                CONSTANTS.REQUEST_GET, 'client'
            );
            if (getHeaderMenu && getHeaderMenu.code == CONSTANTS.STATUS_SUCCESS) {
                setHeaderMenu(getHeaderMenu.data);
            } else {
                setHeaderMenu([]);
            }

            const getFooterMenu = await serverRequest({}, `${GET_MENU_ENDPOINT}?slug=${CONSTANTS.FOOTER_MENU_SLUG}`, CONSTANTS.REQUEST_GET, 'client');
            if (getFooterMenu && getFooterMenu.code == CONSTANTS.STATUS_SUCCESS) {
                setFooterMenu(getFooterMenu.data);
            } else {
                setFooterMenu([]);
            }
            const getAllPageData = await serverRequest({}, `${GET_ALL_PAGE_ENDPOINT}`, CONSTANTS.REQUEST_GET, 'client');
            if (getAllPageData && getAllPageData.code == CONSTANTS.STATUS_SUCCESS) {
                setAllPageData(getAllPageData.data);
            } else {
                setAllPageData([]);
            }
            // const getProducts = await serverRequest({}, `${GET_POST_ENDPOINT}?slug=product`, CONSTANTS.REQUEST_GET);
            // setProductData(getProducts);
        };
        perRequiredRequest();
    }, []);
    const values = { headerMenu, footerMenu, menuType, setMenuType, allPageData };
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;


