 import { Context } from "@nuxt/types";
export default function ({$axios}:Context){
    $axios.onResponseError((error)=>{
       alert(error.response?.data?.detail[0]?.ErrorMessage)
    })
} 