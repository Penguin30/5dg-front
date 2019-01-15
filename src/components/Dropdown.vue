<template>
  <div class="text-xs-center">
    <v-menu offset-y>
      <v-btn
        slot="activator"
        float
      >
        Lang
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="lang in $ml.list"
          :key="lang"
          @click="$ml.change(lang)"
        >
        <v-list-tile-title>
          <v-avatar          
            :tile="tile"
            :size="avatarSize"
            color="grey lighten-4"
          >
            <img :src="require(`@/assets/${lang}.png`)" :alt="lang">
          </v-avatar>
          {{ lang }}
        </v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </div>
</template>


<script>
  import { MLBuilder } from 'vue-multilanguage'; 
	
  export default { 
    data: () => ({
      items: [
        { title: 'English' }
      ],
	  tile: false,
	  size: 25
    }),
	computed: {		
  		avatarSize() {
  			return `${this.size}px`
  		}
  	}
 }
  
</script>