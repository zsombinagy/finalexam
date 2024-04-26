<script setup lang="ts">
import { z } from "zod"
import { DataSchema, QueryMinAndMaxSchema } from "./modell";
import { getHotels} from "./api";
import { ref } from "vue"
import Hotels from "./components/Hotels.vue";



type QueryParamsType = z.infer<typeof QueryMinAndMaxSchema>
type Hotels = z.infer<typeof DataSchema>


const startScreen = ref<boolean>(true)
const inputDisplay = ref<boolean>(false)
const minValue = ref<number>(0)
const maxValue = ref<number>(1000)
const hotelsArray = ref<null | Hotels[]>(null)

const handleInputDisplays = () => {
  startScreen.value = false
  inputDisplay.value = true
}

const handleClickSearchButton = () => {
  inputDisplay.value = false
  handleGetLocation({min: +minValue.value, max: +maxValue.value})
  console.log(minValue.value +"|"+ maxValue.value)
} 

 
const handleGetLocation = async (params: QueryParamsType) => {
  const response = await getHotels(params)
  if (!response.success) return
  console.log(response.data)
  
  hotelsArray.value = response.data
  console.log(hotelsArray.value)
  
}




</script>

<template>
  <div v-if="startScreen" class="h-screen flex justify-center items-center">
    <button @click="handleInputDisplays" class="btn btn-primary btn-lg font-serif text-3xl">Start searching
      hotels</button>
  </div>
  <div v-if="inputDisplay" class="h-screen flex justify-center items-center">
    <div class="text-center">
      <h1 class="mb-5 text-white text-2xl font-serif">Enter the minimum and maximum hotel price in USD</h1>
      <div class="flex justify-center items-center gap-2">
        <input type="number" v-model="minValue" class="input input-bordered input-lg bg-neutral font-serif"
          placeholder="min">
        <input type="number" v-model="maxValue" class="input input-bordered input-lg bg-neutral font-serif"
          placeholder="max">
      </div>
      <button @click="handleClickSearchButton" class="btn btn-primary btn-lg font-serif text-3xl mt-3">Search</button>
    </div>

  </div>
  <div v-if="hotelsArray === null && inputDisplay === false && startScreen === false ">
    <div class="loading loading-spinner loading-lg"></div>
  </div>
  <div v-if="hotelsArray !== null">
    <Hotels :hotelsArray="hotelsArray" ></Hotels>
  </div>
  

</template>
