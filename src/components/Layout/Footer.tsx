"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
import { AppContext } from '@/context/AppContext';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const contextInfo = useContext(AppContext);

    const FOOTER_MAIN_MENU: any = contextInfo.footerMenu;
    return (
        <>
            <footer className='bg-gray'>
                <div className="c-footer">
                    <div className="container cus-container">
                        <div className="row">
                            <div className="col-12 col-lg-2">
                                <div className="c-footer__info">
                                    <div className="c-footer__info-logo me-4">
                                        <Link href="/" className="footer-link d-block" target="_blank">
                                            <Image
                                                src='/images/logo/jindal-cement-logo-black.svg'
                                                alt="jindal steel logo"
                                                width={200}
                                                height={76}
                                                className="img-fluid u-img" />
                                        </Link>
                                    </div>
                                    <div className="c-footer__info-content flex-column align-items-start">
                                        {/* <div className="head c-content-19">Connect with us</div> */}
                                        {/* <div className="socialMenu">
                                            <ul className="social__wrapper">
                                                <li className="social__wrapper--item"><Link href='#' className='social__wrapper--item-link'>
                                                    <img
                                                        src='/images/icons/linkdin-icon.svg'
                                                        alt="jindal steel logo"
                                                        width={29}
                                                        height={29}
                                                        className="img-fluid u-img" />
                                                </Link></li>
                                                <li className="social__wrapper--item"><Link href='#' className='social__wrapper--item-link'>
                                                    <img
                                                        src='/images/icons/fb-icon.svg'
                                                        alt="jindal steel logo"
                                                        width={29}
                                                        height={29}
                                                        className="img-fluid u-img" />
                                                </Link></li>
                                                <li className="social__wrapper--item"><Link href='#' className='social__wrapper--item-link'>
                                                    <img
                                                        src='/images/icons/twitter-icon.svg'
                                                        alt="jindal steel logo"
                                                        width={29}
                                                        height={29}
                                                        className="img-fluid u-img" />
                                                </Link></li>
                                                <li className="social__wrapper--item"><Link href='#' className='social__wrapper--item-link'>
                                                    <img
                                                        src='/images/icons/youtube.svg'
                                                        alt="jindal steel logo"
                                                        width={29}
                                                        height={29}
                                                        className="img-fluid u-img" />
                                                </Link></li>
                                                <li className="social__wrapper--item">
                                                    <Link href='#' className='social__wrapper--item-link'>
                                                        <img
                                                            src='/images/icons/insta-icon.svg'
                                                            alt="jindal steel logo"
                                                            width={29}
                                                            height={29}
                                                            className="img-fluid u-img" />
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-10">
                                <div className="c-footer__info">
                                    <div className="c-footer__info">
                                        <div className='row'>
                                            <div className="col-12 col-md-6 col-lg-2">
                                                <div className="c-footer__info-content">
                                                    <div className="head">{FOOTER_MAIN_MENU[0]?.name}</div>
                                                    {FOOTER_MAIN_MENU[0]?.children?.length > 0 && (
                                                        <ul className="footerMenu">
                                                            {FOOTER_MAIN_MENU[0]?.children.map((item: any) => (
                                                                <li key={item.id} className="footerMenu__item">
                                                                    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.500031L5.34236 4.10009C5.6395 4.32099 5.6395 4.67907 5.34236 4.89998L0.500001 8.50003" stroke="#A1A1A1" strokeLinecap="round"></path></svg>
                                                                    <Link href={item.link || "#"} target={item.type === "external" ? "_blank" : "_self"} className="footerMenu__item-link">{item.name}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>

                                            </div>
                                            <div className="col-12 col-md-6 col-lg-2">
                                                <div className="c-footer__info-content">
                                                    <div className="head">{FOOTER_MAIN_MENU[2]?.name}</div>
                                                    {FOOTER_MAIN_MENU[2]?.children?.length > 0 && (
                                                        <ul className="footerMenu">
                                                            {FOOTER_MAIN_MENU[2]?.children.map((item: any) => (
                                                                <li key={item.id} className="footerMenu__item">
                                                                    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.500031L5.34236 4.10009C5.6395 4.32099 5.6395 4.67907 5.34236 4.89998L0.500001 8.50003" stroke="#A1A1A1" strokeLinecap="round"></path></svg>
                                                                    <Link href={item.link || "#"} target={item.type === "external" ? "_blank" : "_self"} className="footerMenu__item-link">{item.name}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>


                                            </div>
                                            <div className="col-12 col-md-6 col-lg-2">

                                                <div className="c-footer__info-content">
                                                    <div className="head">{FOOTER_MAIN_MENU[1]?.name}</div>
                                                    {FOOTER_MAIN_MENU[1]?.children?.length > 0 && (
                                                        <ul className="footerMenu">
                                                            {FOOTER_MAIN_MENU[1]?.children.map((item: any) => (
                                                                <li key={item.id} className="footerMenu__item">
                                                                    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.500031L5.34236 4.10009C5.6395 4.32099 5.6395 4.67907 5.34236 4.89998L0.500001 8.50003" stroke="#A1A1A1" strokeLinecap="round"></path></svg>
                                                                    <Link href={item.link || "#"} target={item.type === "external" ? "_blank" : "_self"} className="footerMenu__item-link">{item.name}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                                {/* <div className="c-footer__info-content">
                                                    <div className="head">{FOOTER_MAIN_MENU[4]?.name}</div>
                                                    {FOOTER_MAIN_MENU[4]?.children.length > 0 && (
                                                        <ul className="footerMenu">
                                                            {FOOTER_MAIN_MENU[4]?.children.map((item: any) => (
                                                                <li key={item.id} className="footerMenu__item">
                                                                    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.500031L5.34236 4.10009C5.6395 4.32099 5.6395 4.67907 5.34236 4.89998L0.500001 8.50003" stroke="#A1A1A1" strokeLinecap="round"></path></svg>
                                                                    <Link href={item.link} target={item.type === "external" ? "_blank" : "_self"} className="footerMenu__item-link">{item.name}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div> */}
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-2">

                                                <div className="c-footer__info-content">
                                                    {FOOTER_MAIN_MENU[3] && (
                                                        <Link href={FOOTER_MAIN_MENU[3]?.link || "#"} target={FOOTER_MAIN_MENU[3]?.type === "external" ? "_blank" : "_self"} className="head">{FOOTER_MAIN_MENU[3]?.name}</Link>
                                                    )}
                                                    {/* {FOOTER_MAIN_MENU[3]?.children.length > 0 && (
                                                        <ul className="footerMenu">
                                                            {FOOTER_MAIN_MENU[3]?.children.map((item: any) => (
                                                                <li key={item.id} className="footerMenu__item">
                                                                    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.500031L5.34236 4.10009C5.6395 4.32099 5.6395 4.67907 5.34236 4.89998L0.500001 8.50003" stroke="#A1A1A1" strokeLinecap="round"></path></svg>
                                                                    <Link href={item.link} target={item.type === "external" ? "_blank" : "_self"} className="footerMenu__item-link">{item.name}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )} */}
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6 col-lg-2">

                                                {/* <div className="c-footer__info-content">
                                                    <div className="head">{FOOTER_MAIN_MENU[5]?.name}</div>
                                                    {FOOTER_MAIN_MENU[5]?.children.length > 0 && (
                                                        <ul className="footerMenu">
                                                            {FOOTER_MAIN_MENU[5]?.children.map((item: any) => (
                                                                <li key={item.id} className="footerMenu__item">
                                                                    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.500031L5.34236 4.10009C5.6395 4.32099 5.6395 4.67907 5.34236 4.89998L0.500001 8.50003" stroke="#A1A1A1" strokeLinecap="round"></path></svg>
                                                                    <Link href={item.link} target={item.type === "external" ? "_blank" : "_self"} className="footerMenu__item-link">{item.name}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div> */}
                                                <div className="c-footer__info-content">
                                                    {FOOTER_MAIN_MENU[4] && (
                                                        <Link href={FOOTER_MAIN_MENU[4]?.link || "#"} target={FOOTER_MAIN_MENU[4]?.type === "external" ? "_blank" : "_self"} className="head">{FOOTER_MAIN_MENU[4]?.name}</Link>
                                                    )}
                                                    {/* {FOOTER_MAIN_MENU[4]?.children.length > 0 && (
                                                        <ul className="footerMenu">
                                                            {FOOTER_MAIN_MENU[4]?.children.map((item: any) => (
                                                                <li key={item.id} className="footerMenu__item">
                                                                    <svg width="7" height="9" viewBox="0 0 7 9" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0.500031L5.34236 4.10009C5.6395 4.32099 5.6395 4.67907 5.34236 4.89998L0.500001 8.50003" stroke="#A1A1A1" strokeLinecap="round"></path></svg>
                                                                    <Link href={item.link} target={item.type === "external" ? "_blank" : "_self"} className="footerMenu__item-link">{item.name}</Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )} */}
                                                </div>
                                            </div>

                                            <div className='col-12 col-md-6 col-lg-2'>
                                                <div className="c-footer__info-content">

                                                    <div><span className="c-content-16 mt-1 ft_light">Have questions or need assistance? Our team is here to help.</span></div>
                                                    <div className="c-footer__info-content  mt-2">
                                                        <div className="head"><Link href="/contact-us" className="u-link c-content-16 ft_semiBold clr-gray ">Contact us</Link></div>


                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container cus-container">
                    <div className="row">
                        <div className='col-12'>
                            <div className='c-footer__bottom'>
                                <p>Copyright ©2026 Jindal Projects. All rights reserved.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
