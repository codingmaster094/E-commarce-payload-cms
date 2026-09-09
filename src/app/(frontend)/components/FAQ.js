"use client";
import React, { useState } from "react";

export default function FAQ({ Section_Show, title, FAQ_Data }) {
  const [openIndex, setOpenIndex] = useState(0);

  if (!Section_Show || !FAQ_Data?.length) return null;

  return (
    Section_Show ?
      <section className="py-20">
        <div className="container">
          {
            title &&
            <div className="flex flex-col gap-32 lg:gap-48 justify-center items-center text-center">
              <h2 className="text-h2/snug font-jakarta font-normal">
                {title}
              </h2>
              <div className="line max-w-225 w-full border-1 border-solid border-grey1"></div>
            </div>
          }

          <div className="space-y-32 mt-32 lg:mt-48">
            {FAQ_Data && FAQ_Data.length > 0 &&
            FAQ_Data.map((faq, index) => {
              const content = faq.richText?.root?.children || [];

              const renderContent = (nodes) => {
                return nodes.map((node, i) => {
                  if (node.type === "paragraph") {
                    const text = node.children?.map((c) => c.text).join(" ") || "";
                    return <p key={i} className="mb-4">{text}</p>;
                  }
                  if (node.type === "list") {
                    const items = node.children || [];
                    return (
                      <ul key={i} className="list-disc pl-24 mb-20 space-y-8">
                        {items.map((item, j) => {
                          const itemText = item.children?.map((c) => c.text).join(" ") || "";
                          return <li key={j}>{itemText}</li>;
                        })}
                      </ul>
                    );
                  }
                  if (node.type === "listitem") {
                    const itemText = node.children?.map((c) => c.text).join(" ") || "";
                    return <li key={i}>{itemText}</li>;
                  }
                  if (node.type === "linebreak") {
                    return <br key={i} />;
                  }
                  if (node.children) {
                    return <React.Fragment key={i}>{renderContent(node.children)}</React.Fragment>;
                  }
                  return null;
                });
              };

              return (
                <div
                  key={faq.id || index}
                  className={`accordion-item border border-dark overflow-hidden ${openIndex === index ? "active" : ""}`}
                >
                  <button
                    type="button"
                    className="accordion-header w-full flex justify-between items-center px-24 py-24 text-left font-jakarta text-h3/snug cursor-pointer"
                    aria-label={faq.title}
                    onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
                  >
                    <span>{faq.title}</span>
                    {/* <span className="icon">-</span> */}
                  </button>

                  <div className="accordion-content overflow-hidden transition-all duration-500 ease-in-out">
                    <div className="px-24 pb-24 text-dark text-base_sm leading-relaxed space-y-16">
                      {renderContent(content)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section> : null
  );
}
