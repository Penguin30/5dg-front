<template>
    <v-app>
        <v-toolbar app >
            <v-toolbar-title class=" headline text-uppercase ">
                <img src="https://www.8dg.ch/5deGeneve.png" class="mob-img" alt="5 de Geneve" width=230 height=45 />
            </v-toolbar-title>
            <v-spacer></v-spacer>
                <span style="font-style: italic; font-size: 25px;" class="mobmenu-span">PRIVATE CRUISE GENEVA LAKE</span>
            <v-spacer></v-spacer>
            <v-layout>
              <v-btn
                v-for="lang in $ml.list"
                :key="lang"
                @click="change_lang(lang,$ml)"
                flat
                icon
              >
                <img :src="require(`@/assets/${lang}.png`)" :alt="lang" height=35 />
              </v-btn>
            </v-layout>
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
            
            <Products :terms="terms" :lang="$ml.current"/>

            <v-layout justify-space-around row style="padding-top:30px; position: relative;">
                <v-flex style="text-align: center;">
                    <div class="cruiseVideo">
                    <video id="video1" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="none" width="488" height="350" poster="@/assets/Video1.jpg" data-setup="{}">
                        <source src="https://www.8dg.ch/storage/Video1.mp4" type='video/mp4'>
                    </video>
                    </div>
                </v-flex>
                <v-flex>
                    <div class="cruiseVideo">
                    <video id="video2" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="none" width="488" height="350" poster="@/assets/Video2.jpg" data-setup="{}">
                        <source src="https://www.8dg.ch/storage/Video2.mp4" type='video/mp4'>
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
                v-model="date"
                :allowed-dates="allowedDates"
                :min='new Date().toISOString().substr(0, 10)'
                :key="rerenderKey"
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

        
        <Footer :terms="terms"/>
    </v-app>
</template>

<style>
    @media(max-width: 768px){
      .layout.row {
        -ms-flex-direction: column!important;
        flex-direction: column!important;
      }
      .mob-normal{
        flex-basis: inherit!important;
      }
      .flex.xs8.mob2 {
        -ms-flex-preferred-size: 80.88888888888%!important;
        flex-basis: 80.88888888888%!important;
        max-width: 80.88888888888%!important;
        margin-top: 20px!important;
      }

      .mob3{
        flex-direction: column!important;
      }
      .mob3 .v-card__actions .v-btn, .v-card__actions>* {
        margin: 2px!important;
      }
      .cruiseVideo{
        float: none!important;
        left: 0!important;
      }
      .video-js {
        width: 100%;
        height: 150px;
        margin-bottom: 20px;
      }
      .v-toolbar__content, .v-toolbar__extension {
        flex-direction: column!important;
        height: auto!important;
      }

      .mob-img{
        margin: 10px;
      }
      .mobmenu-span{
        font-size: 16px!important;
      }
    }
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
                        date: this.date,
                        time_start: this.block_startDate,
                        time_end: this.block_endDate
                    }
                    axios.post('https://www.8dg.ch/api/block_date',{data})
                    .then(response => ((response.data == 1) ? (this.dateError = 'Date blocked') : (response.data == 2) ? this.dateError = "You can't block this date, bacause you have cruise(s) on this day!" : location.reload()))
                    .catch(error => console.log(error.response));
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
                    axios.get('https://www.8dg.ch/api/get_rate?code='+code)
                    .then(res => {
                        this.$store.state.rate = Number(res.data);
                        this.$store.state.curr_code = code.replace('CHF_','');

                        axios.get('https://www.8dg.ch/api/cruises?lg='+lang)
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
          allowedDates(val){
            return this.datesAllowed.indexOf(val) === -1;
          },
          loadBlockedDates() {
            let tS = this.$store.state.reservation.timeStart;
            let tE = this.$store.state.reservation.timeEnd;

            if (!tS) tS = "00:00:00";
            if (!tE) tE = "23:59:59";

            var self = this;
            let now = (new Date()).getTime();

            tS = encodeURIComponent(tS);
            tE = encodeURIComponent(tE);

            let url = 'https://www.8dg.ch/api/get_blocked_dates?tS='+tS+'&tE='+tE+'&n='+now;

            axios.get(url)
              .then((res) => {
                let data = Array.isArray(res.data) ? res.data : [];
                self.datesAllowed = [];

                for (var i=0; i<data.length; i++) {
                  self.datesAllowed.push(data[i].date);
                }

                self.rerenderKey++;
              })
              .catch(error => (console.log(error)));
          }
        },
        created(){
            this.$cookies.config('7d');
            axios.defaults.headers.common['Authorization'] = this.$cookies.get('token');
            axios.get('https://www.8dg.ch/api/me')
            .then(res => {
                this.$cookies.set("email",res.data.email);
                this.$cookies.set("role",res.data.role_id);
            })
            .catch(error => {
                if (err.response.status === 401) {
                    this.$cookies.remove('token');
                    this.$cookies.remove('role');
                    this.$cookies.remove('email');
                    this.$cookies.remove('expires_in');
                    this.$cookies.remove('refresh_token');
                    location.reload();
                }
            });
          this.loadBlockedDates();
            var userLang = navigator.language || navigator.userLanguage; 
            (userLang == 'ru-RU' || userLang == 'ru' || userLang == 'RU' || userLang == 'Ru') ? this.change_lang('russian') : (userLang == 'en-EN' || userLang == 'en' || userLang == 'EN' || userLang == 'En') ? this.change_lang('english') : (userLang == 'fr-FR' || userLang == 'fr' || userLang == 'FR' || userLang == 'Fr') ? this.change_lang('french') : (userLang == 'de-DE' || userLang == 'de' || userLang == 'DE' || userLang == 'De') ? this.change_lang('deutsch') : (userLang == 'ch-CH' || userLang == 'ch' || userLang == 'CH' || userLang == 'Ch') ? this.change_lang('chinese') : (userLang == 'ar-AR' || userLang == 'ar' || userLang == 'AR' || userLang == 'Ar') ? this.change_lang('arabic') : this.change_lang('english')
        },
        data() {
            return {
                block_startDate : new Date(new Date().setHours(6, 0, 0, 0)).toISOString(),
                block_endDate : new Date(new Date().setHours(17, 0, 0, 0)).toISOString(),
                rerenderKey: 0,
                date: new Date().toISOString().substr(0, 10),
                datesAllowed: [],
                terms: false,
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
