import { getFromLocalStorage } from "@/util/localStorage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const token = getFromLocalStorage("romzzToken");
export const romzzApi = createApi({
  reducerPath: "romzzApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://192.168.10.18:5000/api/v1",
    //
  }),
  endpoints: () => ({}),
  tagTypes: ["property", "Contact"],
});

export const imageUrl = "http://192.168.10.18:5000/";