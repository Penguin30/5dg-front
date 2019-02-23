<template>
	<div class="text-xs-center">
		<v-dialog v-model="dialog" width="500">
			<v-btn slot="activator" color="white" text round>
				{{ $ml.get('t_c') }}
			</v-btn>

			<v-card>
				<v-card-title class="headline grey lighten-2 primary-title">
					{{ $ml.get('c_g') }}
				</v-card-title>

				<v-card-text>
Le 5 de Gen&egrave;ve est un bateau &agrave; moteur de la cat&eacute;gorie Pocket-Yacht.<br/><br/>
Il est propos&eacute; des sorties de loisirs sur le lac L&eacute;man, comprenant entre autres :<br/>
<ul>
<li>Ski nautique, Wake Surf (d&eacute;s 14 ans)</li>
<li>Tirage de bou&eacute;e flottante (2 personnes Maximum)</li>
<li>Baignades (eau profonde, pour nageur confirm&eacute;)</li>
<li>Snorkling, Plong&eacute;e Sous-Marine (avec bouteilles)</li>
<li>D&eacute;couverte de la faune lacustre (petite p&egrave;che)</li>
</ul><br/>
Le 5 de Gen&egrave;ve n'est pas destin&eacute; au transport de passager permettant de se rendre d'un point &agrave; un autre. Les sorties sur le lac sont circulaires et &agrave; but de loisirs lacustres. Ses h&ocirc;tes sont ramen&eacute;s &agrave; leur point de d&eacute;part.<br/><br/>
La relation contractuelle s'exerce dans le cadre d'une prestation de loisir et non pas de transport, par l'interm&eacute;diaire d'un prestataire de service (H&ocirc;tel) qui nous mandate pour cette prestation annexe.<br/><br/>
La commande de ce service est r&eacute;alis&eacute;e par l'entremise d'un site web d&eacute;di&eacute; (5degeneve.ch) et la confirmation de l'email du client vaut contrat.<br/><br/>
Le contrat est annulable en tout temps en cas de m&eacute;t&eacute;o force 4 ou plus. Le pilote du bateau reste seul d&eacute;cisionnaire de toutes les op&eacute;rations n&eacute;cessit&eacute;es pour assurer la s&eacute;curit&eacute; de ses h&ocirc;tes.<br/><br/>
Le contrat est en force (non annulable) 1 heure avant le d&eacute;but de la prestation.<br/><br/>
For judiciaire : Gen&egrave;ve<br/>
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