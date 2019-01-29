<template>
    <v-footer height="auto" dark>
        <v-layout justify-center row wrap>
            <GTU></GTU>
            <v-btn  href="mailto:info@5degeneve.ch" color="white" text round>Contact Us</v-btn>
            <v-flex grey darken-3 py-3 text-xs-center white--text xs12>&copy;2019 - <strong>by www.5dg.ch</strong></v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
    import GTU from '../components/GTU';

    export default {
        components: {
            GTU
        }
    }
</script>