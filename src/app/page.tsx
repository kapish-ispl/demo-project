export const dynamic = "force-dynamic";

import HomePage from "@/components/Layout/HomePageTemplate";
import { GET_SPECIFIC_PAGE_ENDPOINT } from "@/config/apiConfig";
import { CONSTANTS } from "@/config/constant";
import { serverRequest } from "@/services/getServerSideRender";
import { PageResponse } from "@/types/pageResponse";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPageMetadata } from "@/lib/metadata";

interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata({
    slug: CONSTANTS.LANDING_SLUG,
    endpoint: GET_SPECIFIC_PAGE_ENDPOINT,
  });
}

export default async function Home() {
  const fetchedInfo = (await serverRequest(
    {},
    `${GET_SPECIFIC_PAGE_ENDPOINT}?slug=${CONSTANTS.LANDING_SLUG}`,
    CONSTANTS.REQUEST_GET,
    'server'
  )) as ApiResponse<PageResponse>;

  const pageData = fetchedInfo?.data;
  if (!pageData) return notFound();

  return (
    <>
      <HomePage data={pageData} />
    </>
  )
}
