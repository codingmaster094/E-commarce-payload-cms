"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const CardSlider = ({ heading, cards }) => {
  const items = Array.isArray(cards) ? cards : [];
  if (!heading && items.length === 0) return null;

  return (
    <div className="space-y-48">
      {heading ? (
        <h3 className="text-h3 font-medium text-center px-16">{heading}</h3>
      ) : null}

      {items.length > 0 ? (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop={items.length > 1}
          autoplay={{ delay: 4500 }}
          navigation={true}
          pagination={{
            clickable: true,
            enabled: true,
          }}
          slidesPerView={1}
          spaceBetween={64}
          breakpoints={{
            1366: { slidesPerView: 3, spaceBetween: 64, pagination: { enabled: false } },
            1200: { slidesPerView: 3, spaceBetween: 64, pagination: { enabled: false } },
            768: { slidesPerView: 2, spaceBetween: 32, pagination: { enabled: false } },
            640: { slidesPerView: 1, spaceBetween: 32, pagination: { enabled: true } },
          }}
          className="my-32 !px-32 xl:!px-60"
        >
          {items.map((item, index) => (
            <SwiperSlide key={item.id || index} className="!h-auto">
              <div className="bg-primary_1 text-white rounded shadow-md h-full flex flex-col p-32 relative border-5 border-solid border-primary_1">
                <div className="h-full flex flex-col justify-between flex-grow">
                  {item.icon?.url ? (
                    <Image
                      src={item.icon.url}
                      alt={item.icon?.alt || item.heading || "icon"}
                      width={48}
                      height={48}
                      className="w-48 h-48 mb-32 md:mb-80"
                    />
                  ) : null}
                  <div className="flex flex-col flex-grow">
                    {item.heading ? (
                      <h3 className="font-normal font-jakarta text-h3/snug mb-24 js-title">
                        {item.heading}
                      </h3>
                    ) : null}
                    {item.text ? (
                      <p className="text-base txt-body js-content whitespace-pre-line">
                        {item.text}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="box w-100 h-100 bg-white flex justify-center items-center ml-auto -mr-32 -mb-32">
                  <span className="font-jakarta font-medium text-4xl text-black">
                    {index + 1}
                  </span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </div>
  );
};

const Tab2 = ({ data }) => {
  const [mainTab, setMainTab] = useState(0);

  const tabs = [
    {
      label: data?.unternehmenTab?.tabLabel || "Unternehmen",
      content: data?.unternehmenTab,
    },
    {
      label: data?.kandidatenTab?.tabLabel || "Kandidat:innen",
      content: data?.kandidatenTab,
    },
  ].filter((tab) => tab.content);

  const handleSmoothScroll = (e, targetId) => {
    if (!targetId?.startsWith("#")) return;
    e.preventDefault();
    document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const equalizeHeights = () => {
      if (window.innerWidth < 768) return;

      document.querySelectorAll(".swiper").forEach((swiperEl) => {
        const titles = swiperEl.querySelectorAll(".js-title");
        const texts = swiperEl.querySelectorAll(".js-content");

        titles.forEach((el) => (el.style.minHeight = ""));
        texts.forEach((el) => (el.style.minHeight = ""));

        let maxTitle = 0;
        let maxText = 0;

        titles.forEach((el) => (maxTitle = Math.max(maxTitle, el.offsetHeight)));
        texts.forEach((el) => (maxText = Math.max(maxText, el.offsetHeight)));

        titles.forEach((el) => (el.style.minHeight = `${maxTitle}px`));
        texts.forEach((el) => (el.style.minHeight = `${maxText}px`));
      });
    };

    equalizeHeights();
    window.addEventListener("resize", equalizeHeights);
    return () => window.removeEventListener("resize", equalizeHeights);
  }, [mainTab]);

  if (!data || tabs.length === 0) return null;

  const active = tabs[mainTab] || tabs[0];
  const content = active?.content || {};
  const ctaUrl = content.ctaLink?.url;

  return (
    <section className="py-80 xl:min-h-screen bg-gray-50" id="personalvermittlung">
      <div className="max-w-1570 mx-auto">
        <div className="flex justify-center gap-24 mb-64">
          {tabs.map((tab, idx) => (
            <button
              key={tab.label + idx}
              type="button"
              onClick={() => setMainTab(idx)}
              className={`px-12 sm:px-32 py-12 border border-black font-medium cursor-pointer ${
                mainTab === idx ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="space-y-96">
          <CardSlider heading={content.topHeading} cards={content.topCards} />

          {(content.ctaHeading || content.ctaText || ctaUrl) && (
            <div className="container">
              <div className="p-32 my-64 space-y-24 text-center">
                <div className="flex flex-col items-center gap-24">
                  {content.ctaHeading ? (
                    <h2 className="text-h2/snug text-center">{content.ctaHeading}</h2>
                  ) : null}
                  <div className="line max-w-225 w-full border-1 border-solid border-grey1"></div>
                  {content.ctaText ? (
                    <p className="whitespace-pre-line">{content.ctaText}</p>
                  ) : null}
                  {ctaUrl ? (
                    <Link
                      href={ctaUrl}
                      onClick={(e) => handleSmoothScroll(e, ctaUrl)}
                      target={content.ctaLink?.target || "_self"}
                      className="inline-block px-24 py-12 bg-black text-white hover:bg-gray-800 transition"
                    >
                      {content.ctaLink?.label || "Jetzt beraten lassen"}
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          )}

          <CardSlider heading={content.bottomHeading} cards={content.bottomCards} />
        </div>
      </div>
    </section>
  );
};

export default Tab2;
