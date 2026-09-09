export default async function generatepostMetadata(params , fallback ={}) {
  try {
    const metadata = await fetch(
      `${process.env.NEXT_RATGEBER_SINGLE_BASE_URL ||
      "https://mea-nova.vercel.app/api/ratgeber?where[slug][equals]="
      }${params}`,
      { next: { revalidate: 60 } }
    );

    if (!metadata) {
      throw new Error(`Failed to fetch data: ${metadata.statusText}`);
    }
    const data = await metadata.json();
    const seo = data?.docs[0]?.seo || {};

    const title = seo.meta.title != undefined ? seo.meta.title : "Default title"
    const description = seo.meta.description || fallback.description || "Default Description";

    const canonical =
      seo.meta.canonicalUrl && seo.meta.canonicalUrl !== ""
        ? seo.meta.canonicalUrl
        : ``;

    const robots = `${seo.meta.indexing},${seo.meta.following}`
        ||  "noindex,nofollow";

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots,
      openGraph: {
        type: "article",
        title: seo.social?.facebook?.title || title,
        description: seo.social?.facebook?.description || description,
        url: canonical,
      },
    };


  } catch (error) {
    console.error("Error in Alldata:", error);
    throw error; 
  }
}
