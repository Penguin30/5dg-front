<template>
    <v-app>
        <v-toolbar app>
            <v-toolbar-title class="headline text-uppercase">
                <img src="https://www.8dg.ch/5deGeneve.png" alt="5 de Geneve" width=230 height=45 />
            </v-toolbar-title>
            <v-spacer></v-spacer>
                <span style="font-style: italic; font-size: 25px;">PRIVATE CRUISE GENEVA LAKE</span>
            <v-spacer></v-spacer>
            <v-btn 
                v-for="lang in $ml.list"
                :key="lang"
                @click="change_lang(lang)"
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
            <v-layout justify-space-around style="padding-top:30px; position: relative;">
                <v-flex xs7>
                    <Product
                        :key='order.order_id'
                        :productID='order.cruise_id'
                        :images='cruise.img'
                        :title='cruise.title'
                        :description='cruise.desc'
                        :priceTxt='order.price'
                        :price='order.price'
                        :rate='$store.state.rate'
                        :timeStart='order.time_start'
                        :timeEnd='order.time_end'
                        :type='order.type'
                        mode='pay'
                        :caption='order.caption'>
                    </Product>
                </v-flex>

                <v-flex xs4>
                    <v-card class="rounded-card" style="padding:30px;">
                        The Total Price of your Cruise is {{ order.price }} CHF. A minimum down-payment of 30% is expected to be payed within 10 days after reservation. But you may choose to pay the full amount right away. Please note that if you choose the 30% option, you will have to pay the remaining 70% latest 30 days before departure or your Cruise will be canceled.
                        <v-radio-group v-if="pay_type != 'none'" v-model="radioGroup">
                            <v-radio :value="prices.full" :label="prices.fullLabel"></v-radio>
                            <v-radio v-if="pay_type == 'all'" :value="prices.down" :label="prices.downLabel"></v-radio>
                        </v-radio-group>                
                        <PayPal v-if="radioGroup != ''"
                            :amount="radioGroup"
                            currency="CHF"
                            v-on:payment-completed="completed"
                            v-on:payment-cancelled="cancelled"
                            :client="credentials"
                            env="sandbox">
                        </PayPal>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-content>

    <v-dialog v-model="pay_thnx" width="500">
                            <v-card class="rounded-card">
                                <v-card-title
                                        class="headline grey lighten-2"
                                        style="color: #fff; background: #ff5252 !important;justify-content: center;"
                                        primary-title>
                                    Thank you for payment!
                                </v-card-title>

                                <v-card-text>
                                   Thank you for payment, we will come back to you shortly!
                                   <v-btn @click="close_forms"><span>ok</span></v-btn>
                                </v-card-text>
                                <v-divider></v-divider>
                            </v-card>
                        </v-dialog> 

                        <v-dialog v-model="eror_pay" width="500">
                            <v-card class="rounded-card">
                                <v-card-title
                                        class="headline grey lighten-2"
                                        style="color: #fff; background: #ff5252 !important;justify-content: center;"
                                        primary-title>
                                    We are sorry, but your payment wasn't success!
                                </v-card-title>

                                <v-card-text>
                                    We are sorry, but your payment wasn't success!
                                   <v-btn @click="close_form_error"><span>ok</span></v-btn>
                                </v-card-text>
                                <v-divider></v-divider>
                            </v-card>
                        </v-dialog> 
        
        <Footer/>
    </v-app>
</template>

<style>
	.rounded-top {
		border-radius:10px 10px 0px 0px;
	}

	.rounded-card {
		border-radius:10px;
	}
</style>

