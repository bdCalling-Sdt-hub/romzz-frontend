"use client"
import Heading from '@/components/shared/Heading';
import { Button, Checkbox, Form, Input } from 'antd'
import Link from 'next/link';
import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { useGetProfileQuery, useLoginMutation } from '@/redux/apiSlices/AuthSlices';
import Swal from 'sweetalert2';
import { UserContext } from '@/app/provider/User';
import { MdKeyboardBackspace } from "react-icons/md";

const LoginClient = () => {
    const [form] = Form.useForm(); 
    const [login] = useLoginMutation() 
    const router = useRouter();
    form.setFieldsValue(undefined);
    const { setUser } = useContext<any>(UserContext);
    const {refetch} = useGetProfileQuery(undefined)


    const handleSubmit = async(values: any) => {

        try {
            await login(values).then((res)=>{
                if(res?.data?.success){
                    Swal.fire({
                        text: res?.data?.message,
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    }).then(() => {
                        if(res?.data?.data?.accessToken){
                            localStorage.setItem("romzzToken", res?.data?.data?.accessToken);
                            refetch();
                            form.resetFields();
                            setUser(res?.data.data.existingUser);
                            router.push("/");
                            setTimeout(()=>{
                                window.location.reload();
                            }, 1000)
                        }   
                        
                        
                    });
                }
            })
        } catch (error:any) {
            Swal.fire({
                title: "Failed to Login",
                text: error?.data?.message,  
                icon: "error"
            });
        }
    };


    return (
        <div>
            <MdKeyboardBackspace className='cursor-pointer' color='#5C5C5C' size={24} onClick={()=>router.push("/")} />
            <Heading name='Log in to your account' style='font-semibold text-[24px] leading-[32px] text-[#333333] text-center mb-6' />
            <p className='font-normal text-[14px] leading-[14px] text-[#5C5C5C] text-center mb-6' >Please enter your email and password to continue</p>

            <Form onFinish={handleSubmit} form={form} layout='vertical'>
                <Form.Item
                    name="email"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Email</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Email!"
                        }
                    ]}
                >
                    <Input
                        placeholder='Enter Email'
                        style={{
                            width: "100%",
                            height: 50,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE"
                        }}
                        className='poppins placeholder:text-[#818181] placeholder:text-[14px] placeholder:font-normal placeholder:leading-6'
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Password</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Password"
                        }
                    ]}
                >
                    <Input.Password
                        placeholder='Enter Password'
                        style={{
                            width: "100%",
                            height: 50,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            color: "#818181",
                            fontSize: 16,
                            background: "#FEFEFE"
                        }}
                        className='custom-input'
                    />
                </Form.Item>

                <div className="flex justify-between items-center text-[#6A6D7C] mb-[22px]">
                    <Form.Item name="rememberMe" valuePropName="checked" noStyle>
                        <Checkbox className="text-[#818181] text-[16px] leading-[24px] font-normal">Remember me</Checkbox>
                    </Form.Item>

                    <Link href={"/forgotPassword"}>
                        <p className="text-[#FF9773] cursor-pointer text-[15px] leading-[27px] font-normal">
                            Forgot password
                        </p>
                    </Link>   
                </div>

                <Form.Item
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%"
                    }}
                >
                    <Button 
                        htmlType='submit'
                        style={{
                            width: 150,
                            height: 50,
                            background: "#00809E",
                            color: "#ffffff"
                        }}
                    >
                       Login
                    </Button>
                </Form.Item>

                <p className="text-[#636363] text-[16px] leading-[21px] font-normal text-center">
                    Don&apos;t have any account? 
                    <Link className='ml-2' href={"/register"}>
                        <span className='text-primary cursor-pointer font-semibold'>Sign up</span>
                    </Link> 
                </p>


            </Form>
        </div>
    )
}

export default LoginClient