<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <img src="https://www.5degeneve.ch/5deGeneve.png" alt="5 de Geneve" width=230 height=45 />
            </v-toolbar-title>
            <v-spacer></v-spacer>
                <span style="font-style: italic; font-size: 25px;">PRIVATE CRUISE GENEVA LAKE</span>
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

            <RegisterAgency v-if="$cookies.isKey('token') === false"/>
            <v-btn v-on:click="logout" round color="error" v-if="$cookies.isKey('token') === true">
                <span class="mr-2">Logout</span>
            </v-btn>          
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

            <!-- <Admin></Admin> -->

            <Products :lang="$ml.current"/>
            
            <v-layout justify-space-around row style="padding-top:30px;position: relative;">
                <v-flex style="text-align: center;">
                    <div class="cruiseVideo">
                    <video id="video1" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="488" height="350" poster="@/assets/Video1.jpg" data-setup="{}">
                        <source src="https://www.5degeneve.ch/storage/Video1.mp4" type='video/mp4'>
                    </video>
                    </div>
                </v-flex>
                <v-flex>
                    <div class="cruiseVideo">
                    <video id="video2" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="488" height="350" poster="@/assets/Video2.jpg" data-setup="{}">
                        <source src="https://www.5degeneve.ch/storage/Video2.mp4" type='video/mp4'>
                    </video>
                    </div>
                </v-flex>
            </v-layout>

            <v-layout justify-space-around row><ListOrders v-if="$cookies.isKey('token') === true && $cookies.get('role') == 3"/></v-layout>

            <v-layout justify-space-around row><AdminListOrders v-if="$cookies.isKey('token') === true && $cookies.get('role') == 1"/></v-layout>

             <v-layout justify-space-around row><AdminListTa v-if="$cookies.isKey('token') === true && $cookies.get('role') == 1"/></v-layout>
        </v-content>

        
        <Footer/>
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
    import RegisterAgency from './components/RegisterAgency';
    import Products from './components/Products';
    import axios from 'axios';
    import Product from './components/Product';
    import Footer from './components/Footer';
    import ListOrders from './components/ListOrders';
    import Admin from './components/Admin';
    import AdminListOrders from './components/AdminListOrders';
    import AdminListTa from './components/AdminListTa';

    export default {
        name: 'App',
        components: {
            RegisterAgency,
            Products,
            Footer,
            ListOrders,
            Admin,
            AdminListOrders,
            AdminListTa
        },
        methods: {
            logout(){
                this.$cookies.remove('token');
                this.$cookies.remove('role');
                this.$cookies.remove('email');
                location.reload();
            },
            change_lang: function(lang,$ml){ 
                axios.get('https://www.5degeneve.ch/api/cruises?lg='+lang)
                .then(response => (
                    $ml.change(lang),
                    this.$store.state.info = response.data
                ))
                .catch(error => console.log(error));                
            }
        },
        created(){
            var userLang = navigator.language || navigator.userLanguage; 
            (userLang == 'ru-RU') ? this.$ml.change('russian') : (userLang == 'en-EN') ? this.$ml.change('english') : (userLang == 'fr-FR') ? this.$ml.change('french') : (userLang == 'de-DE') ? this.$ml.change('deutsch') : (userLang == 'ch-CH') ? this.$ml.change('chinese') : (userLang == 'ar-AR') ? this.$ml.change('arabic') : this.$ml.change('english')
        },
        data() {
            return {
                mainImages: [
                    {src: './img/main/main1.jpg'},
                    {src: './img/main/main2.jpg'},
                    {src: './img/main/main3.jpg'}
                ]
            }
        }
    }
</script>
