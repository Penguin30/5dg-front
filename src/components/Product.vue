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
								<v-btn round color="orange" right v-on:click="selectCruise" v-if="$store.state.cruiseSelected < 0">{{ $ml.get('btn') }}</v-btn>
								<v-btn round color="orange" right v-on:click="showAllCruises" v-if="$store.state.cruiseSelected>=0">Back</v-btn>
							</v-card-actions>
						</v-layout>
					</v-flex>
				</v-layout>
			</v-card>
		</v-flex>
		
		<!-- Start stepper -->
		
		<v-flex lg4 ml-5 v-if="$store.state.cruiseSelected >= 0">
			<Stepper :type='type' :cruise_id='productID'/>
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

			selectCruise(event) {
				this.$store.state.cruiseSelected = this.productID-1;
				setTimeout(function(){
					let lg4 =document.querySelector('.layout.justify-center > .flex.xs8');
					lg4.classList.add('lg4');
				},1);
			},

			showAllCruises(event) {
				this.$store.state.cruiseSelected = -1;
				let lg4 =document.querySelector('.layout.justify-center > .flex.xs8');
				setTimeout(function(){
					lg4.classList.remove('lg4');
				},1);
			}
		},
		created(){
			this.$store.state.cruiseSelected = -1;
		}
	}
</script>