<script setup lang="ts">
import { ref } from 'vue'
import { z } from "zod"
import { DataSchema } from '../modell';
import { getSingleHotel } from '../api';
type Hotel = z.infer<typeof DataSchema>

const { hotelsArray } = defineProps<{

    hotelsArray: Hotel[]

}>()

const singleHotel = ref<null | Hotel>(null)
const loading = ref<boolean>(false)





const handleGetSingleLocation = async (object: { includes: string }) => {
    const response = await getSingleHotel(object)
    if (!response.success) return
    console.log(response.data)

    singleHotel.value = response.data[0]
    loading.value = false
}

const handleClickSeeMore = (object: { includes: string }) => {
    loading.value = true
    handleGetSingleLocation(object)





}


</script>

<template>
    <div v-if="singleHotel === null && loading === false" class="flex gap-8 flex-wrap p-8">
        <div class="flex card card-body w-[300px] bg-primary text-primary-content text-center h-[200]"
            v-for="hotel of hotelsArray">
            <h1 class="font-bold mb-2">{{ hotel.name }}</h1>
            <p>{{ hotel.pricePerNightInUSD }}</p>
            <button @click="() => handleClickSeeMore({ includes: hotel.name })" class="btn btn-neutral">See
                more...</button>

        </div>
    </div>
    <div v-if="loading">
        <div class="loading loading-spinner loading-lg"></div>
    </div>
    <div v-if="singleHotel" class="h-screen flex justify-center items-center">
        <div class="flex card card-body bg-primary text-primary-content text-center w-[200] h-[200]">
            <h1 class="font-bold mb-2">{{ singleHotel.name }}</h1>
            <p>{{ singleHotel.pricePerNightInUSD }}</p>
        </div>

    </div>
    <!-- <button @click="$emit('back')">Back</button> -->

</template>
