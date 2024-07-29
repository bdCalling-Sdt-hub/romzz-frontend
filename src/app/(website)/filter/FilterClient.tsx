"use client";
import { Input, Pagination, Select } from 'antd';
import { Heart, Search, SlidersHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from 'react-icons/fa6'
import { IoLocationOutline } from 'react-icons/io5'
import { TiArrowSortedDown } from 'react-icons/ti';
import Property from "@/assets/property.png";
import Person from "@/assets/person.png";
import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/shared/Heading';
import { TfiLocationPin } from 'react-icons/tfi';

const FilterClient = () => {
    const [page, setPage] = useState<number>(1);

    useEffect(() => {
        const initialPage = new URLSearchParams(window.location.search).get("page") || "1";
        setPage(Number(initialPage));
    }, []);

    const handlePageChange = (page: number) => {
        setPage(page);
        const params = new URLSearchParams(window.location.search);
        params.set("page", page.toString());
        window.history.pushState(null, "", `?${params.toString()}`);
    };

    return (
        <div>
            <div
                className="bg-[#F3F3F3] flex flex-col items-center justify-center lg:h-[150px] h-full w-[100%] lg:py-0 py-3 "
            >
                <div
                    data-aos="fade-up"
                    className="lg:w-[874px] bg-white lg:h-[78px] py-2 lg:rounded-[59px] rounded-[20px] flex lg:flex-row  flex-col items-center justify-between  pr-3"
                >

                    <div className="lg:w-[350px] w-full">
                        <Input
                            suffix={
                                <Link href={"/search-filter"}>
                                    <div className="w-10 cursor-pointer h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                                        <FaMapLocationDot size={24} color="#00809E" />
                                    </div>
                                </Link>
                            }
                            prefix={<IoLocationOutline size={24} color="#5C5C5C" />}
                            style={{
                                width: "100%",
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                boxShadow: "none",
                            }}
                            placeholder="Search your destination"
                            className="placeholder:text-[#767676] placeholder:text-[16px] placeholder:font-semibold placeholder:leading-[14px]"
                        />
                    </div>

                    <div id="banner" className="lg:my-0 my-3 ">
                        <Select
                            placeholder={
                                <p className="text-base text-[16px] leading-6 font-normal">Property Area</p>
                            }
                            style={{
                                width: 255,
                                height: 48,
                                borderRadius: 24,
                            }}
                            suffixIcon={
                                <div className="w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center">
                                    <TiArrowSortedDown size={24} color="#00809E" />
                                </div>
                            }
                        >
                            <Select.Option value="Sydney">Sydney</Select.Option>
                            <Select.Option value="Melbourne">Melbourne</Select.Option>
                            <Select.Option value="Brisbane">Brisbane</Select.Option>
                            <Select.Option value="Adelaide">Adelaide</Select.Option>
                            <Select.Option value="Hobart">Hobart</Select.Option>
                            <Select.Option value="Perth">Perth</Select.Option>
                        </Select>
                    </div>

                    <div className="flex items-center justify-between gap-6 w-full lg:w-[200px] lg:px-0 px-3  ">
                        <div className="flex items-center gap-3 cursor-pointer">
                            <SlidersHorizontal size={18} color="#5C5C5C" />
                            <p className="text-base text-[16px] font-normal leading-6">
                                Filter
                            </p>
                        </div>
                        <Link href={"/filter?search="}>
                            <div className="lg:w-[62px] w-[40px] cursor-pointer lg:h-[62px] h-[40px] rounded-full bg-primary flex items-center justify-center">
                                <Search size={24} color="#F3F3F3" />
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className='bg-white container my-10'>

                {/* all property section */}
                <div className="container grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6  justify-items-center">
                    {
                        [...Array(8)].map((item, index) => {
                            return (
                                <Link key={index} href={`/details/${index + 1}`}>
                                    <div
                                        className="max-w-[360px] group p-2 rounded-lg"
                                        style={{
                                            boxShadow:"rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                                        }}
                                    >
                                        <div className="mb-4 overflow-hidden">
                                        <Image
                                            alt="Logo"
                                            src={Property}
                                            style={{ objectFit: "contain" }}
                                            className="group-hover:scale-105 transition-all duration-300"
                                        />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <h1 className="text-primary font-semibold text-[24px] leading-5">
                                                $100<sub className="font-normal">/pw</sub>
                                            </h1>
                                            <Heart size={24} color="red" fill="transparent" />
                                        </div>

                                        <p className="text-secondary text-sm my-2 leading-[18px] font-medium">
                                        Whole-unit
                                        </p>


                                        <div className="flex items-center gap-4">
                                            <Image
                                                alt="Logo"
                                                src={Person}
                                                width={30}
                                                height={30}
                                                style={{ borderRadius: "100%", objectFit: "contain" }}
                                            />
                                            <Heading
                                                name="Villa in Tetouan"
                                                style="font-bold text-[18px] leading-[27px] text-base"
                                            />
                                        </div>

                                        <div className="flex items-center gap-2 mt-3">
                                            <TfiLocationPin size={22} color="#5C5C5C" />
                                            <p className="text-base text-sm  leading-[21px] font-normal">
                                                55/A , b park road , Abcd area, city
                                            </p>
                                        </div>

                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>

                {/* pagination */}
                <div className="flex items-center justify-center mt-6">
                    <Pagination
                        current={Number(page)}
                        onChange={handlePageChange}
                        total={50}
                    />
                </div>

            </div>
        </div>
    )
}

export default FilterClient