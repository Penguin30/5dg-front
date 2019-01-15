<template>
  <v-layout cards justify-space-around row style="padding-top:30px">
     <v-icon v-on:click="close_card" class="close_card">clear</v-icon>
    <Product v-for='(value, key) in info'
      :productID='info[key].id'
      :images="info[key].img"
      :title='info[key].title'
      :description='info[key].desc'
      :priceTxt='products[0].priceTxt'
      :price='info[key].price'
      :type='info[key].type'
      :caption='products[0].caption'
      v-if='$store.state.cruiseSelected==0||$store.state.cruiseSelected==key'/>
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
		isVisible: false,
		info: null
      };
    },

    computed: {
        testit() {
            return this.$store.state.cruiseSelected;
        }
    },
	  methods: {
      set_info: function(data){
        console.log(this.isVisible);
        //this.info = data;
      },
      close_card(){
        let container = document.querySelector('.layout.row.cards');
        let cards     = document.body.querySelectorAll('.layout.row > .layout');

        let card      = container.getElementsByClassName('card');
        [].forEach.call(card, function(el) {
          el.style.display = 'unset';
          el.style.justifyContent = 'unset';
        });       

        document.getElementsByClassName('close_card')[0].style.display="none";

        let btns = document.querySelectorAll('.card .v-card__actions button');
        [].forEach.call(btns, function(el) {
          el.style.display="block";
        });

        let imgs = container.getElementsByClassName('v-image__image');
        [].forEach.call(imgs, function(el) {
          el.style.backgroundSize = "unset";
        });

        let sizers = document.getElementsByClassName('v-responsive__sizer');
        [].forEach.call(sizers, function(el) {
          el.style.paddingBottom="100%";
        });

        let div_stepper = document.querySelectorAll('.v-stepper');
        [].forEach.call(div_stepper, function(el){
          el.parentNode.style.display = 'none';
        });

        let flexs = document.querySelectorAll('.card > div');
        [].forEach.call(flexs, function(el) {
          el.classList.remove('lg4');
          el.classList.add('offset-sm3');
        });

        let descrs = document.getElementsByClassName('desr');
        [].forEach.call(descrs, function(el) {
          el.style.width="14vw";
        });
        this.isVisible = false;
      }
    },
	created() { 
		axios.get('http://5dg.utest.space/api/cruises?lg='+this.lang)
			.then(response => (this.info = response.data))
			.catch(error => console.log(error));
	}, 
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