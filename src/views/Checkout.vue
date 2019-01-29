<template>
    <v-app>
        <Header/>

        <v-content style="padding-bottom:100px;">
            <v-layout justify-center justify-space-around style="flex-basis: 0; flex-grow: 1;">
                <v-flex xs6>
                <Product
                    :key='order.orderID'
                    :productID='order.orderID'
                    :images='order.images'
                    :title='order.title'
                    :description='order.description'
                    :priceTxt='order.price'
                    :price='order.price'
                    :timeStart='order.timeStart'
                    :timeEnd='order.timeEnd'
                    :type='order.type'
                    :caption='order.caption'>
                </Product>
                </v-flex>

                <v-flex xs6>
                <PayPal
                    amount="100"
                    currency="USD"
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
    import Header from '../components/Header';
    import Footer from '../components/Footer';
    import Product from '../components/Product';
    import PayPal from 'vue-paypal-checkout';

    export default {
        name: 'App',
        components: {
            Header,
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

            axios.get('https://srv.5degeneve.ch/api/cruises?lg='+this.lang)
			    .then((response) => {
                    response.data;
                })
			    .catch(error => console.log(error));

        },
        data() {
            return {
                credentials: {
                    sandbox: 'Aft68bXaah3C8yR-P7D3miakX_dWgN6wJkGW8EDMAfwE8YCebXq2KytvN6HPYCZ3tgjNHyuN9H9yamjf',
                    production: '<production client id>'
                },
                order: {
                    orderID: 0,
                    productID: 0,
                    images: "[]",
                    title: '',
                    description: '',
                    timeStart: null,
                    timeEnd: null,
                    price: 0,
                    caption: '',
                    type: ''
                }
            }
        }
    }
</script>
