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
                <span class="mr-2">{{ $ml.get('logout') }}</span>
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
            <Products :lang="$ml.current"/>

            <v-layout justify-space-around row style="padding-top:30px;position: relative;">
                <v-flex style="text-align: center;">
                    <div class="cruiseVideo">
                    <video id="video1" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="none" width="488" height="350" poster="@/assets/Video1.jpg" data-setup="{}">
                        <source src="https://www.5degeneve.ch/storage/Video1.mp4" type='video/mp4'>
                    </video>
                    </div>
                </v-flex>
                <v-flex>
                    <div class="cruiseVideo">
                    <video id="video2" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="none" width="488" height="350" poster="@/assets/Video2.jpg" data-setup="{}">
                        <source src="https://www.5degeneve.ch/storage/Video2.mp4" type='video/mp4'>
                    </video>
                    </div>
                </v-flex>
            </v-layout>

            <v-layout justify-space-around row><ListOrders v-if="$cookies.isKey('token') === true && $cookies.get('role') == 3"/></v-layout>

            <v-layout v-if="$cookies.isKey('token') === true && $cookies.get('role') == 1">
                <v-flex xs12>
                    <AdminListOrders/>
                </v-flex>
            </v-layout>

            <v-layout v-if="$cookies.isKey('token') === true && $cookies.get('role') == 1">
                <v-flex xs12>
                    <AdminListTa/>
                </v-flex>
            </v-layout>

            
            <v-layout justify-space-around row v-if="$cookies.isKey('token') === true && $cookies.get('role') == 1">
                <v-form ref="block" v-model="block_date">
                    <v-flex xs12>
                        <v-flex col-6 style="padding-left:10px; padding-bottom:20px">
							<label>{{ $ml.get('s_time') }}</label>
							<datetime v-model="block_startDate" class="input-date" type="time" :minute-step=15 />
						</v-flex>
						<v-flex col-6 style="padding-left:10px; padding-bottom:20px">
							<label>{{ $ml.get('e_time') }}</label>
							<datetime v-model="block_endDate" class="input-date" type="time" :minute-step=15 />
						</v-flex>
						<v-flex xs12>
							<v-date-picker
								v-model="block_date"
                                :min='new Date().toISOString()'
							  />
						</v-flex>

						<v-flex xs12 class="m-t-10">
							<label>{{dateError}}</label>
						</v-flex>
                        <v-btn
                          :disabled="!block_date"
                          @click="validate"
                        >
                          Block
                        </v-btn>
                    </v-flex>
                </v-form>
            </v-layout>
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
    import {RotateSquare} from 'vue-loading-spinner';
    import { Datetime } from 'vue-datetime';
    import 'vue-datetime/dist/vue-datetime.css';

    export default {
        name: 'App',
        components: {
            RegisterAgency,
            Products,
            Product,
            Footer,
            ListOrders,
            Admin,
            AdminListOrders,
            AdminListTa,
            RotateSquare,
            Datetime
        },
        methods: {
            validate(){
                if (this.$refs.block.validate()) {
                    let data = {
                        date: this.block_date,
                        time_start: this.block_startDate,
                        time_end: this.block_endDate
                    }
                    axios.post('https://www.5degeneve.ch/api/block_date',{data})
                    .then(response => ((response.data == 1) ? (this.dateError = 'Date blocked') : (response.data == 2) ? this.dateError = "You can't block this date, bacause you have cruise(s) on this day!" : location.reload()))
                    .catch(error => console.log(error));    
                }
            },
            logout(){
                this.$cookies.remove('token');
                this.$cookies.remove('role');
                this.$cookies.remove('email');
                location.reload();
            },
            change_lang: function(lang){ 
                let code = (lang == 'english') ? 'CHF_USD' : (lang == 'french') ? 'CHF_EUR' : (lang == 'deutsch') ? 'CHF_EUR' : (lang == 'russian') ? 'CHF_RUB' : (lang == 'chinese') ? 'CHF_CYN' : (lang == 'arabic') ? 'CHF_USD' : 'CHF';                                    
                if(code != 'CHF')
                    axios.get('https://www.5degeneve.ch/api/get_rate?code='+code)
                    .then(res => {
                        if(Math.round(res.data,2) == 0){
                            this.$store.state.rate = 1;
                            this.$store.state.curr_code = 'CHF';
                        }else{
                            this.$store.state.rate = Math.round(res.data,2);
                            this.$store.state.curr_code = code.replace('CHF_','');
                        }
                        axios.get('https://www.5degeneve.ch/api/cruises?lg='+lang)
                        .then(response => {
                            this.$store.state.info = response.data;
                            this.$ml.change(lang);                    
                        })
                        .catch(error => console.log(error)); 
                    })
                    .catch(error => (console.log(error)))
                else
                    this.$store.state.rate = 1;           
            },
        },
        created(){
            axios.get('https://www.5degeneve.ch/api/me')
            .then()
            .catch(error => console.log(error)); 
            var userLang = navigator.language || navigator.userLanguage; 
            (userLang == 'ru-RU' || userLang == 'ru' || userLang == 'RU' || userLang == 'Ru') ? this.change_lang('russian') : (userLang == 'en-EN' || userLang == 'en' || userLang == 'EN' || userLang == 'En') ? this.change_lang('english') : (userLang == 'fr-FR' || userLang == 'fr' || userLang == 'FR' || userLang == 'Fr') ? this.change_lang('french') : (userLang == 'de-DE' || userLang == 'de' || userLang == 'DE' || userLang == 'De') ? this.change_lang('deutsch') : (userLang == 'ch-CH' || userLang == 'ch' || userLang == 'CH' || userLang == 'Ch') ? this.change_lang('chinese') : (userLang == 'ar-AR' || userLang == 'ar' || userLang == 'AR' || userLang == 'Ar') ? this.change_lang('arabic') : this.change_lang('english')
        },
        data() {
            return {
                block_date: false,
                block_date: new Date().toISOString().substr(0, 10),
                dateError: '',
                mainImages: [
                    {src: './img/main/main1.jpg'},
                    {src: './img/main/main2.jpg'},
                    {src: './img/main/main3.jpg'}
                ]
            }
        }
    }
</script>