<script>
    import { MLBuilder } from 'vue-multilanguage';
    import axios from 'axios';
    import RegisterAgency from '../components/RegisterAgency';
    import Footer from '../components/Footer';
    import Product from '../components/Product';
    import PayPal from 'vue-paypal-checkout';

    export default {
        name: 'App',
        components: {
            RegisterAgency,
            Footer,
            Product,
            PayPal
        },
        methods: {
            close_forms(){
                location.href='/';
            },
            close_form_error(){
                this.eror_pay = false;
            },
            cancelled(){
                this.eror_pay = true;
            },
            completed(event){
                if(event.state == 'approved'){
                    let paid_perc = (this.radioGroup == this.prices.full) ? 100 : 30;
                    let data = {
                        order_id: this.order.id,
                        paide: this.radioGroup,
                        paid_perc: paid_perc
                    }
                    axios.post('https://www.8dg.ch/api/approve_order',{data}).then(res => (this.pay_thnx = true)).catch(error => (console.log(error)));   
                }
            },
            logout(){
                this.$cookies.remove('token');
                this.$cookies.remove('role');
                location.reload();
            },
            change_lang: function(lang){ 
                let code = (lang == 'english') ? 'CHF_USD' : (lang == 'french') ? 'CHF_EUR' : (lang == 'deutsch') ? 'CHF_EUR' : (lang == 'russian') ? 'CHF_RUB' : (lang == 'chinese') ? 'CHF_CYN' : (lang == 'arabic') ? 'CHF_USD' : 'CHF';                                    
                if(code != 'CHF')
                    axios.get('https://www.8dg.ch/api/get_rate?code='+code)
                    .then(res => {
                        if(Math.round(res.data,2) == 0){
                            this.$store.state.rate = 1;
                            this.$store.state.curr_code = 'CHF';
                        }else{
                            this.$store.state.rate = Math.round(res.data,2);
                            this.$store.state.curr_code = code.replace('CHF_','');
                        }
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
        },
        created(){
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
            var userLang = navigator.language || navigator.userLanguage; 
            (userLang == 'ru-RU' || userLang == 'ru' || userLang == 'RU' || userLang == 'Ru') ? this.change_lang('russian') : (userLang == 'en-EN' || userLang == 'en' || userLang == 'EN' || userLang == 'En') ? this.change_lang('english') : (userLang == 'fr-FR' || userLang == 'fr' || userLang == 'FR' || userLang == 'Fr') ? this.change_lang('french') : (userLang == 'de-DE' || userLang == 'de' || userLang == 'DE' || userLang == 'De') ? this.change_lang('deutsch') : (userLang == 'ch-CH' || userLang == 'ch' || userLang == 'CH' || userLang == 'Ch') ? this.change_lang('chinese') : (userLang == 'ar-AR' || userLang == 'ar' || userLang == 'AR' || userLang == 'Ar') ? this.change_lang('arabic') : this.change_lang('english')

            var q = this.$route.query;
            this.$data.order.orderID = q && q.orderID ? q.orderID : 0;
            axios.get('https://www.8dg.ch/api/order?id='+this.$data.order.orderID)
                .then((response) => {                        
                    this.order = response.data[0];
                    var now = new Date();
                    var c_date = new Date(this.order.date);
                    if(c_date >= now){
                        now.setDate(now.getDate()+10);
                        if(c_date <= now){
                            this.pay_type = 'full';
                        }
                    }else{
                        this.pay_type = 'none';
                    }
                    if(this.order.discounted_price == 0){
                        this.prices.full      = this.order.price;
                        this.prices.fullLabel = this.prices.full + " CHF ~ ("+this.prices.full*this.$store.state.rate+" "+this.$store.state.curr_code+")   [the full amount - no further payment required]";
                        this.prices.down      = Math.round(this.order.price * 3 / 10);
                        this.prices.downLabel = this.prices.down + " CHF ~ ("+this.prices.down*this.$store.state.rate+" "+this.$store.state.curr_code+")   [the 30% down-payment]";
                    }else{
                        this.prices.full      = this.order.discounted_price;
                        this.prices.fullLabel = this.prices.full + " CHF .   [the full amount - no further payment required]";
                        this.prices.down      = Math.round(this.order.discounted_price * 3 / 10);
                        this.prices.downLabel = this.prices.down + " CHF .   [the 30% down-payment]";
                    }
                })
                .catch(error => console.log(error));

            axios.get('https://www.8dg.ch/api/cruise?id='+this.$data.order.orderID+'&lg='+this.$ml.current)
			    .then((response) => {
                    this.cruise = response.data[0];
                })
			    .catch(error => console.log(error));

        },
        data() {
            return {
                radioGroup: '',
                pay_thnx: false,
                eror_pay: false,
                credentials: {
                    sandbox: 'Aft68bXaah3C8yR-P7D3miakX_dWgN6wJkGW8EDMAfwE8YCebXq2KytvN6HPYCZ3tgjNHyuN9H9yamjf',
                    production: ''
                },
                pay_price: 0,
                pay_type: 'all',
                cruise: {},
                order: {
                    orderID: 0,
                    productID: 0,
                    images: "[]",
                    title: '',
                    description: '',
                    timeStart: null,
                    timeEnd: null,
                    price: 1000,
                    caption: '',
                    type: ''
                },
                prices: {
                    full: 0,
                    fullLabel: '',
                    down: 0,
                    downLabel: ''
                }
            }
        }
    }
</script>
