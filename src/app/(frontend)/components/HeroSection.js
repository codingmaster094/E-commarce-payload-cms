import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { asHtml, lexicalText } from '../untils/lexicalText'

const HeroSection = (
    {
        BG_Image,
        Heading,
        SubHeading,
        Description,
        BTN
    }

) => {
    return (
        <>
            <section className='h-full xxl:h-[calc(100vh-100px)] overflow-hidden'>
                <div className='relative h-full flex justify-center items-center flex-col lg:flex-row'>
                    {BG_Image?.url ? (
                    <Image
                        className="aspect-square lg:aspect-auto mr-0 ml-auto relative lg:absolute lg:top-0 right-0 lg:-right-3/12 z-0 h-full object-cover"
                        src={BG_Image.url}
                        alt={BG_Image.alt || ""}
                        role="img"
                        width={1920}
                        height={900}
                        fetchPriority="high"
                        sizes="(max-width: 1024px) 100vw, 1920px"
                        priority={true}
                    />
                    ) : null}
                    <div className="container">
                        <div className='h-full relative z-10 flex flex-col space-y-16 lg:mt-0 mt-32 mb-32 lg:mb-0 lg:py-100'>
                            <div className='lg:py-32 lg:px-48 bg-white w-fit font-jakarta font-normal space-y-8'>
                                {
                                    Heading && 
                                <h1 className="text-h1 font-jakarta font-normal leading-snug" dangerouslySetInnerHTML={{ __html: asHtml(Heading) }} ></h1>
                                }
                                {
                                    SubHeading && 
                                <div className="para text-dark text-h4 leading-snug">
                                    <p dangerouslySetInnerHTML={{ __html: asHtml(SubHeading) }}></p>
                                </div>
                                }
                            </div>
                            <div className='lg:py-32 lg:px-48 bg-white w-fit font-jakarta font-normal max-w-[939px] space-y-48'>
                                {Array.isArray(Description) &&
                                    Description.map((block, index) => {
                                        if (block?.type === "list") {
                                            return (
                                                <ul
                                                    key={index}
                                                    className="para text-dark text-h4 leading-snug pl-24 [&_li]:list-disc space-y-24"
                                                >
                                                    {(block.children || []).map((item, i) => (
                                                        <li key={i}>{lexicalText(item)}</li>
                                                    ))}
                                                </ul>
                                            );
                                        } else if (block?.type === "paragraph") {
                                            return (
                                                <div key={index} className="space-y-24 text-dark">
                                                    <p>{lexicalText(block)}</p>
                                                </div>
                                            );
                                        } else if (block?.type === "heading") {
                                            return (
                                                <h3
                                                    key={index}
                                                    className="text-h3 font-medium text-center px-16"
                                                    dangerouslySetInnerHTML={{
                                                        __html: lexicalText(block),
                                                    }}
                                                ></h3>
                                            );
                                        } else {
                                            return null;
                                        }
                                    })}

                                {
                                    BTN ?
                                        <Link href={BTN.url || "/"} target={BTN.target} aria-label="Kontaktieren Sie uns – Startseite" className='btn-dark block'>
                                            <span>{BTN.label}</span>
                                        </Link>
                                        :
                                        null

                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection