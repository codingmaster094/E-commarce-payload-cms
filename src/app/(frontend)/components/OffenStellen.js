'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const OffenStellen = (
    {
        SideImage,
        Heading,
        Description,
        BTN
    }
) => {
    const handleSmoothScroll = (e, targetId) => {
        if (!targetId?.startsWith('#')) return;
        e.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <>
            <section className='relative py-32 md:py-70 xl:py-160' id='jobs'>
                <div className="relative z-10" id="Gebrauchtwagen">
                    <div className="container">
                        <div className="flex flex-col-reverse lg:flex-row gap-20 lg:gap-64 justify-center items-start xxl:items-center">
                            <div className="w-full lg:w-1/2 xxl:w-9/12 flex flex-col gap-32 ">
                                <div className='mb-24'>
                                    <div className="mb-24">
                                        {Heading ? (
                                        <h2 className="text-h2/snug font-normal font-jakarta" dangerouslySetInnerHTML={{ __html: typeof Heading === 'string' ? Heading : '' }}>
                                        </h2>
                                        ) : null}
                                    </div>
                                    <div className='line max-w-225 w-full border-1 border-solid border-grey1'></div>
                                </div>
                                <div className="space-y-24 text-dark">
                                    {Array.isArray(Description) &&
                                        Description.map((block, index) => {
                                            const text = Array.isArray(block?.children)
                                                ? block.children.map((child) => child?.text || '').join(' ')
                                                : ''
                                            if (block?.type === "list") {
                                                return (
                                                    <ul key={index} className="pl-20 list-disc space-y-8">
                                                        {(block.children || []).map((item, i) => (
                                                            <li key={i}>{item?.children?.[0]?.text || ''}</li>
                                                        ))}
                                                    </ul>
                                                );
                                            } else if (block?.type === "paragraph") {
                                                return (
                                                    <p key={index}>
                                                        {text}
                                                    </p>
                                                );
                                            } else if (block?.type === "heading") {
                                                return (
                                                    <span
                                                        key={index}
                                                        className="block font-medium"
                                                        dangerouslySetInnerHTML={{
                                                            __html: text,
                                                        }}
                                                    ></span>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}

                                </div>
                                {
                                    BTN?.url ?
                                        <Link onClick={(e) => handleSmoothScroll(e, BTN.url)} href={BTN.url} aria-label="Kontaktieren Sie uns – Startseite" className="btn-dark block mt-24"><span>{BTN.label}</span></Link>
                                        :
                                        null
                                }
                            </div>
                            <div className="w-full lg:w-1/2 xxl:w-full xxl:-mr-[calc((100vw-1470px)/2)] relative lg:sticky lg:top-50">
                                {SideImage?.url ? (
                                <Image src={SideImage.url}  alt={SideImage?.alt || ""} role="img" width={1920} height={900} fetchPriority="high" sizes="(max-width: 1024px) 100vw, 1920px" className="relative lg:sticky lg:top-50  object-cover" />
                                ) : null}      
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default OffenStellen