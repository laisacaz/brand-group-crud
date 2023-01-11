<template>
    <div>
        <div class="pesquisa">
            <v-row justify="center">
            <v-col cols="auto">
              <h1>Cadastro de grupo</h1>
            </v-col>
        </v-row>
        <v-row justify="center"> 
            <v-col  v-if="groupObject.id">
              {{ 'Código: '+ groupObject.id }}  
            </v-col>
            <v-col  v-if="groupObject.id">
                <v-switch
                v-model="groupObject.active"
                outlined
                label="Ativo"
                ></v-switch>
            </v-col>
            <v-col>
                <v-switch
                v-model="groupObject.enableSubgroup"
                outlined
                label="Subgrupo"></v-switch>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                v-model="groupObject.description"
                outlined
                label="Descrição">
            </v-text-field>
            </v-col>
        </v-row>
        <v-row v-if="groupObject.enableSubgroup" justify=center>
            <v-col>
                <v-text-field
                v-model="groupObject.subgroup"
                outlined
                label="Subgrupo">
            </v-text-field>
            </v-col>
        </v-row>
        <v-row justify="end">
           <v-col>
            <v-btn outlined to="/group">Voltar</v-btn>
           </v-col> 
           <v-col>
            <v-btn color="primary" @click="validateAndSave">Salvar</v-btn>
           </v-col>
        </v-row>    
        </div>
    </div>
</template>


<script lang="ts">
 import Vue from 'vue'
 import { apiRoute } from '@/utilities/const'

interface IGroup{
    id: number
    description: string
    enableSubgroup: boolean
    subgroup: string 
    active: boolean
}

export default Vue.extend({
    data(){
        return{
            groupObject:{} as IGroup,
            isEditing:false
        }
    },
    created(){
        // pega id da rota
        const id = parseInt(this.$route.params.id)
        // se for um numero chama a função editar e passa o id
        if (!isNaN(id)){
            this.editing(id)
        }
    },
    methods:{
       
        async editing(id:number){
            this.groupObject = await this.$axios.$get(`${apiRoute}/Group/${id}`)
            this.isEditing = true
        },
        async validateAndSave(){
            if (!this.groupObject.description){
            alert('Descrição obrigatória')}   

            if(this.groupObject.description.length > 30){
            alert('Descrição excede tamanho máximo')    
            }

            if(this.isEditing){
            await this.$axios.$put(`${apiRoute}/Group/${this.groupObject.id}`, this.groupObject)
            alert('Grupo salvo') }
            
         else{
             await this.$axios.$post(apiRoute + '/Group',this.groupObject)   
             alert('Grupo salvo') 
         }   
        },
    }  
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