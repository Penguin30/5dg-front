<template>
  <div class="text-xs-center">
    <v-menu
      bottom
      origin="center center"
      transition="scale-transition"
    >
    <v-btn
        slot="activator"
        color="primary"
        dark
     >
     <v-avatar
          :tile="tile"
          :size="avatarSize"
          color="grey lighten-4"
      >
       <img src="../assets/russian-flag.png" alt="avatar">
      </v-avatar>
     </v-btn>

      <v-list>
        <v-list-tile
          v-for="(item, i) in items"
          :key="i"
          @click=""
        >
		<v-list-tile-title>
			<v-avatar
				:tile="tile"
				:size="avatarSize"
				color="grey lighten-4"
			 >
			   <img src="../assets/uk-flag.png" alt="avatar">
			 </v-avatar> 
         	{{ item.title }}
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
	  size: 30
    }),
	computed: {
		mlmyMessage () {
			return new MLBuilder('msg').with('f', this.friends).with('l', 406)
		},
		
		avatarSize() {
			return `${this.size}px`
		}
  	}
 }
</script>