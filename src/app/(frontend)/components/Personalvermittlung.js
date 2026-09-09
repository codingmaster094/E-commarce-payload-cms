import React from 'react'
import Image from 'next/image'
import { asHtml, lexicalText } from '../untils/lexicalText'
const Personalvermittlung = (
    {
        Side_Image,
        Heading,
        Description
    }
) => {
    return (
        <>
            <section className='relative py-32 md:py-70 xl:py-160 bg-primary_1' id='uber-mich'>
                <div className="relative z-10" id="Gebrauchtwagen">
                    <div className="container">
                        <div className="flex flex-col-reverse lg:flex-row-reverse gap-20 lg:gap-64">
                            <div className="w-full lg:w-1/2 xxl:w-9/12 flex flex-col gap-32">
                                {
                                    Heading &&
                                    <div className="text-white">
                                        <h2 className="text-h2/snug font-normal font-jakarta" dangerouslySetInnerHTML={{ __html: asHtml(Heading) }}></h2>
                                    </div>
                                }
                                <div className='line max-w-225 w-full border-1 border-solid border-grey1'></div>
                                <div className="text-body space-y-16">
                                    {Array.isArray(Description) &&
                                        Description.map((block, index) => {
                                            if (block?.type === "list") {
                                                return (
                                                    <ul key={index} className="leading-snug pl-24 [&_li]:list-disc space-y-16">
                                                        {(block.children || []).map((item, i) => (
                                                            <li key={i}>
                                                                {lexicalText(item)}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                );
                                            } else if (block?.type === "paragraph") {
                                                return (

                                                    <p key={index}>
                                                        {lexicalText(block)}
                                                    </p>

                                                );
                                            } else if (block?.type === "heading") {
                                                return (
                                                    <h3
                                                        key={index}
                                                        className="text-h3 font-medium text-center px-16"
                                                        dangerouslySetInnerHTML={{ __html: lexicalText(block) }}
                                                    ></h3>
                                                );
                                            } else {
                                                return null;
                                            }
                                        })}
                                </div>

                            </div>
                            <div className="w-full lg:w-1/2 xxl:w-full xxl:-ml-[calc((100vw-1470px)/2)]">
                                {Side_Image?.url ? (
                                <Image src={Side_Image.url} alt={Side_Image?.alt || ""} role="img" width={1920} height={900} fetchPriority="high" sizes="(max-width: 1024px) 100vw, 1920px" className="relative lg:sticky top-0 lg:top-50 xxl:top-0 xxl:relative size-full lg:size-auto xxl:size-full object-cover" />
                                ) : null}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Personalvermittlung