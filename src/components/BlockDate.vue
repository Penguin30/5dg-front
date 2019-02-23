<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout>
		<v-date-picker v-model="picker" :allowed-dates="allowedDates"></v-date-picker>
        <v-btn
	      	:disabled="!valid"
	      	@click="validate"
	    >
	      	Submit
	   	</v-btn>

	    <v-btn
	      	@click="reset"
	    >
	      	Clear
	    </v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    data: () => ({
      valid: false,
      picker: new Date().toISOString().substr(0, 10)
    }),
    methods: {
      allowedDates(val){
        return this.datesAllowed.indexOf(val) === -1;
      },
      validate () {
        if (this.$refs.form.validate()) {
          
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      loadBlockedDates() {

                if (!tS) tS = "00:00:00";
                if (!tE) tE = "23:59:59";

                var self = this;
                let now = (new Date()).getTime();

                tS = encodeURIComponent(tS);
                tE = encodeURIComponent(tE);

                let url = 'https://www.8dg.ch/api/get_blocked_dates?tS='+tS+'&tE='+tE+'&n='+now;

                axios.get(url)
                     .then((res) => {
                     	console.log(res);
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
        this.loadBlockedDates();
	}
  }
</script>