<template>
  <div>
    <v-time-picker v-on:input="choose" format="24hr" v-model="picker" landscape=true></v-time-picker>
  </div>
</template>
<script>
  import { MLBuilder } from 'vue-multilanguage';
  export default {
    data () {
      return {
        picker: null
      }
    },
    methods: {
    	choose: function (event) {
	        if(event){
	        	axios.get('https://www.8dg.ch/api/check_date_time')
					.then(response => (this.info = response.data))
					.catch(error => console.log(error));
	        }
      	}
    }
  }
</script>