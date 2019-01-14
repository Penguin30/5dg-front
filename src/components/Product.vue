<template>
	<v-layout card>
	
		<v-flex xs12 sm6 offset-sm3>
			<v-card elevation-15 hover>
				<v-layout column>
					<v-flex col-xs-4>
						<v-img :src="imageSrc" position="center center" aspect-ratio="1"></v-img>
					</v-flex>
					<v-flex xs8>
						<v-layout column>
							<v-card-title primary-title>
								<div>
									<h3 class="headline mb-0">{{ title }}</h3>
									<div class="desr">{{ description }}</div>
								</div>
							</v-card-title>

							<v-card-actions class="pl-3">
								{{ price }} EUR
								<v-spacer></v-spacer>
								<v-btn round color="orange" right v-on:click="resizePane">{{ caption }}</v-btn>
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
	.layout.column > .flex.active {
		max-width: 50%;
	};

	.white-text {
		color: #fff!important;
	}
	
	.desr {
		height: 130px;
		overflow: auto;
	}
	.rounded-card{
		border-radius:50px;
	}
</style>
<script>
	import Stepper from './Stepper';
	
	export default {
		components: {
     		Stepper
    	},
		props: ['productID', 'imageSrc', 'title', 'description', 'priceTxt', 'price', 'caption', 'type'],
		data: () => ({
			isExpanded: false,
			isVisible: false
		}),
		methods: {
			resizePane(event) {
				let target = event.target;
				let container = document.querySelector('.layout.row.cards')
				let cards = document.body.querySelectorAll('.layout.row > .layout');
				let curr_el = target.closest('.layout.card');
				let currentCard = curr_el.firstChild;

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