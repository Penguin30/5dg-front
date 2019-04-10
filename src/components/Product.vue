<template>
	<v-layout justify-center justify-space-around mob-normal style="flex-basis: 0; flex-grow: 1;">
		<v-flex xs8 mob2>
			<v-card elevation-15 hover class="rounded-card">
				<v-layout column card>
					<v-flex col-xs-4>
						<v-carousel interval="999999" height="300" class="rounded-top">
							<v-carousel-item
								v-for="(item,i) in JSON.parse(images)"
									:key="i"
									:src="'https://www.8dg.ch/storage/'+item"
							>
							</v-carousel-item>
            			</v-carousel>
					</v-flex>
					<v-flex xs8>
						<v-layout column>
							<v-card-actions  class="pl-3 mob3">
								<span v-if="productID!=1" style="vertical-align: top; padding-right: 10px;">{{ $ml.get('s_from') }}</span> <span><big><b>{{ formatPrice(price) }} CHF</b></big><br>(~ {{ formatPrice(Math.round(price*rate)) }} {{ $store.state.curr_code }})</span>
								<v-spacer></v-spacer>
								<v-btn round color="orange" right v-on:click="selectCruise" v-if="$store.state.reservation.cruiseID==0 && mode != 'pay'">{{ $ml.get('btn') }}</v-btn>
								<v-btn round color="orange" right v-on:click="showAllCruises" v-if="$store.state.reservation.cruiseID!=0">Back</v-btn>
							</v-card-actions>

							<v-card-text justify-space-around class="discount" v-if="$cookies.get('role')=='3'">
								<table border='0' width='100%'>
									<tr><td>{{ $ml.get('y_disc') }}</td>			<td align='right'><b>{{ discountPercent() }}%</b></td></tr>
									<tr><td>{{ $ml.get('y_pr') }}</td>				<td align='right'><b>{{ formatPrice(discountProp.disPrice) }} CHF</b> (~ {{ formatPrice(Math.round(discountProp.disPrice*rate)) }} {{ $store.state.curr_code }})</td></tr>
									<tr><td>{{ $ml.get('next_disc') }}</td>	<td align='right'><b>{{ discountProp.next }}%</b></td></tr>
								</table>
							</v-card-text>	

							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">{{ title }}</h3>
									<div v-html="description" >{{ description }}</div>
								</div>
							</v-card-title>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-card>
		</v-flex>
		
		<!-- Start stepper -->
		<v-flex lg4 ml-5 v-if="$store.state.reservation.cruiseID!=0">
			<Stepper :terms="terms" :rate="rate" :price="price" :dprice="discountProp.disPrice" :cruise_id="productID" :type='type'/>
		</v-flex>
		<!-- End stepper -->
	</v-layout>
</template>

<style>
	.white-text {
		color: #fff!important;
	}
	
	.desr {
		overflow: auto;
	}

	.rounded-top {
		border-radius:10px 10px 0px 0px;
	}

	.rounded-card {
		border-radius:10px;
	}

	.discount {
		background-color: #ff5252 !important;
    	border-color: #ff5252 !important;
		color: white;
		border-radius:30px;
	}
</style>
<script>
	import { MLBuilder } from 'vue-multilanguage';
	import Stepper from './Stepper';
	import axios from 'axios';

	export default {
		components: {
     		Stepper
    	},
		props: ['productID', 'images', 'title', 'description', 'timeStart','mode', 'timeEnd', 'price', 'caption', 'type', 'rate','terms'],
		data: () => ({
			count: 0,
			isExpanded: false,
			isVisible: false,
			imagesSrc: [
                {src: 'https://www.8dg.ch/images/5degeneve-1.jpg'},
                {src: 'https://www.8dg.ch/images/interieur1.jpg'},
                {src: 'https://www.8dg.ch/images/interieur2.jpg'},
                {src: 'https://www.8dg.ch/images/exte1.jpg'},
                {src: 'https://www.8dg.ch/images/exte2.jpg'}
			],
			discountProp: {
				curr: 15,		// current discount in percent
				next: 16,		// next discount in percent
				discount: 0,	// the discount
				disPrice: 0		// the discounted Price
			}

		}),
		methods: {

			selectCruise(event) {
				this.$store.state.reservation.cruiseID	= this.productID;
				this.$store.state.reservation.timeStart	= this.timeStart;
				this.$store.state.reservation.timeEnd	= this.timeEnd;
				this.$store.state.reservation.price		= this.price;

				this.$store.state.reservation.disPrice	= this.discountProp.disPrice;
				this.$store.state.reservation.disPerct	= this.discountProp.curr;
				setTimeout(function(){
					let lg4 =document.querySelector('.layout.justify-center > .flex.xs8');
					lg4.classList.add('lg4');
				},1);
			},

			showAllCruises(event) {
				this.$store.state.reservation.cruiseID	= 0;
				this.$store.state.reservation.timeStart	= null;
				this.$store.state.reservation.timeEnd	= null;
				this.$store.state.reservation.price		= 0;
				let lg4 =document.querySelector('.layout.justify-center > .flex.xs8');
				setTimeout(function(){
					lg4.classList.remove('lg4');
				},1);
			},

			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			},

			discountPercent() {
				let numOrders	= this.count;
				let minPercent	= 15;
				let maxPercent	= 30;

				var d = minPercent + numOrders;
				if (d>maxPercent) d = maxPercent;
				this.discountProp.curr = d;

				d++;
				if (d>maxPercent) d = maxPercent;
				this.discountProp.next = d;

				this.discountProp.discount = Math.round(this.price * this.discountProp.curr) / 100;
				this.discountProp.disPrice = this.price - this.discountProp.discount;

				return this.discountProp.curr;
			}
		},
		created() {
			if ($cookies.get('role')=='3') {
				var self = this;
				var now = (new Date()).getTime();
				axios.get('https://www.8dg.ch/api/get_count_ta_orders?email='+this.$cookies.get('email')+'&n='+now)
					.then((response) => {
						this.count = response.data;
						self.discountPercent();
					})
					.catch(error => console.log(error));
			}
		}
	}
</script>
