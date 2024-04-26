import { safeFetch } from "../lib/http";
import { DataSchema, QueryMinAndMaxSchema } from "../modell";
import {z} from "zod"

type QueryParamsType = z.infer<typeof QueryMinAndMaxSchema>


export const getHotels = (params: QueryParamsType) => 
    safeFetch({
        method: "GET",
        url: `http://localhost:3000/api/hotels?min=${params.min}&max=${params.max}`,
        schema: DataSchema.array()
    })



export const getSingleHotel = (hotelNameObject: {includes: string}) => 
    safeFetch({
        method: "GET",
        url: `http://localhost:3000/api/hotels?${new URLSearchParams(hotelNameObject)}`,
        schema: DataSchema.array()
    })