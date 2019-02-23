<template>
	<v-layout wrap>
		<v-flex xs12 class="mb-3">
			<v-sheet height="500">
				<v-calendar ref="calendar" :now="today" :value="today" color="primary" :key="calRenderKey">
					<v-layout slot="day" slot-scope="{ present, past, date }" fill-height>
						<template v-if="past && tracked[date]">
							<v-sheet
								v-for="(percent, i) in tracked[date]"
								:key="i"
								:title="category[percent[i]]"
								:color="colors[percent[i]]"
								:width="`${percent[i]}%`"
								height="100%"
								tile
							></v-sheet>
						</template>
					</v-layout>
				</v-calendar>
			</v-sheet>
		</v-flex>
		<v-flex sm6 xs12 class="text-sm-left text-xs-center">
			<v-btn @click="monthPrev">
				<v-icon dark>keyboard_arrow_left</v-icon>
				Prev
			</v-btn>
		</v-flex>
		<v-flex sm6 xs12 class="text-sm-right text-xs-center">
			<v-btn @click="monthNext">
				Next
				<v-icon right dark>keyboard_arrow_right</v-icon>
			</v-btn>
		</v-flex>
	</v-layout>
</template>

<style>
</style>

<script>
    // https://next.vuetifyjs.com/en-US/components/sheets
import axios from 'axios';
import { MLBuilder } from 'vue-multilanguage';
	export default {
		data: () => ({
            calRenderKey: 1,
			today: '2019-01-10',
			tracked: {
				'2019-01-09': [[23, 2], [45, 1], [10,3]],
				'2019-01-08': [[10,1]]
			},
			colors: ['#FFFFFF', '#1867c0', '#fb8c00', '#000000'],
			category: ['', 'Cruise A', 'Cruise B', 'Cruise C']
		}),
		methods: {
			monthPrev() {
				this.$refs.calendar.prev();
			},
			monthNext() {
				this.$refs.calendar.next();
			},			
			changeCalendarDate(val) {
				//$refs.calendar.next()
				//this.$refs.calendar.times.today.year
				let a = 10;
			}
		},
		created() {
			let today = new Date();
			let dd = today.getDate();
			let mm = today.getMonth()+1;
			let yyyy = today.getFullYear();
			if(dd<10)  dd = '0'+dd;
			if(mm<10)  mm = '0'+mm;
			this.today = yyyy + '-' + mm + '-' + dd;


			let tS = encodeURIComponent("00:00:00");
			let tE = encodeURIComponent("23:59:59");
			var self = this;
			let now = (new Date()).getTime();
			let url = 'https://www.8dg.ch/api/get_blocked_dates?tS='+tS+'&tE='+tE+'&n='+now;
			var res = {};
			var key;
			

			axios.get(url)
				.then((res) => {
					let data = Array.isArray(res.data) ? res.data : [];
                    
                    
                    let sH = 6, sM = 30, eH = 23, eM = 0;
                    var nM = (eH - sH) * 60 - sM + eM;      // number of Minutes in a day
                    let o = sH * 60 + sM;

					var k, c, s, e, hS, mS, oS, hE, mE, oE, a;
					var result = {};

					for (var i=0; i<data.length; i++) {
						key = data[i].date;
                        if (!result[key]) result[key] = [];

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

                        result[key].push([k, c, s, e]);
					}
					
					var ret = {}, prc = [];

					for (k in result) {
						a = result[k];
						a.sort(function(p, q) {return p[2]-q[2];});

						prc = [];
						e	= 0;
						//if (s>0) prc.push([s, 0]);	// [percentWidth, cruiseID]
						
						for (var i=0; i<a.length; i++) {
							s = a[i][2];
							if (e<s) prc.push([(s-e), 0]);

							e = a[i][3];
							prc.push([(e-s), a[i][1]]);
						}

						ret[k] = prc;
					}

                    self.tracked = ret;
					self.calRenderKey++;
					
				})
				.catch(error => (console.log(error)));
		}
	}
</script>
