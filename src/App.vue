<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-light">5 de Genève - PRIVATE CRUISE GENEVA LAKE</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn 
                v-for="lang in $ml.list"
                :key="lang"
                @click="change_lang(lang,$ml)"
                flat 
                icon 
            >
                <img :src="require(`@/assets/${lang}.png`)" :alt="lang" height=35 />
            </v-btn>

            <RegisterAgency/>
        </v-toolbar>
       
        <v-content style="padding-bottom:100px;">
            <v-carousel>
                <v-carousel-item
                    v-for="(item,i) in mainImages"
                        :key="i"
                        :src="item.src"
                >
                    <v-layout column align-center justify-center class="white--text"></v-layout>
                </v-carousel-item>
            </v-carousel>
              
            <Products :lang="$ml.current"/>

            <v-layout justify-space-around row style="padding-top:30px;position: relative;">
                <v-flex style="text-align: center;">
                    <div class="cruiseVideo">
                    <!-- <video id="video1" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="488" height="350" poster="" data-setup="{}">
                        <source s rc="" type='video/mp4'> -->
                    </video>
                    </div>
                </v-flex>
                <v-flex>
                    <div class="cruiseVideo">
                    <!-- <video id="video2" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="488" height="350" poster="" data-setup="{}">
                        <source src="" type='video/mp4'>
                    </video> -->
                    </div>
                </v-flex>
            </v-layout>

  
        </v-content>


        <v-footer dark height="auto">
            <v-card class="flex" flat tile>
                <v-card-actions class="grey darken-3 justify-center">&copy;2018 by 5 de Geneve   <GTU></GTU></v-card-actions>
            </v-card>
        </v-footer>
    </v-app>
</template>

<style>
    .cruiseVideoI {
        text-align: center;
        width: 588px;
        height: 350px;
        float:right;
    }
    .cruiseVideoO {
        text-align: center;
    }
    .cruiseVideo {
      float: left;
      position: relative;
      left: 25%;
    }
</style>

<script>
    import { MLBuilder } from 'vue-multilanguage';
    import Products from './components/Products';
    import RegisterAgency from './components/RegisterAgency';
    import axios from 'axios';
    import Product from './components/Product';
    import GTU from './components/GTU';

    export default {
        name: 'App',
        components: {
            Products,
            RegisterAgency,
            GTU
        },
        methods: {
            change_lang: function(lang,$ml){ 
                axios.get('https://srv.5degeneve.ch/api/cruises?lg='+lang)
                .then(response => (
                    $ml.change(lang),
                    this.$store.state.info = response.data
                ))
                .catch(error => console.log(error));                
            }
        },
        data() {
            return {
                mainImages: [
                    {src: '../img/main/main1.jpg'},
                    {src: './img/main/main2.jpg'},
                    {src: './img/main/main3.jpg'}
                ]
            }
        }
    }
</script>
