"use client"
import Heading from '@/components/shared/Heading';
import { Button, Form, Input, Select } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useSignUpMutation } from '@/redux/apiSlices/AuthSlices';
import Swal from 'sweetalert2';
import { setToLocalStorage } from '@/util/localStorage';

const RegisterClient = () => { 
    const [signUp , {isSuccess ,isError ,data ,error}] = useSignUpMutation() 
    //console.log(data);
    const router = useRouter(); 
    const [form] = Form.useForm()

    const handleSubmit = async (values: any) => { 
        const nidNo = parseInt(values?.nidNumber) 
        const {confirm_password , nidNumber , permanentLocation ,  ...otherValues} = values   
        const data = { 
            permanentLocation:{
                address: permanentLocation
            } ,
            nidNumber:nidNo ,
            ...otherValues
        }
        //console.log(data); 
        const userData = {
            email:values?.email ,
            verificationType:"emailVerification"
        }
        // router.push('/');   
        await signUp(data).then((res)=>{ 
            //console.log(res);
            if(res?.data?.success){
                Swal.fire({
                    title: "Register Successful",
                    icon: "success",
                    timer: 1500,
                    showConfirmButton: false
                  }).then(() => {  
                      router.push("/otp-verify");    
                      setToLocalStorage("userData" , JSON.stringify(userData))
                    form.resetFields()
                  });
            }else{
                Swal.fire({
                //@ts-ignore
                    text: res?.error?.data?.message,  
                    icon: "error",
                  });
            }
        }) 
    };
    
    return (
        <div>
            <Heading name='Sign up' style='font-semibold text-[24px] leading-[32px] text-[#333333] text-center mb-6' />
            <p className='font-normal text-[14px] leading-[14px] text-[#5C5C5C] text-center mb-6' >Please Enter Your Personal Data</p>

            <Form 
                onFinish={handleSubmit} 
               layout='vertical'
                className='grid grid-cols-12 gap-6' 
                form={form}
            >
                <Form.Item
                    name="fullName"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Full Name</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Full Name Name!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Full Name Name'
                        style={{
                            width: "100%",
                            height: 48,
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
                    name="email"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Email</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Email!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Email'
                        style={{
                            width: "100%",
                            height: 48,
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
                    name="phoneNumber"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Phone </p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter Phone Number"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Phone Number'
                        style={{
                            width: "100%",
                            height: 48,
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
                    name="permanentLocation"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>ID Address</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter ID Address"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input
                        placeholder='Enter Your ID Address'
                        style={{
                            width: "100%",
                            height: 48,
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
                    name="nidNumber"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>ID No</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Enter ID Number!"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input  
                    type='number'
                        placeholder='Enter Your ID Number'
                        style={{
                            width: "100%",
                            height: 48,
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
                    name="gender"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>ID Gender</p>}
                    rules={[
                        {
                            required: true,
                            message: "Please Select Your ID Gender"
                        }
                    ]}
                    style={{marginBottom: 0}}
                    className='col-span-6 customSelect'
                >
                    <Select
                        placeholder='Select Your ID Gender'
                        style={{
                            height: 48,
                            borderRadius: 24
                        }}
                        
                        suffixIcon={
                            <div className='w-10 h-10 rounded-full bg-[#E6F2F5] flex items-center justify-center'>
                                <ChevronDown size={24} color='#00809E' />
                            </div>
                        }
                    >
                        <Select.Option value="male">Male</Select.Option>
                        <Select.Option value="female">Female</Select.Option>
                    </Select>
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
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input.Password
                        placeholder='Enter Password'
                        className='placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6'
                        style={{
                            width: "100%",
                            height: 48,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE"
                        }}
                    />
                </Form.Item>

                <Form.Item
                    name="confirm_password"
                    label={<p className='font-medium text-[16px] leading-6 text-[#636363]'>Confirm Password</p>}
                    rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(new Error('The new password that you entered do not match!'));
                          },
                        }),
                      ]}
                    style={{marginBottom: 0}}
                    className='col-span-6'
                >
                    <Input.Password
                        placeholder='Enter Confirm Password'
                        className='placeholder:text-[#818181] placeholder:text-[16px] placeholder:font-normal placeholder:leading-6'
                        style={{
                            width: "100%",
                            height: 48,
                            boxShadow: "none",
                            outline: "none",
                            border: "1px solid #E0E0E0",
                            borderRadius: 24,
                            background: "#FEFEFE"
                        }}
                    />
                </Form.Item>

                <Form.Item
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        marginBottom: 0
                    }}
                    
                    className='col-span-12'
                    
                >
                    <Button 
                        htmlType='submit'
                        style={{
                            width: 150,
                            height: 48,
                            background: "#00809E",
                            color: "#ffffff"
                        }}
                    >
                        {"Sign up"}
                    </Button>
                </Form.Item>

                <p className="text-[#636363] col-span-12 text-[16px] leading-[21px] font-normal text-center">
                    Have any account? 
                    <Link className='ml-2' href={"/login"}>
                        <span className='text-primary cursor-pointer font-semibold'>Login</span>
                    </Link> 
                </p>
            </Form>
        </div>
    )
}

export default RegisterClient