<template>
  <div style="margin: 50px;" class="rounded-top">
    <v-toolbar flat color="white" class="elevation-5 rounded-top">
      <v-toolbar-title>{{ $ml.get('list_ta_o_t') }}</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>

      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.first_name" readonly label="First Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.last_name" readonly label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.phone" readonly label="Phone"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.email" readonly label="EMail"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.date" readonly label="Date"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>


    <v-data-table :headers="headers" :items="orders" class="elevation-5">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.first_name }}</td>
        <td>{{ props.item.last_name }}</td>
        <td class="text-xs-right">{{ props.item.phone }}</td>
        <td class="text-xs-right">{{ props.item.email }}</td>
        <td>{{ (props.item.cruise_id == 1) ? 'A' : (props.item.cruise_id == 2) ? 'B' : 'C' }}</td>
        <td class="text-xs-right">{{ props.item.date }}</td>
        <td class="text-xs-right">{{ props.item.time_start }}</td>
        <td class="text-xs-right">{{ props.item.time_end }}</td>
        <td class="text-xs-right">{{ props.item.passengers }}</td>

        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="viewOrder(props.item)">search</v-icon>
        </td>
      </template>

    </v-data-table>
  </div>
</template>

<style>
	.rounded-top {
		border-radius:10px 10px 0px 0px;
	}

</style>

<script>
  import axios from 'axios';
  import { MLBuilder } from 'vue-multilanguage';

  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'First Name', value: 'first_name', sortable: false },
        { text: 'Last Name', value: 'last_name', sortable: false },
        { text: 'Phone', align: 'right', value: 'phone', sortable: false },
        { text: 'Email', align: 'right', value: 'email', sortable: false },
        { text: 'Cruise', align: 'left', sortable: false, value: 'cruise'},
        { text: 'Date', align: 'right', value: 'date' },
        { text: 'Time start', align: 'right', value: 'start' },
        { text: 'Time end', align: 'right', value: 'end' },
        { text: 'Passengers', align: 'right', value: 'num' }
      ],
      orders: [],
      editedIndex: -1,
      editedItem: {
        order_id: 0,
        cruise: '',
        date: null,
        start: null,
        end: null,
        num: 0,
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
      },
      defaultItem: {
        order_id: 0,
        cruise: '',
        date: null,
        start: null,
        end: null,
        num: 0,
        first_name: '',
        last_name: '',
        phone: '',
        email: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.initialize();
    },

    methods: {
      initialize () {
        axios.get('https://www.8dg.ch/api/get_ta_orders?email='+this.$cookies.get('email'))
        .then(response => (this.orders = response.data,console.log(response.data)))
        .catch(error => console.log(error));
      },

      viewOrder (item) {
        this.editedIndex = this.orders.indexOf(item)
        this.editedItem  = Object.assign({}, item)
        this.dialog      = true
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      }
    }
  }
</script>