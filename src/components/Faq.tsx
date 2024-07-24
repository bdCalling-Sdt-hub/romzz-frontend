"use client";
import React, { useEffect, useRef, useState } from 'react';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Heading from './shared/Heading';

type ContentRef = HTMLDivElement | null;

const Faq = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const contentRefs = useRef<ContentRef[]>([]);

    const toggleAccordion = (index: number) => {
        setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    useEffect(() => {
        if (openIndex !== null && contentRefs.current[openIndex]) {
            contentRefs.current[openIndex]!.style.maxHeight = `${contentRefs.current[openIndex]!.scrollHeight}px`;
        }
        contentRefs.current.forEach((ref, index) => {
            if (ref && index !== openIndex) {
                ref.style.maxHeight = '0px';
            }
        });
    }, [openIndex]);

    return (
        <div
            style={{
                width: "100%",
                height: "676px",
                backgroundImage: `url('/faq.png')`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "container",
            }}
        >
            <div>
                <Heading 
                    name='Popular Frequently Asked Questions' 
                    style='font-bold text-[32px] sm:text-[40px] leading-[38px] sm:leading-[46px] text-[#333333] text-center mb-4'
                />
                <div className='container grid grid-cols-1 gap-6'>
                    <p className="text-[#767676] text-[14px] leading-[18px] text-center">
                        <span className="text-primary text-bold text-[14px] leading-[18px]">Rom{}<span className='text-secondary'>zz</span></span>  {" "}
                        <span className="font-normal">
                            prepares and delivers organically sourced, fresh meals to your door nationwide. 
                            Unlike other meal kit delivery services that need preparation and 
                            cleaning, our meals are delivered ready to consume. 
                            Our mission is to make healthy eating easy and enjoyable 
                            while not sacrificing flavor. Do you have a question regarding our shipping service?
                        </span>
                    </p>
                    <>
                        {
                            [...Array(5)].map((_item: any, index) => {
                                return (
                                    <div 
                                        key={index}
                                        className='overflow-hidden transition-max-height duration-300 ease-in-out rounded-lg bg-white cursor-pointer relative h-[56px]'
                                        onClick={() => toggleAccordion(index)}
                                        style={{
                                            maxHeight: openIndex === index ? `${contentRefs.current[index]?.scrollHeight}px` : '56px',
                                            boxShadow: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px"
                                        }}
                                    >
                                        <div
                                            ref={(el) => {
                                                if (el) {
                                                    contentRefs.current[index] = el;
                                                }
                                            }}
                                            className='accordion-content p-4'
                                        >
                                            <div className='flex items-center justify-between'>
                                                <p className='text-[16px] leading-6 font-medium text-[#3E3E3E]'>
                                                    {"What are the foods like Steel Yat? How does the mail plan work?"}
                                                </p>
                                                <MdKeyboardArrowRight 
                                                    color='white' 
                                                    className={`bg-primary border rounded-full text-2xl transition-all ${openIndex === index ? 'rotate-90' : ''} `}
                                                />
                                                
                                            </div>
                                            <div className='text-[16px] leading-6 font-normal text-primary mt-3'>
                                                {"Lorem30"}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                </div>
            </div>
        </div>
    )
}

export default Faq;
