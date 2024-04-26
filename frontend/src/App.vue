<script setup lang="ts">
  import {z} from "zod"
import { QueryMinAndMaxSchema } from "./modell";
import { getHotels, getSingleHotel } from "./api";


  type QueryParamsType = z.infer<typeof QueryMinAndMaxSchema> 
    const handleGetLocation = async (params: QueryParamsType) => {
      const response = await getHotels(params)
      if (!response.success) return

      console.log(response.data)
    }

    handleGetLocation({min: 100, max: 300})

  const handleGetSingleLocation = async (object: {includes: string}) => {
    const response = await getSingleHotel(object)
    if(!response.success) return

    console.log(response.data)

  }

  handleGetSingleLocation({includes: 'Hotel Whatever'})
</script>

<template>
  <div class="card card-body bg-black">Hello</div>

</template>


