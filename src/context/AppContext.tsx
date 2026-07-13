/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, createContext, useState, useEffect } from "react";
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

type AppContextProviderProps = {
    children: ReactNode;
    initialHeaderMenu?: any[];
    initialFooterMenu?: any[];
    initialAllPageData?: any[];
};

const AppContextProvider = ({
    children,
    initialHeaderMenu = [],
    initialFooterMenu = [],
    initialAllPageData = [],
}: AppContextProviderProps) => {

    const [headerMenu] = useState<any[]>(initialHeaderMenu);
    const [footerMenu] = useState<any[]>(initialFooterMenu);
    const [allPageData] = useState<any[]>(initialAllPageData);
    const [menuType, setMenuType] = useState("page");


    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);


    const values = { headerMenu, footerMenu, allPageData, menuType, setMenuType, };
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;


