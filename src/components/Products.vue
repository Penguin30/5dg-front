<template>
  <v-layout justify-space-around row style="padding-top:30px;position: relative;">

    <Product v-for='(value, key) in info'
      :key='info[key].id'
      :productID='info[key].id'
      :images="info[key].img"
      :title='info[key].title'
      :description='info[key].desc'
      :priceTxt='$store.state.curr_code'
      :price='info[key].price*$store.state.rate'
      :timeStart='info[key].time_start'
      :timeEnd='info[key].time_end'
      :type='info[key].type'
      :caption='products[0].caption'
      v-if='$store.state.reservation.cruiseID==0||$store.state.reservation.cruiseID==info[key].id'/>
  </v-layout>
</template>

<style>
  .close_card{
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    height: 60px;
  }
</style>
<script>
  import { MLBuilder } from 'vue-multilanguage';
  import Product from './Product';
  import axios from 'axios';

  export default {
    components: {
     	Product,
    },
    props: ['lang'],
    watch: {
      lang: function () {
        if(this.lang != 'english'){
          this.info[0].desc  = this.$store.state.info[0].translations[0].value;
          this.info[0].title = this.$store.state.info[0].translations[1].value;

          this.info[1].desc  = this.$store.state.info[1].translations[0].value;
          this.info[1].title = this.$store.state.info[1].translations[1].value;

          this.info[2].desc  = this.$store.state.info[2].translations[0].value;
          this.info[2].title = this.$store.state.info[2].translations[1].value; 
        }else{
          this.info = this.$store.state.info;
        }
      }
    },
    data() {
      return {
        products: [
          {
            imageSrc: 'https://cdn.vuetifyjs.com/images/cards/desert.jpg',
            title: 'Boat Cruise',
            description: 'Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...',
            priceTxt: 'priceTxt',
            price: '486',
            caption: 'Learn more'
          }
        ],
        lang: '',
		isVisible: false,
		info: null
      };
    },

    computed: {
        testit() {
            return this.$store.state.reservation.cruiseID;
            return this.$store.state.info;
        }
    },
	created() { 
		axios.get('https://www.5degeneve.ch/api/cruises?lg='+this.lang)
			.then(response => (this.info = response.data))
			.catch(error => console.log(error));
	}  
  }
</script>
<style>
  .desr {
    width: 14vw;
    word-break: break-all;
  }
  .v-card{
    height: 100%;
  }
</style>