<template>
	<v-layout>
		<v-flex>
			<v-sheet height="500">
				<v-calendar :now="today" :value="today" color="primary" :key="calRenderKey">
					<v-layout slot="day" slot-scope="{ present, past, date }" fill-height>
						<template v-if="past && tracked[date]">
							<v-sheet
								v-for="(percent, i) in tracked[date]"
								:key="i"
								:title="category[i]"
								:color="colors[i]"
								:width="`${percent}%`"
								height="100%"
								tile
							></v-sheet>
						</template>
					</v-layout>
				</v-calendar>
			</v-sheet>
		</v-flex>
	</v-layout>
</template>

<style>
</style>

<script>
    // https://next.vuetifyjs.com/en-US/components/sheets
	import axios from 'axios';

	export default {
		data: () => ({
            calRenderKey: 0,
			today: '2019-01-10',
			tracked: {
				'2019-01-09': [23, 45, 10],
				'2019-01-08': [10],
				'2019-01-07': [0, 78, 5],
				'2019-01-06': [0, 0, 50],
				'2019-01-05': [0, 10, 23],
				'2019-01-04': [2, 90],
				'2019-01-03': [10, 32],
				'2019-01-02': [80, 10, 10],
				'2019-01-01': [20, 25, 10]
			},
			colors: ['#1867c0', '#fb8c00', '#000000'],
			category: ['Development', 'Meetings', 'Slacking']
		}),
		created() {
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1;
			let yyyy = today.getFullYear();
			if(dd<10)  dd = '0'+dd;
			if(mm<10)  mm = '0'+mm;
			this.today = yyyy + '-' + mm + '-' + dd;


			let tS = encodeURIComponent("00:00:00");
			let tE = encodeURIComponent("00:00:01");
			var self = this;
			let now = (new Date()).getTime();
			let url = 'https://srv.5degeneve.ch/api/get_blocked_dates?tS='+tS+'&tE='+tE+'&n='+now;
			var res = {};
			var key;
			

			axios.get(url)
				.then((res) => {
					let data = Array.isArray(res.data) ? res.data : [];
                    
                    
                    let sH = 6, sM = 30, eH = 23, eM = 0;
                    var nM = (eH - sH) * 60 - sM + eM;      // number of Minutes in a day
                    let o = sH * 60 + sM;

                    var k, c, s, e, hS, mS, oS, hE, mE, oE, a;

					for (var i=0; i<data.length; i++) {
						key = data[i].date;
                        if (!res[key]) res[key] = [];

                        k = data[i].id;
                        c = data[i].cruise_id;
                        s = data[i].time_start;
                        e = data[i].time_end;

                        a = s.split(':');
                        hS = Number(a[0]);
                        mS = Number(a[1]);
                        oS = hS * 60 + mS - o;
                        if (oS<0) oS = 0;
                        s = 100 * oS / nM;

                        a = e.split(':');
                        hE = Number(a[0]);
                        mE = Number(a[1]);
                        oE = hE * 60 + mE - o;
                        if (oE>nM) oE = nM;
                        e = 100 * oE / nM;

                        res[key].push([k, c, s, e]);
                    }

                    



                    self.tracked = res;

						 self.rerenderKey++;

					
				})
				.catch(error => (console.log(error)));
		}
	}
</script>
