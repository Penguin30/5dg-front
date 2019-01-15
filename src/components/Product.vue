<template>
	<v-layout justify-center >
		<v-flex xs8>
			<v-card elevation-15 hover class="rounded-card">
				<v-layout column card>
					<v-flex col-xs-4>
						<v-carousel interval="999999" height="200" class="rounded-top">
							<v-carousel-item
								v-for="(item,i) in JSON.parse(images)"
									:key="i"
									:src="'http://5dg.utest.space/storage/app/public/'+item"
							>
							</v-carousel-item>
            			</v-carousel>
					</v-flex>
					<v-flex xs8>
						<v-layout column>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">{{ title }}</h3>
									<div v-html="description" class="desr" >{{ description }}</div>
								</div>
							</v-card-title>

							<v-card-actions class="pl-3">
								{{ price }} EUR
								<v-spacer></v-spacer>
								<v-btn round color="orange" right v-on:click="resizePane">{{ $ml.get('btn') }}</v-btn>
							</v-card-actions>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-card>
		</v-flex>
		
		<!-- Start stepper -->
		
		<v-flex lg4 ml-5 v-if="isVisible">
			<Stepper :type='type'/>
		</v-flex>
		
		<!-- End stepper -->
		
	</v-layout>
</template>

<style>
	.white-text {
		color: #fff!important;
	}
	
	.desr {
		height: 130px;
		overflow: auto;
	}

	.rounded-top {
		border-radius:10px 10px 0px 0px;
	}

	.rounded-card {
		border-radius:10px;
	}
</style>
<script>
	import { MLBuilder } from 'vue-multilanguage';
	import Stepper from './Stepper';
	
	export default {
		components: {
     		Stepper
    	},
		props: ['productID', 'images', 'title', 'description', 'priceTxt', 'price', 'caption', 'type'],
		data: () => ({
			isExpanded: false,
			isVisible: false,
			imagesSrc: [
                    {src: 'http://www.5degeneve.ch/images/5degeneve-1.jpg'},
                    {src: 'http://www.5degeneve.ch/images/interieur1.jpg'},
                    {src: 'http://www.5degeneve.ch/images/interieur2.jpg'},
                    {src: 'http://www.5degeneve.ch/images/exte1.jpg'},
                    {src: 'http://www.5degeneve.ch/images/exte2.jpg'}
            ]
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
			}
		}
	}
</script>