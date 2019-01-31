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
            <v-layout justify-center justify-space-around style="flex-basis: 0; flex-grow: 1;">
                <v-flex xs6>
                <Product
                    :key='order.orderID'
                    :productID='order.cruise_id'
                    :images='cruise.img'
                    :title='cruise.title'
                    :description='cruise.desc'
                    :priceTxt='order.price'
                    :price='order.price'
                    :timeStart='order.time_start'
                    :timeEnd='order.time_end'
                    :type='order.type'
                    :caption='order.caption'>
                </Product>
                </v-flex>

                <v-flex xs6>
                    The Total Price of your Cruise is {{ order.price }} CHF. A minimum down-payment of 30% is expected to be payed within 10 days after reservation. But you may choose to pay the full amount right away. Please note that if you choose the 30% option, you will have to pay the remaining 70% latest 30 days before departure or your Cruise will be canceled.
                    <v-radio-group v-model="radioGroup">
                        <v-radio value='full' :label="prices.fullLabel"></v-radio>
                        <v-radio value='down' :label="prices.downLabel"></v-radio>
                    </v-radio-group>                    
                    <PayPal
                        :amount="pay_price"
                        currency="CHF"
                        :client="credentials"
                        env="sandbox">
                    </PayPal>
                </v-flex>
            </v-layout>
        </v-content>

        
        <Footer/>
    </v-app>
</template>

<style>

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
            logout(){
                this.$cookies.remove('token');
                this.$cookies.remove('role');
                location.reload();
            },
            change_lang: function(lang,$ml){ 
                $ml.change(lang);               
            }
        },
        created(){
            var userLang = navigator.language || navigator.userLanguage; 
            (userLang == 'ru-RU') ? this.$ml.change('russian') : (userLang == 'en-EN') ? this.$ml.change('english') : (userLang == 'fr-FR') ? this.$ml.change('french') : (userLang == 'de-DE') ? this.$ml.change('deutsch') : (userLang == 'ch-CH') ? this.$ml.change('chinese') : (userLang == 'ar-AR') ? this.$ml.change('arabic') : this.$ml.change('english');

            var q = this.$route.query;
            this.$data.order.orderID = q && q.orderID ? q.orderID : 0;
            axios.get('https://www.5degeneve.ch/api/order?id='+this.$data.order.orderID)
                .then((response) => {
                    this.order = response.data[0];
                    this.prices.full      = this.order.price;
                    this.prices.fullLabel = this.prices.full + " CHF .   [the full amount - no further payment required]";
                    this.prices.down      = Math.round(this.order.price * 3 / 10);
                    this.prices.downLabel = this.prices.down + " CHF .   [the 30% down-payment]";
                })
                .catch(error => console.log(error));

            axios.get('https://www.5degeneve.ch/api/cruise?id='+this.$data.order.orderID+'&lg='+this.$ml.current)
			    .then((response) => {
                    this.cruise = response.data[0];
                })
			    .catch(error => console.log(error));

        },
        data() {
            return {
                radioGroup: 'full',
                credentials: {
                    sandbox: 'Aft68bXaah3C8yR-P7D3miakX_dWgN6wJkGW8EDMAfwE8YCebXq2KytvN6HPYCZ3tgjNHyuN9H9yamjf',
                    production: '<production client id>'
                },
                pay_price: 0,
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
