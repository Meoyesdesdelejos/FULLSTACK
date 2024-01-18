<template>
    <div class='users'>
        <style>
        h2 {
        margin-bottom: 50px;
        li {
            margin-bottom: 50px;  
        }
        form{
        margin-bottom: 25px;
        font-size: 20px;
        color:blue;    
        }
        </style>

        <h2>DATOS REGISTRADOS</h2>
        <ul>
            <li v-for='dog in dogs'> 
                <button v-on:click='deleteDog(dog)'>  BORRAR  </button>
                {{dog.nombre}} - {{ dog.f_nac}} - {{ dog.edad }}  - {{ dog.raza }}
                
            </li>
        </ul>
    
        <form v-on:submit='addDog'>        
            <input type='text' v-model='newDog.nombre' placeHolder='nombre'>
            <input type='text' v-model='newDog.f_nac' placeHolder='fechadenacimiento'>
            <input type='text' v-model='newDog.edad' placeHolder='edad'>
            <input type='text' v-model='newDog.raza' placeHolder='raza'>
            <button type='submit'> GUARDAR </button>
        </form> <br>
    </div>
</template>

<script>
import axios from "axios";

export default{    
    data(){ 
        return {            
            dogs: [],
            newDog: {},
            backend_server: 'http://127.0.0.1:3000'
        }
    },
    methods:{
        addDog(e){
            e.preventDefault(); 
            var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}

            axios.post(this.backend_server + '/dogs', this.newDog, { config_request })
            .then(res => {                                         
                this.dogs.push(res.data);
                this.newDog = {};
            })
            .catch((error) => {
                console.log(error)
            });    
            
        },
        deleteDog(dog){
            var config_request={'Content-Type': 'application/json','Access-Control-Allow-Origin': '*'}

            axios.delete(this.backend_server + '/dogs/' + dog._id, {}, { config_request })
            .then(res => {                                         
                this.dogs.splice(this.dogs.indexOf(dog), 1);
            })
            .catch((error) => {
                console.log(error)
            });  
        }
    },
    created(){                
        axios.get(this.backend_server + "/dogs")
        .then(res => {
            this.dogs = res.data;
            console.log(this.dogs);
        });
    }

}
</script>