<template>
    <v-footer height="auto" dark>
        <v-layout justify-center row wrap>
            <v-flex black text-xs-center white--text xs12>
                <v-btn v-for="icon in icons" :key="icon" :href="icon.url" target="_blank" class="mx-3 white--text" icon>
                        <v-icon size="24px">{{ icon.name }}</v-icon>
                </v-btn>
            </v-flex>
            <GTU></GTU>
            <v-btn  href="/Soft_Drinks.pdf" target="_blank" color="white" text round>{{ $ml.get('soft_drinks') }}</v-btn>
            <v-btn  href="mailto:info@5degeneve.ch" color="white" text round>{{ $ml.get('contact_us') }}</v-btn>
            <v-flex grey darken-3 py-3 text-xs-center white--text xs12>&copy; 2019 - <strong>by www.5dg.ch</strong></v-flex>
            <Snack v-if="$cookies.isKey('use') === false && $cookies.get('use') !== '1'"/>
        </v-layout>
    </v-footer>
</template>

<script>
    import GTU from '../components/GTU';
    import { MLBuilder } from 'vue-multilanguage';
    import Snack from '../components/SnackBar';
    
    export default {
        components: {
            GTU,
            Snack
        },
            data: () => ({
      icons: [
          {name:'fab fa-linkedin', url: 'https://www.linkedin.com/in/frank-f-000370176'},
          {name:'fab fa-instagram', url: 'https://www.instagram.com/5degeneve.ch/?hl=fr'}
      ]
    })
    }
</script>
