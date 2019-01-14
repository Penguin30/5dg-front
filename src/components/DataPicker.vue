<template>
  <v-layout row wrap>
    <v-flex sm6>
      <v-date-picker
        v-on:input="choose"
        v-model="picker"
        year-icon="mdi-calendar-blank"
        prev-icon="mdi-skip-previous"
        next-icon="mdi-skip-next"
      ></v-date-picker>
    </v-flex>
  </v-layout>
</template>

<style scoped>
	.v-picker {
		flex-direction: row;
		width: 100%;
	}
	.info {
		margin-left: 0;
	}
</style>

<script>
  export default {
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10)
      }
    },
    methods: {
      choose: function (event) {
        console.log();
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1;
        let yyyy = today.getFullYear();
        if(dd<10) {
          dd = '0'+dd
        } 

        if(mm<10) {
          mm = '0'+mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        if(event > today){
          document.getElementsByClassName('next-btn')[0].removeAttribute('disabled');
          document.getElementsByClassName('next-btn')[0].classList.remove('v-btn--disabled');
          this.$root.date = event;
        }else{
          document.getElementsByClassName('next-btn')[0].setAttribute('disabled','disabled');
          document.getElementsByClassName('next-btn')[0].classList.add('v-btn--disabled');
        }
      }
    }  
  };
</script>