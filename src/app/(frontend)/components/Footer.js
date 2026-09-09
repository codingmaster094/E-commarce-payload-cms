"use client";
import React from "react";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";

export default function Footer({ footerData = null }) {
  const { brand, categories } = useShop();
  const description = footerData?.description || brand.brandDescription;
  const address = footerData?.kontakt?.address || brand.address;
  const email = footerData?.kontakt?.email || brand.contactEmail;
  const phone = footerData?.kontakt?.phone || brand.phone;
  const supportLinks = footerData?.navigation?.[0]?.menus?.length
    ? footerData.navigation[0].menus
    : [
        { label: "All Chairs Catalog", url: "/chairs" },
        { label: "Signature Collections", url: "/collections" },
        { label: "Chair Comparison Tool", url: "/compare" },
        { label: "Saved Wishlist", url: "/wishlist" },
        { label: "Shopping Cart", url: "/cart" },
        { label: "Contact & Showroom", url: "/contact" },
      ];
  const legalLinks = footerData?.legalLinks?.length
    ? footerData.legalLinks
    : [
        { label: "Privacy Policy", url: "/datenschutzerklaerung" },
        { label: "Terms of Service", url: "/impressum" },
        { label: "Warranty Policy", url: "/contact" },
      ];
  const copyright = (footerData?.copyright || `© {year} ${brand.brandName}. All rights reserved.`).replace(
    "{year}",
    String(new Date().getFullYear()),
  );

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-900 pt-20 pb-14">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-20 border-b border-neutral-850">
          <div className="sm:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-neutral-950 font-extrabold flex items-center justify-center rounded-2xl text-xl tracking-tighter shadow-md font-outfit">
                M
              </div>
              <span className="font-outfit font-black text-2xl tracking-tight text-white">
                {brand.brandName}
              </span>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              {description}
            </p>
            <div className="pt-2 text-xs sm:text-sm text-neutral-400 space-y-2">
              <p><strong className="text-neutral-200">Showroom & HQ:</strong> {address}</p>
              <p><strong className="text-neutral-200">Email:</strong> {email}</p>
              <p><strong className="text-neutral-200">Phone:</strong> {phone}</p>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400 font-outfit">Categories</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/categories/${cat.slug}`} className="hover:text-white transition py-1 block">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400 font-outfit">
              {footerData?.navigation?.[0]?.heading || "Customer Support"}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-400">
              {supportLinks.map((item) => (
                <li key={`${item.label}-${item.url}`}>
                  <Link href={item.url} className="hover:text-white transition py-1 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-widest text-amber-400 font-outfit">Stay Informed</h4>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Subscribe for ergonomics advice, new seating releases, and exclusive member discounts.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3.5 bg-neutral-900 border border-neutral-800 rounded-2xl text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400 font-medium"
              />
              <button
                type="submit"
                className="w-full py-3.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-2xl hover:bg-neutral-200 transition shadow-lg min-h-[48px]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-neutral-500 gap-6 text-center sm:text-left font-medium">
          <p>{copyright}</p>
          <div className="flex flex-wrap justify-center gap-8">
            {legalLinks.map((item) => (
              <Link key={`${item.label}-${item.url}`} href={item.url || "#"} className="hover:text-neutral-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
