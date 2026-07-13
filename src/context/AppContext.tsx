/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ReactNode, createContext, useState, useEffect } from "react";
import AOS from "aos";

type contextType = {
    headerMenu: any[];
    footerMenu: any[];
    menuType: string;
};

export const AppContext = createContext<contextType>({
    headerMenu: [],
    footerMenu: [],
    menuType: "",
});

type AppContextProviderProps = {
    children: ReactNode;
    initialHeaderMenu?: any[];
    initialFooterMenu?: any[];
};

const AppContextProvider = ({
    children,
    initialHeaderMenu = [],
    initialFooterMenu = [],
}: AppContextProviderProps) => {

    const [headerMenu] = useState<any[]>(initialHeaderMenu);
    const [footerMenu] = useState<any[]>(initialFooterMenu);
    const [menuType, setMenuType] = useState("page");


    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);


    const values = { headerMenu, footerMenu, menuType, setMenuType, };
    return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppContextProvider;


