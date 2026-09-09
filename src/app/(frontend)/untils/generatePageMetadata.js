import Alldata from "./AllDataFatch";
import { absoluteUrl } from "@/lib/siteURL";
import { getPageBySlug } from '@/lib/cms';

export default async function generatePageMetadata(params, fallback = {}) {
  try {
    const data = params === "home" ? await getPageBySlug("home") : await Alldata(params);
    const seo = data?.seo || {};

    const title = seo?.meta?.title || fallback.title || "MeaNova";
    const description = seo?.meta?.description || fallback.description || "";

    const canonical = seo?.meta?.canonicalUrl || absoluteUrl(params === "home" ? "/" : `/${params}`);
    
    const indexing = seo?.meta?.indexing || "index";
    const following = seo?.meta?.following || "follow";
    const robots = `${indexing},${following}`;

    const ogImage = seo?.meta?.image?.url;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots,
      openGraph: {
        type: "website",
        title: seo?.social?.facebook?.title || title,
        description: seo?.social?.facebook?.description || description,
        url: canonical,
        images: ogImage ? [{ url: ogImage }] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.social?.twitter?.title || title,
        description: seo?.social?.twitter?.description || description,
        images: ogImage ? [ogImage] : undefined,
      }
    };
  } catch (error) {
    console.error("Error in generatePageMetadata:", error);
    return {
      title: fallback.title || "MeaNova",
      description: fallback.description || "",
    };
  }
}
