<template>
 <div class="pesquisa">
    <v-row justify="center">
        <v-col cols="2px">
            <h1>Pesquisa de Marcas</h1>
        </v-col>
        <v-col cols="auto">
            <v-btn color="primary" rounded to="Brand/cadastrar"> Cadastrar</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col cols="auto">
            <v-text-field
           v-model="searchParameters.Description"
           outlined
            :label="headers[1].text"
            ></v-text-field>
        </v-col>
        <v-col cols="auto">
            <v-text-field
            v-model="searchParameters.MainSupplier"
            outlined
            :label="headers[2].text">
            </v-text-field>
        </v-col>
        <v-col>
            <v-switch
            v-model="searchParameters.Active"
            outlined
            label="Ativo"></v-switch>
        </v-col>
        <v-col cols="auto">
            <v-btn outlined rounded @click="fetchSearch">Pesquisar</v-btn>
        </v-col>
    </v-row>
    <v-row>
        <v-col>
            <v-data-table
            :headers="headers"
            :items="responseData"
            :items-per-page="itemsPerPage"
            >
            <template #[`item.edit`]="{item}">
                <v-icon color="primary" @click="editItem(item.id)">
                    mdi-pencil</v-icon>

            </template>
            </v-data-table>
        </v-col>
    </v-row>
 </div>   
</template>

<script lang="ts">
import Vue from 'vue'
import { DataTableHeader } from 'vuetify/types'
import { apiRoute } from '@/utilities/const'

interface ISearchResponse<T>{
data: Array<T>
recordCount: number     
}

interface ISearchParams{
Id: number
Description?: string
MainSupplier?: string
Active?: boolean
PageNumber?: number
PageSize?: number
}

interface IBrandSearchItem{
id: number
description: string
mainSupplier: string
active: boolean
}
 export default Vue.extend({
    data(){
        return{
            headers:[
                 {text:'Código', value:'id', width:130},
                 {text: 'Descrição', value: 'description', width:"50%"},
                 {text: 'Fornecedor', value: 'mainSupplier', width:"30%"},
                 {text: '', value: 'edit', sortable:false },

            ] as DataTableHeader[],
            responseData: [] as IBrandSearchItem[],
            itemsPerPage:0,
            searchParameters:{
                Active:true,
                PageSize: 10,
                PageNumber: 1,
            } as ISearchParams,
         }
        
    },
created(){
    this.fetchSearch()
},
   
methods: {
        async fetchSearch(){
            const response = await this.$axios.$get<ISearchResponse<IBrandSearchItem>>(
                apiRoute + '/Brand/search',
                { params: this.searchParameters }
            )
            this.responseData = response.data
           this.itemsPerPage = response.recordCount
            },
            async editItem(id:number){
                await this.$router.push(`${this.$route.path}/${id}`)
            }
        },
        })
</script>

<style>
.h1{
    text-align: center;
}

.pesquisa{
    margin-left: 8cm;
    width: 800px;
    height: 1000px;
}

</style>