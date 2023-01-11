<template>
    <div>
        <div class="pesquisa">
            <v-row>
                <v-col>
                    <h1>Cadastro de Marca</h1>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-if="brandObject.id">
                    {{ 'Código: '+ brandObject.id }}
                </v-col>
                <v-col v-if="brandObject.id">
                    <v-switch
                    v-model="brandObject.active"
                    outlined
                    label="Ativo">
                    </v-switch>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="brandObject.description"
                    outlined
                    label="Descrição"
                    ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-text-field
                    v-model="brandObject.mainSupplier"
                    outlined
                    label="Fornecedor"
                    >
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn  outlined to="/brand">Voltar</v-btn>
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
import { apiRoute } from '~/utilities/const'

interface IBrand{
    id: number
    description: string
    mainSupplier: string
    active: boolean
}

export default Vue.extend({
    data(){
        return{
            brandObject:{} as IBrand,
            isEditing:false
        }
    },
    created(){
  const id = parseInt(this.$route.params.id)
        // se for um numero chama a função editar e passa o id
        if (!isNaN(id)){
            this.editing(id)
        }
    },
    methods:{
        async editing(id:number){
            this.brandObject = await this.$axios.$get(`${apiRoute}/Brand/${id}`)
            this.isEditing = true
        },  
        async validateAndSave(){
            if(!this.brandObject.description){
            alert('Descrição deve ser preenchida')}      

            if(this.brandObject.description.length > 30){
            alert('Tamanho máximo da descrição atingido')

            if(this.brandObject.mainSupplier.length > 150)
            alert('Tamanho máximo do fornecedor atingido')

            if(this.isEditing){
            await this.$axios.$put(`${apiRoute}/Brand/${this.brandObject.id}`, this.brandObject)
            alert('Marca salva')
            this.$router.push('/brand')}
                
            else{
                await this.$axios.$post(apiRoute + '/Brand',this.brandObject) 
            alert ('Marca salva')  
     
             }
        }
    }
}
})

</script>