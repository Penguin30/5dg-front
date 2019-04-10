<template>
	<div class="text-xs-center">
		<v-dialog v-model="dialog" width="500">
			<v-btn slot="activator" color="white" text round>
				{{ $ml.get('t_c') }}
			</v-btn>

			<v-card>
				<v-card-title class="headline grey lighten-2 primary-title">
					{{ $ml.get('t_c') }}
				</v-card-title>

				<v-card-text>
          <p>{{ $ml.get('term_p1') }}<p/>
          <p>{{ $ml.get('term_p2') }}<p/>
          <p>{{ $ml.get('term_p3') }}<p/>
          <p>{{ $ml.get('term_p4') }}<p/>
          <p>{{ $ml.get('term_p5') }}<p/>
          <p>{{ $ml.get('term_p6') }}<p/>
          <p>{{ $ml.get('term_p7') }}<p/>
          {{ $ml.get('term_p8') }}<br>
          {{ $ml.get('term_p9') }}<br>
         {{ $ml.get('term_p10') }}<br>
          {{ $ml.get('term_p11') }}<br>
          {{ $ml.get('term_p12') }}<br>
          {{ $ml.get('term_p13') }}<br>

				</v-card-text>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="dialog = false">
						OK
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>

	</div>
</template>

<script>
	import { MLBuilder } from 'vue-multilanguage';
	export default {
	    props: ['terms'],
		data () {
			return {
				dialog: false
			}
		}
	};
</script>
