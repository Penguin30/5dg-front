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
       
        <v-content>
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
        </v-content>
    </v-app>
</template>

<script>
    import { MLBuilder } from 'vue-multilanguage';
    import Products from './components/Products';
    import RegisterAgency from './components/RegisterAgency';
    import axios from 'axios';
    import Product from './components/Product';

    export default {
        name: 'App',
        components: {
            Products,
            RegisterAgency
        },
        methods: {
            change_lang: function(lang,$ml){ 
                axios.get('http://5dg.utest.space/api/cruises?lg='+lang)
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
                    {src: 'http://www.5degeneve.ch/images/5degeneve-1.jpg'},
                    {src: 'http://www.5degeneve.ch/images/interieur1.jpg'},
                    {src: 'http://www.5degeneve.ch/images/interieur2.jpg'},
                    {src: 'http://www.5degeneve.ch/images/exte1.jpg'},
                    {src: 'http://www.5degeneve.ch/images/exte2.jpg'}
                ]
            }
        }
    }
</script>
