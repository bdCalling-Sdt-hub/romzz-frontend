import { romzzApi } from "../api/api";

const ClientProfileSlices = romzzApi.injectEndpoints({
    endpoints:(builder)=>({   

//  Booking History  
 getBookingHistory:builder.query({
    query:()=>""
 }) ,  

 createBookingPost:builder.mutation({
    query:(value)=>{
 return{
    url:"/properties" ,
    method:"POST" ,
    body:value
 }
    }
 }) , 

 getFacilities:builder.query({
   query:()=>{
      return{
         url:"/facilities"
      }
   }
 }) , 

//  Subscription  
  getSubscription:builder.query({
   query:()=>({
      url:"/pricing-plans"
   })
  })
  

      })
     })  
     export const {useGetBookingHistoryQuery , useCreateBookingPostMutation ,useGetFacilitiesQuery  , useGetSubscriptionQuery} = ClientProfileSlices
