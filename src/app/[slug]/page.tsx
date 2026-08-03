import { notFound, redirect } from "next/navigation";

import { GET_SPECIFIC_PAGE_ENDPOINT } from "@/config/apiConfig";
import { CONSTANTS } from "@/config/constant";
import { serverRequest } from "@/services/getServerSideRender";
import dynamic from "next/dynamic";

import { getPageMetadata } from "@/lib/metadata";
import { Metadata } from "next";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> {
  const { slug } = await params;

  return getPageMetadata({
    slug: typeof slug === "string" ? slug : "",
    endpoint: GET_SPECIFIC_PAGE_ENDPOINT,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;

  const PageTemplate = dynamic(() => import("@/components/Layout/PageTemplate"), { ssr: true });
  const InnerBanner = dynamic(() => import("@/components/Layout/InnerBanner"), { ssr: true });

  if (slug === 'home-v2`') {
    redirect('/');
  }

  const fetchedInfo = await serverRequest(
    {},
    `${GET_SPECIFIC_PAGE_ENDPOINT}?slug=${slug}&excludeUrl=1`,
    CONSTANTS.REQUEST_GET,
    'server'
  );

  const pageData = fetchedInfo.data;

  if (pageData?.code === CONSTANTS.STATUS_NOT_FOUND || !pageData) return notFound();

  return (
    <>
      <div className="container-fluid generic_bottom_spacer">
        <div className="row">
          <div className="col-12 p-0">
            <InnerBanner
              label={pageData.title}
              tagline={pageData?.customField?.tagline}
              slug={pageData.slug}
              currentPage={pageData}
              innerBanner={pageData.media}
            />
          </div>
        </div>
      </div>
      <PageTemplate data={pageData} />
    </>
  );
}
