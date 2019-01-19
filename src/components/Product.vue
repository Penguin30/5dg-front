<template>
	<v-layout justify-center justify-space-around style="flex-basis: 0; flex-grow: 1;">
		<v-flex xs8>
			<v-card elevation-15 hover class="rounded-card">
				<v-layout column card>
					<v-flex col-xs-4>
						<v-carousel interval="999999" height="300" class="rounded-top">
							<v-carousel-item
								v-for="(item,i) in JSON.parse(images)"
									:key="i"
									:src="'https://srv.5degeneve.ch/storage/'+item"
							>
							</v-carousel-item>
            			</v-carousel>
					</v-flex>
					<v-flex xs8>
						<v-layout column>
							<v-card-actions class="pl-3">
								<b><big>{{ formatPrice(price) }} CHF</big></b>
								<v-spacer></v-spacer>
								<v-btn round color="orange" right v-on:click="selectCruise" v-if="$store.state.cruiseSelected==0">{{ $ml.get('btn') }}</v-btn>
								<v-btn round color="orange" right v-on:click="showAllCruises" v-if="$store.state.cruiseSelected!=0">Back</v-btn>
							</v-card-actions>

							<v-card-text primary-title class="discount" style="max-width: 500px;" v-if="$store.state.cruiseSelected!=0&&$cookies.get('role')=='3'">
								<table border='0' width='100%'>
									<tr><td>Your Discount</td>			<td align='right'><b>{{ discountPercent() }}%</b></td></tr>
									<tr><td>Your Price</td>				<td align='right'><b>{{ formatPrice(discountProp.disPrice) }} CHF</b></td></tr>
									<tr><td>Discount on next order</td>	<td align='right'><b>{{ discountProp.next }}%</b></td></tr>
								</table>
							</v-card-text>	

							<v-card-title primary-title style="max-width: 500px;">
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
		<v-flex lg4 ml-5 v-if="$store.state.cruiseSelected!=0">
			<Stepper :cruise_id="productID" :type='type'/>
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
	
	export default {
		components: {
     		Stepper
    	},
		props: ['productID', 'images', 'title', 'description', 'price', 'caption', 'type'],
		data: () => ({
			isExpanded: false,
			isVisible: false,
			imagesSrc: [
                    {src: 'http://www.5degeneve.ch/images/5degeneve-1.jpg'},
                    {src: 'http://www.5degeneve.ch/images/interieur1.jpg'},
                    {src: 'http://www.5degeneve.ch/images/interieur2.jpg'},
                    {src: 'http://www.5degeneve.ch/images/exte1.jpg'},
                    {src: 'http://www.5degeneve.ch/images/exte2.jpg'}
			],
			discountProp: {
				curr: 15,	// current discount in percent
				next: 16,	// next discount in percent
				discount: 0,	// the discount
				disPrice: 0		// the discounted Price
			}

		}),
		methods: {
			resizePane(event) {
				let target = event.target;
				let container = document.querySelector('.layout.row.cards')
				let cards = document.body.querySelectorAll('.layout.row.cards > .layout');
				let curr_el = target.closest('.layout.card');
				let currentCard = curr_el;

				let card = container.getElementsByClassName('card');
				[].forEach.call(card, function(el) {
			        el.style.display = 'none';
			    });

				let lg4_add = document.querySelector('.layout.justify-space-around.row > .layout.justify-center > .flex');
				console.log(lg4_add);
				curr_el.style.display = 'flex';
				curr_el.style.justifyContent = 'center';

				let btn_act = currentCard.querySelector('.v-card__actions > button').style.display = 'none';

				document.getElementsByClassName('close_card')[0].style.display = 'block';

				let imgs = container.getElementsByClassName('v-image__image');
				
				[].forEach.call(imgs, function(el) {
			        el.style.backgroundSize = '100%';
			    });

				let sizers = container.getElementsByClassName('v-responsive__sizer');
				[].forEach.call(sizers, function(el){
					el.style.paddingBottom = '50%';
				});

				currentCard.classList.add('lg4');
				currentCard.classList.remove('offset-sm3');

				container.getElementsByClassName('desr')[0].style.width = 'unset';

				this.isVisible = true;

				curr_el.querySelector('.v-stepper').parentNode.style.display = 'contents';
			},

			selectCruise(event) {
				this.$store.state.cruiseSelected = this.productID;
				setTimeout(function(){
					let lg4 =document.querySelector('.layout.justify-center > .flex.xs8');
					lg4.classList.add('lg4');
				},1);
			},

			showAllCruises(event) {
				this.$store.state.cruiseSelected = 0;
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
				let numOrders	= 2;
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
		}
	}
</script>