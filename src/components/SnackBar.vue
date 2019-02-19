<template>
  <v-card>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="use()"
      >
        Ok
      </v-btn>
      <v-btn
        dark
        flat
        @click="no_use()"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-card>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: true,
        timeout: 0,
        text: 'This Site uses Cookies. By continuing to use this Service you consent to that use.'
      }
    },
    methods: {
      use(){
         this.$cookies.set("use",1);
         this.snackbar = false;
      },
      no_use(){
        location.href="http://google.com";
      }
    }
  }
</script>