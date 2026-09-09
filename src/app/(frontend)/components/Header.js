"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShop } from "@/context/ShopContext";

export default function Header({ menuData = [], headerData = null, siteSettings = null }) {
  const pathname = usePathname();
  const router = useRouter();
  const { cartTotalCount, wishlistCount, setIsCartOpen, products, brand } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.materials.some((m) => m.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 5)
    : [];

  const fallbackNavLinks = [
    { label: "Home", href: "/" },
    { label: "Chairs", href: "/chairs" },
    { label: "Categories", href: "/categories" },
    { label: "Collections", href: "/collections" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const dynamicLinks = menuData.length > 0 
    ? menuData.map(item => ({
        label: item?.link?.label || "Link",
        href: item?.link?.url || "#"
      }))
    : fallbackNavLinks;

  return (
    <>
      {/* Top Banner */}
      <div className="bg-neutral-900 text-neutral-300 text-xs py-2.5 px-4 text-center font-medium tracking-wide flex justify-center items-center gap-2 sm:gap-3">
        <span>{siteSettings?.announcementLeft || "Exclusive Seating Innovation"}</span>
        <span className="hidden sm:inline text-neutral-600">•</span>
        <span className="hidden sm:inline">
          {siteSettings?.announcementMiddle || `Free Delivery on Orders Over $${brand.policies.freeShippingThreshold}`}
        </span>
        <span className="hidden md:inline text-neutral-600">•</span>
        <span className="hidden md:inline text-amber-400 font-semibold">
          {siteSettings?.announcementRight || `${brand.policies.warrantyYears}-Year Frame Warranty`}
        </span>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-4 border-b border-neutral-100"
            : "bg-white py-6 border-b border-neutral-100"
        }`}
      >
        <div className="container flex items-center justify-between">
          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-3 text-neutral-800 hover:text-neutral-950 rounded-xl hover:bg-neutral-100 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Open navigation menu"
          >
            <svg className="w-[28px] h-[28px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {headerData?.Header_Logo?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={headerData.Header_Logo.url} 
                alt={headerData.Header_Logo.alt || brand.brandName} 
                className="max-h-[60px] lg:max-h-[72px] w-auto max-w-[200px] lg:max-w-[280px] object-contain transition-transform group-hover:scale-105" 
              />
            ) : (
              <>
                <div className="w-10 h-10 bg-neutral-950 text-white font-extrabold flex items-center justify-center rounded-2xl tracking-tighter text-xl shadow-md group-hover:scale-105 transition-transform font-outfit">
                  M
                </div>
                <div className="flex flex-col">
                  <span className="font-outfit font-black text-xl sm:text-2xl tracking-tight text-neutral-950 leading-none">
                    {brand.logoText}
                  </span>
                  <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-neutral-400 mt-1">
                    {brand.logoSubtext}
                  </span>
                </div>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 lg:gap-8 xl:gap-10">
            {dynamicLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`whitespace-nowrap text-[15px] font-semibold tracking-wide transition-colors relative py-1.5 ${
                    isActive ? "text-neutral-950 font-bold" : "text-neutral-500 hover:text-neutral-950"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-950 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Utility Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Button */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-3 text-neutral-700 hover:text-neutral-950 transition rounded-xl hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Search chairs"
              title="Search"
            >
              <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist Icon */}
            <Link
              href="/wishlist"
              className="relative p-3 text-neutral-700 hover:text-neutral-950 transition rounded-xl hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.684a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-rose-600 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-3 text-neutral-700 hover:text-neutral-950 transition rounded-xl hover:bg-neutral-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Cart"
              title="Cart"
            >
              <svg className="w-[24px] h-[24px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartTotalCount > 0 && (
                <span className="absolute top-1.5 right-1.5 bg-neutral-950 text-white text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Account / Dynamic Link */}
            {headerData?.link?.Kontakt_label ? (
              <Link
                href={headerData.link.url || "#"}
                target={headerData.link.target === "_blank" ? "_blank" : undefined}
                className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 border border-neutral-200 px-4 py-2.5 rounded-2xl hover:bg-neutral-950 hover:text-white transition shadow-xs"
              >
                <span>{headerData.link.Kontakt_label}</span>
              </Link>
            ) : (
              <Link
                href="/account"
                className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-900 border border-neutral-200 px-4 py-2.5 rounded-2xl hover:bg-neutral-950 hover:text-white transition shadow-xs"
              >
                <svg className="w-[20px] h-[20px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Account</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-neutral-900 text-white font-bold flex items-center justify-center rounded-xl">M</div>
                  <span className="font-bold text-lg font-outfit">{brand.brandName}</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-neutral-400 hover:text-neutral-900 text-xl font-bold">
                  ✕
                </button>
              </div>

              <nav className="mt-6 flex flex-col gap-2">
                {dynamicLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-neutral-800 hover:text-neutral-900 py-3 px-2 rounded-lg hover:bg-neutral-50 transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-neutral-100 space-y-3">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl block shadow-md"
              >
                Customer Account
              </Link>
              <p className="text-xs text-center text-neutral-400">© MEANOVA CHAIRS. All rights reserved.</p>
            </div>
          </div>
        </div>
      )}

      {/* Instant Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSearchOpen(false)} />
          <div className="flex items-start justify-center min-h-screen pt-12 sm:pt-16 md:pt-20 lg:pt-24 px-4">
            <div className="relative bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl z-10 space-y-4">
              <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                <svg className="w-5 h-5 text-neutral-400 absolute left-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search ergonomic, executive, office, gaming chairs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-neutral-100 text-neutral-900 rounded-xl font-medium placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-4 text-xs font-semibold text-neutral-400 hover:text-neutral-900"
                >
                  ESC
                </button>
              </form>

              {/* Autocomplete Suggestions */}
              {searchQuery.trim() !== "" && (
                <div className="space-y-2 pt-2 border-t border-neutral-100 max-h-80 overflow-y-auto">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                    Product Suggestions ({searchResults.length})
                  </p>
                  {searchResults.length === 0 ? (
                    <p className="text-xs text-neutral-500 py-4 text-center">No matching chair products found.</p>
                  ) : (
                    searchResults.map((item) => (
                      <Link
                        key={item.id}
                        href={`/chairs/${item.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center justify-between p-2.5 hover:bg-neutral-50 rounded-xl transition group"
                      >
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.thumbnail} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                          <div>
                            <p className="text-xs font-bold text-neutral-900 group-hover:text-neutral-600">{item.name}</p>
                            <p className="text-[11px] text-neutral-400">{item.categoryName}</p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-neutral-900">${item.price}</span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
