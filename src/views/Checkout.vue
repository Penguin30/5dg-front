<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <span class="font-weight-light">5 de Gen&egrave;ve </span>
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
            
            <PayPal
              amount="100"
              currency="USD"
              :client="credentials"
              env="sandbox">
            </PayPal>
            
            <!--
            <v-layout justify-space-around row style="padding-top:30px;position: relative;">
                <v-flex style="text-align: center;">
                    <div class="cruiseVideo">
                    <video id="video1" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="488" height="350" poster="@/assets/Video1.jpg" data-setup="{}">
                        <source src="https://srv.5degeneve.ch/storage/Video1.mp4" type='video/mp4'>
                    </video>
                    </div>
                </v-flex>
                <v-flex>
                    <div class="cruiseVideo">
                    <video id="video2" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="488" height="350" poster="@/assets/Video2.jpg" data-setup="{}">
                        <source src="https://srv.5degeneve.ch/storage/Video2.mp4" type='video/mp4'>
                    </video>
                    </div>
                </v-flex>
            </v-layout>-->

            <v-layout justify-space-around row><ListOrders v-if="$cookies.isKey('token') === true && $cookies.get('role') == 3"/></v-layout>

            <v-layout justify-space-around row><AdminListOrders v-if="$cookies.isKey('token') === true && $cookies.get('role') == 1"/></v-layout>

             <v-layout justify-space-around row><AdminListTa v-if="$cookies.isKey('token') === true && $cookies.get('role') == 1"/></v-layout>
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
    import Products from '../components/Products';
    import RegisterAgency from '../components/RegisterAgency';
    import axios from 'axios';
    import GTU from '../components/GTU';
    import PayPal from 'vue-paypal-checkout';

    export default {
        name: 'App',
        components: {
            RegisterAgency,
            GTU,
            PayPal
        },
        methods: {
            logout(){
                this.$cookies.remove('token');
                this.$cookies.remove('role');
                location.reload();
            },
            change_lang: function(lang,$ml){ 
                axios.get('https://srv.5degeneve.ch/api/cruises?lg='+lang)
                .then(response => (
                    $ml.change(lang),
                    this.$store.state.info = response.data
                ))
                .catch(error => console.log(error));                
            }
        },
        created(){
            var userLang = navigator.language || navigator.userLanguage; 
            (userLang == 'ru-RU') ? this.$ml.change('russian') : (userLang == 'en-EN') ? this.$ml.change('english') : (userLang == 'fr-FR') ? this.$ml.change('french') : (userLang == 'de-DE') ? this.$ml.change('deutsch') : (userLang == 'ch-CH') ? this.$ml.change('chinese') : (userLang == 'ar-AR') ? this.$ml.change('arabic') : this.$ml.change('english');
            
        },
        data() {
            return {
                credentials: {
                    sandbox: 'Aft68bXaah3C8yR-P7D3miakX_dWgN6wJkGW8EDMAfwE8YCebXq2KytvN6HPYCZ3tgjNHyuN9H9yamjf',
                    production: '<production client id>'
                },
                mainImages: [
                    {src: './img/main/main1.jpg'},
                    {src: './img/main/main2.jpg'},
                    {src: './img/main/main3.jpg'}
                ]
            }
        }
    }
</script>
