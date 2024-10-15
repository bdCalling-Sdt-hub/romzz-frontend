"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Select } from 'antd';
import { TiArrowSortedDown } from "react-icons/ti";
import { useGetProfileQuery } from '@/redux/apiSlices/AuthSlices';

const Sidebar = () => {
    const path = usePathname();
    const pathName = path?.split("/")[2];  
    const router = useRouter() 
    const {data:userData} = useGetProfileQuery(undefined)  
    const isSubscribe = userData?.data?.isSubscribed 
    const isAccess = userData?.data?.hasAccess
    //console.log(pathName); 

    const handleLogout =()=>{
        localStorage.removeItem("romzzToken") 
        router.push("/login")
    }
    const item = [
        {
            label: "Profile",
            path: "profile-details"
        },
        {
            label: "Booking History",
            path: "booking-history"
        },
        {
            label: "Subscription",
            path: "subscription"
        },
      
    ]
    return (
        <div id='language-change'>
            {
                item?.map((route:any, index: number)=>{
                    return(
                        <Link key={index} href={`/profile/${route.path}`} className=''>
                            <li 
                                className={`
                                    text-[16px] leading-6 
                                    font-normal text-[#F7F7F7] 
                                    list-none h-[44px] pl-6
                                    ${route.path === pathName ? "bg-[#007490]" : "bg-transparent"}
                                    ${ `${route.path}` === "profile-details" && path === "/profile" ? "bg-[#007490]" : null}
                                    hover:bg-[#007490] transition-all duration-150
                                    flex items-center
                                `}
                            >
                                {route.label}
                            </li>
                        </Link>
                    )
                })
            }  

            {
                 isAccess && isSubscribe ?  

                 <li 
                className={`
                 text-[16px] leading-6 
                                    font-normal text-[#F7F7F7] 
                                    list-none h-[44px] pl-6  
                                     ${ pathName === "rental-details" ? "bg-[#007490]" : "bg-transparent"}
                                  hover:bg-[#007490] transition-all duration-150
                                    flex items-center
                `}  
                onClick={()=>router.push("/profile/rental-details")}
            >
                Rental Details
            </li>  
            : ""
            } 


            <li 
                className={`
                    text-[16px] leading-6 
                    font-normal text-[#F7F7F7] 
                    list-none h-[44px] pl-6
                    hover:bg-[#007490] transition-all duration-150
                    flex items-center
                `}
            >
                <Select
                    placeholder={<p className='text-[#F7F7F7] text-[16px] font-normal leading-6'>English</p>}
                    style={{
                        width: "100%",
                        marginRight: 24,
                        background: "transparent"
                    }}
                    className=''
                    suffixIcon={<TiArrowSortedDown size={24} color='#F7F7F7' />}
                >
                    <Select.Option value="male">English</Select.Option>
                    <Select.Option value="female">Spanish</Select.Option>
                </Select>
            </li>
            <li 
                className={`
                    text-[16px] leading-6 
                    font-normal text-[#F7F7F7] 
                    list-none h-[44px] pl-6
                    hover:bg-[#007490] transition-all duration-150
                    flex items-center
                `}  
                onClick={()=>handleLogout()}
            >
                Logout
            </li>
        </div>
    )
}

export default Sidebar