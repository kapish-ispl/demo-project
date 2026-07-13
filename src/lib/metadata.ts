import { serverRequest } from "@/services/getServerSideRender";
import { CONSTANTS } from "@/config/constant";
import { decodeHtmlEntities } from "@/lib/htmlUtils";
import { Metadata } from "next";

interface GenerateMetadataOptions {
  slug: string;
  endpoint: string;
  fallbackTitle?: string;
}

export async function getPageMetadata({
  slug,
  endpoint,
  fallbackTitle = "Jindal Projects",
}: GenerateMetadataOptions): Promise<Metadata> {
  const fetchedInfo = await serverRequest(
    {},
    `${endpoint}?slug=${slug}`,
    CONSTANTS.REQUEST_GET,
    'server'
  );

  const pageData = fetchedInfo?.data;


  if (!pageData || (Array.isArray(pageData) && pageData.length === 0)) {
    return {
      title: 'Page Not Found',
      description: 'The requested page could not be found.',
    };
  }

  const metaTitleValue =
    pageData?.meta?.title?.trim() ||
    pageData?.meta_title?.trim()

  const metaTitle = decodeHtmlEntities(
    metaTitleValue
      ? `${metaTitleValue} | Jindal Projects`
      : fallbackTitle
  );

  const metaDescription = decodeHtmlEntities(
    pageData?.meta?.description ||
    pageData?.meta_description ||
    "Jindal Projects is a leading group of projects, offering high-quality development, engineering, and infrastructure solutions."
  );

  const metaKeywords = decodeHtmlEntities(
    pageData?.meta?.keywords ||
    pageData?.meta_keyword ||
    pageData?.meta_keywords ||
    "Jindal Projects, Real Estate, Infrastructure, Engineering, Jindal Group"
  );

  const metaImage = `${process.env.NEXT_PUBLIC_URL}/images/logo/meta.jpg`;
  const siteUrl = process.env.NEXT_PUBLIC_URL;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,

    openGraph: {
      title: metaTitle,
      description: metaDescription,
      siteName: "Jindal Projects",
      type: "website",
      url: siteUrl,
      images: [
        {
          url: metaImage,
          width: 800,
          height: 600,
          alt: "Jindal Projects",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@JindalSteel",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    }
  };
}
