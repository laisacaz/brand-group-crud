<template>
    <div>
        <div class="pesquisa">
            <v-row justify="center">
                 <v-col cols="2px">
                     <h1>Pesquisa de grupos</h1>
                </v-col>
                <v-col cols="auto">
                    <v-btn color="primary" rounded to="/Group/cadastrar">Cadastrar</v-btn>
                </v-col>
             </v-row>
             <v-row>
                <v-col cols="2px">
                    <v-text-field
                    v-model="searchParameters.Description"
                    outlined
                    :label="headers[1].text"> 
                     </v-text-field>
                </v-col>
                <v-col cols="auto">
                     <v-switch
                        v-model="searchParameters.Active"
                        outlined
                        label="Ativo"     
                     >
                     </v-switch>      
                </v-col>
                <v-col cols="auto">
                   <v-switch
                    v-model="searchParameters.EnableSubgroup"
                    outlined
                    :label="headers[2].text"
                    >
                   </v-switch>     
                </v-col>
                <v-col cols="auto">
                    <v-btn outlined rounded @click="fetchSearch">
                        Pesquisar</v-btn>
                </v-col>
                </v-row>
             <v-row>
                  <v-col cols="20">
                    <v-data-table
                        :headers="headers"
                        :items="responseData"
                        :items-per-page="itemsPerPage"
                    >
                    <template #[`item.edit`]="{item}">
                      <v-icon color="primary" @click="editItem(item.id)">
                    mdi-pencil
                    </v-icon>  
                    </template>
                     </v-data-table>
                  </v-col>
             </v-row>
        </div>
     </div>
</template>


<script lang="ts">
import Vue from 'vue' 
import { DataTableHeader} from 'vuetify/types'
import { apiRoute } from '@/utilities/const'

 interface ISearchResponse<T>{ 
    data: Array<T>
    recordCount: number
} 
// interface da entitie 

interface ISearchParams {
    Description?: string
    Id?: number
    Subgroup?: string
    EnableSubgroup?: boolean
    Active?: boolean
    PageNumber?: number
    PageSize?: number
}

interface IGroupSearchItem{
    id: number
    description: string
    enableSubgroup: boolean
    active: boolean
    subgroup: string
}

export default Vue.extend({
    data(){
        return{
            headers: [
                {text: 'Código', value: 'id', width: 130},
                {text: 'Descrição', value: 'description', width:'50%'},

                {text: '', value: 'edit', sortable:false },
                        ] as DataTableHeader[],
            responseData: [] as IGroupSearchItem[],
            itemsPerPage:0,
            searchParameters:{
                EnableSubgroup:true,
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
            const response = await this.$axios.$get<ISearchResponse<IGroupSearchItem>>(
                apiRoute + '/Group/search',
                { params: this.searchParameters}
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
    margin-left: 10cm;
    width: 700px;
    height: 1000px;
}
</style>