import Header from "./components/Header";
import { getCategoriesCMS, getCollectionsCMS, getGlobal, getProducts } from "@/lib/cms";
import Footer from "./components/Footer";
import Cookie from "./components/Cookie";
import CartDrawer from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import CompareDrawer from "./components/CompareDrawer";
import { ShopProvider } from "@/context/ShopContext";
import {
  mergeBrand,
  withFallbackCategories,
  withFallbackCollections,
  withFallbackProducts,
} from "@/lib/mapCms";
import "../../../public/css/globals.css";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const settings = await getGlobal("site-settings");
  const brand = mergeBrand(settings);
  return {
    title: `${brand.brandName} | ${brand.brandTagline}`,
    description: brand.brandDescription,
    openGraph: {
      title: `${brand.brandName} | ${brand.brandTagline}`,
      description: brand.brandDescription,
      type: "website",
    },
  };
}

export default async function RootLayout({ children }) {
  const [menusData, headerData, footerData, siteSettings, productDocs, categoryDocs, collectionDocs] =
    await Promise.all([
      getGlobal("menus"),
      getGlobal("header"),
      getGlobal("footer"),
      getGlobal("site-settings"),
      getProducts(),
      getCategoriesCMS(),
      getCollectionsCMS(),
    ]);

  const products = withFallbackProducts(productDocs);
  const categories = withFallbackCategories(categoryDocs, products);
  const collections = withFallbackCollections(collectionDocs);
  const brand = mergeBrand(siteSettings);
  const headerMenus = menusData?.menus || [];
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.brandName,
    url: process.env.NEXT_PUBLIC_SERVER_URL || process.env.BASE_DOAMAIN || "",
    email: brand.contactEmail,
    telephone: brand.phone,
  });

  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased font-outfit">
        <ShopProvider products={products} categories={categories} collections={collections} brand={brand}>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
          <Header menuData={headerMenus} headerData={headerData} siteSettings={siteSettings} />
          <main className="min-h-screen">{children}</main>

          <CartDrawer />
          <QuickViewModal />
          <CompareDrawer />

          <Footer footerData={footerData} />
          <Cookie />
        </ShopProvider>
      </body>
    </html>
  );
}
